import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/drawer_item_appbar.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _isChecked1 = false;
  bool _isChecked2 = false;
  bool _isChecked3 = false;
  bool _isChecked4 = false;
  Color getColor(Set<MaterialState> states) {
    const Set<MaterialState> interactiveStates = <MaterialState>{
      MaterialState.pressed,
      MaterialState.hovered,
      MaterialState.focused,
    };
    if (states.any(interactiveStates.contains)) {
      return Colors.blue;
    }
    return Colors.red;
  }
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const DrawerItemAppbar(title: "Settings"),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            Container(
              padding: const EdgeInsets.all(10.0),
              margin: const EdgeInsets.all(10.0),
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
                          'Push Notifications',
                          style: TextStyle(
                            fontSize: 20,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10.0,),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text(
                          'Allow Push Notifications',
                          style: TextStyle(
                            fontSize: 18,
                            color: Color(0xFFfebf10),
                          ),
                        ),
                        Expanded(child: Container(),),
                        Checkbox(
                          checkColor: Colors.white,
                          fillColor: MaterialStateProperty.resolveWith(getColor),
                          value: _isChecked1,
                          onChanged: (bool? value) {
                            setState(() {
                              _isChecked1 = value!;
                            });
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 10.0,),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text(
                          'Order Updates',
                          style: TextStyle(
                            fontSize: 18,
                            color: Color(0xFFfebf10),
                          ),
                        ),
                        Expanded(child: Container(),),
                        Checkbox(
                          checkColor: Colors.white,
                          fillColor: MaterialStateProperty.resolveWith(getColor),
                          value: _isChecked2,
                          onChanged: (bool? value) {
                            setState(() {
                              _isChecked2 = value!;
                            });
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 10.0,),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text(
                          'New Arrivals',
                          style: TextStyle(
                            fontSize: 18,
                            color: Color(0xFFfebf10),
                          ),
                        ),
                        Expanded(child: Container(),),
                        Checkbox(
                          checkColor: Colors.white,
                          fillColor: MaterialStateProperty.resolveWith(getColor),
                          value: _isChecked3,
                          onChanged: (bool? value) {
                            setState(() {
                              _isChecked3 = value!;
                            });
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 10.0,),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text(
                          'Promotions',
                          style: TextStyle(
                            fontSize: 18,
                            color: Color(0xFFfebf10),
                          ),
                        ),
                        Expanded(child: Container(),),
                        Checkbox(
                          checkColor: Colors.white,
                          fillColor: MaterialStateProperty.resolveWith(getColor),
                          value: _isChecked4,
                          onChanged: (bool? value) {
                            setState(() {
                              _isChecked4 = value!;
                            });
                          },
                        ),
                      ],
                    ),
                    const SizedBox(height: 10.0,),
                    Center(
                      child: Container(
                        width: 100,
                        height: 35,
                        padding: const EdgeInsets.only(left: 5, right: 5),
                        child: AnimatedButton(
                          text: "Save",
                          buttonTextStyle: const TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                          color: const Color(0xFFfebf10),
                          pressEvent: () {

                          },
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
    );
  }
}
