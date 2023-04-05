import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/table_item_container.dart';
import '../../../../constants/image_strings.dart';
import '../Customer/customer_main_page.dart';

class SelectTable extends StatefulWidget {
  const SelectTable({Key? key}) : super(key: key);

  @override
  State<SelectTable> createState() => _SelectTableState();
}

class _SelectTableState extends State<SelectTable>  with SingleTickerProviderStateMixin{
  //For change the tab bar color
  late TabController _tabController;
  final List<SelectTables> data = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: DefaultTabController(
        length: 4,
        child: Scaffold(
          backgroundColor: const Color(0xFF161b1d),
          appBar: AppBar(
            foregroundColor: const Color(0xFFfebf10),
            elevation: 0,
            leading: IconButton(
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_){
                      return const CustomerMainPage(choice: 3,);
                    },
                  ),
                );
              },
              icon: const Icon(Icons.chevron_left),
            ),
            title: const Text("Select Table"),
            actions:  <Widget>[
              Padding(
                padding: const EdgeInsets.only(right: 20.0),
                child: IconButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_){
                          return const CustomerMainPage(choice: 3);
                        },
                      ),
                    );
                  },
                  icon: const Icon(Icons.home),
                ),
                //child: Icon(Icons.search),
              ),
            ],
            bottom:  TabBar(
              controller: _tabController,
              indicatorColor: const Color(0xFFfebf10),
              tabs: const [
                Tab(
                  icon: Icon(
                    Icons.table_restaurant,
                    color: Color(0xFFfebf10),
                  ),
                  text: 'Dine In',
                ),
                Tab(
                  icon: Icon(
                    CupertinoIcons.person_2_alt,
                    color: Color(0xFFfebf10),
                  ),
                  text: 'For Dating',
                ),
                Tab(
                  icon: Icon(
                    CupertinoIcons.gift_fill,
                    color: Color(0xFFfebf10),
                  ),
                  text: 'Special Events',
                ),
              ],
            ),
            backgroundColor: const Color(0xFF161b1d),
            centerTitle: true,
          ),
          body: TabBarView(
            controller: _tabController,
            children: [
              Stack(
                children: [
                  const BackgroundImage(),
                  Padding(
                    padding: const EdgeInsets.all(10.0),
                    child: Center(
                      child: FutureBuilder(
                        future: getTables(),
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            return GridView.builder(
                              itemCount: snapshot.data!.length,
                              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 2,
                                mainAxisSpacing: 10,
                                mainAxisExtent: 300,
                              ),
                              itemBuilder: (BuildContext context, int index) {
                                return TableItemContainer(
                                  tableNumber: snapshot.data![0].tableNumber,
                                  numberOfPersons: snapshot.data![0].numberOfPersons,
                                  price: snapshot.data![0].price,
                                  status: snapshot.data![0].status,
                                );
                              },
                            );
                          }else if (snapshot.hasError) {
                            return Text('${snapshot.error}');
                          }
                          return const SizedBox(
                            height: 40,
                            width: 40,
                            child: Center(
                              child: CircularProgressIndicator(
                                color: Color(0xFFfebf10),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                ],
              ),
              const Icon(Icons.ac_unit),
              const Icon(Icons.ac_unit),
            ],
          ),

        ),
      ),
    );
  }
  Future<List<dynamic>> getTables() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/availabletables'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final ordersFoods = jsonDecode(response.body);
      return SelectTables.fromJsonList(ordersFoods['data']['availableTables']);
    } else {
      throw Exception('Failed to load data');
    }
  }
}

class SelectTables{
  final String tableNumber;
  final int numberOfPersons;
  final int price;
  final String status;
  SelectTables({
    required this.tableNumber,
    required this.numberOfPersons,
    required this.price,
    required this.status,
  });
  factory SelectTables.fromJson(Map<String, dynamic> json) {
    return SelectTables(
      tableNumber: json['TableNo'],
      numberOfPersons: json['NoOfPersons'],
      price: json['price'],
      status: json['Status'],
    );
  }
  static List<SelectTables> fromJsonList(dynamic jsonList){
    final selectTablesList = <SelectTables>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        selectTablesList.add(SelectTables.fromJson(json),);
      }
    }
    return selectTablesList;
  }
}
