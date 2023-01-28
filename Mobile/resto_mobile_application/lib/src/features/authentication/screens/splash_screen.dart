import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import '../../../constants/image_strings.dart';
import 'login_screen.dart';


class SplashScreen extends StatelessWidget {
  const SplashScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
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
              children: const [
                SizedBox(
                  height: 25,
                ),
                AnimatedPositioned(
                  duration: Duration(milliseconds: 2000),
                  top: 150,
                  left: 150,
                  child: Image(
                    image: AssetImage(commonLogo),
                    width: 200,
                  ),
                ),
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
                    Navigator.of(context).push(MaterialPageRoute(
                        builder: (_){
                          return const LoginScreen();
                        }
                        )
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
