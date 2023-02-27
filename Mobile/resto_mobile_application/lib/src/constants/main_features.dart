import 'package:flutter/material.dart';

import '../features/authentication/screens/Products/Products_Menu_Titles.dart';
import '../features/authentication/screens/forget_password/make_selction.dart';
import '../features/authentication/screens/login_screen.dart';
import '../features/authentication/screens/signup_screen.dart';
import '../features/authentication/screens/splash_screen.dart';
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
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        //Navigator.of(context).pop();
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              return widget.title == "Restaurant Menus"
                  ? const LoginScreen()
                  : widget.title == "Online Order"
                  ? const SignupScreen()
                  : const LoginScreen();
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
            const Spacer(),
          ],
        ),
      ),
    );
  }
}

