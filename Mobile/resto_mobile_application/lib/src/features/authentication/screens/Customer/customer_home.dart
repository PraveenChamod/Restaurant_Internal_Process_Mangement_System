import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../constants/homeScreen_indicator.dart';
import '../../../../constants/image_strings.dart';
import '../../../../constants/main_features.dart';
import '../products/home_product_item_details.dart';

class CustomerHome extends StatefulWidget {
  const CustomerHome({Key? key}) : super(key: key);

  @override
  State<CustomerHome> createState() => _CustomerHomeState();
}

class _CustomerHomeState extends State<CustomerHome> {
  final List<OfferItems> offerData = [];

  var _selectedIndex = 0;

  //For MainFeatures Auto Scrolling PageView
  final _numPages = 3;
  final _pageController = PageController();
  @override
  void initState() {
    super.initState();
    _startAutoScroll();
  }
  void _startAutoScroll() {
    Timer.periodic(const Duration(seconds: 3), (timer) {
      if (_selectedIndex < _numPages - 1) {
        _selectedIndex++;
      } else {
        _selectedIndex = 0;
      }
      _pageController.animateToPage(
        _selectedIndex,
        duration: const Duration(milliseconds: 500),
        curve: Curves.ease,
      );
    });
  }
  //For Auto Scrolling PageView

  //Main Features List
  List<Map<String, String>> splashData = [
    {"title": "Explore Menu at Restaurant",
      "text": "Order Foods & Dine In Restaurant",
      "image": chooseOnline,
    },
    {"title": "Online Order To Your Doorstep",
      "text": "Take orders on your site for delivery",
      "image": orderFood,
    },
    {"title": "Table Reservations",
      "text": "Reserve Dining Tables on your own choice",
      "image": dinningTable,
    },
  ];

  //List of food items(Dummy)
  List<Map<String, dynamic>> foodItems = [
    {
      "foodImagePath": "assets/Food Types/Pizza/Cheese_Pizza.jpg",
      "foodName": "Pizza",
      "foodPrice": 470,
      "foodSpecialIngredient": "With Almond Milk",
    },
    {
      "foodImagePath": "assets/Food Types/Burger/Chicken_Burger.jpg",
      "foodName": "Burger",
      "foodPrice": 450,
      "foodSpecialIngredient": "With Coconut Milk",
    },
    {
      "foodImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "foodName": "Koththu",
      "foodPrice": 560,
      "foodSpecialIngredient": "With Chocolate",
    },
    {
      "foodImagePath": "assets/Food Types/Rice/Veg_Rice.jpg",
      "foodName": "Rice",
      "foodPrice": 360,
      "foodSpecialIngredient": "With Chilies",
    },
    {
      "foodImagePath": "assets/Food Types/Pizza/Cheese_Pizza.jpg",
      "foodName": "Pizza",
      "foodPrice": 470,
      "foodSpecialIngredient": "With Almond Milk",
    },
    {
      "foodImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "foodName": "Koththu",
      "foodPrice": 560,
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
      'Appetizer',
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
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        const BackgroundImage(),
        SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              const Divider(),
              SizedBox(
                height: 218,
                child: PageView.builder(
                  controller: _pageController,
                  onPageChanged: (index) {
                    setState(() {
                      _selectedIndex = index;
                    });
                  },
                  itemCount: splashData.length,
                  itemBuilder: (context, index) => MainFeatures(
                    image: splashData[index]["image"] ?? '',
                    title: splashData[index]["title"] ?? '',
                    text: splashData[index]["text"] ?? '',
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
              const SizedBox(height: 10.0,),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 20.0),
                child: Text(
                  "Popular Categories",
                  style: TextStyle(
                    fontSize: 20,
                    //fontWeight: FontWeight.bold,
                    color: Colors.white,
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
              Center(
                child: SizedBox(
                  height: 250,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: foodItems.length,
                    itemBuilder: (context, index) {
                      return FoodTile(
                        foodImagePath: foodItems[index]["foodImagePath"] ?? '',
                        foodName: foodItems[index]["foodName"] ?? '',
                        foodPrice: foodItems[index]["foodPrice"] ?? '',
                        foodSpecialIngredient: foodItems[index]["foodSpecialIngredient"] ?? '',
                        foodId: 'Test1',
                      );
                    },
                  ),
                ),
              ),
              const Divider(),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 20.0),
                child: Text(
                  "Today's Special",
                  style: TextStyle(
                    fontSize: 20,
                    color: Colors.white,
                  ),
                ),
              ),
              const Divider(),
              Center(
                child: SizedBox(
                  height: 250,
                  child: FutureBuilder(
                    future: fetchSpecialItems(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, index) {
                            return OfferFoodTile(
                              offerFoodImagePath: 'http://$hostName:5000/offerimages/${snapshot.data![index].offerImagePath}',
                              offerFoodName: snapshot.data![index].category,
                              offerFoodSpecialIngredient: snapshot.data![index].offerName,
                              offerFoodId: snapshot.data![index].offerId,
                              offerFoodPrice: snapshot.data![index].price,
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
              const Divider(),
            ],
          ),
        ),
      ],
    );
  }
  Future<List<dynamic>> fetchSpecialItems() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Offers'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final offers = json.decode(response.body);
      return OfferItems.fromJsonList(offers);
    } else {
      throw Exception('Failed to load data');
    }
  }
}

