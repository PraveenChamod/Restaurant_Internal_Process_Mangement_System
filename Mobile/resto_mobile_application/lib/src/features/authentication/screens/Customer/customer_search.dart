import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../../../common_widgets/background_image.dart';

class CustomerSearch extends StatelessWidget {
  const CustomerSearch({Key? key}) : super(key: key);

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
                      height: MediaQuery.of(context).size.height/8,
                      //height: 60,
                      width: MediaQuery.of(context).size.width,
                      margin: const EdgeInsets.only(top: 10.0, bottom: 10.0),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 25.0),
                        child: TextField(
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
                    //const SizedBox(height: 10,),
                    Container(
                      height: 7 * MediaQuery.of(context).size.height/8,
                      //height: MediaQuery.of(context).size.height - 80,
                      width: MediaQuery.of(context).size.width,
                      //width: 280,
                      child: ListView(
                        scrollDirection: Axis.vertical,
                        children: const <Widget>[
                          FoodTile(
                            foodImagePath: "assets/Food Types/Pizza/Cheese_Pizza.jpg",
                            foodName: "Pizza",
                            foodPrice: "4.60",
                            foodSpecialIngredient: 'With Almond Milk',
                          ),
                          FoodTile(
                            foodImagePath: "assets/Food Types/Burger/Chicken_Burger.jpg",
                            foodName: "Burger",
                            foodPrice: "4.50",
                            foodSpecialIngredient: 'With Coconut Milk',
                          ),
                          FoodTile(
                            foodImagePath: "assets/Food Types/Koththu/Chicken_Koththu.jpg",
                            foodName: "Koththu",
                            foodPrice: "5.60",
                            foodSpecialIngredient: 'With Chocolate',
                          ),
                          FoodTile(
                            foodImagePath: "assets/Food Types/Rice/Veg_Rice.jpg",
                            foodName: "Rice",
                            foodPrice: "3.60",
                            foodSpecialIngredient: 'With Chilies',
                          ),
                          FoodTile(
                            foodImagePath: "assets/Food Types/Koththu/Chicken_Koththu.jpg",
                            foodName: "Koththu",
                            foodPrice: "5.60",
                            foodSpecialIngredient: 'With Chocolate',
                          ),
                          FoodTile(
                            foodImagePath: "assets/Food Types/Rice/Veg_Rice.jpg",
                            foodName: "Rice",
                            foodPrice: "3.60",
                            foodSpecialIngredient: 'With Chilies',
                          ),
                        ],
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
class FoodTile extends StatelessWidget {

  final String foodImagePath;
  final String foodName;
  final String foodSpecialIngredient;
  final String foodPrice;

  const FoodTile({Key? key,
    required this.foodImagePath,
    required this.foodName,
    required this.foodPrice,
    required this.foodSpecialIngredient,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 25.0),
      child: Container(
        padding: const EdgeInsets.all(12),
        width: 200,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: Colors.black54,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            //Food Image
            Center(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.asset(
                  foodImagePath,
                  width: 125,
                ),
              ),
            ),

            //Food Name & Special Ingredient
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 12.0, horizontal: 8.0),
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
                ],
              ),
            ),

            //Price
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "\$$foodPrice",
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 15.0,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: const Color(0xFFfebf10),
                      borderRadius: BorderRadius.circular(6.0),
                    ),
                    child: const Icon(
                      Icons.add,
                      color: Colors.black,
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
