import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../Drawer_Items/favourites_screen.dart';
import '../Drawer_Items/help_center_screen.dart';
import '../Drawer_Items/my_account_screen.dart';
import '../Drawer_Items/orders_screen.dart';
import '../Drawer_Items/settings_screen.dart';

class CustomerHomeDrawer extends StatelessWidget {
  const CustomerHomeDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.white,
      width: MediaQuery.of(context).size.width/1.5,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
            topRight: Radius.circular(20),
            bottomRight: Radius.circular(20)),
      ),
      child: ListView(
        // Important: Remove any padding from the ListView.
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
              color: Color(0xFF161b1d),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: const [
                CircleAvatar(
                  radius: 40,
                  backgroundImage: AssetImage('assets/Food Types/Burger/Chicken_Burger.jpg'),
                ),
                SizedBox(height: 10.0,),
                Text('Praveen Chamod',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.white70,
                  ),
                ),
                SizedBox(height: 10.0,),
                Text('praveenchamod23@gmail.com',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.white70,
                  ),
                ),
              ],
            ),
          ),
          ListTile(
            leading: const Icon(
              Icons.person,
            ),
            title: const Text('My Account'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return const MyAccountScreen();
                  },
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(
              Icons.delivery_dining,
            ),
            title: const Text('Orders'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return const OrdersScreen();
                  },
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(
              Icons.favorite,
            ),
            title: const Text('Favourites'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return const FavouritesScreen();
                  },
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(
              Icons.settings,
            ),
            title: const Text('Settings'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return const SettingsScreen();
                  },
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(
              Icons.help,
            ),
            title: const Text('Help Center'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return const HelpCenterScreen();
                  },
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(
              Icons.logout,
            ),
            title: const Text('Log Out'),
            onTap: () {
              Navigator.pop(context);
            },
          ),
        ],
      ),
    );
  }
}
