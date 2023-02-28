import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'customer_search.dart';

class CustomerAppbar extends StatelessWidget implements PreferredSizeWidget{
  const CustomerAppbar({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      foregroundColor: const Color(0xFFfebf10),
      elevation: 0,
      title: Text(title),
      actions:  <Widget>[
        Padding(
          padding: const EdgeInsets.only(right: 20.0),
          child: IconButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return const CustomerSearch();
                  },
                ),
              );
            },
            icon: const Icon(Icons.search),
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
