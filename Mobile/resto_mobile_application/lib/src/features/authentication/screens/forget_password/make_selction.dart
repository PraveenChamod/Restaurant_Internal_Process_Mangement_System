import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../constants/image_strings.dart';
import 'getphonenumber.dart';
import 'gettemail.dart';

class MakeSelection extends StatelessWidget {
  const MakeSelection({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
          backgroundColor: Colors.black,
          body: Stack(
            children: [
              Container(
                decoration: const BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage(commonBackgroundImage),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              Positioned(
                top: MediaQuery.of(context).size.height/20,
                left: 0,
                right: 0,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    const SizedBox(height: 20,),
                    const Image(
                      image: AssetImage(commonLogo),
                      width: 200,
                    ),
                    const SizedBox(height: 20,),
                    SizedBox(
                      width: MediaQuery.of(context).size.width/1.25,
                      child: const Text(
                        'Select which contact detail should we use to reset your password?',
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    const SizedBox(height: 30,),
                    Center(
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          //padding: const EdgeInsets.all(5.0),
                          fixedSize: const Size(200, 40),
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
                                return const GetPhoneNumber();
                                },
                            ),
                          );
                        },
                        icon: const Icon( // <-- Icon
                          Icons.phone_android_rounded,
                          size: 30.0,
                          color: Color(0xFF1b1b1d),
                        ),
                        label: const Text(
                          'Via SMS',
                          style: TextStyle(
                            fontSize: 23,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF1b1b1d),
                          ),
                        ), // <-- Text
                      ),
                    ),
                    const SizedBox(height: 30,),
                    Center(
                      child: ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          //padding: const EdgeInsets.all(5.0),
                          fixedSize: const Size(200, 40),
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
                                return const GetEmail();
                              },
                            ),
                          );
                        },
                        icon: const Icon( // <-- Icon
                          CupertinoIcons.envelope_fill,
                          size: 30.0,
                          color: Color(0xFF1b1b1d),
                        ),
                        label: const Text(
                          'Via Email',
                          style: TextStyle(
                            fontSize: 23,
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
