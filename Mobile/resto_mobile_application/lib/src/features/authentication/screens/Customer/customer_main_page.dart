import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'customer_home.dart';

class CustomerMainPage extends StatefulWidget {
  const CustomerMainPage({Key? key}) : super(key: key);

  @override
  State<CustomerMainPage> createState() => _CustomerMainPageState();
}

class _CustomerMainPageState extends State<CustomerMainPage> {
  int _currentIndex = 0;
  final screens = [
    const CustomerHome(),
    const CustomerHome(),
    const CustomerHome(),
    const CustomerHome(),
  ];
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: screens[index],
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentIndex,
          iconSize: 25.0,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(
                Icons.home,
                color: Color(0xFFfebf10),
              ),
              label: 'Home',
              backgroundColor: Color(0xFF161b1d),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.support_agent,
                color: Color(0xFFfebf10),
              ),
              label: 'Support',
              backgroundColor: Color.fromRGBO(22, 26, 29, 100),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.notifications,
                color: Color(0xFFfebf10),
              ),
              label: 'Notification',
              backgroundColor: Color.fromRGBO(22, 26, 29, 100),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.shopping_cart,
                color: Color(0xFFfebf10),
              ),
              label: 'Cart',
              backgroundColor: Color.fromRGBO(22, 26, 29, 100),
            ),
          ],
          onTap: (index) {
            setState((){
              _currentIndex = index;
            });
          },
          selectedItemColor: const Color(0xFFfebf10),
        ),
      ),
    );
  }
}

