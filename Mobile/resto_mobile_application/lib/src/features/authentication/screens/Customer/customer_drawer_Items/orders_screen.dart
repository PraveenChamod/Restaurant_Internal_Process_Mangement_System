import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../../common_widgets/background_image.dart';
import '../../../../../common_widgets/drawer_item_appbar.dart';


class OrdersScreen extends StatelessWidget {
  const OrdersScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const DrawerItemAppbar(title: "Orders"),
        body: Stack(
          children: const <Widget>[
            BackgroundImage(),
          ],
        ),
      ),
    );
  }
}
