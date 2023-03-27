import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../features/authentication/screens/Customer/customer_home.dart';
import '../features/authentication/screens/Customer/customer_main_page.dart';

class DrawerItemAppbar extends StatelessWidget implements PreferredSizeWidget{
  final String title;
  const DrawerItemAppbar({Key? key, required this.title, }) : super(key: key);

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
                return const CustomerMainPage(choice: 3,);
              },
            ),
          );
        },
        icon: const Icon(Icons.chevron_left),
      ),
      title: Text(title),
      backgroundColor: const Color(0xFF161b1d),
      centerTitle: true,
    );
  }

  @override
  // TODO: implement preferredSize
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
