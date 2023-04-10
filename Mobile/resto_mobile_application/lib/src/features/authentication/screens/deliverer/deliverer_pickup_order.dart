import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/order_item_container.dart';
import '../../../../constants/image_strings.dart';
import 'deliverer_drawer_items/deliverer_map.dart';
import 'deliverer_home.dart';
import 'package:location/location.dart';

class DelivererPickupOrder extends StatefulWidget {
  final String orderId;
  const DelivererPickupOrder({Key? key,
    required this.orderId
  }) : super(key: key);

  @override
  State<DelivererPickupOrder> createState() => _DelivererPickupOrderState();
}

class _DelivererPickupOrderState extends State<DelivererPickupOrder> {

  //For get permission for access the device's location
  final Location _location = Location();
  Future<PermissionStatus> _requestPermissions() async {
    final status = await _location.requestPermission();
    return status;
  }



  final List<OrderItems> data = [];

  late Future<Map<String, dynamic>> _futureData;
  @override
  void initState() {
    super.initState();
    _futureData = fetchCustomerData();
  }

  late num lat = 0.0;
  late num lang = 0.0;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          foregroundColor: const Color(0xFFfebf10),
          elevation: 0,
          title: const Text('Order Details'),
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
          leading: IconButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return const DelivererHome();
                  },
                ),
              );
            },
            icon: const Icon(Icons.chevron_left),
          ),
        ),
        backgroundColor: const Color(0xFF161b1d),
        body: Stack(
          children: [
            const BackgroundImage(),
            Column(
              children: [
                Expanded(
                  flex: 5,
                  child: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.black38,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: FutureBuilder(
                            future: _futureData,
                            builder: (context, snapshot){
                              if(snapshot.hasData){

                                final String name = snapshot.data!['customerName'];
                                final String number = snapshot.data!['ContactNumber'];
                                final String address = snapshot.data!['Address'];
                                final int price = snapshot.data!['TotalPrice'];
                                lat = snapshot.data!['lat'];
                                lang = snapshot.data!['lang'];

                                return Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text(
                                      'Customer Name: ',
                                      style: TextStyle(
                                        fontSize: 18,
                                        color: Colors.white,
                                      ),
                                    ),
                                    const SizedBox(height: 5.0,),
                                    Text(
                                      name,
                                      style: const TextStyle(
                                        fontSize: 15,
                                        color: Color(0xFFfebf10),
                                      ),
                                    ),
                                    const Divider(
                                      color: Color(0xFFfebf10),
                                    ),
                                    const Text(
                                      'Customer Contact Number:',
                                      style: TextStyle(
                                        fontSize: 18,
                                        color: Colors.white,
                                      ),
                                    ),
                                    const SizedBox(height: 5.0,),
                                    Text(
                                      number,
                                      style: const TextStyle(
                                        fontSize: 15,
                                        color: Color(0xFFfebf10),
                                      ),
                                    ),
                                    const Divider(
                                      color: Color(0xFFfebf10),
                                    ),
                                    const Text(
                                      'Customer Address:',
                                      style: TextStyle(
                                        fontSize: 20,
                                        color: Colors.white,
                                      ),
                                    ),
                                    const SizedBox(height: 5.0,),
                                    Text(
                                      address,
                                      style: const TextStyle(
                                        fontSize: 15,
                                        color: Color(0xFFfebf10),
                                      ),
                                    ),
                                    const Divider(
                                      color: Color(0xFFfebf10),
                                    ),
                                    const Text(
                                      'Total Price:',
                                      style: TextStyle(
                                        fontSize: 18,
                                        color: Colors.white,
                                      ),
                                    ),
                                    const SizedBox(height: 5.0,),
                                    Text(
                                      'Rs.$price',
                                      style: const TextStyle(
                                        fontSize: 15,
                                        color: Color(0xFFfebf10),
                                      ),
                                    ),
                                    const Divider(
                                      color: Color(0xFFfebf10),
                                    ),
                                    const Text(
                                      'Order Items:',
                                      style: TextStyle(
                                        fontSize: 18,
                                        color: Colors.white,
                                      ),
                                    ),
                                    const SizedBox(height: 15.0,),
                                    SizedBox(
                                      height: 180,
                                      child: Center(
                                        child: FutureBuilder(
                                          future: fetchOrderData(),
                                          builder: (context, snapshot) {
                                            if (snapshot.hasData) {
                                              return ListView.builder(
                                                scrollDirection: Axis.vertical,
                                                itemCount: snapshot.data!.length,
                                                itemBuilder: (context, index) {
                                                  return OrderItemContainer(
                                                    foodQuantity: snapshot.data![index].quantity,
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
                                  ],
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
                    ),
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Container(
                    color: Colors.black38,
                    child: Row(
                      children: [
                        Expanded(
                          child: Center(
                            child: Container(
                              width: 150,
                              height: 35,
                              padding: const EdgeInsets.only(left: 5, right: 5),
                              child: AnimatedButton(
                                text: "Show Map",
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
                                          builder: (_){
                                            return DelivererMap(
                                              orderId: widget.orderId,
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
                                        builder: (_){
                                          return DelivererMap(
                                            orderId: widget.orderId,
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
                                  topRight: Radius.circular(20),
                                  bottomLeft: Radius.circular(20),
                                  bottomRight: Radius.circular(20),
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
                                text: "Reject Order",
                                buttonTextStyle: const TextStyle(
                                  color: Colors.black,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                                color: const Color(0xFFfebf10),
                                pressEvent: () {
                                  Navigator.of(context).push(
                                    MaterialPageRoute(
                                      builder: (_){
                                        return const DelivererHome();
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
                        ),
                      ],
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
  Future<List<dynamic>> fetchOrderData() async {
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
      final cartFood = json.decode(response.body);
      print(cartFood);
      return OrderItems.fromJsonList(cartFood['data']['food']);
    } else {
      throw Exception('Failed to load data');
    }
  }

  Future<Map<String, dynamic>> fetchCustomerData() async {
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
      final cartFood = json.decode(response.body);
      print(cartFood);
      return cartFood;
    } else {
      throw Exception('Failed to load data');
    }
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
}

class OrderItems{
  final String foodName;
  final String? foodId;
  final String? offerId;
  final int quantity;
  OrderItems({
    required this.quantity,
    required this.foodId,
    required this.offerId,
    required this.foodName,
  });
  factory OrderItems.fromJson(Map<String, dynamic> json){
    return OrderItems(
        quantity: json['quantity'],
        foodId: json['Foodid'],
        offerId: json['Offerid'],
        foodName: json['FoodName']
    );
  }
  static List<OrderItems> fromJsonList(dynamic jsonList){
    final orderItemsList = <OrderItems>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        orderItemsList.add(OrderItems.fromJson(json),);
      }
    }
    return orderItemsList;
  }
}