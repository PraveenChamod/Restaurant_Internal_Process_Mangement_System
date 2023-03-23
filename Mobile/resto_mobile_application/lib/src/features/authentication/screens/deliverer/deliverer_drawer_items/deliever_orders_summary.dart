import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../../common_widgets/background_image.dart';
import '../../../../../common_widgets/deliverer_drawer_item_appbar.dart';

class DelivererOrdersSum extends StatefulWidget {
  const DelivererOrdersSum({Key? key}) : super(key: key);

  @override
  State<DelivererOrdersSum> createState() => _DelivererOrdersSumState();
}

class _DelivererOrdersSumState extends State<DelivererOrdersSum> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const DelivererDrawerItemAppbar(title: "Orders Summary"),
        body: Stack(
          children: const [
            BackgroundImage(),
          ],
        ),
      ),
    );
  }
}
