import 'package:flutter/material.dart';
import '../../../../common_widgets/background_image.dart';
import '../login_screen.dart';

class CustomerSearch extends StatefulWidget {
  const CustomerSearch({Key? key}) : super(key: key);

  @override
  State<CustomerSearch> createState() => _CustomerSearchState();
}

class _CustomerSearchState extends State<CustomerSearch> {

  List<Map<String, String>> foodItems = [
    {
      "foodImagePath": "assets/Food Types/Pizza/Cheese_Pizza.jpg",
      "foodName": "Pizza",
      "foodPrice": "4.70",
      "foodSpecialIngredient": "With Almond Milk",
    },
    {
      "foodImagePath": "assets/Food Types/Burger/Chicken_Burger.jpg",
      "foodName": "Burger",
      "foodPrice": "4.50",
      "foodSpecialIngredient": "With Coconut Milk",
    },
    {
      "foodImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "foodName": "Koththu",
      "foodPrice": "5.60",
      "foodSpecialIngredient": "With Chocolate",
    },
    {
      "foodImagePath": "assets/Food Types/Rice/Veg_Rice.jpg",
      "foodName": "Rice",
      "foodPrice": "3.60",
      "foodSpecialIngredient": "With Chilies",
    },
    {
      "foodImagePath": "assets/Food Types/Pizza/Cheese_Pizza.jpg",
      "foodName": "Pizza",
      "foodPrice": "4.70",
      "foodSpecialIngredient": "With Almond Milk",
    },
    {
      "foodImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "foodName": "Koththu",
      "foodPrice": "5.60",
      "foodSpecialIngredient": "With Chocolate",
    },
  ];

  void updateList(String value){
    //This is the function that will filter our list

  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
          backgroundColor: Colors.black,
          body: Stack(
            children: <Widget>[
              const BackgroundImage(),
              SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      margin: const EdgeInsets.only(top: 10.0, bottom: 10.0),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 25.0),
                        child: TextField(
                          autofocus: true,
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
                      height: 7 * MediaQuery.of(context).size.height/8,
                      width: MediaQuery.of(context).size.width,
                      child: ListView.builder(
                        scrollDirection: Axis.vertical,
                        itemCount: foodItems.length,
                        itemBuilder: (context, index) {
                          return SearchFoodTile(
                            foodImagePath: foodItems[index]["foodImagePath"] ?? '',
                            foodName: foodItems[index]["foodName"] ?? '',
                            foodPrice: foodItems[index]["foodPrice"] ?? '',
                            foodSpecialIngredient: foodItems[index]["foodSpecialIngredient"] ?? '',
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
}

//Food Tile stl
class SearchFoodTile extends StatelessWidget {

  final String foodImagePath;
  final String foodName;
  final String foodSpecialIngredient;
  final String foodPrice;

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
          width: MediaQuery.of(context).size.width,
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: Colors.black54,
          ),
          child: Row(
            children: [
              Container(
                //width: MediaQuery.of(context).size.width/4,
                child: Center(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Image.asset(
                      foodImagePath,
                      width: 70,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15,),
              //Food Name & Special Ingredient
              Container(
                //width: MediaQuery.of(context).size.width/3,
                child: Column(
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
              ),
            ],
          ),
        ),
      ),
    );
  }
}
class FoodModel{
  String? foodImagePath;
  String? foodName;
  String? foodSpecialIngredient;
  String? foodPrice;

  FoodModel(
      this.foodImagePath,
      this.foodName,
      this.foodSpecialIngredient,
      this.foodPrice
      );
}
