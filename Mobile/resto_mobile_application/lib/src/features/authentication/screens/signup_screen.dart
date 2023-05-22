import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl_phone_field/intl_phone_field.dart';
import '../../../common_widgets/application_logo.dart';
import '../../../common_widgets/background_image.dart';
import '../../../constants/image_strings.dart';
import 'login_screen.dart';
class SignupScreen extends StatefulWidget {
  const SignupScreen({Key? key}) : super(key: key);
  @override
  State<SignupScreen> createState() => _LoginScreenState();
}
class _LoginScreenState extends State<SignupScreen> {
  var nameController = TextEditingController();
  var emailController = TextEditingController();
  var addressController = TextEditingController();
  var passController = TextEditingController();
  var confirmPassController = TextEditingController();
  var contactController = TextEditingController();
  String errorText = "";
  int output = 0;
  bool _obscureText1 = true;
  bool _obscureText2 = true;
  late String phoneNumberSignUp = '';
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
                  const SizedBox(height: 10,),
                  const ApplicationLogo(),
                  const SizedBox(height: 10,),
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.only(left: 15.0, top: 0.0, right: 15.0, bottom: 15.0),
                      child: Container(
                        padding: const EdgeInsets.all(15.0),
                        decoration: BoxDecoration(
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
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(
                              height: 15,
                            ),
                            TextField(
                              controller: nameController,
                              keyboardType: TextInputType.emailAddress,
                              decoration: InputDecoration(
                                labelText: 'Name',
                                labelStyle: const TextStyle(color: Color(0xFFfebf10), fontSize: 17),
                                suffixIcon: const Icon(
                                  CupertinoIcons.person,
                                  color: Color(0xFFfebf10),
                                  size: 18,
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            TextField(
                              textCapitalization: TextCapitalization.none,
                              controller: emailController,
                              inputFormatters: [LowerCaseTextFormatter()],
                              keyboardType: TextInputType.emailAddress,
                              decoration: InputDecoration(
                                labelText: 'Email',
                                labelStyle: const TextStyle(color: Color(0xFFfebf10), fontSize: 17),
                                suffixIcon: const Icon(
                                  CupertinoIcons.envelope_fill,
                                  color: Color(0xFFfebf10),
                                  size: 18,
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            TextField(
                              textCapitalization: TextCapitalization.none,
                              controller: addressController,
                              keyboardType: TextInputType.emailAddress,
                              decoration: InputDecoration(
                                labelText: 'Address',
                                labelStyle: const TextStyle(color: Color(0xFFfebf10), fontSize: 17),
                                suffixIcon: const Icon(
                                  CupertinoIcons.location_solid,
                                  color: Color(0xFFfebf10),
                                  size: 18,
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            TextField(
                              controller: passController,
                              obscureText: _obscureText1,
                              keyboardType: TextInputType.visiblePassword,
                              maxLength: 8,
                              decoration: InputDecoration(
                                labelText: 'Password',
                                counterText: '',
                                labelStyle: const TextStyle(color: Color(0xFFfebf10), fontSize: 17),
                                suffixIcon: GestureDetector(
                                  onTap: () {
                                    setState(() {
                                      _obscureText1 = !_obscureText1;
                                    });
                                  },
                                  child: Icon(
                                    _obscureText1
                                        ? Icons.visibility_off
                                        : Icons.visibility,
                                    color: const Color(0xFFfebf10),
                                    size: 18,
                                  ),
                                ),
                                //suffixIcon: Icon(CupertinoIcons.eye_slash_fill, color: Colors.white70, size: 18,),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            TextField(
                              controller: confirmPassController,
                              obscureText: _obscureText2,
                              keyboardType: TextInputType.visiblePassword,
                              maxLength: 8,
                              decoration: InputDecoration(
                                labelText: 'Confirm Password',
                                counterText: '',
                                labelStyle: const TextStyle(color: Color(0xFFfebf10), fontSize: 17),
                                suffixIcon: GestureDetector(
                                  onTap: () {
                                    setState(() {
                                      _obscureText2 = !_obscureText2;
                                    });
                                  },
                                  child: Icon(
                                    _obscureText2
                                        ? Icons.visibility_off
                                        : Icons.visibility,
                                    color: const Color(0xFFfebf10),
                                    size: 18,
                                  ),
                                ),
                                //suffixIcon: Icon(CupertinoIcons.eye_slash_fill, color: Colors.white70, size: 18,),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(
                              height: 10,
                            ),
                            IntlPhoneField(
                              dropdownIcon: const Icon(Icons.arrow_drop_down, color: Color(0xFFfebf10),),
                              dropdownTextStyle: const TextStyle(
                                fontSize: 17,
                                color: Color(0xFFfebf10),
                              ),
                              style: const TextStyle(
                                color: Colors.white,
                              ),
                              cursorColor: const Color(0xFFfebf10),
                              decoration: InputDecoration(
                                labelText: 'Contact Number',
                                labelStyle: const TextStyle(
                                  fontSize: 17,
                                  color: Color(0xFFfebf10),
                                ),
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(10),
                                  borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              initialCountryCode: 'LK',
                              onChanged: (phone) {
                                phoneNumberSignUp = phone.completeNumber;
                                print(phone.completeNumber);
                              },
                            ),
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
                                    //print(phoneNumberSignUp);
                                    signup();
                                  },
                                  borderRadius: const BorderRadius.only(
                                    topLeft: Radius.circular(0),
                                    topRight: Radius.circular(80),
                                    bottomLeft: Radius.circular(80),
                                    bottomRight: Radius.circular(80),
                                  ),
                                ),
                              ),
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                const Text('Already Have An Account?',
                                  style: TextStyle(
                                    fontSize: 15,
                                    color: Colors.white,
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
      Uri.parse("http://$hostName:5000/api/v1/User/CustomerRegister"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        "Name": nameController.text,
        "Email": emailController.text,
        "Address": addressController.text,
        "Password": passController.text,
        "ConfirmPassword": confirmPassController.text,
        "ContactNumber": phoneNumberSignUp
      }),
    );
    Navigator.pop(context);
    if(response.statusCode == 201) {
      awesomeDialog(DialogType.success, "You successfully registered to the system. Now you can Login", "Success");
    }else{
      final json = jsonDecode(response.body);
      final msg = json["message"];
      awesomeDialog(DialogType.warning, msg, "Warning");
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

//Function for ensure user can only input lowercase letters in email field
class LowerCaseTextFormatter extends TextInputFormatter {
  @override
  TextEditingValue formatEditUpdate(
      TextEditingValue oldValue, TextEditingValue newValue) {
    return TextEditingValue(
        text: newValue.text.toLowerCase(),
        selection: newValue.selection);
  }
}
