import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../common_widgets/background_image.dart';
import '../Products/product_cart.dart';

class DineInOrder extends StatefulWidget {
  final int choice;
  const DineInOrder({Key? key, required this.choice}) : super(key: key);

  @override
  State<DineInOrder> createState() => _DineInOrderState();
}

class _DineInOrderState extends State<DineInOrder> {
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
                    return ProductCart(choice: widget.choice,);
                  },
                ),
              );
            },
            icon: const Icon(Icons.chevron_left),
          ),
          title: const Text('Confirm Your Details'),
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
        ),
        body: Stack(
          children: const [
            BackgroundImage(),
          ],
        ),
      ),
    );
  }
}
