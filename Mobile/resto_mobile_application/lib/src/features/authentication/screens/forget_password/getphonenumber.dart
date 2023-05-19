import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:fl_country_code_picker/fl_country_code_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/forget_password/reset_password.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../constants/image_strings.dart';
import '../login_screen.dart';

class GetPhoneNumber extends StatefulWidget {
  const GetPhoneNumber({Key? key}) : super(key: key);

  @override
  State<GetPhoneNumber> createState() => _GetPhoneNumberState();
}

class _GetPhoneNumberState extends State<GetPhoneNumber> {
  final countryPicker = const FlCountryCodePicker();
  final TextEditingController phoneNumberController = TextEditingController();
  CountryCode? countryCode;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: AppBar(
          foregroundColor: const Color(0xFFfebf10),
          elevation: 0,
          leading: IconButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return const LoginScreen();
                  },
                ),
              );
            },
            icon: const Icon(Icons.chevron_left),
          ),
          title: const Text('Generate OTP'),
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
        ),
        body: Stack(
          children: [
            const BackgroundImage(),
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
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Container(
                        margin: const EdgeInsets.only(top: 30.0),
                        padding: const EdgeInsets.all(15.0),
                        decoration: BoxDecoration(
                          color: Colors.black38,
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
                              child: Text('Provide your Account\'s Phone Number for which you want to reset your password!',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.white70,
                                ),
                              ),
                            ),
                            const SizedBox(height: 20,),
                            TextFormField(
                              controller: phoneNumberController,
                              textInputAction: TextInputAction.done,
                              maxLines: 1,
                              keyboardType: TextInputType.number,
                              style: const TextStyle(
                                fontSize: 15,
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                              decoration: InputDecoration(
                                labelText: 'Enter phone number',
                                labelStyle: const TextStyle(
                                  fontSize: 15,
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
                                prefixIcon: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      GestureDetector(
                                        onTap: () async {
                                          final code =
                                          await countryPicker.showPicker(context: context);
                                          setState(() {
                                            countryCode = code;
                                          });
                                        },
                                        child: Row(
                                          children: [
                                            Container(
                                              child: countryCode!=null
                                                  ? countryCode!.flagImage
                                                  : null,
                                            ),
                                            const SizedBox(width: 10,),
                                            Container(
                                              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
                                              decoration: BoxDecoration(
                                                color: const Color(0xFF1b1b1d),
                                                // color: Colors.grey,
                                                borderRadius: BorderRadius.circular(5),
                                              ),
                                              child: Text(
                                                countryCode?.dialCode ?? "+1",
                                                style:   const TextStyle(
                                                  color: Color(0xFFfebf10),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
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
                                  text: "Send OTP",
                                  buttonTextStyle: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  color: const Color(0xFFfebf10),
                                  pressEvent: () {
                                    if(phoneNumberController.text.isEmpty) {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(
                                          content: Text("Please enter a Email Address",),
                                        ),
                                      );
                                    }else {
                                      print(phoneNumberController.text);
                                      //getOTP();
                                    }
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
                            const SizedBox(height: 20,),
                            // ElevatedButton(
                            //   style: ElevatedButton.styleFrom(
                            //     padding: const EdgeInsets.all(5.0),
                            //     fixedSize: const Size(150, 30),
                            //     backgroundColor: const Color.fromRGBO(254, 191, 16, 10),
                            //     elevation: 15,
                            //     shape: RoundedRectangleBorder(
                            //       borderRadius: BorderRadius.circular(20.0),
                            //     ),
                            //   ),
                            //   //After user pressed the Button, onPressed section check the countryCode value and inform user by using snackBar.
                            //   onPressed: () {
                            //     if(countryCode!= null) {
                            //       ScaffoldMessenger.of(context).showSnackBar(
                            //           SnackBar(
                            //               content: Text(
                            //                 //'phoneNumberController' is the what we want here for authentication part
                            //                   "${countryCode!.dialCode}-${phoneNumberController.text.trim()}")));
                            //     }else {
                            //       ScaffoldMessenger.of(context).showSnackBar(
                            //           const SnackBar(
                            //               content: Text(
                            //                   "Please select a Country Code")));
                            //     }
                            //   },
                            //   child: const Text(
                            //     'Next',
                            //     style: TextStyle(
                            //       color: Colors.black,
                            //       fontSize: 16,
                            //       fontWeight: FontWeight.bold,
                            //     ),
                            //   ),
                            // ),
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
  void getOTP() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final http.Response response = await http.post(
      Uri.parse("http://$hostName:5000/api/v1/Auth/OTP"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "Email": phoneNumberController.text,
      }),
    );
    if (response.statusCode == 200) {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      successAwesomeDialog(DialogType.success, msg, "Success");

    } else {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      unSuccessAwesomeDialog(DialogType.warning, msg, "Warning");
    }
  }
  successAwesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              return const ResetPassword();
            },
          ),
        );
      },
    ).show();
  }
  unSuccessAwesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: () {},
    ).show();
  }
}
