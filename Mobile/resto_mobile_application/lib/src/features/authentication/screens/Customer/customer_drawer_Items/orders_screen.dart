import 'dart:convert';
import 'package:location/location.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../../common_widgets/background_image.dart';
import '../../../../../constants/image_strings.dart';
import '../customer_generate_QR.dart';
import '../customer_order_details.dart';

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({Key? key}) : super(key: key);

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  //For get permission for access the device's location
  final Location _location = Location();
  Future<PermissionStatus> _requestPermissions() async {
    final status = await _location.requestPermission();
    return status;
  }

  //final List<OrderFood> data = [];

  late double lat = 0.0;
  late double lang = 0.0;

  final List<OrderItems> data = [];

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
                    return Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Container(
                        decoration: const BoxDecoration(
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
                              const SizedBox(
                                height: 5.0,
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  const Expanded(
                                    child: Text(
                                      'Confirmation Status: ',
                                      style: TextStyle(
                                        fontSize: 18,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ),
                                  Expanded(
                                    child: Text(
                                      snapshot.data![index].status,
                                      style: const TextStyle(
                                        fontSize: 18,
                                        color: Color(0xFFfebf10),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(
                                height: 5.0,
                              ),
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
                                      snapshot.data![index].deliveryStatus,
                                      style: const TextStyle(
                                        fontSize: 18,
                                        color: Color(0xFFfebf10),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(
                                height: 5.0,
                              ),
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
                                      'Rs. ${snapshot.data![index].totalPrice}',
                                      style: const TextStyle(
                                        fontSize: 18,
                                        color: Color(0xFFfebf10),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(
                                height: 5.0,
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text(
                                    'Name:',
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Colors.white,
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5.0,
                                  ),
                                  Text(
                                    snapshot.data![index].customerName,
                                    style: const TextStyle(
                                      fontSize: 18,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5.0,
                                  ),
                                  const Text(
                                    'Address:',
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Colors.white,
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5.0,
                                  ),
                                  Text(
                                    snapshot.data![index].address,
                                    style: const TextStyle(
                                      fontSize: 18,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5.0,
                                  ),
                                  const Divider(
                                    color: Color(0xFFfebf10),
                                  ),
                                  const Text(
                                    'Order Summary',
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Colors.white,
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 10.0,
                                  ),
                                ],
                              ),
                              const SizedBox(
                                height: 10.0,
                              ),
                              Padding(
                                padding: const EdgeInsets.only(left: 50.0, right: 50.0),
                                child: SizedBox(
                                  height: 150,
                                  child: Center(
                                    child: ListView.builder(
                                      itemCount: snapshot.data![index].items.length,
                                      itemBuilder: (BuildContext context, int index) {
                                        return Padding(
                                          padding: const EdgeInsets.only(left: 10.0, right: 10.0,top: 2.0 ),
                                          child: Text(
                                            //snapshot.data![index].packageItems[index],
                                            snapshot.data![index].items[index].itemName,
                                            style: const TextStyle(
                                              color: Colors.white ,
                                              fontSize: 15.0,
                                            ),
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ),
                              ),




                              // Padding(
                              //   padding: const EdgeInsets.only(left: 50.0, right: 50.0),
                              //   child: SizedBox(
                              //     height: 150,
                              //     child: Center(
                              //       child: FutureBuilder(
                              //         future: fetchSpecificOrderData(),
                              //         builder: (context, snapshot) {
                              //           if (snapshot.hasData) {
                              //             return ListView.builder(
                              //               scrollDirection: Axis.vertical,
                              //               itemCount: snapshot.data!.length,
                              //               itemBuilder: (context, index) {
                              //                 return OrderItemContainer(
                              //                   foodQuantity: snapshot.data![index].qty,
                              //                   foodName: snapshot.data![index].foodName,
                              //                 );
                              //               },
                              //             );
                              //           }else if (snapshot.hasError) {
                              //             return Text('${snapshot.error}');
                              //           }
                              //           return const SizedBox(
                              //             height: 20,
                              //             width: 20,
                              //             child: Center(
                              //               child: CircularProgressIndicator(
                              //                 color: Color(0xFFfebf10),
                              //               ),
                              //             ),
                              //           );
                              //         },
                              //       ),
                              //     ),
                              //   ),
                              // ),
                              const SizedBox(
                                height: 10.0,
                              ),
                              snapshot.data![index].status == 'Confirm'
                                  ? Row(
                                      children: [
                                        Expanded(
                                          child: Center(
                                            child: Container(
                                              width: 150,
                                              height: 35,
                                              padding: const EdgeInsets.only(left: 5, right: 5),
                                              child: AnimatedButton(
                                                text: "Track Order",
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
                                                      Navigator.of(context).push(MaterialPageRoute(builder: (_) {
                                                            return CustomerOrderDetails(
                                                              orderId: snapshot.data![index].orderId,
                                                              deliveryStatus: snapshot.data![index].deliveryStatus,
                                                              lat: lat,
                                                              lang: lang,
                                                            );
                                                          },
                                                        ),
                                                      );
                                                    } else {
                                                      awesomeDialog(
                                                          DialogType.warning,
                                                          'You Need To Allow Permission To Access Device Location',
                                                          "Warning"
                                                      );
                                                    }
                                                  } else if (hasPermission == PermissionStatus.granted) {
                                                    Navigator.of(context).push(
                                                      MaterialPageRoute(
                                                        builder: (_) {
                                                          return CustomerOrderDetails(
                                                            orderId: snapshot.data![index].orderId,
                                                            deliveryStatus: snapshot.data![index].deliveryStatus,
                                                            lat: lat,
                                                            lang: lang,
                                                          );
                                                        },
                                                      ),
                                                    );
                                                  }
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
                                                text: "Generate QR",
                                                buttonTextStyle: const TextStyle(
                                                  color: Colors.black,
                                                  fontSize: 18,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                                color: const Color(0xFFfebf10),
                                                pressEvent: () async {
                                                  Navigator.of(context).push(
                                                    MaterialPageRoute(
                                                      builder: (_) {
                                                        return CustomerGenerateQR(
                                                          orderId: snapshot.data![index].orderId,
                                                          totalPrice: snapshot.data![index].totalPrice,
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
                                    )
                                  : Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Center(
                                          child: Container(
                                            width: 150,
                                            height: 35,
                                            padding: const EdgeInsets.only(left: 5, right: 5),
                                            child: AnimatedButton(
                                              text: "Remove Order",
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
                                                    Navigator.of(context).push(MaterialPageRoute(builder: (_) {
                                                          return CustomerOrderDetails(
                                                            orderId: snapshot.data![index].orderId,
                                                            deliveryStatus: snapshot.data![index].deliveryStatus,
                                                            lat: lat,
                                                            lang: lang,
                                                          );
                                                        },
                                                      ),
                                                    );
                                                  } else {
                                                    awesomeDialog(
                                                        DialogType.warning,
                                                        'You Need To Allow Permission To Access Device Location',
                                                        "Warning");
                                                  }
                                                } else if (hasPermission ==
                                                    PermissionStatus.granted) {
                                                  Navigator.of(context).push(MaterialPageRoute(builder: (_) {
                                                        return CustomerOrderDetails(
                                                          orderId: snapshot.data![index].orderId,
                                                          deliveryStatus: snapshot.data![index].deliveryStatus,
                                                          lat: lat,
                                                          lang: lang,
                                                        );
                                                      },
                                                    ),
                                                  );
                                                }
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
                            ],
                          ),
                        ),
                      ),
                    );
                    // return MainOrderContainer(
                    //   status: snapshot.data![index].status,
                    //   deliveryStatus: snapshot.data![index].deliveryStatus,
                    //   totalPrice: snapshot.data![index].totalPrice,
                    //   orderId: snapshot.data![index].orderId,
                    //   customerAddress: snapshot.data![index].address,
                    //   customerName: snapshot.data![index].customerName,
                    // );
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
}

class OrderItems {
  final String orderId;
  final String status;
  final String deliveryStatus;
  final int totalPrice;
  final String address;
  final String customerName;
  final List<OrderItemsData> items;

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
          .map((e) => OrderItemsData.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
  static List<OrderItems> fromJsonList(dynamic jsonList) {
    final cartItemsList = <OrderItems>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        cartItemsList.add(
          OrderItems.fromJson(json),
        );
      }
    }
    return cartItemsList;
  }
}

class OrderItemsData{
  final String itemName;
  final int itemCount;
  OrderItemsData({
    required this.itemName,
    required this.itemCount,
  });
  factory OrderItemsData.fromJson(Map<String, dynamic> json) => OrderItemsData(
    itemName: json['FoodName'],
    itemCount: json['quantity'],
  );
}
