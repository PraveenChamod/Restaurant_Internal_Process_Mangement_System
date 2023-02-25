import 'package:flutter/material.dart';

import 'image_strings.dart';

class MainFeatures extends StatefulWidget {
  const MainFeatures({
    Key? key,
    required this.title,
    required this.text,
    required this.image
  }) : super(key: key);
  final String title, text, image;

  @override
  State<MainFeatures> createState() => _MainFeaturesState();
}

class _MainFeaturesState extends State<MainFeatures> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 20, left: 20),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.black38,
        border: Border.all(
          color: const Color(0xFFfebf10),
        ),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: <Widget>[
          const Spacer(
            flex: 1,
          ),
          Image(
            image: AssetImage(widget.image),
            width: 130,
          ),
          const Spacer(
            flex: 1,
          ),
          Text(widget.title,
            style: const TextStyle(
              fontSize: 20,
              color: Colors.white,
            ),
          ),
          Text(widget.text,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 15,
              color: Colors.white70,
            ),
          ),
          const Spacer(
            flex: 1,
          ),
        ],
      ),
    );
  }
}

