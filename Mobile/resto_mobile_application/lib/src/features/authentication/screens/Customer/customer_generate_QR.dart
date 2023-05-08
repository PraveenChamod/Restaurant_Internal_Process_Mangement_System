import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../../../../common_widgets/background_image.dart';
import 'customer_main_page.dart';

class CustomerGenerateQR extends StatefulWidget {
  final String orderId;
  final int totalPrice;
  const CustomerGenerateQR({Key? key,
    required this.orderId, required this.totalPrice,
  }) : super(key: key);

  @override
  State<CustomerGenerateQR> createState() => _CustomerGenerateQRState();
}

class _CustomerGenerateQRState extends State<CustomerGenerateQR> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: AppBar(
          foregroundColor: const Color(0xFFfebf10),
          elevation: 0,
          title: const Text('QR Code'),
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
            Padding(
              padding: const EdgeInsets.all(40.0),
              child: Column(
                children: [
                  Center(
                    child: QrImage(
                      data: "${widget.orderId}",
                      version: QrVersions.auto,
                      foregroundColor: Colors.black,
                      backgroundColor: Colors.white,
                    ),
                  ),
                  const SizedBox(
                    height: 20.0,
                  ),
                  Center(
                    child: Container(
                      decoration: BoxDecoration(
                        color: Colors.black38,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: const Color(0xFFfebf10),
                        ),
                      ),
                      child: const Padding(
                        padding: EdgeInsets.all(15.0),
                        child: Text(
                          'This QR Code ensure that received correct order from deliverer!',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Color(0xFFfebf10),
                            fontSize: 15.0,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
