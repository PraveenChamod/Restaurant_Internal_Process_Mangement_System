import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SpecialEventContainer extends StatefulWidget {
  const SpecialEventContainer({Key? key}) : super(key: key);

  @override
  State<SpecialEventContainer> createState() => _SpecialEventContainerState();
}

class _SpecialEventContainerState extends State<SpecialEventContainer> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 280,
      //height: 100,
      padding: const EdgeInsets.all(5.0),
      decoration: BoxDecoration(
        color: Colors.black38,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.all(2.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Expanded(
              flex: 1,
              child: Text(
                'Birthday Party',
                style: TextStyle(
                  color: Color(0xFFfebf10),
                  fontSize: 17.0,
                ),
              ),
            ),
            Expanded(
              flex: 2,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(left: 5.0, right: 5.0),
                      child: Container(
                        width: 10.0,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: const Color(0xFFCD7F32), width: 1),
                        ),
                        child: Column(
                          children: const [
                            Expanded(
                              child: Text(
                                'Bronze',
                                style: TextStyle(
                                  color: Color(0xFFCD7F32),
                                  fontSize: 17.0,
                                ),
                              ),
                            ),
                            Expanded(
                              child: Text(
                                'Package',
                                style: TextStyle(
                                  color: Color(0xFFCD7F32),
                                  fontSize: 15.0,
                                ),
                              ),
                            ),
                            Expanded(
                              child: Text(
                                'Rs. 500',
                                style: TextStyle(
                                  color: Color(0xFFCD7F32),
                                  fontSize: 15.0,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(left: 5.0, right: 5.0),
                      child: Container(
                        width: 10.0,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: const Color(0xFFC0C0C0), width: 1),
                        ),
                        child: Column(
                          children: const [
                            Expanded(
                              child: Text(
                                'Silver',
                                style: TextStyle(
                                  color: Color(0xFFC0C0C0),
                                  fontSize: 17.0,
                                ),
                              ),
                            ),
                            Expanded(
                              child: Text(
                                'Package',
                                style: TextStyle(
                                  color: Color(0xFFC0C0C0),
                                  fontSize: 15.0,
                                ),
                              ),
                            ),
                            Expanded(
                              child: Text(
                                'Rs. 700',
                                style: TextStyle(
                                  color: Color(0xFFC0C0C0),
                                  fontSize: 15.0,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(left: 5.0, right: 5.0),
                      child: Container(
                        width: 10.0,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(color: const Color(0xFFFFD700), width: 1),
                        ),
                        child: Column(
                          children: const [
                            Expanded(
                              child: Text(
                                'Gold',
                                style: TextStyle(
                                  color: Color(0xFFFFD700),
                                  fontSize: 17.0,
                                ),
                              ),
                            ),
                            Expanded(
                              child: Text(
                                'Package',
                                style: TextStyle(
                                  color: Color(0xFFFFD700),
                                  fontSize: 15.0,
                                ),
                              ),
                            ),
                            Expanded(
                              child: Text(
                                'Rs. 900',
                                style: TextStyle(
                                  color: Color(0xFFFFD700),
                                  fontSize: 15.0,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              flex: 1,
              child: Center(
                child: Container(
                  width: 130,
                  height: 25,
                  padding: const EdgeInsets.only(left: 5, right: 5, top: 5.0),
                  child: AnimatedButton(
                    text: "More Details",
                    buttonTextStyle: const TextStyle(
                      color: Colors.black,
                      fontSize: 15,
                    ),
                    color: const Color(0xFFfebf10),
                    pressEvent: () {},
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(0),
                      topRight: Radius.circular(80),
                      bottomLeft: Radius.circular(80),
                      bottomRight: Radius.circular(80),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
