import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/order_item_container.dart';
import '../../../../constants/image_strings.dart';
import 'customer_drawer_Items/orders_screen.dart';
import 'customer_main_page.dart';

class CustomerOrderDetails extends StatefulWidget {
  final String deliveryStatus;
  final String orderId;
  final double lat;
  final double lang;
  const CustomerOrderDetails({
    Key? key,
    required this.orderId,
    required this.deliveryStatus,
    required this.lat,
    required this.lang,
  }) : super(key: key);

  @override
  State<CustomerOrderDetails> createState() => _CustomerOrderDetailsState();
}

class _CustomerOrderDetailsState extends State<CustomerOrderDetails> {
  @override
  void initState() {
    super.initState();
    destination = LatLng(widget.lat, widget.lang);
    Future.delayed(const Duration(seconds: 2), () {
      getPolyPoints();
    });
  }

  final Completer<GoogleMapController> _controller = Completer();

  static const LatLng sourceLocation = LatLng(7.240865108809441, 80.2086201656721);//Perera & Sons in Ambepussa as a restaurant

  //static const LatLng sourceLocation = LatLng(5.939840972427677, 80.57604608201353);//University as a Restaurant

  static LatLng destination = const LatLng(0.0, 0.0);

  List<LatLng> polylineCoordinates = [];

  final List<OrderFoodDetails> data = [];
  final List<OrderFood> foodData = [];
  String userName = '';
  String userAddress = '';

