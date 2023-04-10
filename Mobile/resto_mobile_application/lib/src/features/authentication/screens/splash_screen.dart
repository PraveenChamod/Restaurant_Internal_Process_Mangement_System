import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../common_widgets/application_logo.dart';
import '../../../constants/image_strings.dart';
import 'Customer/customer_main_page.dart';
import 'deliverer/deliverer_home.dart';
import 'home_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF161b1d),
      body: SafeArea(
        child: Stack(
          children: <Widget>[
            Container(
              decoration: const BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage(splashScreenImage),
                    fit: BoxFit.cover,
                  ),
              ),
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const <Widget>[
                SizedBox(
                  height: 25,
                ),
                ApplicationLogo(),
                Text(
                  "Your Favourite Food Delivered Hot & Fresh",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 25,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                SpinKitWave(
                  color: Colors.white,
                  size: 30.0,
                ),
              ],
            ),
            Positioned(
              bottom: 30,
              right: 0,
              left: 0,
              child: Center(
                child: Container(
                  width: 200,
                  height: 65,
                  padding: const EdgeInsets.all(10.0),
                  child: AnimatedButton(
                    text: "GET STARTED",
                    buttonTextStyle: const TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                    color: const Color(0xFFfebf10),
                    pressEvent: () {
                      checkLogin();
                    },
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
  void checkLogin() async {
    //In this checkLogin function check if user already login or credential already available or not
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? val = pref.getString("LoginId");
    String? role = pref.getString("LoginUserRole");
    val != null ?
      role == 'Customer'
        ? Navigator.push(context, MaterialPageRoute(builder: (context) => const CustomerMainPage(choice: 3,)))
        : Navigator.push(context, MaterialPageRoute(builder: (context) => const DelivererHome()))
        : Navigator.push(context, MaterialPageRoute(builder: (context) => const HomeScreen()));
  }
}
