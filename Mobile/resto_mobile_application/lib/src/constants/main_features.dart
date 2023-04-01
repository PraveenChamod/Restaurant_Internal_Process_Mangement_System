import 'package:flutter/material.dart';

import '../features/authentication/screens/Products/products_menu_categories.dart';
import '../features/authentication/screens/forget_password/make_selction.dart';
import '../features/authentication/screens/login_screen.dart';
import '../features/authentication/screens/signup_screen.dart';
import '../features/authentication/screens/splash_screen.dart';
import '../features/authentication/screens/table_reservation/select_table.dart';
import 'image_strings.dart';

class MainFeatures extends StatefulWidget {
  const MainFeatures({
    Key? key,
    required this.title,
    required this.text,
    required this.image,

  }) : super(key: key);
  final String title, text, image;

  @override
  State<MainFeatures> createState() => _MainFeaturesState();
}

class _MainFeaturesState extends State<MainFeatures> {
  int choice = 0;
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        //Navigator.of(context).pop();
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              widget.title == "Explore Menu at Restaurant" ? choice = 1 : choice = 2;
              return widget.title == "Explore Menu at Restaurant"
                  ? ProductMenuTitles(choice: choice,)
                  : widget.title == "Online Order To Your Doorstep"
                  ? ProductMenuTitles(choice: choice,)
                  : const SelectTable();
            },
          ),
        );
      },
      child: Container(
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
            const Spacer(),
            Image(
              image: AssetImage(widget.image),
              width: 130,
            ),
            const Spacer(),
            Text(
              widget.title,
              style: const TextStyle(
                fontSize: 20,
                color: Colors.white,
              ),
            ),
            Text(
              widget.text,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 15,
                color: Colors.white70,
              ),
            ),
            const Icon(
              Icons.add_circle,
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

