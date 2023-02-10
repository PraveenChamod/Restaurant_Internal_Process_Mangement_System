import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/signup_screen.dart';
import '../../../common_widgets/application_logo.dart';
import '../../../common_widgets/background_image.dart';
import '../../../constants/homeScreen_indicator.dart';
import '../../../constants/image_strings.dart';
import '../../../constants/main_features.dart';
import 'login_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  var _selectedIndex = 0;
  List<Map<String, String>> splashData = [
    {"text": "Order Food",
      "image": orderFood
    },
    {"text": "Choose Online",
      "image": chooseOnline
    },
    {"text": "Fast Delivery",
      "image": deliveryService
    },
    {"text": "Reserve Dining Tables",
      "image": dinningTable
    },
  ];
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            Column(
              children: [
                const SizedBox(height: 20,),
                const ApplicationLogo(),
                const SizedBox(height: 20,),
                Expanded(
                  flex: 1,
                  child: PageView.builder(
                    onPageChanged: (index) {
                      setState(() {
                        _selectedIndex = index;
                      });
                    },
                    itemCount: splashData.length,
                    itemBuilder: (context, index) => MainFeatures(
                      image: splashData[index]["image"] ?? '',
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
                const SizedBox(height: 50,),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

