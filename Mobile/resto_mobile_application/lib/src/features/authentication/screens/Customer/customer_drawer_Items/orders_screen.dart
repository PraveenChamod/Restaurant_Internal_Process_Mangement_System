import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../../common_widgets/background_image.dart';
import '../../../../../common_widgets/drawer_item_appbar.dart';
import '../../../../../common_widgets/main_order_container.dart';
import '../../../../../common_widgets/order_item_container.dart';
import '../../../../../constants/image_strings.dart';


class OrdersScreen extends StatelessWidget {
  OrdersScreen({Key? key}) : super(key: key);

  final List<OrderItems> data = [];

  //final List<FoodList> orderFoods = [];
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const DrawerItemAppbar(title: "Your Orders"),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            Center(
              child: FutureBuilder(
                future: fetchOrdersData(),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return ListView.builder(
                      scrollDirection: Axis.vertical,
                      itemCount: snapshot.data!.length,
                      itemBuilder: (context, index) {
                        return MainOrderContainer(
                          status: snapshot.data![index].status,
                          deliveryStatus: snapshot.data![index].deliveryStatus,
                          totalPrice: snapshot.data![index].totalPrice,
                          orderId: snapshot.data![index].orderId,
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

          ],
        ),
      ),
    );
  }

  Future<List<dynamic>> fetchOrdersData() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    print("In the fetchOrdersData() ${userToken!}");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Customer/Orders'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 201) {
      final ordersFoods = json.decode(response.body);
      return OrderItems.fromJsonList(ordersFoods['data']['customerorders']);
    } else {
      throw Exception('Failed to load data');
    }
  }
}

class OrderItems{
  final String orderId;
  final String status;
  final String deliveryStatus;
  final int totalPrice;

  OrderItems({
    required this.orderId,
    required this.status,
    required this.deliveryStatus,
    required this.totalPrice,
  });

  factory OrderItems.fromJson(Map<String, dynamic> json) {
    return OrderItems(
      orderId: json['OrderId'],
      status: json['Status'],
      deliveryStatus: json['DeliveryStatus'],
      totalPrice: json['TotalPrice'],
    );
  }
  static List<OrderItems> fromJsonList(dynamic jsonList){
    final cartItemsList = <OrderItems>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        cartItemsList.add(OrderItems.fromJson(json),);
      }
    }
    return cartItemsList;
  }
}
