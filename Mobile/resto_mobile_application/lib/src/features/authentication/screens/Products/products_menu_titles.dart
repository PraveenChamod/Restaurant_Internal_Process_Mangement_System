import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:resto_mobile_application/src/common_widgets/Menu_Container.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/menu_appbar.dart';
import '../Customer/customer_home.dart';
import '../Customer/customer_search.dart';

class ProductMenuTitles extends StatefulWidget {

  const ProductMenuTitles({Key? key}) : super(key: key);

  @override
  State<ProductMenuTitles> createState() => _ProductMenuTitlesState();
}

class _ProductMenuTitlesState extends State<ProductMenuTitles> {

  List<FoodMenuItems> data = [];

  List<Map<String, String>> foodMenuItems = [
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Koththu",
    },
    {
      "ItemImagePath": "assets/Food Types/Rice/Veg_Rice.jpg",
      "ItemName": "Fried Rice",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Rice & Curry",
    },
    {
      "ItemImagePath": "assets/Food Types/Burger/Chicken_Burger.jpg",
      "ItemName": "Burger",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Appetizer",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Desert",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Beverages",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Salad",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Other",
    },
  ];
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const MenuAppBar(),
        body: Stack(
          children: [
            const BackgroundImage(),
            Expanded(
              child: FutureBuilder(
                future: fetchData(),
                builder: (context, snapshot){
                  if (snapshot.hasData) {
                    return GridView.builder(
                      itemCount: snapshot.data!.length,
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 10,
                        mainAxisSpacing: 10,
                      ),
                      itemBuilder: (BuildContext context, int index){
                        return MenuContainer(
                          ItemImagePath: snapshot.data![index].category,
                          ItemName: snapshot.data![index].itemName,
                        );
                      },
                    );
                  }else if (snapshot.hasError) {
                    return Text('${snapshot.error}');
                  }
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
  Future<List<dynamic>> fetchData() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    print("In the fetchdata() ${userToken!}");
    final response = await http.get(
      Uri.parse('http://192.168.8.181:5000/api/v1/Foods'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      return FoodMenuItems.fromJsonList(json.decode(response.body));
    } else {
      throw Exception('Failed to load data');
    }
  }
}

//use the fromJson method of our model class to convert the JSON data to an object.
class FoodMenuItems{
  //final String itemImagePath;
  final String category;
  final String itemName;
  FoodMenuItems({required this.category, required this.itemName,});
  factory FoodMenuItems.fromJson(Map<String, dynamic> json){
    return FoodMenuItems(
      //itemImagePath: json['FoodImage'],
      category: json['Category'],
      itemName: json['FoodName'],
    );
  }
  static List<FoodMenuItems> fromJsonList(dynamic jsonList){
    final foodMenuItemsList = <FoodMenuItems>[];
    if (jsonList == null) return foodMenuItemsList;
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        foodMenuItemsList.add(
          FoodMenuItems.fromJson(json),
        );
      }
    }
    return foodMenuItemsList;
  }
}