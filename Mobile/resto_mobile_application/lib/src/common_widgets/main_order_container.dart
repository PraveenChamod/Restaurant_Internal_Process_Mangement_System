import 'dart:convert';
import 'package:location/location.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../constants/image_strings.dart';
import '../features/authentication/screens/customer/customer_order_details.dart';
import 'order_item_container.dart';

class MainOrderContainer extends StatefulWidget {
  final String status;
  final String deliveryStatus;
  final String orderId;
  final int totalPrice;
  const MainOrderContainer({Key? key,
    required this.status,
    required this.deliveryStatus,
    required this.totalPrice,
    required this.orderId
  }) : super(key: key);

  @override
  State<MainOrderContainer> createState() => _MainOrderContainerState();
}

class _MainOrderContainerState extends State<MainOrderContainer> {

  //For get permission for access the device's location
  final Location _location = Location();
  Future<PermissionStatus> _requestPermissions() async {
    final status = await _location.requestPermission();
    return status;
  }

  final List<OrderFood> data = [];

  late double lat = 0.0;
  late double lang = 0.0;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Container(
        decoration:  const BoxDecoration(
          color: Colors.black38,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(30),
            topRight: Radius.circular(30),
            bottomLeft: Radius.circular(30),
            bottomRight: Radius.circular(30),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Column(
            children: [
              const SizedBox(height: 5.0,),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  const Expanded(
                    child: Text(
                      'Received Status:',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  Expanded(
                    child: Text(
                      widget.status,
                      style: const TextStyle(
                        fontSize: 18,
                        color: Color(0xFFfebf10),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 5.0,),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  const Expanded(
                    child: Text(
                      'Delivery Status: ',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  Expanded(
                    child: Text(
                      widget.deliveryStatus,
                      style: const TextStyle(
                        fontSize: 18,
                        color: Color(0xFFfebf10),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 5.0,),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  const Expanded(
                    child: Text(
                      'Total Price: ',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  Expanded(
                    child: Text(
                      'Rs. ${widget.totalPrice}',
                      style: const TextStyle(
                        fontSize: 18,
                        color: Color(0xFFfebf10),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10.0,),
              SizedBox(
                height: 180,
                child: Center(
                  child: FutureBuilder(
                    future: fetchSpecificOrderData(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return ListView.builder(
                          scrollDirection: Axis.vertical,
                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, index) {
                            return OrderItemContainer(
                              foodQuantity: snapshot.data![index].qty,
                              foodName: snapshot.data![index].foodName,
                            );
                          },
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
              ),
              const SizedBox(height: 10.0,),
              Center(
                child: Container(
                  width: 150,
                  height: 35,
                  padding: const EdgeInsets.only(left: 5, right: 5),
                  child: AnimatedButton(
                    text: "Get Details",
                    buttonTextStyle: const TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                    color: const Color(0xFFfebf10),
                    pressEvent: () async {
                      final hasPermission = await _location.hasPermission();
                      if (hasPermission == PermissionStatus.denied) {
                        final permissionStatus = await _requestPermissions();
                        if (permissionStatus == PermissionStatus.granted) {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (_) {
                                return CustomerOrderDetails(
                                  orderId: widget.orderId,
                                  deliveryStatus: widget.deliveryStatus,
                                  lat: lat,
                                  lang: lang,
                                );
                              },
                            ),
                          );
                        }else{
                          awesomeDialog(DialogType.warning, 'You Need To Allow Permission To Access Device Location', "Warning");
                        }
                      } else if (hasPermission == PermissionStatus.granted) {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) {
                              return CustomerOrderDetails(
                                orderId: widget.orderId,
                                deliveryStatus: widget.deliveryStatus,
                                lat: lat,
                                lang: lang,
                              );
                            },
                          ),
                        );
                      }

                      // Navigator.of(context).push(
                      //   MaterialPageRoute(
                      //     builder: (_) {
                      //       return CustomerOrderDetails(
                      //         orderId: orderId,
                      //         deliveryStatus: deliveryStatus,
                      //         lat: lat,
                      //         lang: lang,
                      //       );
                      //     },
                      //   ),
                      // );
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
            ],
          ),
        ),
      ),
    );
  }

  awesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: (){},
    ).show();
  }

  Future<List<dynamic>> fetchSpecificOrderData() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/OrderFoods/${widget.orderId}'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final ordersFoods = json.decode(response.body);
      lat = ordersFoods['lat'];
      lang = ordersFoods['lang'];
      return OrderFood.fromJsonList(ordersFoods['data']['food']);
    } else {
      throw Exception('Failed to load data');
    }
  }
}
class OrderFood{
  final String foodName;
  final int qty;
  OrderFood({
    required this.foodName,
    required this.qty,
  });
  factory OrderFood.fromJson(Map<String, dynamic> json) {
    return OrderFood(
      foodName: json['FoodName'],
      qty: json['quantity'],
    );
  }
  static List<OrderFood> fromJsonList(dynamic jsonList){
    final cartOrderFoodList = <OrderFood>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        cartOrderFoodList.add(OrderFood.fromJson(json),);
      }
    }
    return cartOrderFoodList;
  }
}
