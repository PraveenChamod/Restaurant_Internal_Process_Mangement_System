import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../constants/image_strings.dart';
import 'delivery_online_order.dart';
class DeliverySaveOrder extends StatefulWidget {
  final String paymentMethod;
  final String address;
  final num totalPrice;

  const DeliverySaveOrder({Key? key,
    required this.paymentMethod,
    required this.address,
    required this.totalPrice
  }) : super(key: key);

  @override
  State<DeliverySaveOrder> createState() => _DeliverySaveOrderState();
}

class _DeliverySaveOrderState extends State<DeliverySaveOrder> {

  List<FoodList> orderFoods = [];
  List<CartItems> data = [];

  @override
  Widget build(BuildContext context) {
    return SafeArea(
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
                    return DeliveryOnlineOrder(totalPrice: widget.totalPrice,);
                  },
                ),
              );
            },
            icon: const Icon(Icons.chevron_left),
          ),
          title: const Text('Checkout'),
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
        ),
        body: Stack(
          children: [
            const BackgroundImage(),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  flex: 4,
                  child: Container(
                    color: Colors.black38,
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Column(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Divider(
                                  color: Color(0xFFfebf10),
                                ),
                                const Expanded(
                                  child: Text(
                                    'Payment Method:',
                                    style: TextStyle(
                                      fontSize: 22,
                                      color: Colors.white70,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  child: Text(
                                    widget.paymentMethod,
                                    style: const TextStyle(
                                      fontSize: 18,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                ),
                                const Divider(
                                  color: Color(0xFFfebf10),
                                ),
                              ],
                            ),
                          ),
                          Expanded(
                            flex: 2,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Expanded(
                                  child: Text(
                                    'Deliver To',
                                    style: TextStyle(
                                      fontSize: 22,
                                      color: Colors.white70,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  flex: 2,
                                  child: Text(
                                    widget.address,
                                    style: const TextStyle(
                                      fontSize: 18,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                ),
                                const Divider(
                                  color: Color(0xFFfebf10),
                                ),
                              ],
                            ),
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Expanded(
                                  child: Text(
                                    'Total Price:',
                                    style: TextStyle(
                                      fontSize: 22,
                                      color: Colors.white70,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  child: Text(
                                    "Rs. ${widget.totalPrice}",
                                    style: const TextStyle(
                                      fontSize: 18,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                ),
                                Center(
                                  child: FutureBuilder(
                                    future: fetchOrderData(),
                                    builder: (context, snapshot){
                                      if (snapshot.hasData) {
                                        for (int i = 0; i < snapshot.data!.length; i++) {
                                          orderFoods.add(FoodList(foodId: snapshot.data![i].foodId, qty: snapshot.data![i].quantity));
                                        }
                                        return const Divider(
                                          color: Color(0xFFfebf10),
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
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: Center(
                    child: Container(
                      width: 150,
                      height: 35,
                      padding: const EdgeInsets.only(left: 5, right: 5),
                      child: AnimatedButton(
                        text: "Place Order",
                        buttonTextStyle: const TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                        color: const Color(0xFFfebf10),
                        pressEvent: () {
                          orderItems(orderFoods, widget.paymentMethod, widget.totalPrice, 'Outlet Order');
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
          ],
        ),
      ),
    );
  }
  void orderItems(List<FoodList> foods, String paymentMethod, num totalPrice, String type) async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final http.Response response = await http.post(
      Uri.parse("http://$hostName:5000/api/v1/OrderItem"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "Foods":foods,
        "paymentMethod":paymentMethod,
        "TotalPrice":totalPrice,
        "Type":type
      }),
    );
    if(response.statusCode == 201) {
      final json = jsonDecode(response.body);
      final orderDetails = json["data"];
      final msg = json["message"];
      print(msg);
      print(orderDetails);
      //awesomeDialog(DialogType.success, msg, "Success");//Successfully User registered.
    }else{
      final json = jsonDecode(response.body);
      final msg = json["message"];
      print("Order Unsuccuessfull");
      //awesomeDialog(DialogType.warning, msg, "Warning");//Unsuccessfully User registered.
    }
  }
  //For get order data
  Future<List<dynamic>> fetchOrderData() async {
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
}
//For get orderlist data
class CartItems{
  final String foodId;
  final int quantity;
  CartItems({
    required this.quantity,
    required this.foodId,
  });
  factory CartItems.fromJson(Map<String, dynamic> json){
    return CartItems(
      quantity: json['quantity'],
      foodId: json['id'],
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
class FoodList {
  final String foodId;
  final int qty;
  FoodList({required this.foodId, required this.qty});

  Map<String, dynamic> toJson() => {
    'food': foodId,
    'Quantity': qty,
  };
}



