import 'package:animated_icon_button/animated_icon_button.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class DateTableItemContainer extends StatelessWidget {
  final String imagePath;
  final int itemPrice;
  final String itemName;
  const DateTableItemContainer({Key? key,
    required this.imagePath,
    required this.itemPrice,
    required this.itemName}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 120,
      height: 210,
      margin: const EdgeInsets.only(bottom: 15.0, top: 0.0, left: 0.0, right: 0.0),
      padding: const EdgeInsets.all(10.0),
      decoration: BoxDecoration(
        color: Colors.black38,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(
          color: const Color(0xFFfebf10),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 4,
            child: Center(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.asset(
                  imagePath,
                  width: 90,
                ),
              ),
            ),
          ),
          Expanded(
            flex: 1,
            child: Text(
              itemName,
              style: const TextStyle(
                fontSize: 15,
                color: Color(0xFFfebf10),
              ),
            ),
          ),
          Expanded(
            flex: 1,
            child: Text(
              'Rs.$itemPrice',
              style: const TextStyle(
                fontSize: 15,
                color: Color(0xFFfebf10),
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Expanded(
                  child: Container(
                    color: Colors.transparent,
                    child: Center(
                      child: AnimatedIconButton(
                        onPressed: () {
                          //Do it here
                        },
                        duration: const Duration(milliseconds: 500),
                        icons: <AnimatedIconItem>[
                          AnimatedIconItem(
                            icon: const Icon(
                              Icons.add_circle,
                              color: Color(0xFFfebf10),
                              size: 28.0,
                            ),
                            onPressed: () {},
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Container(
                    color: Colors.transparent,
                    child: Center(
                      child: AnimatedIconButton(
                        onPressed: () {
                          //Do It Here
                        },
                        duration: const Duration(milliseconds: 500),
                        icons: <AnimatedIconItem>[
                          AnimatedIconItem(
                            icon: const Icon(
                              Icons.delete,
                              color: Colors.red,
                              size: 30.0,
                            ),
                            onPressed: () {},
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
