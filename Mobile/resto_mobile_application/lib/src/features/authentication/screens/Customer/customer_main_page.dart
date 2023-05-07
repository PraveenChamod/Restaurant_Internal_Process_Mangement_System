import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'customer_appbar.dart';
import 'customer_cart.dart';
import 'customer_drawer_Items/orders_screen.dart';
import 'customer_home.dart';
import 'customer_home_drawer.dart';

class CustomerMainPage extends StatefulWidget {
  final int choice;
  const CustomerMainPage({Key? key,
    required this.choice
  }) : super(key: key);

  @override
  State<CustomerMainPage> createState() => _CustomerMainPageState();
}

class _CustomerMainPageState extends State<CustomerMainPage> {
  int _currentIndex = 0;
  final screens = [
    const CustomerHome(),
    OrdersScreen(),
    const CustomerCart(choice: 3,),
  ];

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        drawer: _currentIndex == 0 || _currentIndex == 1 || _currentIndex == 2
            ? const CustomerHomeDrawer()
            : null,
        appBar: _currentIndex == 0
            ? const CustomerAppbar(title: 'Welcome To Resto',)
            : _currentIndex == 1
            ? const CustomerAppbar(title: 'Your Orders',)
            : _currentIndex == 2
            ? const CustomerAppbar(title: 'Cart',)
            : null,
        body: screens[_currentIndex],
        backgroundColor: const Color(0xFF161b1d),
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentIndex,
          backgroundColor: const Color(0xFF161b1d),
          iconSize: 25.0,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(
                Icons.home,
                color: Color(0xFFfebf10),
              ),
              label: 'Home',
              backgroundColor: Color.fromRGBO(22, 26, 29, 100),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                //Icons.support_agent,
                Icons.lunch_dining,
                color: Color(0xFFfebf10),
              ),
              label: 'Orders',
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
          showUnselectedLabels: false,
        ),
      ),
    );
  }
}

