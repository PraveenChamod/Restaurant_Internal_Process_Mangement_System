import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/cart_item_container.dart';
import '../../../../constants/image_strings.dart';
import '../payments/delivery_online_order.dart';
import '../payments/dine_in_order.dart';

class CustomerCart extends StatefulWidget {
  final int choice;
  const CustomerCart({Key? key, required this.choice}) : super(key: key);
  @override
  State<CustomerCart> createState() => _CustomerCartState();
}
class _CustomerCartState extends State<CustomerCart> {
  late Future<Map<String, dynamic>> _futureData;
  @override
  void initState() {
    super.initState();
    _futureData = getUserDetails();
  }
  var nameController = TextEditingController();
  var customerIdController = TextEditingController();

  final List<CartItems> data = [];
  num totalCartPrice = 0;
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        const BackgroundImage(),
        Center(
          child: Column(
            children: [
              Expanded(
                flex: 6,
                child: Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: FutureBuilder(
                    future: fetchCartData(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return GridView.builder(
                          itemCount: snapshot.data!.length,
                          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 1,
                            mainAxisSpacing: 10,
                            mainAxisExtent: 140,
                          ),
                          itemBuilder: (BuildContext context, int index) {
                            if(snapshot.data![index].foodId != null){
                              return CartItemContainer(
                                cartItemImagePath: 'http://$hostName:5000/Foodimages/${snapshot.data![index].cartFoodImagePath}',
                                cartItemName: snapshot.data![index].cartFoodName,
                                cartItemQty: snapshot.data![index].quantity,
                                totalPrice: snapshot.data![index].totalPrice,
                                cartId: snapshot.data![index].cartId,
                                cartItemId: snapshot.data![index].foodId,
                                choice: widget.choice,
                                cartItemType: 'food',
                              );
                            }else{
                              return CartItemContainer(
                                cartItemImagePath: 'http://$hostName:5000/offerimages/${snapshot.data![index].cartFoodImagePath}',
                                cartItemName: snapshot.data![index].cartFoodName,
                                cartItemQty: snapshot.data![index].quantity,
                                totalPrice: snapshot.data![index].totalPrice,
                                cartId: snapshot.data![index].cartId,
                                cartItemId: snapshot.data![index].offerId,
                                choice: widget.choice,
                                cartItemType: 'offer',
                              );
                            }
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
              Expanded(
                flex: 1,
                child: Container(
                  color: Colors.black38,
                  child: Column(
                    children: [
                      const Spacer(),
                      FutureBuilder(
                        future: fetchCartData(),
                        builder: (context, snapshot){
                          if (snapshot.hasData) {
                            for (int i = 0; i < snapshot.data!.length; i++) {
                              totalCartPrice += snapshot.data![i].totalPrice;
                            }
                            return Center(
                              child: Text('Total Price: Rs.$totalCartPrice',
                                style: const TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Color(0xFFfebf10),
                                ),
                              ),
                            );
                          }else if (snapshot.hasError) {
                            return Text('${snapshot.error}');
                          }
                          return const SizedBox(
                            height: 20,
                            width: 20,
                            child: Center(
                              child: CircularProgressIndicator(
                                color: Color(0xFFfebf10),
                              ),
                            ),
                          );
                        },
                      ),
                      FutureBuilder(
                          future: _futureData,
                          builder: (context, snapshot) {
                            if(snapshot.hasData){
                              final String userName = snapshot.data!['user']['Name'];
                              final String userId = snapshot.data!['user']['id'];
                              nameController = TextEditingController(text: userName);
                              customerIdController = TextEditingController(text: userId);
                              return const Spacer();
                            }else if (snapshot.hasError) {
                              return Text('${snapshot.error}');
                            }
                            return const SizedBox(
                              height: 1,
                              width: 1,
                              child: Center(
                                child: CircularProgressIndicator(
                                  color: Colors.transparent,
                                ),
                              ),
                            );
                          }
                      ),
                      Row(
                        children: [
                          Expanded(
                            child: Center(
                              child: Container(
                                width: 150,
                                height: 35,
                                padding: const EdgeInsets.only(left: 5, right: 5),
                                child: AnimatedButton(
                                  text: "Online Order",
                                  buttonTextStyle: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  color: const Color(0xFFfebf10),
                                  pressEvent: () {
                                    Navigator.of(context).push(
                                      MaterialPageRoute(
                                        builder: (_) {
                                          return DeliveryOnlineOrder(totalPrice: totalCartPrice, choice: 2,);
                                        },
                                      ),
                                    );
                                  },
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
                          Expanded(
                            child: Center(
                              child: Container(
                                width: 150,
                                height: 35,
                                padding: const EdgeInsets.only(left: 5, right: 5),
                                child: AnimatedButton(
                                  text: "Outlet Dine In",
                                  buttonTextStyle: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  color: const Color(0xFFfebf10),
                                  pressEvent: () {
                                    Navigator.of(context).push(
                                      MaterialPageRoute(
                                        builder: (_) {
                                          return DineInOrder(
                                            choice: 1,
                                            totalPrice: totalCartPrice,
                                            customerId: customerIdController.text,
                                            customerName: nameController.text,
                                          );
                                        },
                                      ),
                                    );
                                  },
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
                        ],
                      ),
                      const Spacer(),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
  Future<List<dynamic>> fetchCartData() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    print("In the fetchdata() ${userToken!}");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/CartItems'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final cartFood = json.decode(response.body);
      print(cartFood);
      return CartItems.fromJsonList(cartFood);
    } else {
      throw Exception('Failed to load data');
    }
  }
  Future<Map<String, dynamic>> getUserDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    print("In the getUserDetails() ${userToken!}");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Auth/Profile'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 201) {
      print(jsonDecode(response.body));
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load data');
    }
  }
}
class CartItems{
  final String cartFoodImagePath;
  final String cartFoodName;
  final String cartId;
  final String? foodId;
  final String? offerId;
  final int quantity;
  final int totalPrice;
  CartItems({
    required this.cartFoodImagePath,
    required this.cartFoodName,
    required this.totalPrice,
    required this.quantity,
    required this.cartId,
    required this.foodId,
    required this.offerId,
  });
  factory CartItems.fromJson(Map<String, dynamic> json){
    return CartItems(
      cartFoodImagePath: json['image'],
      cartFoodName: json['name'],
      totalPrice: json['TotalPrice'],
      quantity: json['quantity'],
      cartId: json['cartId'],
      foodId: json['Foodid'],
      offerId: json['Offerid'],
    );
  }
  static List<CartItems> fromJsonList(dynamic jsonList){
    final cartItemsList = <CartItems>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        cartItemsList.add(CartItems.fromJson(json),);
      }
    }
    return cartItemsList;
  }
}
