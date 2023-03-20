import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class FoodItemContainer extends StatelessWidget {
  final String itemImagePath;
  final String itemName;
  final int itemPrice;
  const FoodItemContainer({Key? key,
    required this.itemImagePath,
    required this.itemName,
    required this.itemPrice
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10.0),
      decoration: BoxDecoration(
        color: Colors.black38,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 5.0,),
          Center(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.network(
                itemImagePath,
                width: 80,
              ),
            ),
          ),
          const Spacer(),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              const Spacer(),
              Text(
                itemName,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 20.0,
                ),
              ),
              const Spacer(),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                      "Rs.$itemPrice",
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 15.0,
                      ),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: const Color(0xFFfebf10),
                      borderRadius: BorderRadius.circular(6.0),
                    ),
                    child: const Icon(
                      Icons.add,
                      color: Colors.black,
                    ),
                  ),
                ],
              ),
              const Spacer(),
            ],
          ),
        ],
      ),
    );
  }
}
