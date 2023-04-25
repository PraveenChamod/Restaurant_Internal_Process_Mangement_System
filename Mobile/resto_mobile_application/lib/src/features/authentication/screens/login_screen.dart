import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/signup_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:social_login_buttons/social_login_buttons.dart';
import '../../../common_widgets/application_logo.dart';
import '../../../common_widgets/background_image.dart';
import '../../../constants/image_strings.dart';
import 'Customer/customer_main_page.dart';
import 'deliverer/deliverer_home.dart';
import 'forget_password/gettemail.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {

  var emailController = TextEditingController();
  var passController =  TextEditingController();
  var Email;
  var Password;
  bool _obscureText = true;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            SingleChildScrollView(
              //keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  const SizedBox(
                    height: 20,
                  ),
                  const ApplicationLogo(),
                  const SizedBox(
                    height: 10,
                  ),
                  Center(
                    child: Container(
                      height: 500,
                      width: MediaQuery.of(context).size.width / 1.25,
                      padding: const EdgeInsets.all(20.0),
                      decoration: BoxDecoration(
                        //color: const Color(0xFF1b1b1d),
                        color: Colors.black38,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          const Text(
                            'LOGIN',
                            style: TextStyle(
                              fontSize: 23,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(
                            height: 5,
                          ),
                          const Text(
                            'Please login to Your Account',
                            style: TextStyle(
                              fontSize: 15,
                              color: Colors.white70,
                            ),
                          ),
                          SizedBox(
                            width:
                                MediaQuery.of(context).size.width / 1.25 - 40,
                            child: TextField(
                              controller: emailController,
                              keyboardType: TextInputType.emailAddress,
                              decoration: const InputDecoration(
                                labelText: 'Email',
                                labelStyle: TextStyle(color: Colors.white70),
                                suffixIcon: Icon(
                                  CupertinoIcons.envelope_fill,
                                  color: Colors.white70,
                                  size: 18,
                                ),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white),
                                ),
                                focusedBorder: UnderlineInputBorder(
                                  borderSide:
                                      BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                              onChanged: (value) {
                                Email = value;
                              },
                            ),
                          ),
                          SizedBox(
                            width:
                                MediaQuery.of(context).size.width / 1.25 - 40,
                            child: TextField(
                              controller: passController,
                              obscureText: _obscureText,
                              keyboardType: TextInputType.visiblePassword,
                              maxLength: 8,
                              decoration: InputDecoration(
                                labelText: 'Password',
                                counterText: '',
                                labelStyle:
                                    const TextStyle(color: Colors.white70),
                                suffixIcon: GestureDetector(
                                  onTap: () {
                                    setState(() {
                                      _obscureText = !_obscureText;
                                    });
                                  },
                                  child: Icon(
                                    _obscureText
                                        ? Icons.visibility
                                        : Icons.visibility_off,
                                    color: Colors.white70,
                                    size: 18,
                                  ),
                                ),
                                enabledBorder: const UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white),
                                ),
                                focusedBorder: const UnderlineInputBorder(
                                  borderSide:
                                      BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                              onChanged: (value) {
                                Password = value;
                              },
                            ),
                          ),
                          Container(
                            alignment: Alignment.centerRight,
                            child: TextButton(
                              style: TextButton.styleFrom(
                                foregroundColor: const Color(0xFFfebf10),
                                padding: const EdgeInsets.only(
                                    left: 8.0,
                                    top: 8.0,
                                    right: 0.0,
                                    bottom: 8.0),
                                textStyle: const TextStyle(fontSize: 15),
                              ),
                              onPressed: () {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (_) {
                                      return const GetEmail();
                                    },
                                  ),
                                );
                              },
                              child: const Text('Forgot Password ?'),
                            ),
                          ),
                          Center(
                            child: Container(
                              width: 150,
                              height: 35,
                              padding: const EdgeInsets.only(left: 5, right: 5),
                              child: AnimatedButton(
                                text: "Login",
                                buttonTextStyle: const TextStyle(
                                  color: Colors.black,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                                color: const Color(0xFFfebf10),
                                pressEvent: () {
                                  login();
                                },
                              ),
                            ),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              const Text(
                                'Doesn\'t Have An Account ?',
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
                                      builder: (_) {
                                        return const SignupScreen();
                                      },
                                    ),
                                  );
                                },
                                child: const Text('Sign Up'),
                              ),
                            ],
                          ),
                          const Text(
                            '--OR--',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.white70,
                            ),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          SocialLoginButton(
                            //text: '',
                            height: 30,
                            imageWidth: 40,
                            fontSize: 12,
                            width:
                                MediaQuery.of(context).size.width / 1.25 - 45,
                            buttonType: SocialLoginButtonType.google,
                            onPressed: () {},
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          SocialLoginButton(
                            //text: '',
                            height: 30,
                            imageWidth: 40,
                            fontSize: 12,
                            width:
                                MediaQuery.of(context).size.width / 1.25 - 45,
                            buttonType: SocialLoginButtonType.facebook,
                            onPressed: () {},
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          SocialLoginButton(
                            //text: '',
                            height: 30,
                            imageWidth: 40,
                            fontSize: 12,
                            width:
                                MediaQuery.of(context).size.width / 1.25 - 45,
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
  void login() async {
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
    String id = '';
    String email = '';
    String  jwtToken = '';
    if (passController.text.isNotEmpty && emailController.text.isNotEmpty){
      var response = await http.post(
        Uri.parse("http://$hostName:5000/api/v1/Auth/LoginUser"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          "Email": emailController.text,
          "Password": passController.text
        }),
      );
      Navigator.pop(context);
      if(response.statusCode == 200) {
        String jwtToken = response.body;
        jwtToken = jwtToken.replaceAll('"', '');
        print(jwtToken);
        print("Login Token: $jwtToken");
        Map<String, dynamic> decodedToken = JwtDecoder.decode(jwtToken);
        email = decodedToken['Email'];
        print("Email : $email");
        id = decodedToken['id'];
        print("Id : $id");
        awesomeDialog(DialogType.success, "Login Successful! Welcome to Resto", "Success", id, email, jwtToken);
      } else {
        final json = jsonDecode(response.body);
        final msg = json["message"];
        awesomeDialog(DialogType.warning, msg, "Warning", id, email, jwtToken);
      }
    }else {
      awesomeDialog(DialogType.warning, "Fields Cannot Be Empty!", "Warning", id, email, jwtToken);
    }
  }
  awesomeDialog(DialogType type, String desc, String title, String id, String email, String token) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      showCloseIcon: true,
      title: title,
      desc: desc,
      btnOkOnPress: (){
        title == "Success" ? pageRoute(id, email, token): null;
      },
    ).show();
  }
  void pageRoute(String id, String email, String token) async {
    //const This is the part of store value or token shared preference
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
    SharedPreferences pref = await SharedPreferences.getInstance();
    await pref.setString("LoginId", id);
    await pref.setString("LoginEmail", email);
    await pref.setString("JwtToken", token);
    String? ID = pref.getString("LoginId");
    String? userEmail = pref.getString("LoginEmail");
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Auth/Profile'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 201) {
      final loggedUser =  jsonDecode(response.body);
      String loggedUserRole = loggedUser['user']['Role'];
      await pref.setString("LoginUserRole", loggedUserRole);
      String? role = pref.getString("LoginUserRole");
    } else {
      throw Exception('Failed to load data');
    }
    Navigator.pop(context);
    String? role = pref.getString("LoginUserRole");
    role == 'Customer'
      ? Navigator.push(context, MaterialPageRoute(builder: (context) => const CustomerMainPage(choice: 2,)))
      : Navigator.push(context, MaterialPageRoute(builder: (context) => const DelivererHome()));
  }
}