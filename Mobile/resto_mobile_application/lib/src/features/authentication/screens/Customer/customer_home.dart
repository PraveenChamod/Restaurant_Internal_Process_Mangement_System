import 'package:flutter/material.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../constants/homeScreen_indicator.dart';
import '../../../../constants/image_strings.dart';
import '../../../../constants/main_features.dart';

class CustomerHome extends StatefulWidget {
  const CustomerHome({Key? key}) : super(key: key);

  @override
  State<CustomerHome> createState() => _CustomerHomeState();
}

class _CustomerHomeState extends State<CustomerHome> {
  var _selectedIndex = 0;
  //Main Features List
  List<Map<String, String>> splashData = [
    {"title": "Restaurant Menus",
      "text": "Create and display your menu online",
      "image": chooseOnline
    },
    {"title": "Online Order",
      "text": "Take orders on your site for delivery",
      "image": orderFood
    },
    // {"title": "Fast Delivery",
    //   "text": "Pick out your fresh favorites for delivery right to your doorstep.",
    //   "image": deliveryService
    // },
    {"title": "Table Reservations",
      "text": "Reserve Dining Tables on your own choice",
      "image": dinningTable
    },
  ];

  //List of food items(Dummy)
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

  //List of food types(Dummy)
  final List foodTypes = [
    [
      'Pizza',
      true,
    ],
    [
      'Burger',
      false,
    ],
    [
      'Koththu',
      false,
    ],
    [
      'Rice',
      false,
    ],
    [
      'Koththu',
      false,
    ],
    [
      'Rice',
      false,
    ],
  ];

  //User Tapped on food types
  void foodTypeSelected(int index) {
    setState(() {
       for(int i = 0; i < foodTypes.length; i++){
         foodTypes[i][1] = false;
       }
      foodTypes[index][1] = true;
    });
  }

  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
          backgroundColor: Colors.black,
          appBar: AppBar(
            foregroundColor: const Color(0xFFfebf10),
            elevation: 0,
            leading: const Icon(
              Icons.menu,
            ),


            actions: const [
              Padding(
                padding: EdgeInsets.only(right: 20.0),
                child: Icon(Icons.search),
              ),
            ],
            backgroundColor: const Color(0xFF030b0b),
            centerTitle: true,
          ),
          body: Stack(
            children: <Widget>[
              const BackgroundImage(),
              SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  //mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20.0),
                      child: Text(
                        "Find The Best Meal For You",
                        style: TextStyle(
                          fontSize: 32,
                          //fontWeight: FontWeight.bold,
                          color: Colors.white70,
                        ),
                      ),
                    ),
                    //const SizedBox(height: 10,),
                    const Divider(),
                    SizedBox(
                      //height: 335,
                      height: 195,
                      child: PageView.builder(
                        onPageChanged: (index) {
                          setState(() {
                            _selectedIndex = index;
                          });
                        },
                        itemCount: splashData.length,
                        itemBuilder: (context, index) => MainFeatures(
                            image: splashData[index]["image"] ?? '',
                            title: splashData[index]["title"] ?? '',
                            text: splashData[index]["text"] ?? ''
                        ),
                      ),
                    ),
                    const Divider(),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ...List.generate(splashData.length, (index) =>
                            Indicator(isActive: _selectedIndex == index ? true : false),
                        ),
                      ],
                    ),
                    const Divider(),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20.0),
                      child: Text(
                        "Categories",
                        style: TextStyle(
                          fontSize: 20,
                          //fontWeight: FontWeight.bold,
                          color: Colors.white70,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10,),
                    //Horizontal Listview of food types
                    SizedBox(
                      height: 30,
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: foodTypes.length,
                        itemBuilder: (context, index) {
                          return FoodTypes(
                            foodType: foodTypes[index][0],
                            isSelected: foodTypes[index][1],
                            onTap: () {
                              foodTypeSelected(index);
                            },
                          );
                        },
                      ),
                    ),
                    const SizedBox(height: 10,),
                    //Horizontal Listview of food tiles
                    SizedBox(
                      height: 255,
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: foodItems.length,
                        itemBuilder: (context, index) {
                          return FoodTile(
                            foodImagePath: foodItems[index]["foodImagePath"] ?? '',
                            foodName: foodItems[index]["foodName"] ?? '',
                            foodPrice: foodItems[index]["foodPrice"] ?? '',
                            foodSpecialIngredient: foodItems[index]["foodSpecialIngredient"] ?? '',
                          );
                        },
                      ),
                    ),
                    //const SizedBox(height: 10,),
                    const Divider(),
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20.0),
                      child: Text(
                        "Today's Special",
                        style: TextStyle(
                          fontSize: 20,
                          //fontWeight: FontWeight.bold,
                          color: Colors.white70,
                        ),
                      ),
                    ),
                    const Divider(),
                    SizedBox(
                      height: 255,
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: foodItems.length,
                        itemBuilder: (context, index) {
                          return FoodTile(
                            foodImagePath: foodItems[index]["foodImagePath"] ?? '',
                            foodName: foodItems[index]["foodName"] ?? '',
                            foodPrice: foodItems[index]["foodPrice"] ?? '',
                            foodSpecialIngredient: foodItems[index]["foodSpecialIngredient"] ?? '',
                          );
                        },
                      ),
                    ),
                    const Divider(),
                  ],
                ),
              ),
            ],
          ),
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentIndex,
            iconSize: 25.0,
            items: const [
              BottomNavigationBarItem(
                icon: Icon(
                  Icons.home,
                  color: Color(0xFFfebf10),
                ),
                label: 'Home',
                backgroundColor: Color(0xFF030b0b),
              ),
              BottomNavigationBarItem(
                icon: Icon(
                  Icons.support_agent,
                  color: Color(0xFFfebf10),
                ),
                label: 'Support',
                backgroundColor: Color.fromRGBO(22, 26, 29, 100),
              ),
              BottomNavigationBarItem(
                icon: Icon(
                  Icons.notifications,
                  color: Color(0xFFfebf10),
                ),
                label: 'Notification',
                backgroundColor: Color.fromRGBO(22, 26, 29, 100),
              ),
              BottomNavigationBarItem(
                icon: Icon(
                  Icons.shopping_cart,
                  color: Color(0xFFfebf10),
                ),
                label: 'Cart',
                backgroundColor: Color.fromRGBO(22, 26, 29, 100),
              ),
            ],
            onTap: (index) {
              setState((){
                _currentIndex = index;
              });
            },
            selectedItemColor: const Color(0xFFfebf10),
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
      padding: const EdgeInsets.only(left: 20.0),
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


class FoodTypes extends StatelessWidget {
  final String foodType;
  final bool isSelected;
  final VoidCallback onTap;

  const FoodTypes({super.key,
    required this.foodType,
    required this.isSelected,
    required this.onTap,
  });
  //const FoodTypes({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {

    return Padding(
      padding: const EdgeInsets.only(left: 20.0),

      child: GestureDetector(
        onTap: onTap,
        child: Container(
          //margin: EdgeInsets.only(left: 10),
          height: 20,
          width: 100,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
            //color: isSelected ? const Color(0xFFfebf10) : const Color(0xFF1A1E21),
            color: isSelected ? const Color(0xFFfebf10) : Colors.black54,
          ),
          child: Center(
            child: Text(
              foodType,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: isSelected ? Colors.black : Colors.white70,
                fontSize: 15.0,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

