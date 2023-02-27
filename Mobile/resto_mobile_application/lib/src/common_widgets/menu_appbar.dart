import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../features/authentication/screens/Customer/customer_cart.dart';
import '../features/authentication/screens/Customer/customer_home.dart';
import '../features/authentication/screens/Customer/customer_search.dart';

class MenuAppBar extends StatelessWidget implements PreferredSizeWidget{
  const MenuAppBar({Key? key}) : super(key: key);

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
                return const CustomerHome();
              },
            ),
          );
        },
        icon: const Icon(Icons.chevron_left),
      ),
      title: const Text("Menu"),
      actions:  <Widget>[
        Padding(
          padding: const EdgeInsets.only(right: 20.0),
          child: IconButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return const CustomerCart();
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
