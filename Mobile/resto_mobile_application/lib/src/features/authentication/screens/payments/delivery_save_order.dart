import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../common_widgets/background_image.dart';
import 'delivery_online_order.dart';

class DeliverySaveOrder extends StatefulWidget {
  const DeliverySaveOrder({Key? key}) : super(key: key);

  @override
  State<DeliverySaveOrder> createState() => _DeliverySaveOrderState();
}

class _DeliverySaveOrderState extends State<DeliverySaveOrder> {
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
                  builder: (_){
                    return const DeliveryOnlineOrder();
                  },
                ),
              );
            },
            icon: const Icon(Icons.chevron_left),
          ),
          title: const Text('Checkout'),
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
        ),
        body: Stack(
          children: [
            const BackgroundImage(),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  flex: 4,
                  child: Container(
                    color: Colors.black38,
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Column(
                        //crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: const [
                                Expanded(
                                  child: Text(
                                    'Payment Method:',
                                    style: TextStyle(
                                      fontSize: 22,
                                      color: Colors.white70,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  child: Text(
                                    'Cash On Delivery',
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                ),
                                Divider(
                                  color: Color(0xFFfebf10),
                                ),
                              ],
                            ),
                          ),
                          Expanded(
                            flex: 2,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: const [
                                Expanded(
                                  child: Text(
                                    'Deliver To',
                                    style: TextStyle(
                                      fontSize: 22,
                                      color: Colors.white70,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  flex: 2,
                                  child: Text(
                                    'No. 187/1, Bothale Pahalagamaa, Temple Road, Ambepussa',
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                ),
                                Divider(
                                  color: Color(0xFFfebf10),
                                ),
                              ],
                            ),
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: const [
                                Expanded(
                                  child: Text(
                                    'Total Price:',
                                    style: TextStyle(
                                      fontSize: 22,
                                      color: Colors.white70,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  child: Text(
                                    'Cash On Delivery',
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                ),
                                Divider(
                                  color: Color(0xFFfebf10),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: Center(
                    child: Container(
                      width: 150,
                      height: 35,
                      padding: const EdgeInsets.only(left: 5, right: 5),
                      child: AnimatedButton(
                        text: "Place Order",
                        buttonTextStyle: const TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                        color: const Color(0xFFfebf10),
                        pressEvent: () {},
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
            ),
          ],
        ),
      ),
    );
  }
}
