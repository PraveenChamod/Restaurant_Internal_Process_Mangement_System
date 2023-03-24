import 'package:flutter/material.dart';

import '../features/authentication/screens/Products/product_items.dart';

class MenuContainer extends StatelessWidget {
  final String itemImagePath;
  final String itemName;
  const MenuContainer({Key? key,
    required this.itemImagePath,
    required this.itemName,
  }) :super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).pop();
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              return ProductItems(category: itemName,);
            },
          ),
        );
      },
      child: Container(
        width: 100,
        height: 100,
        padding: const EdgeInsets.all(10.0),
        decoration: BoxDecoration(
          color: Colors.black38,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          children: [
            const Spacer(),
            Center(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.network(
                  itemImagePath,
                  width: 90,
                ),
              ),
            ),
            const Spacer(),
            Text(
              itemName,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 17.0,
              ),
            ),
            const Spacer(),
            const Icon(
              Icons.arrow_circle_right,
              color: Color(0xFFfebf10),
              size: 24.0,
            ),
            const Spacer(),
          ],
        ),
      ),
    );
  }
}
