import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../features/authentication/screens/Products/product_item_details.dart';

class FoodItemContainer extends StatelessWidget {
  final int choice;
  final String itemImagePath;
  final String itemName;
  final String itemCategory;
  final String itemId;
  final int itemPrice;
  const FoodItemContainer({Key? key,
    required this.itemImagePath,
    required this.itemName,
    required this.itemPrice,
    required this.itemCategory,
    required this.itemId,
    required this.choice,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).pop();
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              return ProductDetails(
                category: itemCategory,
                itemName: itemName,
                itemImagePath: itemImagePath,
                price: itemPrice,
                itemId: itemId, choice: choice,
              );
            },
          ),
        );
      },
      child: Container(
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
      ),
    );
  }
}
