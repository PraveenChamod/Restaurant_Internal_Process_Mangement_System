import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../constants/image_strings.dart';
import '../login_screen.dart';
import 'customer_main_page.dart';
import 'package:http/http.dart' as http;
class CustomerSearch extends StatefulWidget {
  const CustomerSearch({Key? key}) : super(key: key);

  @override
  State<CustomerSearch> createState() => _CustomerSearchState();
}

class _CustomerSearchState extends State<CustomerSearch> {

  List<FoodModel> foodItemsDataList = [];
  @override
  void initState() {
    super.initState();
    Future<List<FoodItems>> sampleList = getAllFoods();
    sampleList.then((list) {
      for (var item in list) {
        setState(() {
          var burger = FoodModel(
              item.foodImagePath,
              item.foodName,
              item.categoryName,
              item.foodItemPrice
          );
          foodItemsDataList.add(burger);
        });
      }
    });
  }

  //final List<FoodItems> foodItemsData = [];
  void updateList(String value){
    //This is the function that will filter our list
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
          backgroundColor: Colors.black,
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
            title: const Text('Find Your Favourite Item'),
            backgroundColor: const Color(0xFF161b1d),
            centerTitle: true,
          ),
          body: Stack(
            children: <Widget>[
              const BackgroundImage(),
              SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      margin: const EdgeInsets.only(top: 20.0, bottom: 10.0),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 25.0),
                        child: TextField(
                          autofocus: false,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 20.0,
                          ),
                          decoration: InputDecoration(
                            prefixIcon: const Icon(
                              Icons.search,
                              color: Colors.white70,
                            ),
                            hintText: "Find Your Favourite..",
                            hintStyle: const TextStyle(fontSize: 20.0, color: Colors.white70),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: const BorderRadius.all(
                                Radius.circular(20.0),
                              ),
                              borderSide: BorderSide(color: Colors.grey.shade600),
                            ),
                            enabledBorder: OutlineInputBorder(
                              borderRadius: const BorderRadius.all(
                                Radius.circular(20.0),
                              ),
                              borderSide: BorderSide(color: Colors.grey.shade600),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.all(20),
                      height: MediaQuery.of(context).size.height * 0.75,
                      child: ListView.builder(
                        scrollDirection: Axis.vertical,
                        itemCount: foodItemsDataList.length,
                        itemBuilder: (context, index) {
                          return SearchFoodTile(
                            foodImagePath: 'http://$hostName:5000/Foodimages/${foodItemsDataList[index].foodImagePath}',
                            foodName: foodItemsDataList[index].foodName,
                            foodPrice: foodItemsDataList[index].foodPrice ?? 0,
                            foodSpecialIngredient: foodItemsDataList[index].foodSpecialIngredient,
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
    );
  }
  Future<List<FoodItems>> getAllFoods() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Foods'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final foodItems = json.decode(response.body);
      print(foodItems['data']['foods']);
      return FoodItems.fromJsonList(foodItems['data']['foods']);
    } else {
      throw Exception('Failed to load data');
    }
  }
}

class FoodItems{
  final String foodName;
  final String categoryName;
  final int foodItemPrice;
  final String foodImagePath;
  final String foodId;
  FoodItems({
    required this.categoryName,
    required this.foodName,
    required this.foodItemPrice,
    required this.foodImagePath,
    required this.foodId,
  });
  factory FoodItems.fromJson(Map<String, dynamic> json){
    return FoodItems(
      foodName: json['FoodName'],
      categoryName: json['Category'],
      foodItemPrice:  json['Price'],
      foodImagePath:  json['FoodImage'],
      foodId:  json['id'],
    );
  }
  static List<FoodItems> fromJsonList(dynamic jsonList){
    final foodsList = <FoodItems>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        foodsList.add(
          FoodItems.fromJson(json),
        );
      }
    }
    return foodsList;
  }
}



//Food Tile stl
class SearchFoodTile extends StatelessWidget {

  final String foodImagePath;
  final String foodName;
  final String foodSpecialIngredient;
  final int foodPrice;

  const SearchFoodTile({Key? key,
    required this.foodImagePath,
    required this.foodName,
    required this.foodPrice,
    required this.foodSpecialIngredient,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_){
              return const LoginScreen();
            },
          ),
        );
      },
      child: Padding(
        padding: const EdgeInsets.all(5.0),
        child: Container(
          height: 100,
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: Colors.black54,
          ),
          child: Row(
            children: [
              Center(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.network(
                    foodImagePath,
                    width: 70,
                  ),
                ),
              ),
              const SizedBox(width: 15,),
              //Food Name & Special Ingredient
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    foodName,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 20.0,
                    ),
                  ),
                  const SizedBox(height: 5,),
                  Text(
                    foodSpecialIngredient,
                    style: const TextStyle(
                      color: Colors.white70,
                      fontSize: 15.0,
                    ),
                  ),
                  const SizedBox(height: 5,),
                  Text(
                    "\$$foodPrice",
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 15.0,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
class FoodModel{
  String foodImagePath;
  String foodName;
  String foodSpecialIngredient;
  int foodPrice;

  FoodModel(
      this.foodImagePath,
      this.foodName,
      this.foodSpecialIngredient,
      this.foodPrice
      );
}
