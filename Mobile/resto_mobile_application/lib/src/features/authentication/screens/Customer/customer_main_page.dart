import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'customer_appbar.dart';
import 'customer_cart.dart';
import 'customer_home.dart';
import 'customer_home_drawer.dart';
import 'customer_notification.dart';
import 'customer_support.dart';

class CustomerMainPage extends StatefulWidget {
  final int choice;
  const CustomerMainPage({Key? key,
    required this.choice}) : super(key: key);

  @override
  State<CustomerMainPage> createState() => _CustomerMainPageState();
}

class _CustomerMainPageState extends State<CustomerMainPage> {
  int _currentIndex = 0;
  final screens = [
    const CustomerHome(),
    const CustomerSupport(),
    const CustomerNotification(),
    const CustomerCart(choice: 3,),
  ];

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        drawer: _currentIndex == 0 || _currentIndex == 1 || _currentIndex == 2 || _currentIndex == 3
            ? const CustomerHomeDrawer()
            : null,
        appBar: _currentIndex == 0
            ? const CustomerAppbar(title: 'Welcome To Resto',)
            : _currentIndex == 1
            ? const CustomerAppbar(title: 'Customer Support',)
            : _currentIndex == 2
            ? const CustomerAppbar(title: 'Notification',)
            : _currentIndex == 3
            ? const CustomerAppbar(title: 'Cart',)
            : null,
        body: screens[_currentIndex],
        backgroundColor: const Color(0xFF161b1d),
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

