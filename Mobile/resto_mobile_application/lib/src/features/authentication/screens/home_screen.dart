import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/signup_screen.dart';
import '../../../common_widgets/application_logo.dart';
import '../../../common_widgets/background_image.dart';
import '../../../constants/homeScreen_indicator.dart';
import '../../../constants/image_strings.dart';
import '../../../constants/main_features.dart';
import 'Products/Products_Menu_Titles.dart';
import 'login_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  var _selectedIndex = 0;
  List<Map<String, String>> splashData = [
    {"title": "Food Orders",
      "text": "Take orders on your site for delivery",
      "image": orderFood
    },
    {"title": "Restaurant Menus",
      "text": "Create and display your menu online",
      "image": chooseOnline
    },
    {"title": "Fast Delivery",
      "text": "Pick out your fresh favorites for delivery right to your doorstep.",
      "image": deliveryService
    },
    {"title": "Table Reservations",
      "text": "Reserve Dining Tables on your own choice",
      "image": dinningTable
    },
  ];
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF151b1d),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            SingleChildScrollView(
              child: Column(
                children: [
                  const SizedBox(height: 20,),
                  const ApplicationLogo(),
                  const SizedBox(height: 20,),
                  SizedBox(
                    height: 335,
                    child: PageView.builder(
                      onPageChanged: (index) {
                        setState(() {
                          _selectedIndex = index;
                        });
                      },
                      itemCount: splashData.length,
                      itemBuilder: (context, index) => MainFeaturesHome(
                          image: splashData[index]["image"] ?? '',
                          title: splashData[index]["title"] ?? '',
                          text: splashData[index]["text"] ?? '',
                      ),
                    ),
                  ),
                  const SizedBox(height: 10,),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ...List.generate(splashData.length, (index) =>
                          Indicator(isActive: _selectedIndex == index ? true : false),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20,),
                  Center(
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        //padding: const EdgeInsets.all(5.0),
                        fixedSize: const Size(230, 40),
                        backgroundColor: const Color.fromRGBO(254, 191, 16, 10),
                        elevation: 15,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                      ),
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_){
                              return const LoginScreen();
                            },
                          ),
                        );
                      },
                      icon: const Icon( // <-- Icon
                        Icons.login_sharp,
                        size: 30.0,
                        color: Color(0xFF1b1b1d),
                      ),
                      label: const Text(
                        'Login To Resto',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1b1b1d),
                        ),
                      ), // <-- Text
                    ),
                  ),
                  const SizedBox(height: 20,),
                  Center(
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        //padding: const EdgeInsets.all(5.0),
                        fixedSize: const Size(230, 40),
                        backgroundColor: const Color.fromRGBO(254, 191, 16, 10),
                        elevation: 15,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                      ),
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_){
                              return const SignupScreen();
                            },
                          ),
                        );
                      },
                      icon: const Icon( // <-- Icon
                        Icons.person_add,
                        size: 30.0,
                        color: Color(0xFF1b1b1d),
                      ),
                      label: const Text(
                        'Create Account',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1b1b1d),
                        ),
                      ), // <-- Text
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

class MainFeaturesHome extends StatefulWidget {
  const MainFeaturesHome({Key? key,
    required this.title,
    required this.text,
    required this.image
  }) : super(key: key);
  final String title, text, image;

  @override
  State<MainFeaturesHome> createState() => _MainFeaturesHomeState();
}

class _MainFeaturesHomeState extends State<MainFeaturesHome> {
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
          const Spacer(),
          Image(
            image: AssetImage(widget.image),
            width: 225,
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
    );
  }
}


