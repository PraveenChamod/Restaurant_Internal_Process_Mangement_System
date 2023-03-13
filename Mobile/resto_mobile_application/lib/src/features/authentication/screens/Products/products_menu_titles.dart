import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:resto_mobile_application/src/common_widgets/Menu_Container.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/menu_appbar.dart';
import '../Customer/customer_home.dart';
import '../Customer/customer_search.dart';

class ProductMenuTitles extends StatefulWidget {

  const ProductMenuTitles({Key? key}) : super(key: key);

  @override
  State<ProductMenuTitles> createState() => _ProductMenuTitlesState();
}

class _ProductMenuTitlesState extends State<ProductMenuTitles> {

  List<Map<String, String>> foodMenuItems = [
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Koththu",
    },
    {
      "ItemImagePath": "assets/Food Types/Rice/Veg_Rice.jpg",
      "ItemName": "Fried Rice",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Rice & Curry",
    },
    {
      "ItemImagePath": "assets/Food Types/Burger/Chicken_Burger.jpg",
      "ItemName": "Burger",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Appetizer",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Desert",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Beverages",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Salad",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Other",
    },
  ];
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const MenuAppBar(),
        // body: Stack(
        //   children: [
        //     const BackgroundImage(),
        //     Expanded(
        //       child: FutureBuilder(
        //         future: fetchData(),
        //         builder: (context, snapshot){
        //           if (snapshot.hasData) {
        //             return GridView.builder(
        //               itemCount: snapshot.data!.length,
        //               gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        //                 crossAxisCount: 2,
        //                 crossAxisSpacing: 10,
        //                 mainAxisSpacing: 10,
        //               ),
        //               itemBuilder: (BuildContext context, int index){
        //                 return MenuContainer(
        //                   ItemImagePath: snapshot.data![index].itemImagePath,
        //                   ItemName: snapshot.data![index].itemName,
        //                 );
        //               },
        //             );
        //           }else if (snapshot.hasError) {
        //             return Text('${snapshot.error}');
        //           }
        //           return const Center(
        //             child: CircularProgressIndicator(),
        //           );
        //         },
        //       ),
        //     ),
        //   ],
        // ),
        body: FutureBuilder<List<String>>(
          future: fetchData(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return ListView.builder(
                itemCount: snapshot.data!.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(snapshot.data![index]),
                  );
                },
              );
            } else if (snapshot.hasError) {
              return Text('${snapshot.error}');
            }
            return const CircularProgressIndicator();
          },
        )
        ,
      ),
    );
  }
  Future<List<String>> fetchData() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    String? id = pref.getString("LoginId");
    print("In the fetchdata() ${userToken!}");
    final response = await http.get(
      Uri.parse('http://192.168.8.181:5000/api/v1/Foods'),
      headers: {'Authorization': 'Bearer $userToken'},
    );
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      final List<String> dataList = List<String>.from(data);
      print('In 200 segment');
      return dataList;
    } else {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      return  msg;
      //throw Exception('Failed to load data');
    }
  }
}