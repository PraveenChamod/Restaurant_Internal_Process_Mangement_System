import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../Drawer_Items/favourites_screen.dart';
import '../Drawer_Items/help_center_screen.dart';
import '../Drawer_Items/my_account_screen.dart';
import '../Drawer_Items/orders_screen.dart';
import '../Drawer_Items/settings_screen.dart';
import '../home_screen.dart';

class CustomerHomeDrawer extends StatefulWidget {
  const CustomerHomeDrawer({Key? key}) : super(key: key);

  @override
  State<CustomerHomeDrawer> createState() => _CustomerHomeDrawerState();
}

class _CustomerHomeDrawerState extends State<CustomerHomeDrawer> {
  String userEmail = "";
  @override
  void initState() {
    super.initState();
    getCred();
  }
  void getCred() async {
    //This getCred function is use to fetch credentials from SharerdPreferences
    SharedPreferences pref = await SharedPreferences.getInstance();
    setState(() {
      userEmail = pref.getString("LoginEmail")!;
    });
  }
  
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
              children:  [
                const CircleAvatar(
                  radius: 40,
                  backgroundImage: AssetImage('assets/Food Types/Burger/Chicken_Burger.jpg'),
                ),
                const SizedBox(height: 10.0,),
                const Text('Praveen Chamod',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.white70,
                  ),
                ),
                const SizedBox(height: 10.0,),
                Text(
                  userEmail!,
                  //'praveenchamod23@gmail.com',
                  style: const TextStyle(
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
              logout();
            },
          ),
        ],
      ),
    );
  }

  void logout() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    await pref.remove("LoginId");
    await pref.remove("LoginEmail");
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const HomeScreen(),
      ),
    );
  }
}
