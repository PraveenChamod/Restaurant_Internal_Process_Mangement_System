import 'package:flutter/material.dart';

import 'image_strings.dart';

class MainFeatures extends StatefulWidget {
  const MainFeatures({
    Key? key,
    required this.text,
    required this.image
  }) : super(key: key);
  final String text, image;

  @override
  State<MainFeatures> createState() => _MainFeaturesState();
}

class _MainFeaturesState extends State<MainFeatures> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 8, left: 8),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        //color: Colors.amberAccent,
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
            width: 260,
            //height: 260,
            //height: 500,
          ),
          const Spacer(
            flex: 1,
          ),
          Text(widget.text,
            style: const TextStyle(
              fontSize: 20,
              color: Colors.white,
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

