import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../common_widgets/application_logo.dart';
import '../../../constants/image_strings.dart';
import 'Customer/customer_home.dart';
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
            //const BackgroundImage(),
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
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(builder: (_){
                        return const HomeScreen();
                        },
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.all(10.0),
                    fixedSize: const Size(200, 50),
                    backgroundColor: const Color.fromRGBO(254, 191, 16, 10),
                    elevation: 15,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                  ),
                  child: const Text(
                      'GET STARTED',
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
