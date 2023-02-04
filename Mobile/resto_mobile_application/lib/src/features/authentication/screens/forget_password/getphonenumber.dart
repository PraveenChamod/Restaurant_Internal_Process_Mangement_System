import 'package:fl_country_code_picker/fl_country_code_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../constants/image_strings.dart';

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
                            decoration: InputDecoration(
                              labelText: 'Enter phone number',
                              border: InputBorder.none,
                              labelStyle: const TextStyle(color: Colors.white70),
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
                                                color: Colors.white70,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
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
                              if(countryCode!= null) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                        content: Text(
                                          //'phoneNumberController' is the what we want here for authentication part
                                            "${countryCode!.dialCode}-${phoneNumberController.text.trim()}")));
                              }else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                        content: Text(
                                            "Please select a Country Code")));
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
