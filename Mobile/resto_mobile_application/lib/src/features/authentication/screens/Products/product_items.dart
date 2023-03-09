import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/menu_appbar.dart';
import '../../../../common_widgets/menu_item_appbar.dart';
import '../Customer/customer_appbar.dart';

class ProductItems extends StatefulWidget {
  const ProductItems({Key? key}) : super(key: key);

  @override
  State<ProductItems> createState() => _ProductItemsState();
}

class _ProductItemsState extends State<ProductItems> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const MenuItemAppBar(title: 'Catalog of Koththu',),
        body: Stack(
          children: const <Widget>[
            BackgroundImage(),
          ],
        ),
      ),
    );
  }
}
