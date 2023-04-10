import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/common_widgets/menu_item_container.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/menu_appbar.dart';
import '../../../../constants/image_strings.dart';

class ProductMenuTitles extends StatefulWidget {
  final int choice;

  const ProductMenuTitles({Key? key, required this.choice}) : super(key: key);

  @override
  State<ProductMenuTitles> createState() => _ProductMenuTitlesState();
}

class _ProductMenuTitlesState extends State<ProductMenuTitles> {

  List<MenuItems> data = [];

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: MenuAppBar(choice: widget.choice,),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            Center(
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: FutureBuilder(
                  future: getCategories(),
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      return GridView.builder(
                        itemCount: snapshot.data!.length,
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: 10,
                          mainAxisSpacing: 10,
                        ),
                        itemBuilder: (BuildContext context, int index) {
                          return MenuContainer(
                            itemImagePath: 'http://$hostName:5000/Categoryimages/${snapshot.data![index].itemImagePath}',
                            itemName: snapshot.data![index].category,
                            choice: widget.choice,
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
      ),
    );
  }
  Future<List<dynamic>> getCategories() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Categories'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final categories = json.decode(response.body);
      return MenuItems.fromJsonList(categories['data']['categories']);
    } else {
      throw Exception('Failed to load data');
    }
  }
}
//use the fromJson method of our model class to convert the JSON data to an object.
class MenuItems{
  final String itemImagePath;
  final String category;
  MenuItems({required this.itemImagePath, required this.category,});
  factory MenuItems.fromJson(Map<String, dynamic> json){
    return MenuItems(
      itemImagePath: json['CategoryImage'],
      category: json['CategoryName'],
    );
  }
  static List<MenuItems> fromJsonList(dynamic jsonList){
    final menuItemsList = <MenuItems>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        menuItemsList.add(
          MenuItems.fromJson(json),
        );
      }
    }
    return menuItemsList;
  }
}