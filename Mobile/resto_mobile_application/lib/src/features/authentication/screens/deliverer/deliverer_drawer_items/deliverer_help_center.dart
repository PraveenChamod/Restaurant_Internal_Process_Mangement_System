import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../../common_widgets/background_image.dart';
import '../../../../../common_widgets/deliverer_drawer_item_appbar.dart';

class DelivererHelpCenter extends StatefulWidget {
  const DelivererHelpCenter({Key? key}) : super(key: key);

  @override
  State<DelivererHelpCenter> createState() => _DelivererHelpCenterState();
}

class _DelivererHelpCenterState extends State<DelivererHelpCenter> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const DelivererDrawerItemAppbar(title: "Help Center"),
        body: Stack(
          children: const <Widget>[
            BackgroundImage(),
          ],
        ),
      ),
    );
  }
}
