import 'package:flutter/material.dart';
import '../../../../constants/image_strings.dart';
import '../login_screen.dart';

class GetEmail extends StatefulWidget {
  const GetEmail({Key? key}) : super(key: key);

  @override
  State<GetEmail> createState() => _GetEmailState();
}

class _GetEmailState extends State<GetEmail> {
  final TextEditingController emailAddressController = TextEditingController();
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
            SingleChildScrollView(
              keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  const SizedBox(height: 20,),
                  const Image(
                    image: AssetImage(forgetPassword),
                    width: 100,
                  ),
                  const SizedBox(height: 20,),
                  Center(
                    child: Container(
                      height: MediaQuery.of(context).size.height/2,
                      width: MediaQuery.of(context).size.width/1.25,
                      padding: const EdgeInsets.all(20.0),
                      decoration: BoxDecoration(
                        color: const Color(0xFF1b1b1d),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: <Widget>[
                          const SizedBox(height: 20,),
                          const Text('FORGET PASSWORD',
                            style: TextStyle(
                              fontSize: 23,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 20,),
                          const Center(
                            child: Text('Provide your Account\'s Email Address for which you want to reset your password!',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 15,
                                color: Colors.white70,
                              ),
                            ),
                          ),
                          const SizedBox(height: 20,),
                          TextFormField(
                            controller: emailAddressController,
                            textInputAction: TextInputAction.done,
                            maxLines: 1,
                            keyboardType: TextInputType.emailAddress,
                            decoration: const InputDecoration(
                              labelText: 'Enter Email Address',
                              border: InputBorder.none,
                              labelStyle: TextStyle(color: Colors.white70),
                              enabledBorder: UnderlineInputBorder(
                                borderSide: BorderSide(color: Colors.white),
                              ),
                              focusedBorder: UnderlineInputBorder(
                                borderSide: BorderSide(color: Color(0xFFFFFF33)),
                              ),
                            ),
                            style: const TextStyle(
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 20,),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              padding: const EdgeInsets.all(5.0),
                              fixedSize: const Size(150, 30),
                              backgroundColor: const Color.fromRGBO(254, 191, 16, 10),
                              elevation: 15,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20.0),
                              ),
                            ),
                            //After user pressed the Button, onPressed section check the countryCode value and inform user by using snackBar.
                            onPressed: () {
                              if(emailAddressController.text.isEmpty) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text("Please enter a Email Address",),
                                  ),
                                );
                              }else {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (_){
                                      return const LoginScreen();
                                    },
                                  ),
                                );
                              }
                            },
                            child: const Text(
                              'Next',
                              style: TextStyle(
                                color: Colors.black,
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
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
