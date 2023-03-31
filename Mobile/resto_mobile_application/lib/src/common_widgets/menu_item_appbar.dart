import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../features/authentication/screens/Customer/customer_main_page.dart';
import '../features/authentication/screens/Products/product_cart.dart';

class MenuItemAppBar extends StatelessWidget implements PreferredSizeWidget{
  final int choice;
  final String title;
  final Widget Function() navigationScreen;
  const MenuItemAppBar({Key? key,
    required this.title,
    required this.navigationScreen,
    required this.choice
  }) : super(key: key);

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
                return navigationScreen();
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
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return ProductCart(choice: choice);
                  },
                ),
              );
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
