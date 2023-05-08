import 'dart:async';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../../../../../common_widgets/background_image.dart';
import '../deliverer_complete_order.dart';
import '../deliverer_pickup_order.dart';

class DelivererMap extends StatefulWidget {
  final String orderId;
  final double lat;
  final double lang;
  final int totalPrice;
  final String paymentType;
  const DelivererMap(
      {Key? key,
        required this.orderId,
        required this.lat,
        required this.lang,
        required this.totalPrice,
        required this.paymentType})
      : super(key: key);

  @override
  State<DelivererMap> createState() => _DelivererMapState();
}

class _DelivererMapState extends State<DelivererMap> {
  @override
  void initState() {
    super.initState();
    destination = LatLng(widget.lat, widget.lang);
    Future.delayed(Duration(seconds: 2), () {
      getPolyPoints();
    });
  }

  final Completer<GoogleMapController> _controller = Completer();

  static const LatLng sourceLocation = LatLng(7.240865108809441, 80.2086201656721);

  static LatLng destination = const LatLng(0.0, 0.0);

  List<LatLng> polylineCoordinates = [];

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
        appBar: AppBar(
          foregroundColor: const Color(0xFFfebf10),
          elevation: 0,
          title: const Text('Find Your Destination'),
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
          leading: IconButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) {
                    return DelivererPickupOrder(
                      orderId: widget.orderId,
                    );
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
                  flex: 7,
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
                ),
                Expanded(
                  flex: 1,
                  child: Container(
                    color: Colors.black38,
                    child: Center(
                      child: Container(
                        width: 150,
                        height: 35,
                        padding: const EdgeInsets.only(left: 5, right: 5),
                        child: AnimatedButton(
                          text: "Complete Order",
                          buttonTextStyle: const TextStyle(
                            color: Colors.black,
                            fontSize: 16,
                            //fontWeight: FontWeight.bold,
                          ),
                          color: const Color(0xFFfebf10),
                          pressEvent: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (_){
                                  return DelivererCompleteOrder(
                                    orderId: widget.orderId,
                                    lat: widget.lat,
                                    lang: widget.lang,
                                    totalPrice: widget.totalPrice,
                                    paymentType: widget.paymentType,
                                  );
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
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
