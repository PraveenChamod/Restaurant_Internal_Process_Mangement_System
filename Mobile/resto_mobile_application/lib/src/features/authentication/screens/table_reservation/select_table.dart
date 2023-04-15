import 'dart:convert';
import 'dart:math';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/date_table_item_container.dart';
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
                                crossAxisSpacing: 10,
                                mainAxisExtent: 300,
                              ),
                              itemBuilder: (BuildContext context, int index) {
                                return TableItemContainer(
                                  tableNumber: snapshot.data![index].tableNumber,
                                  numberOfPersons: snapshot.data![index].numberOfPersons,
                                  price: snapshot.data![index].price,
                                  status: snapshot.data![index].status,
                                  tableId: snapshot.data![index].id,
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
              Stack(
                children: [
                  const BackgroundImage(),
                  Row(
                    children: [
                      Expanded(
                        flex: 4,
                        child: Column(
                          children: [
                            Expanded(
                              flex: 1,
                              child: Padding(
                                padding: const EdgeInsets.all(10.0),
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: Colors.black38,
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  child: const Center(
                                    child: Text(
                                      'Customize The Table With Your Own Choice',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        fontSize: 18,
                                        color: Color(0xFFfebf10),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            Expanded(
                              flex: 4,
                              child: Padding(
                                padding: const EdgeInsets.all(10.0),
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: Colors.black38,
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(
                                      color: const Color(0xFFfebf10),
                                    ),
                                  ),
                                  child: Column(
                                    children: [
                                      Expanded(
                                        flex: 1,
                                        child: Column(
                                          children: [
                                            Expanded(
                                              child: Row(
                                                children: [
                                                  Expanded(
                                                    child: Container(
                                                      child: Center(
                                                        child: ClipRRect(
                                                          borderRadius: BorderRadius.circular(10),
                                                          child: Image.asset(
                                                            'assets/Tables/Main_Table.png',
                                                            width: 80,
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                  Expanded(
                                                    child: Center(
                                                      child: ClipRRect(
                                                        borderRadius: BorderRadius.circular(10),
                                                        child: Image.asset(
                                                          'assets/Tables/Main_Table.png',
                                                          width: 80,
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                            Expanded(
                                              child: Row(
                                                children: [
                                                  Expanded(
                                                    child: Container(
                                                      child: Center(
                                                        child: ClipRRect(
                                                          borderRadius: BorderRadius.circular(10),
                                                          child: Image.asset(
                                                            'assets/Tables/Main_Table.png',
                                                            width: 80,
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                  Expanded(
                                                    child: Container(
                                                      child: Center(
                                                        child: ClipRRect(
                                                          borderRadius: BorderRadius.circular(10),
                                                          child: Image.asset(
                                                            'assets/Tables/Main_Table.png',
                                                            width: 80,
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      Expanded(
                                        flex: 1,
                                        child: Center(
                                          child: ClipRRect(
                                            borderRadius: BorderRadius.circular(10),
                                            child: Image.asset(
                                              'assets/Tables/Main_Table.png',
                                              width: 200,
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            Expanded(
                              flex: 1,
                              child: Padding(
                                padding: const EdgeInsets.all(10.0),
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: Colors.black38,
                                    borderRadius: BorderRadius.circular(10),
                                    // border: Border.all(
                                    //   color: const Color(0xFFfebf10),
                                    // ),
                                  ),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: const [
                                      Expanded(
                                        child: Text(
                                          'Total Price:',
                                          textAlign: TextAlign.center,
                                          style: TextStyle(
                                            fontSize: 18,
                                            color: const Color(0xFFfebf10),
                                          ),
                                        ),
                                      ),
                                      Expanded(
                                        child: Text(
                                          'Rs.450',
                                          textAlign: TextAlign.center,
                                          style: TextStyle(
                                            fontSize: 18,
                                            color: const Color(0xFFfebf10),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            Expanded(
                              flex: 1,
                              child: Container(
                                decoration: const BoxDecoration(
                                  color: Colors.black38,
                                ),
                                child: Center(
                                  child: Container(
                                    width: 150,
                                    height: 35,
                                    padding: const EdgeInsets.only(left: 5, right: 5),
                                    child: AnimatedButton(
                                      text: "Book Table",
                                      buttonTextStyle: const TextStyle(
                                        color: Colors.black,
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      color: const Color(0xFFfebf10),
                                      pressEvent: () {},
                                      borderRadius: const BorderRadius.only(
                                        topLeft: Radius.circular(0),
                                        topRight: Radius.circular(80),
                                        bottomLeft: Radius.circular(80),
                                        bottomRight: Radius.circular(80),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Expanded(
                        flex: 2,
                        child: Container(
                          decoration: BoxDecoration(
                            color: Colors.black38,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(10.0),
                            child: Column(
                              children: const [
                                DateTableItemContainer(
                                  imagePath: 'assets/Food Types/Noodles/Noodles.jpg',
                                  itemPrice: 400,
                                  itemName: 'Candles',
                                ),
                                DateTableItemContainer(
                                  imagePath: 'assets/Food Types/Noodles/Noodles.jpg',
                                  itemPrice: 1570,
                                  itemName: 'Red Vine',
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),

                ],
              ),
              Stack(
                children: [
                  const BackgroundImage(),

                ],
              ),
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
  final String id;
  final String tableNumber;
  final int numberOfPersons;
  final int price;
  final String status;
  SelectTables({
    required this.tableNumber,
    required this.numberOfPersons,
    required this.price,
    required this.status,
    required this.id,
  });
  factory SelectTables.fromJson(Map<String, dynamic> json) {
    return SelectTables(
      tableNumber: json['TableNo'],
      numberOfPersons: json['NoOfPersons'],
      price: json['price'],
      status: json['Status'],
      id: json['id'],
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
