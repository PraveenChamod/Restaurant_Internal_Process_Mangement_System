import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../constants/image_strings.dart';
import 'deliverer_drawer_items/deliverer_map.dart';
import 'package:http/http.dart' as http;

import 'deliverer_home.dart';
class DelivererCompleteOrder extends StatefulWidget {
  final String orderId;
  final double lat;
  final double lang;
  final int totalPrice;
  final String paymentType;
  const DelivererCompleteOrder(
      {Key? key,
      required this.orderId,
      required this.lat,
      required this.lang,
      required this.totalPrice,
      required this.paymentType})
      : super(key: key);

  @override
  State<DelivererCompleteOrder> createState() => _DelivererCompleteOrderState();
}

class _DelivererCompleteOrderState extends State<DelivererCompleteOrder> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  late QRViewController controller;
  String qrData = "";
  bool isScanning = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    controller.pauseCamera();
    controller.dispose();
    super.dispose();
  }

  var initialPasswordController = TextEditingController();
  var passwordController = TextEditingController();
  var confirmPasswordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          foregroundColor: const Color(0xFFfebf10),
          elevation: 0,
          title: const Text('Complete Order'),
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
          leading: IconButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) {
                    return DelivererMap(
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
            icon: const Icon(Icons.chevron_left),
          ),
        ),
        backgroundColor: const Color(0xFF161b1d),
        body: Stack(
          children: [
            const BackgroundImage(),
            Column(
              children: <Widget>[
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: QRView(
                      key: qrKey,
                      onQRViewCreated: _onQRViewCreated,
                      overlay: QrScannerOverlayShape(
                        borderColor: Colors.red,
                        borderRadius: 10,
                        borderLength: 30,
                        borderWidth: 10,
                        cutOutSize: MediaQuery.of(context).size.width * 0.7,
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: isScanning == false
                      ? const Center(
                          child: Text(
                            'Scanning...',
                            style: TextStyle(
                              fontSize: 20,
                              color: Color(0xFFfebf10),
                            ),
                          ),
                        )
                      : SingleChildScrollView(
                          child: widget.orderId == qrData
                              ? Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: Colors.black38,
                                      borderRadius: BorderRadius.circular(10),
                                      border: Border.all(
                                        color: const Color(0xFFfebf10),
                                      ),
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.all(15.0),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          const Center(
                                            child: Text(
                                              'Order details are perfectly matched!',
                                              style: TextStyle(
                                                fontSize: 20,
                                                color: Color(0xFFfebf10),
                                              ),
                                              textAlign: TextAlign.center,
                                            ),
                                          ),
                                          const Divider(
                                            color: Color(0xFFfebf10),
                                          ),
                                          const SizedBox(
                                            height: 15.0,
                                          ),
                                          const Center(
                                            child: Text(
                                              'Payment Details:',
                                              style: TextStyle(
                                                fontSize: 18,
                                                color: Colors.white,
                                              ),
                                            ),
                                          ),
                                          const SizedBox(
                                            height: 20.0,
                                          ),
                                          Text(
                                            'Total Price: Rs. ${widget.totalPrice}',
                                            style: const TextStyle(
                                              fontSize: 16,
                                              color: Color(0xFFfebf10),
                                            ),
                                          ),
                                          const SizedBox(
                                            height: 20.0,
                                          ),
                                          Text(
                                            widget.paymentType,
                                            style: const TextStyle(
                                              fontSize: 16,
                                              color: Color(0xFFfebf10),
                                            ),
                                          ),
                                          const SizedBox(
                                            height: 20.0,
                                          ),
                                          Center(
                                            child: Container(
                                              width: 150,
                                              height: 35,
                                              padding: const EdgeInsets.only(
                                                  left: 5, right: 5),
                                              child: AnimatedButton(
                                                text: "Confirm",
                                                buttonTextStyle:
                                                    const TextStyle(
                                                  color: Colors.black,
                                                  fontSize: 16,
                                                  //fontWeight: FontWeight.bold,
                                                ),
                                                color: const Color(0xFFfebf10),
                                                pressEvent: () {
                                                  confirmOrder();
                                                },
                                                borderRadius:
                                                    const BorderRadius.only(
                                                  topLeft: Radius.circular(0),
                                                  topRight: Radius.circular(20),
                                                  bottomLeft:
                                                      Radius.circular(20),
                                                  bottomRight:
                                                      Radius.circular(20),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                )
                              : Padding(
                                  padding: const EdgeInsets.all(20.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: Colors.black38,
                                      borderRadius: BorderRadius.circular(10),
                                      border: Border.all(
                                        color: const Color(0xFFfebf10),
                                      ),
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.all(15.0),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: const [
                                          Center(
                                            child: Text(
                                              'Scanned!',
                                              style: TextStyle(
                                                  fontSize: 18,
                                                  color: Colors.white),
                                              textAlign: TextAlign.center,
                                            ),
                                          ),
                                          SizedBox(
                                            height: 15.0,
                                          ),
                                          Center(
                                            child: Text(
                                              'Order information is mismatched! Please return the order to the restaurant!',
                                              style: TextStyle(
                                                fontSize: 15,
                                                color: Color(0xFFfebf10),
                                              ),
                                              textAlign: TextAlign.center,
                                            ),
                                          ),
                                        ],
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

  void _onQRViewCreated(QRViewController controller) {
    setState(() {
      this.controller = controller;
    });
    controller.scannedDataStream.listen((scanData) {
      setState(() {
        qrData = scanData.code!;
        isScanning = true;
      });
    });
  }
  void confirmOrder() async {
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
    final http.Response response = await http.post(
      Uri.parse("http://$hostName:5000/api/v1/Deliverer/ConfirmDelivery/${widget.orderId}"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    Navigator.pop(context);
    if(response.statusCode == 201) {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      awesomeDialog(DialogType.success, msg, "Success");
    }else{
      final json = jsonDecode(response.body);
      final msg = json["message"];
      unSuccessAwesomeDialog(DialogType.warning, msg, "Warning");
    }
  }
  awesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: (){
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              return const DelivererHome();
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
      btnOkOnPress: (){},
    ).show();
  }
}