  void getPolyPoints() async {
    PolylinePoints polylinePoints = PolylinePoints();
    PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
      "AIzaSyDZWsWFLf7CMyMGBymJSBIF_0RHrNZcj-E",
      PointLatLng(sourceLocation.latitude, sourceLocation.longitude),
      PointLatLng(destination.latitude, destination.longitude),
    );
    if (result.points.isNotEmpty) {
      for (PointLatLng point in result.points) {
        polylineCoordinates.add(
          LatLng(point.latitude, point.longitude),
        );
      }
      setState(() {});
    }
  }

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
                  builder: (_) {
                    return OrdersScreen();
                  },
                ),
              );
            },
            icon: const Icon(Icons.chevron_left),
          ),
          title: const Text('Your Order'),
          actions: <Widget>[
            Padding(
              padding: const EdgeInsets.only(right: 20.0),
              child: IconButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_) {
                        return const CustomerMainPage(
                          choice: 2,
                        );
                      },
                    ),
                  );
                },
                icon: const Icon(Icons.home),
              ),
            ),
          ],
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
        ),
        body: Stack(
          children: [
            const BackgroundImage(),
            Column(
              children: [
                Expanded(
                  flex: 1,
                  child: Padding(
                    padding: const EdgeInsets.only(left: 15.0, top: 5.0, right: 15.0, bottom: 5.0),
                    child: Center(
                      child: Container(
                        width: MediaQuery.of(context).size.width,
                        padding: const EdgeInsets.all(15.0),
                        decoration: BoxDecoration(
                          color: Colors.black38,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: widget.deliveryStatus == 'Not Delivered'
                            ? const Text(
                                'Your Order Is On The way',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Color(0xFFfebf10),
                                ),
                              )
                            : const Text(
                                'Your Order Is Delivered. Enjoy',
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Color(0xFFfebf10),
                                ),
                              ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  flex: 5,
                  child: Container(
                    padding: const EdgeInsets.only(left: 15.0, top: 0.0, right: 15.0, bottom: 10.0),
                    child: widget.deliveryStatus == 'Not Delivered'
                        ? Container(
                            decoration: const BoxDecoration(
                              color: Colors.transparent,
                            ),
                            child: GoogleMap(
                              initialCameraPosition: const CameraPosition(
                                target: sourceLocation,
                                zoom: 12.5,
                              ),
                              myLocationEnabled: true,
                              polylines: {
                                Polyline(
                                  polylineId: const PolylineId("route"),
                                  points: polylineCoordinates,
                                  color: Colors.red,
                                  width: 5,
                                ),
                              },
                              markers: {
                                const Marker(
                                  markerId: MarkerId("source"),
                                  position: sourceLocation,
                                ),
                                Marker(
                                  markerId: const MarkerId("destination"),
                                  position: destination,
                                ),
                              },
                              onMapCreated: (mapController) {
                                _controller.complete(mapController);
                              },
                            ),
                          )
                        : Container(
                            decoration: const BoxDecoration(
                              color: Colors.transparent,
                              image: DecorationImage(
                                image: AssetImage(deliveredImage),
                                fit: BoxFit.cover,
                              ),
                            ),
                            child: null,
                          ),
                  ),
                ),
                Expanded(
                  flex: 3,
                  child: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Container(
                        height: 480,
                        padding: const EdgeInsets.all(15.0),
                        decoration: BoxDecoration(
                          color: Colors.black38,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 5.0,),
                            const Text(
                              'Delivery Details',
                              style: TextStyle(
                                fontSize: 20,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 5.0,),
                            Center(
                              child: FutureBuilder(
                                future: fetchSpecificOrderDetails(),
                                builder: (context, snapshot) {
                                  if (snapshot.hasData) {
                                    userName = snapshot.data![0].userName;
                                    userAddress = snapshot.data![0].userAddress;
                                    return Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'Name:',
                                          style: TextStyle(
                                            fontSize: 18,
                                            color: Colors.white70,
                                          ),
                                        ),
                                        const SizedBox(height: 5.0,),
                                        Text(
                                          userName,
                                          style: const TextStyle(
                                            fontSize: 16,
                                            color: Color(0xFFfebf10),
                                          ),
                                        ),
                                        const SizedBox(height: 5.0,),
                                        const Text(
                                          'Address:',
                                          style: TextStyle(
                                            fontSize: 18,
                                            color: Colors.white70,
                                          ),
                                        ),
                                        const SizedBox(height: 5.0,),
                                        Text(
                                          userAddress,
                                          style: const TextStyle(
                                            fontSize: 16,
                                            color: Color(0xFFfebf10),
                                          ),
                                        ),
                                      ],
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
                            const SizedBox(height: 5.0,),
                            const Divider(
                              color: Color(0xFFfebf10),
                            ),
                            const SizedBox(height: 10.0,),
                            const Text(
                              'Order Summary',
                              style: TextStyle(
                                fontSize: 20,
                                color: Colors.white,
                              ),
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
                          ],
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

  Future<List<dynamic>> fetchSpecificOrderDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Order/${widget.orderId}'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final orderDetails = json.decode(response.body);
      return OrderFoodDetails.fromJsonList(
          orderDetails['data']['pendingOrders']);
    } else {
      throw Exception('Failed to load data');
    }
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
      return OrderFood.fromJsonList(ordersFoods['data']['food']);
    } else {
      throw Exception('Failed to load data');
    }
  }
}

class OrderFoodDetails {
  final String userName;
  final String userAddress;
  OrderFoodDetails({
    required this.userName,
    required this.userAddress,
  });
  factory OrderFoodDetails.fromJson(Map<String, dynamic> json) {
    return OrderFoodDetails(
      userName: json['customerName'],
      userAddress: json['Address'],
    );
  }
  static List<OrderFoodDetails> fromJsonList(dynamic jsonList) {
    final cartOrderFoodDetailsList = <OrderFoodDetails>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        cartOrderFoodDetailsList.add(
          OrderFoodDetails.fromJson(json),
        );
      }
    }
    return cartOrderFoodDetailsList;
  }
}

class OrderFood {
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
  static List<OrderFood> fromJsonList(dynamic jsonList) {
    final cartOrderFoodList = <OrderFood>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        cartOrderFoodList.add(
          OrderFood.fromJson(json),
        );
      }
    }
    return cartOrderFoodList;
  }
}
