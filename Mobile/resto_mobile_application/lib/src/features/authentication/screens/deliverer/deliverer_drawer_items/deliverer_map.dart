import 'dart:async';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart';
import '../../../../../common_widgets/background_image.dart';
import '../deliverer_pickup_order.dart';

class DelivererMap extends StatefulWidget {
  final String orderId;
  final num lat;
  final num lang;
  const DelivererMap(
      {Key? key, required this.orderId, required this.lat, required this.lang})
      : super(key: key);

  @override
  State<DelivererMap> createState() => _DelivererMapState();
}

class _DelivererMapState extends State<DelivererMap> {
  final Completer<GoogleMapController> _controller = Completer();

  PolylinePoints polylinePoints = PolylinePoints();
  static const LatLng sourceLocation = LatLng(7.240865108809441, 80.2086201656721);
  static const LatLng destination = LatLng(7.247057922403666, 80.1627851082191);

  List<LatLng> polylineCoordinates = [];
  LocationData? currentLocation;

  Future<void> getCurrentLocation() async {
    Location location = Location();

    location.getLocation().then((location) {
        currentLocation = location;
      },
    );

    GoogleMapController googleMapController = await _controller.future;
    print('Current Location is here:');
    print(currentLocation);

    location.onLocationChanged.listen(
       (newLoc) {
         currentLocation = newLoc;
         googleMapController.animateCamera(
           CameraUpdate.newCameraPosition(
              CameraPosition(
                zoom: 12.5,
                target: LatLng(
                  newLoc.latitude!,
                  newLoc.longitude!,
                ),
              ),
           ),
         );
         setState(() {});
       },
    );
  }

  void getPolyPoints() async {
    PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
      "AIzaSyDZWsWFLf7CMyMGBymJSBIF_0RHrNZcj-E",
      PointLatLng(sourceLocation.latitude, sourceLocation.longitude),
      PointLatLng(destination.latitude, destination.longitude),
      travelMode: TravelMode.driving,
    );
    print('result.points is here:');
    print(result.points);

    if (result.points.isNotEmpty) {
      print('result.points.isNotEmpty');
      for (PointLatLng point in result.points) {
        polylineCoordinates.add(
          LatLng(point.latitude, point.longitude),
        );
      }
      setState(() {});
    }
  }

  @override
  void initState() {
    getCurrentLocation();
    getPolyPoints();
    super.initState();
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
            currentLocation == null
                ? const Center(
                  child: SizedBox(
                      height: 40,
                      width: 40,
                      child: Center(
                        child: CircularProgressIndicator(
                          color: Color(0xFFfebf10),
                        ),
                      ),
                    ),
                )
                : Column(
                    children: [
                      Expanded(
                        flex: 7,
                        child: GoogleMap(
                          initialCameraPosition: CameraPosition(
                            target: LatLng(
                              currentLocation!.latitude!,
                              currentLocation!.longitude!,
                            ),
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
                            Marker(
                              markerId: const MarkerId("currentLocation"),
                              position: LatLng(
                                currentLocation!.latitude!,
                                currentLocation!.longitude!,
                              ),
                            ),
                            const Marker(
                              markerId: MarkerId("source"),
                              position: sourceLocation,
                            ),
                            const Marker(
                              markerId: MarkerId("destination"),
                              position: destination,
                            ),
                          },
                          onMapCreated: (mapController){
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
                                text: "Completed",
                                buttonTextStyle: const TextStyle(
                                  color: Colors.black,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                                color: const Color(0xFFfebf10),
                                pressEvent: () {
                                  //getPolyPoints();
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
