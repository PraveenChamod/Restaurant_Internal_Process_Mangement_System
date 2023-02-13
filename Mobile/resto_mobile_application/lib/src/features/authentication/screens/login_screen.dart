import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/forget_password/make_selction.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/signup_screen.dart';
import 'package:social_login_buttons/social_login_buttons.dart';
import '../../../common_widgets/application_logo.dart';
import '../../../common_widgets/background_image.dart';
import '../../../constants/image_strings.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  //int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {

    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            SingleChildScrollView(
              keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  const SizedBox(height: 20,),
                  const ApplicationLogo(),
                  const SizedBox(height: 10,),
                  Center(
                    child: Container(
                      height: 500,
                      width: MediaQuery.of(context).size.width/1.25,
                      padding: const EdgeInsets.all(20.0),
                      decoration: BoxDecoration(
                        color: const Color(0xFF1b1b1d),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          const Text('LOGIN',
                            style: TextStyle(
                              fontSize: 23,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 5,),
                          const Text('Please login to Your Account',
                            style: TextStyle(
                              fontSize: 15,
                              color: Colors.white70,
                            ),
                          ),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: const TextField(
                              keyboardType: TextInputType.emailAddress,
                              decoration: InputDecoration(
                                labelText: 'Email',
                                labelStyle: TextStyle(color: Colors.white70),
                                suffixIcon: Icon(CupertinoIcons.envelope_fill, color: Colors.white70, size: 18,),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white),
                                ),
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: const TextField(
                              obscureText: true,
                              keyboardType: TextInputType.visiblePassword,
                              decoration: InputDecoration(
                                labelText: 'Password',
                                labelStyle: TextStyle(color: Colors.white70),
                                suffixIcon: Icon(CupertinoIcons.eye_slash_fill, color: Colors.white70, size: 18,),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white),
                                ),
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                          Container(
                            alignment: Alignment.centerRight,
                            child: TextButton(
                              style: TextButton.styleFrom(
                                foregroundColor: const Color(0xFFfebf10),
                                padding: const EdgeInsets.only(left: 8.0, top: 8.0, right: 0.0, bottom: 8.0),
                                textStyle: const TextStyle(fontSize: 15),
                              ),
                              onPressed: () {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (_){
                                      return const MakeSelection();
                                    },
                                  ),
                                );
                              },
                              child: const Text('Forgot Password ?'),
                            ),
                          ),
                          Center(
                            child: ElevatedButton(
                              onPressed: () {
                                // Navigator.of(context).push(
                                //   MaterialPageRoute(
                                //       builder: (_){
                                //         return const LoginScreen();
                                //       },
                                //   ),
                                // );
                              },
                              style: ElevatedButton.styleFrom(
                                padding: const EdgeInsets.all(5.0),
                                fixedSize: const Size(150, 30),
                                backgroundColor: const Color.fromRGBO(254, 191, 16, 10),
                                elevation: 15,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(20.0),
                                ),
                              ),
                              child: const Text(
                                'LOGIN',
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              const Text('Doesn\'t Have An Account ?',
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.white70,
                                ),
                              ),
                              TextButton(
                                style: TextButton.styleFrom(
                                  foregroundColor: const Color(0xFFfebf10),
                                  //padding: const EdgeInsets.only(left: 8.0, top: 8.0, right: 8.0, bottom: 8.0),
                                  textStyle: const TextStyle(fontSize: 15),
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
                                child: const Text('Sign Up'),
                              ),
                            ],
                          ),
                          const Text('--OR--',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.white70,
                            ),
                          ),
                          const SizedBox(height: 10,),
                          SocialLoginButton(
                            //text: '',
                            height: 30,
                            imageWidth: 40,
                            fontSize: 12,
                            width: MediaQuery.of(context).size.width/1.25 - 45,
                            buttonType: SocialLoginButtonType.google,
                            onPressed: () {},
                          ),
                          const SizedBox(height: 10,),
                          SocialLoginButton(
                            //text: '',
                            height: 30,
                            imageWidth: 40,
                            fontSize: 12,
                            width: MediaQuery.of(context).size.width/1.25 - 45,
                            buttonType: SocialLoginButtonType.facebook,
                            onPressed: () {},
                          ),
                          const SizedBox(height: 10,),
                          SocialLoginButton(
                            //text: '',
                            height: 30,
                            imageWidth: 40,
                            fontSize: 12,
                            width: MediaQuery.of(context).size.width/1.25 - 45,
                            buttonType: SocialLoginButtonType.twitter,
                            onPressed: () {},
                          ),
                        ],
                      ),
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
