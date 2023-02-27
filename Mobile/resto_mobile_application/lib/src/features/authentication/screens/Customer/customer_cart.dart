import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../common_widgets/background_image.dart';
import '../Products/Products_Menu_Titles.dart';
import 'customer_home.dart';

class CustomerCart extends StatelessWidget {
  const CustomerCart({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
          backgroundColor: const Color(0xFF161b1d),
          appBar: AppBar(
            foregroundColor: const Color(0xFFfebf10),
            elevation: 0,
            leading: IconButton(
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_){
                      return const ProductMenuTitles();
                    },
                  ),
                );
              },
              icon: const Icon(Icons.chevron_left),
            ),
            title: const Text("Your Cart"),
            backgroundColor: const Color(0xFF161b1d),
            centerTitle: true,
          ),
          body: Stack(
            children: const [
              BackgroundImage(),
            ],
          ),
        ),
    );
  }
}
