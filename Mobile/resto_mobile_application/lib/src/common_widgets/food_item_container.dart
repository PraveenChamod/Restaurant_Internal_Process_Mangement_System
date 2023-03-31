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
          children: [
            Expanded(
              flex: 1,
              child: Center(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.network(
                    itemImagePath,
                    width: 100,
                  ),
                ),
              ),
            ),
            Expanded(
              flex: 2,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Expanded(
                    child: Text(
                      itemName,
                      style: const TextStyle(
                        color: Color(0xFFfebf10),
                        fontSize: 20.0,
                      ),
                    ),
                  ),
                  Expanded(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        const Spacer(),
                        Expanded(
                          flex: 2,
                          child: Text(
                            "Rs.$itemPrice",
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 18.0,
                            ),
                          ),
                        ),
                        Expanded(
                          flex: 1,
                          child: Container(
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
                        ),
                      ],
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
