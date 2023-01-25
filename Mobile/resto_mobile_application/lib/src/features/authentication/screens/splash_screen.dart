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
                    //colorFilter: ColorFilter.mode(Colors.yellow, BlendMode.color),
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
                //controller: AnimationController(vsync: this, duration: const Duration(milliseconds: 1200)),
                ),
              ],
            ),
            // Positioned(
            //   bottom: 0,
            //   left: 0,
            //   right: 0,
            //   child: Container(
            //     height: MediaQuery.of(context).size.width,
            //     width: MediaQuery.of(context).size.width,
            //     decoration: const BoxDecoration(
            //       image: DecorationImage(
            //         image: AssetImage("assets/images/chef_image.png"),
            //         fit: BoxFit.fitWidth,
            //       ),
            //     ),
            //   ),
            // ),
            // Positioned(
            //   top: MediaQuery.of(context).size.height/2.5,
            //   child: Center(
            //     child: Positioned(
            //       top: MediaQuery.of(context).size.height/10,
            //       left: 0,
            //       right: 0,
            //       child: Column(
            //         mainAxisAlignment: MainAxisAlignment.center,
            //         crossAxisAlignment: CrossAxisAlignment.center,
            //         children: <Widget>[
            //           Center(
            //             child: Container(
            //               height: MediaQuery.of(context).size.height/7,
            //               width: MediaQuery.of(context).size.width/1.75,
            //               decoration: const BoxDecoration(
            //                 image: DecorationImage(
            //                   image: AssetImage("assets/logo/Logo.png"),
            //                   fit: BoxFit.fitWidth,
            //                 ),
            //
            //               ),
            //             ),
            //           ),
            //           Center(
            //             child: SizedBox(
            //               height: MediaQuery.of(context).size.height/5,
            //               width: MediaQuery.of(context).size.width,
            //               child: const Text(
            //                 "Your Favourite Food Delivered Hot & Fresh",
            //                 style: TextStyle(
            //                   color: Colors.white,
            //                   fontSize: 25,
            //                   fontWeight: FontWeight.bold,
            //                 ),
            //                 textAlign: TextAlign.center,
            //               ),
            //             ),
            //           ),
            //         ],
            //       ),
            //     ),
            //   ),
            // ),
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
