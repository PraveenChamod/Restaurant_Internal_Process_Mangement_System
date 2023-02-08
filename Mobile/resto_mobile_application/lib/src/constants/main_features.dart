import 'package:flutter/material.dart';

class MainFeatures extends StatelessWidget {
  const MainFeatures({
    Key? key,
    required this.text,
    required this.image
  }) : super(key: key);
  final String text, image;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        const Spacer(),

        Image(
          image: AssetImage(image),
          //width: 275,
          height: 280,
          //height: 500,
        ),
        Text(text,
          style: const TextStyle(
            fontSize: 20,
            color: Colors.white,
          ),
        ),
      ],
    );
  }
}