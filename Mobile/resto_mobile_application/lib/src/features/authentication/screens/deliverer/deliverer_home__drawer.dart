import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../constants/image_strings.dart';
import '../home_screen.dart';
import 'deliverer_drawer_items/deliever_orders_summary.dart';
import 'deliverer_drawer_items/deliverer_account.dart';
import 'deliverer_drawer_items/deliverer_help_center.dart';
import 'deliverer_drawer_items/deliverer_settings.dart';

class DelivererHomeDrawer extends StatefulWidget {
  const DelivererHomeDrawer({Key? key}) : super(key: key);

  @override
  State<DelivererHomeDrawer> createState() => _DelivererHomeDrawerState();
}

class _DelivererHomeDrawerState extends State<DelivererHomeDrawer> {
  late Future<Map<String, dynamic>> _futureData;
  @override
  void initState() {
    super.initState();
    _futureData = getUserDetails();
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
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
              color: Color(0xFF161b1d),
            ),

            child: Center(
              child: FutureBuilder<Map<String, dynamic>>(
                future: _futureData,
                builder: (context, snapshot){
                  if(snapshot.hasData){
                    final String userImagePath = snapshot.data!['user']['ProfileImage'];
                    final String userName = snapshot.data!['user']['Name'];
                    final String userEmail = snapshot.data!['user']['Email'];
                    final String imageUrl = 'http://$hostName:5000/images/$userImagePath';
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children:  [
                        CircleAvatar(
                          radius: 40,
                          backgroundImage: NetworkImage(imageUrl),
                        ),
                        const SizedBox(height: 10.0,),
                        Text(
                          userName,
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.white70,
                          ),
                        ),
                        const SizedBox(height: 10.0,),
                        Text(
                          userEmail,
                          style: const TextStyle(
                            fontSize: 12,
                            color: Colors.white70,
                          ),
                        ),
                      ],
                    );
                  }else if (snapshot.hasError) {
                    return Text('${snapshot.error}');
                  }
                  return const CircularProgressIndicator();
                },
              ),
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
                    return const DelivererAccount();
                  },
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(
              Icons.delivery_dining,
            ),
            title: const Text('Orders Summary'),
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return const DelivererOrdersSum();
                  },
                ),
              );
            },
          ),
          const Divider(),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            child: Text('Configurations',),
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
                    return const DelivererSettings();
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
                    return const DelivererHelpCenter();
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
  //Function for logout and Remove the SharedPreferences information about logged user.
  void logout() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    await pref.remove("LoginId");
    await pref.remove("LoginEmail");
    await pref.remove("LoginUserRole");
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const HomeScreen(),
      ),
    );
  }
  Future<Map<String, dynamic>> getUserDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    print("In the getUserDetails() ${userToken!}");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Auth/Profile'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load data');
    }
  }
}