class OfferItems{
  final String offerImagePath;
  final String offerName;
  final String category;
  final String offerId;
  final String offerSerialNo;
  final int price;
  OfferItems({
    required this.offerImagePath,
    required this.offerName,
    required this.category,
    required this.offerSerialNo,
    required this.offerId,
    required this.price,
  });
  factory OfferItems.fromJson(Map<String, dynamic> json){
    return OfferItems(
      offerImagePath: json['OfferImage'],
      offerName: json['OfferName'],
      offerSerialNo: json['SerialNo'],
      category: json['Category'],
      offerId: json['id'],
      price: json['SpecialPrice'],
    );
  }
  static List<OfferItems> fromJsonList(dynamic jsonList){
    final offerItemsList = <OfferItems>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        offerItemsList.add(
          OfferItems.fromJson(json),
        );
      }
    }
    return offerItemsList;
  }
}

//Offer Food Tile Stl
class OfferFoodTile extends StatelessWidget {
  final String offerFoodImagePath;
  final String offerFoodName;
  final String offerFoodSpecialIngredient;
  final String offerFoodId;
  final int offerFoodPrice;

  const OfferFoodTile({Key? key,
    required this.offerFoodImagePath,
    required this.offerFoodName,
    required this.offerFoodSpecialIngredient,
    required this.offerFoodId,
    required this.offerFoodPrice,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_){
              return HomeProductItemDetails(
                itemImagePath: offerFoodImagePath,
                category: offerFoodName,
                itemName: offerFoodSpecialIngredient,
                itemId: offerFoodId,
                price: offerFoodPrice,
              );
            },
          ),
        );
      },
      child: Padding(
        padding: const EdgeInsets.only(left: 15.0),
        child: Container(
          width: 140,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: Colors.black54,
          ),
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Center(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(12),
                      child: Image.network(
                        offerFoodImagePath,
                        //width: 125,
                        width: 80,
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Text(
                          offerFoodName,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 20.0,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Text(
                          offerFoodSpecialIngredient,
                          style: const TextStyle(
                            color: Colors.white70,
                            fontSize: 15.0,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Expanded(
                              flex: 2,
                              child: Text(
                                "Rs.$offerFoodPrice",
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 15.0,
                                ),
                              ),
                            ),
                            Expanded(
                              flex: 1,
                              child: Container(
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
  final String foodId;
  final int foodPrice;

  const FoodTile({Key? key,
    required this.foodImagePath,
    required this.foodName,
    required this.foodPrice,
    required this.foodSpecialIngredient,
    required this.foodId,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 15.0),
      child: Container(
        width: 140,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: Colors.black54,
        ),
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Center(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Image.network(
                      foodImagePath,
                      //width: 125,
                      width: 80,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Text(
                        foodName,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 20.0,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Text(
                        foodSpecialIngredient,
                        style: const TextStyle(
                          color: Colors.white70,
                          fontSize: 15.0,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Expanded(
                            flex: 2,
                            child: Text(
                              "Rs.$foodPrice",
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 15.0,
                              ),
                            ),
                          ),
                          Expanded(
                            flex: 1,
                            child: Container(
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

  @override
  Widget build(BuildContext context) {

    return Padding(
      padding: const EdgeInsets.only(left: 20.0),

      child: GestureDetector(
        onTap: onTap,
        child: Container(
          height: 20,
          width: 100,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
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

