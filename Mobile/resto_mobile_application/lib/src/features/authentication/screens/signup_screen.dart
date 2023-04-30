import 'dart:convert';
import 'dart:io';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import '../../../common_widgets/application_logo.dart';
import '../../../common_widgets/background_image.dart';
import '../../../constants/image_strings.dart';
import 'forget_password/make_selction.dart';
import 'login_screen.dart';
class SignupScreen extends StatefulWidget {
  const SignupScreen({Key? key}) : super(key: key);
  @override
  State<SignupScreen> createState() => _LoginScreenState();
}
class _LoginScreenState extends State<SignupScreen> {
  var nameController = TextEditingController();
  var emailController = TextEditingController();
  var passController = TextEditingController();
  var confirmPassController = TextEditingController();
  var contactController = TextEditingController();
  String errorText = "";
  int output = 0;
  bool _obscureText1 = true;
  bool _obscureText2 = true;
  @override
  Widget build(BuildContext context) {

    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.black,
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
                      height: 490,
                      width: MediaQuery.of(context).size.width/1.25,
                      padding: const EdgeInsets.all(20.0),
                      decoration: BoxDecoration(
                        //color: const Color(0xFF1b1b1d),
                        color: Colors.black38,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          const Text('SIGN UP',
                            style: TextStyle(
                              fontSize: 23,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 5,),
                          const Text('Please Enter User Informations',
                            style: TextStyle(
                              fontSize: 15,
                              color: Colors.white70,
                            ),
                          ),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: TextField(
                              controller: nameController,
                              keyboardType: TextInputType.emailAddress,
                              decoration: const InputDecoration(
                                labelText: 'Name',
                                labelStyle: TextStyle(color: Colors.white70),
                                suffixIcon: Icon(CupertinoIcons.person, color: Colors.white70, size: 18,),
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
                          ),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: TextField(
                              textCapitalization: TextCapitalization.none,
                              controller: emailController,
                              keyboardType: TextInputType.emailAddress,
                              decoration: const InputDecoration(
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
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: TextField(
                              controller: passController,
                              obscureText: _obscureText1,
                              keyboardType: TextInputType.visiblePassword,
                              maxLength: 8,
                              decoration: InputDecoration(
                                labelText: 'Password',
                                counterText: '',
                                labelStyle: const TextStyle(color: Colors.white70),
                                suffixIcon: GestureDetector(
                                  onTap: () {
                                    setState(() {
                                      _obscureText1 = !_obscureText1;
                                    });
                                  },
                                  child: Icon(
                                    _obscureText1
                                        ? Icons.visibility
                                        : Icons.visibility_off,
                                    color: Colors.white70,
                                    size: 18,
                                  ),
                                ),
                                //suffixIcon: Icon(CupertinoIcons.eye_slash_fill, color: Colors.white70, size: 18,),
                                enabledBorder: const UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white),
                                ),
                                focusedBorder: const UnderlineInputBorder(
                                  borderSide: BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: TextField(
                              controller: confirmPassController,
                              obscureText: _obscureText2,
                              keyboardType: TextInputType.visiblePassword,
                              maxLength: 8,
                              decoration: InputDecoration(
                                labelText: 'Confirm Password',
                                counterText: '',
                                labelStyle: const TextStyle(color: Colors.white70),
                                suffixIcon: GestureDetector(
                                  onTap: () {
                                    setState(() {
                                      _obscureText2 = !_obscureText2;
                                    });
                                  },
                                  child: Icon(
                                    _obscureText2
                                        ? Icons.visibility
                                        : Icons.visibility_off,
                                    color: Colors.white70,
                                    size: 18,
                                  ),
                                ),
                                //suffixIcon: Icon(CupertinoIcons.eye_slash_fill, color: Colors.white70, size: 18,),
                                enabledBorder: const UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white),
                                ),
                                focusedBorder: const UnderlineInputBorder(
                                  borderSide: BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: TextField(
                              controller: contactController,
                              keyboardType: TextInputType.number,
                              decoration: const InputDecoration(
                                labelText: 'Contact No.',
                                labelStyle: TextStyle(color: Colors.white70),
                                suffixIcon: Icon(CupertinoIcons.phone_badge_plus, color: Colors.white70, size: 18,),
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
                          ),
                          const SizedBox(height: 20,),
                          Center(
                            child: Container(
                              width: 150,
                              height: 35,
                              padding: const EdgeInsets.only(left: 5, right: 5),
                              child: AnimatedButton(
                                text: "Sign Up",
                                buttonTextStyle: const TextStyle(
                                  color: Colors.black,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                                color: const Color(0xFFfebf10),
                                pressEvent: () {
                                  signup();
                                },
                              ),
                            ),
                          ),
                          //const SizedBox(height: 10,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Text('Already Have An Account?',
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.white70,
                                ),
                              ),
                              TextButton(
                                style: TextButton.styleFrom(
                                  foregroundColor: const Color(0xFFfebf10),
                                  textStyle: const TextStyle(fontSize: 15),
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
                                child: const Text('Login'),
                              ),
                            ],
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
  void signup() async {
    showDialog(
      context: context,
      builder: (context){
        return const Center(
          child: CircularProgressIndicator(
            color: Color(0xFFfebf10),
          ),
        );
      },
    );
    final http.Response response = await http.post(
      Uri.parse("http://$hostName:5000/api/v1/customer/AddCustomer"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        "Name": nameController.text,
        "Email": emailController.text,
        "Password": passController.text,
        "ConfirmPassword": confirmPassController.text,
        "ContactNumber": contactController.text
      }),
    );
    Navigator.pop(context);
    if(response.statusCode == 200) {
      awesomeDialog(DialogType.success, "You successfully registered to the system. Now you can Login", "Success");//Successfully User registered.
    }else{
      final json = jsonDecode(response.body);
      final msg = json["message"];
      awesomeDialog(DialogType.warning, msg, "Warning");//Unsuccessfully User registered.
    }
  }
  awesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      showCloseIcon: true,
      title: title,
      desc: desc,
      btnOkOnPress: (){
        title == "Success" ?
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              return const LoginScreen();
            },
          ),
        ) : null;
      },
    ).show();
  }
}
