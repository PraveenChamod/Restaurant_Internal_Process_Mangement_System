import 'dart:convert';

import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../../common_widgets/background_image.dart';
import '../../../../../common_widgets/deliverer_drawer_item_appbar.dart';
import '../../../../../constants/image_strings.dart';

class DelivererSettings extends StatefulWidget {
  const DelivererSettings({Key? key}) : super(key: key);

  @override
  State<DelivererSettings> createState() => _DelivererSettingsState();
}

class _DelivererSettingsState extends State<DelivererSettings> {

  var initialPasswordController = TextEditingController();
  var passwordController = TextEditingController();
  var confirmPasswordController = TextEditingController();

  bool _obscureTextCurrent = true;
  bool _obscureTextNew = true;
  bool _obscureTextConfirm = true;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const DelivererDrawerItemAppbar(title: "Settings"),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            SingleChildScrollView(
              keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.all(20.0),
                    margin: const EdgeInsets.all(20.0),
                    decoration: BoxDecoration(
                      color: Colors.black38,
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Center(
                      child: Column(
                        children: [
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: const [
                              Text(
                                'Reset Password',
                                style: TextStyle(
                                  fontSize: 20,
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 15.0,),
                          TextField(
                            controller: initialPasswordController,
                            obscureText: _obscureTextCurrent,
                            keyboardType: TextInputType.visiblePassword,
                            maxLength: 8,
                            decoration: InputDecoration(
                              labelText: 'Password',
                              counterText: '',
                              labelStyle: const TextStyle(color: Color(0xFFfebf10), fontSize: 17),
                              suffixIcon: GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _obscureTextCurrent = !_obscureTextCurrent;
                                  });
                                },
                                child: Icon(
                                  _obscureTextCurrent
                                      ? Icons.visibility_off
                                      : Icons.visibility,
                                  color: const Color(0xFFfebf10),
                                  size: 18,
                                ),
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
                              fontSize: 17,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 15.0,),
                          TextField(
                            controller: passwordController,
                            obscureText: _obscureTextNew,
                            keyboardType: TextInputType.visiblePassword,
                            maxLength: 8,
                            decoration: InputDecoration(
                              labelText: 'New Password',
                              counterText: '',
                              labelStyle: const TextStyle(color: Color(0xFFfebf10), fontSize: 17),
                              suffixIcon: GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _obscureTextNew = !_obscureTextNew;
                                  });
                                },
                                child: Icon(
                                  _obscureTextNew
                                      ? Icons.visibility_off
                                      : Icons.visibility,
                                  color: const Color(0xFFfebf10),
                                  size: 18,
                                ),
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
                              fontSize: 17,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 15.0,),
                          TextField(
                            controller: confirmPasswordController,
                            obscureText: _obscureTextConfirm,
                            keyboardType: TextInputType.visiblePassword,
                            maxLength: 8,
                            decoration: InputDecoration(
                              labelText: 'Confirm Password',
                              counterText: '',
                              labelStyle: const TextStyle(color: Color(0xFFfebf10), fontSize: 17),
                              suffixIcon: GestureDetector(
                                onTap: () {
                                  setState(() {
                                    _obscureTextConfirm = !_obscureTextConfirm;
                                  });
                                },
                                child: Icon(
                                  _obscureTextConfirm
                                      ? Icons.visibility_off
                                      : Icons.visibility,
                                  color: const Color(0xFFfebf10),
                                  size: 18,
                                ),
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
                              fontSize: 17,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 10.0,),
                          Center(
                            child: Container(
                              width: 150,
                              height: 35,
                              padding: const EdgeInsets.only(left: 5, right: 5),
                              child: AnimatedButton(
                                text: "Reset",
                                buttonTextStyle: const TextStyle(
                                  color: Colors.black,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                                color: const Color(0xFFfebf10),
                                pressEvent: () {
                                  resetInitialPassword();
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
  void resetInitialPassword() async {
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
    String? userToken = pref.getString("JwtToken");
    var response = await http.patch(
      Uri.parse("http://$hostName:5000/api/v1/Auth/resetpassword"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "CurrentPassword": initialPasswordController.text,
        "NewPassword": passwordController.text,
        "ConfirmPassword": confirmPasswordController.text,
      }),
    );
    Navigator.pop(context);
    if(response.statusCode == 201) {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      successAwesomeDialog(DialogType.success, msg, "Success");
    } else {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      awesomeDialog(DialogType.warning, msg, "Warning");
    }
  }
  successAwesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: (){
        Navigator.pop(context);
      },
    ).show();
  }
  awesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: (){},
    ).show();
  }
}
