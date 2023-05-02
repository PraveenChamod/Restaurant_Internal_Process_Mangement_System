import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../../common_widgets/background_image.dart';
import '../../../../../common_widgets/drawer_item_appbar.dart';
import '../../../../../constants/image_strings.dart';

class HelpCenterScreen extends StatelessWidget {
  const HelpCenterScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const DrawerItemAppbar(title: "Help & FAQs"),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            SingleChildScrollView(
              child: Column(
                children: [
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Container(
                        width: MediaQuery.of(context).size.width,
                        padding: const EdgeInsets.all(15.0),
                        decoration: BoxDecoration(
                          color: Colors.black38,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text(
                              'FAQs:',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFFfebf10),
                              ),
                            ),
                            SizedBox(
                              height: 10.0,
                            ),
                            Text(
                              '1. What payment options are available on the app?',
                              style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white
                              ),
                            ),
                            Text(
                              'You can use card payment option and cash on delivery option.',
                              textAlign: TextAlign.justify,
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white70
                              ),
                            ),
                            Divider(
                              color: Color(0xFFfebf10),
                            ),
                            Text(
                              'Guidelines:',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFFfebf10),
                              ),
                            ),
                            SizedBox(
                              height: 10.0,
                            ),
                            Text(
                              'Online Ordering:',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: Colors.white
                              ),
                            ),
                            Text(
                              'Select the online order tile and hit plus icon. Then select and add the food item into cart. Then view the cart and buy it.',
                              textAlign: TextAlign.justify,
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white70
                              ),
                            ),
                            SizedBox(
                              height: 5.0,
                            ),
                            Text(
                              'Outlet Dine In:',
                              style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white
                              ),
                            ),
                            Text(
                              'Select the explore menu at restaurant tile and hit plus icon. Then select and add the food item into cart. Then view the cart and buy it.',
                              textAlign: TextAlign.justify,
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white70
                              ),
                            ),
                            SizedBox(
                              height: 5.0,
                            ),
                            Text(
                              'Table Reservation:',
                              style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white
                              ),
                            ),
                            Text(
                              'Select the table reservation tile and hit plus icon. Then select which type of table and reserve it.',
                              textAlign: TextAlign.justify,
                              style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white70
                              ),
                            ),
                            SizedBox(
                              height: 10.0,
                            ),
                            Divider(
                              color: Color(0xFFfebf10),
                            ),
                            Text(
                              'Troubleshooting Tips:',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFFfebf10),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Container(
                        height: 420,
                        width: MediaQuery.of(context).size.width,
                        padding: const EdgeInsets.all(15.0),
                        decoration: BoxDecoration(
                          color: Colors.black38,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children:  [
                            const Expanded(
                              flex: 1,
                              child: Text(
                                'Developed By:',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                            ),
                            Expanded(
                              flex: 4,
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Column(
                                      children: [
                                        Expanded(
                                          flex: 4,
                                          child: Center(
                                            child: Container(
                                              decoration: BoxDecoration(
                                                border: Border.all(
                                                  color: const Color(0xFFfebf10),
                                                  width: 2.0,
                                                  style: BorderStyle.solid,
                                                ),
                                                shape: BoxShape.circle,
                                              ),
                                              child: ClipRRect(
                                                borderRadius: BorderRadius.circular(50.0),
                                                child: Image.asset(
                                                  mainDeveloper,
                                                  width: 100,
                                                  height: 80,
                                                  fit: BoxFit.cover,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                        const Expanded(
                                          flex: 1,
                                          child: Text(
                                            'Praveen Chamod',
                                            style: TextStyle(
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
                                              color: Color(0xFFfebf10),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Expanded(
                                    child: Column(
                                      children: [
                                        Expanded(
                                          flex: 4,
                                          child: Center(
                                            child: Container(
                                              decoration: BoxDecoration(
                                                border: Border.all(
                                                  color: const Color(0xFFfebf10),
                                                  width: 2.0,
                                                  style: BorderStyle.solid,
                                                ),
                                                shape: BoxShape.circle,
                                              ),
                                              child: ClipRRect(
                                                borderRadius: BorderRadius.circular(50.0),
                                                child: Image.asset(
                                                  mainDeveloper,
                                                  width: 100,
                                                  height: 80,
                                                  fit: BoxFit.cover,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                        const Expanded(
                                          flex: 1,
                                          child: Text(
                                            'Aravinda Chathuranga',
                                            style: TextStyle(
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
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
                            Expanded(
                              flex: 4,
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Column(
                                      children: [
                                        Expanded(
                                          flex: 4,
                                          child: Center(
                                            child: Container(
                                              decoration: BoxDecoration(
                                                border: Border.all(
                                                  color: const Color(0xFFfebf10),
                                                  width: 2.0,
                                                  style: BorderStyle.solid,
                                                ),
                                                shape: BoxShape.circle,
                                              ),
                                              child: ClipRRect(
                                                borderRadius: BorderRadius.circular(50.0),
                                                child: Image.asset(
                                                  coDeveloper1,
                                                  width: 100,
                                                  height: 80,
                                                  fit: BoxFit.cover,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                        const Expanded(
                                          flex: 1,
                                          child: Text(
                                            'Kasuni Nihara',
                                            style: TextStyle(
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
                                              color: Color(0xFFfebf10),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Expanded(
                                    child: Column(
                                      children: [
                                        Expanded(
                                          flex: 4,
                                          child: Center(
                                            child: Container(
                                              decoration: BoxDecoration(
                                                border: Border.all(
                                                  color: const Color(0xFFfebf10),
                                                  width: 2.0,
                                                  style: BorderStyle.solid,
                                                ),
                                                shape: BoxShape.circle,
                                              ),
                                              child: ClipRRect(
                                                borderRadius: BorderRadius.circular(50.0),
                                                child: Image.asset(
                                                  mainDeveloper,
                                                  width: 100,
                                                  height: 80,
                                                  fit: BoxFit.cover,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                        const Expanded(
                                          flex: 1,
                                          child: Text(
                                            'Shyaman Dhanushka',
                                            style: TextStyle(
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
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
                            Expanded(
                              flex: 4,
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Column(
                                      children: [
                                        Expanded(
                                          flex: 4,
                                          child: Center(
                                            child: Container(
                                              decoration: BoxDecoration(
                                                border: Border.all(
                                                  color: const Color(0xFFfebf10),
                                                  width: 2.0,
                                                  style: BorderStyle.solid,
                                                ),
                                                shape: BoxShape.circle,
                                              ),
                                              child: ClipRRect(
                                                borderRadius: BorderRadius.circular(50.0),
                                                child: Image.asset(
                                                  mainDeveloper,
                                                  width: 100,
                                                  height: 80,
                                                  fit: BoxFit.cover,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                        const Expanded(
                                          flex: 1,
                                          child: Text(
                                            'Dilmith Dilhara',
                                            style: TextStyle(
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
                                              color: Color(0xFFfebf10),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Expanded(
                                    child: Column(
                                      children: [
                                        Expanded(
                                          flex: 4,
                                          child: Center(
                                            child: Container(
                                              decoration: BoxDecoration(
                                                border: Border.all(
                                                  color: const Color(0xFFfebf10),
                                                  width: 2.0,
                                                  style: BorderStyle.solid,
                                                ),
                                                shape: BoxShape.circle,
                                              ),
                                              child: ClipRRect(
                                                borderRadius: BorderRadius.circular(50.0),
                                                child: Image.asset(
                                                  mainDeveloper,
                                                  width: 100,
                                                  height: 80,
                                                  fit: BoxFit.cover,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                        const Expanded(
                                          flex: 1,
                                          child: Text(
                                            'Chamodya Hansini',
                                            style: TextStyle(
                                              fontSize: 15,
                                              fontWeight: FontWeight.bold,
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
}
