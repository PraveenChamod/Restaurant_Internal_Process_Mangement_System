import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../features/authentication/screens/deliverer/deliverer_home.dart';

class DelivererDrawerItemAppbar extends StatelessWidget implements PreferredSizeWidget{
  final String title;
  const DelivererDrawerItemAppbar({Key? key, required this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      foregroundColor: const Color(0xFFfebf10),
      elevation: 0,
      leading: IconButton(
        onPressed: () {
          Navigator.pop(context);
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
