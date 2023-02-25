import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class MenuContainer extends StatelessWidget {
  final String ItemImagePath;
  final String ItemName;
  const MenuContainer({Key? key,
    required this.ItemImagePath,
    required this.ItemName,
  }) :super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      //height: 20,
      //width: MediaQuery.of(context).size.width/2.35,
      //height: MediaQuery.of(context).size.height/2,
      width: 100,
      height: 100,
      padding: const EdgeInsets.all(10.0),
      decoration: BoxDecoration(
        //color: const Color(0xFF1b1b1d),
        color: Colors.black38,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          Center(
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.asset(
                ItemImagePath,
                width: 100,
              ),
            ),
          ),
          const Spacer(),
          Text(
            ItemName,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 17.0,
            ),
          ),
        ],
      ),
    );
  }
}
