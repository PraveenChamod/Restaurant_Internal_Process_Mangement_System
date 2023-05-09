import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../common_widgets/background_image.dart';
import '../../../../constants/image_strings.dart';
import 'deliverer_home__drawer.dart';
import 'deliverer_pickup_order.dart';


class DelivererHome extends StatefulWidget {
  const DelivererHome({Key? key}) : super(key: key);

  @override
  State<DelivererHome> createState() => _DelivererHomeState();
}

class _DelivererHomeState extends State<DelivererHome> {

  final List<PendingOrder> data = [];

  final List<OrderDataClass> dataList = [];

  String orderId = '';
  String customerName = '';
  String customerNumber = '';
  String customerAddress = '';
  double lat = 0.0;
  double lang = 0.0;
  num totalPrice = 0;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        drawer: const DelivererHomeDrawer(),
        appBar: AppBar(
          foregroundColor: const Color(0xFFfebf10),
          elevation: 0,
          title: const Text('Deliverer'),
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
        ),
        backgroundColor: const Color(0xFF161b1d),
        body: Stack(
          children: [
            const BackgroundImage(),
            SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Center(
                  child: Container(
                    padding: const EdgeInsets.all(20.0),
                    decoration: BoxDecoration(
                      color: Colors.black38,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: Column(
                        children: [
                          const Text(
                            'Pick Your Order To Deliver.',
                            style: TextStyle(
                              fontSize: 20,
                              color: Color(0xFFfebf10),
                            ),
                          ),
                          const Divider(
                            color: Color(0xFFfebf10),
                          ),
                          const SizedBox(height: 20.0,),
                          FutureBuilder(
                            future: getAssignedOrder(),
                            builder: (context, snapshot) {
                              if (snapshot.hasData) {
                                if (orderId == 'No'){
                                  return Container(
                                    decoration: BoxDecoration(
                                      color: Colors.black38,
                                      borderRadius: BorderRadius.circular(10),
                                      border: Border.all(
                                        color: const Color(0xFFfebf10), // set the border color here
                                        width: 1.0, // set the border width (optional)
                                      ),
                                    ),
                                    child: const Padding(
                                      padding: EdgeInsets.all(15.0),
                                      child: Text(
                                        'Currently, you do not assign to the order.!',
                                        style: TextStyle(
                                          fontSize: 18,
                                          color: Color(0xFFfebf10),
                                        ),
                                        textAlign: TextAlign.center,
                                      ),
                                    ),
                                  );
                                }else{
                                  return Container(
                                    decoration: BoxDecoration(
                                      color: Colors.black38,
                                      borderRadius: BorderRadius.circular(10),
                                      border: Border.all(
                                        color: const Color(0xFFfebf10), // set the border color here
                                        width: 1.0, // set the border width (optional)
                                      ),
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.all(10.0),
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          const Center(
                                            child: Text(
                                              'You Have Order To Deliver!',
                                              style: TextStyle(
                                                fontSize: 18,
                                                color: Colors.green,
                                              ),
                                              textAlign: TextAlign.center,
                                            ),
                                          ),
                                          const SizedBox(height: 10.0,),
                                          const Text(
                                            'Order Id:',
                                            style: TextStyle(
                                              fontSize: 18,
                                              color: Colors.white,
                                            ),
                                          ),
                                          const SizedBox(height: 5.0,),
                                          Text(
                                            orderId,
                                            style: const TextStyle(
                                              fontSize: 17,
                                              color: Color(0xFFfebf10),
                                            ),
                                          ),
                                          const SizedBox(height: 20.0,),
                                          Center(
                                            child: Container(
                                              width: 150,
                                              height: 35,
                                              padding: const EdgeInsets.only(left: 5, right: 5),
                                              child: AnimatedButton(
                                                text: "Check Order",
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
                                                        return DelivererPickupOrder(orderId: orderId,);
                                                      },
                                                    ),
                                                  );
                                                },
                                                borderRadius: const BorderRadius.only(
                                                  topLeft: Radius.circular(0),
                                                  topRight: Radius.circular(20),
                                                  bottomLeft: Radius.circular(20),
                                                  bottomRight: Radius.circular(20),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  );
                                }
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
                          const SizedBox(height: 20.0,),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
  Future<List<dynamic>> getAssignedOrder() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Deliverer/AssignOrder'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 201){
      if(jsonDecode(response.body)['yourOrderId'] == null){
        orderId = 'No';
      }else{
        orderId = jsonDecode(response.body)['yourOrderId'];
      }
      print('Your OrderID: $orderId');
      return PendingOrder.fromJsonList(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load data');
    }
  }

  Future<List<dynamic>> orderData() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/OrderFoods/$orderId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200){
      print(jsonDecode(response.body));
      return OrderDataClass.fromJsonList(jsonDecode(response.body));
    } else {
      throw Exception('Failed to load data');
    }
  }
}
class PendingOrder{
  final String orderId;
  PendingOrder({
    required this.orderId,
  });
  factory PendingOrder.fromJson(Map<String, dynamic> json){
    return PendingOrder(
      orderId: json['OrderId'],
    );
  }
  static List<PendingOrder> fromJsonList(dynamic jsonList){
    final pendingOrderList = <PendingOrder>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        pendingOrderList.add(PendingOrder.fromJson(json),);
      }
    }
    return pendingOrderList;
  }
}

class OrderDataClass{
  final String orderId;
  final String customerName;
  final String customerNumber;
  final String customerAddress;
  final double lat;
  final double lang;
  final num totalPrice;
  final String paymentMethod;
  OrderDataClass({
    required this.orderId,
    required this.customerName,
    required this.customerNumber,
    required this.customerAddress,
    required this.lat,
    required this.lang,
    required this.totalPrice,
    required this.paymentMethod,
  });
  factory OrderDataClass.fromJson(Map<String, dynamic> json){
    return OrderDataClass(
      orderId: json['OrderId'],
      customerName: json['customerName'],
      customerNumber: json['ContactNumber'],
      customerAddress: json['Address'],
      lat: json['lat'],
      lang: json['lang'],
      totalPrice: json['TotalPrice'],
      paymentMethod: json['PaymentMethod'],
    );
  }
  static List<OrderDataClass> fromJsonList(dynamic jsonList){
    final orderDataList = <OrderDataClass>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        orderDataList.add(OrderDataClass.fromJson(json),);
      }
    }
    return orderDataList;
  }
}
