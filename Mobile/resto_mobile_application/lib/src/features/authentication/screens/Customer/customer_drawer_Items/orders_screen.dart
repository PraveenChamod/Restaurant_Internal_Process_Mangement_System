import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../../common_widgets/background_image.dart';
import '../../../../../common_widgets/main_order_container.dart';
import '../../../../../constants/image_strings.dart';
import '../customer_main_page.dart';

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({Key? key}) : super(key: key);

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  final List<OrderItems> data = [];
  String orderId = '';

  @override
  Widget build(BuildContext context) {
    return Stack(
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
                    orderId = snapshot.data![index].orderId;
                    return MainOrderContainer(
                      status: snapshot.data![index].status,
                      deliveryStatus: snapshot.data![index].deliveryStatus,
                      totalPrice: snapshot.data![index].totalPrice,
                      orderId: snapshot.data![index].orderId,
                      customerAddress: snapshot.data![index].address,
                      customerName: snapshot.data![index].customerName,
                    );
                  },
                );
              } else if (snapshot.hasError) {
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
    );
  }

  awesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: () {},
    ).show();
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

  void removeOrder() async {
    showDialog(
      context: context,
      builder: (context){
        return const Center(
          child: CircularProgressIndicator(
            color: Color(0xFFfebf10),
          ),
        );
      },
    );
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.delete(
      Uri.parse('http://$hostName:5000/api/v1/Customer/Orders/$orderId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    Navigator.pop(context);
    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      successAwesomeDialog(DialogType.success, 'Successfully Cancel The Order', "Success");
    } else {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      unSuccessAwesomeDialog(DialogType.warning, msg, "Warning");
      throw Exception('Failed to load data');
    }
  }
  successAwesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_){
              return const CustomerMainPage(choice: 3,);
            },
          ),
        );
      },
    ).show();
  }
  unSuccessAwesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: () {},
    ).show();
  }
}

class OrderItems {
  final String orderId;
  final String status;
  final String deliveryStatus;
  final int totalPrice;
  final String address;
  final String customerName;
  final List<EventFoodItems> items;
  OrderItems({
    required this.orderId,
    required this.status,
    required this.deliveryStatus,
    required this.totalPrice,
    required this.address,
    required this.customerName,
    required this.items,
  });

  factory OrderItems.fromJson(Map<String, dynamic> json) {
    return OrderItems(
      orderId: json['OrderId'],
      status: json['Status'],
      deliveryStatus: json['DeliveryStatus'],
      totalPrice: json['TotalPrice'],
      address: json['Address'],
      customerName: json['Name'],
      items: (json['food'] as List<dynamic>)
          .map((e) => EventFoodItems.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
  static List<OrderItems> fromJsonList(dynamic jsonList) {
    final cartItemsList = <OrderItems>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        cartItemsList.add(OrderItems.fromJson(json),);
      }
    }
    return cartItemsList;
  }
}

class EventFoodItems{
  final String foodName;
  final int foodCount;
  EventFoodItems({
    required this.foodName,
    required this.foodCount,
  });
  factory EventFoodItems.fromJson(Map<String, dynamic> json) => EventFoodItems(
    foodName: json['FoodName'],
    foodCount: json['quantity'],
  );
}
