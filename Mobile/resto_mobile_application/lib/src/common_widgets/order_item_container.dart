import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class OrderItemContainer extends StatelessWidget {
  final int foodQuantity;
  final String foodName;
  const OrderItemContainer({Key? key,
    required this.foodQuantity,
    required this.foodName
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40,
      //color: Colors.black38,
      padding: const EdgeInsets.all(10.0),
      margin: const EdgeInsets.only(bottom: 5.0),
      decoration: BoxDecoration(
        color: Colors.black38,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: const Color(0xFFfebf10),
        ),
      ),
      child: Row(
        children: [
          Text(
            foodQuantity.toString(),
            style: const TextStyle(
              fontSize: 15,
              color: Color(0xFFfebf10),
            ),
          ),
          const SizedBox(width: 15.0,),
          Text(
            foodName,
            style: const TextStyle(
              fontSize: 15,
              color: Color(0xFFfebf10),
            ),
          ),
        ],
      ),
    );
  }
}
