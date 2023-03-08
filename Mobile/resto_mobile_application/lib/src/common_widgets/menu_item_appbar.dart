import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../features/authentication/screens/Customer/customer_main_page.dart';

class MenuItemAppBar extends StatelessWidget implements PreferredSizeWidget{
  final String title;
  const MenuItemAppBar({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      foregroundColor: const Color(0xFFfebf10),
      elevation: 0,
      leading: IconButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_){
                return const CustomerMainPage();
              },
            ),
          );
        },
        icon: const Icon(Icons.chevron_left),
      ),
      title: Text(title),
      actions:  <Widget>[
        Padding(
          padding: const EdgeInsets.only(right: 20.0),
          child: IconButton(
            onPressed: () {
              // Navigator.of(context).push(
              //   MaterialPageRoute(
              //     builder: (_){
              //       return const CustomerCart();
              //     },
              //   ),
              // );
            },
            icon: const Icon(Icons.shopping_cart),
          ),
          //child: Icon(Icons.search),
        ),
      ],
      backgroundColor: const Color(0xFF161b1d),
      centerTitle: true,
    );
  }

  @override
  // TODO: implement preferredSize
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
