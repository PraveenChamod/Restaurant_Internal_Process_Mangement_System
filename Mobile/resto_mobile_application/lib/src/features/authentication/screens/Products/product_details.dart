import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/Products/product_items.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/menu_item_appbar.dart';

class ProductDetails extends StatelessWidget {
  final String category;
  const ProductDetails({Key? key, required this.category}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: MenuItemAppBar(
          title: '',  navigationScreen: () => ProductItems(category: category,),
        ),
        body: Stack(
          children: [
            const BackgroundImage(),
            Center(
              child: Column(
                children: [
                  Expanded(
                    child: Container(

                      decoration: const BoxDecoration(
                        color: Colors.red,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(0),
                          topRight: Radius.circular(80),
                          bottomLeft: Radius.circular(80),
                          bottomRight: Radius.circular(0),
                        ),
                        image: DecorationImage(
                          image: AssetImage('assets/Food Types/Desert/FruitSalad.jpg'),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Column(
                      children: [
                        Expanded(
                          child: Container(
                            decoration: const BoxDecoration(
                              color: Colors.black38,
                              borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(80),
                                topRight: Radius.circular(80),
                                bottomLeft: Radius.circular(0),
                                bottomRight: Radius.circular(0),
                              ),
                            ),
                            child: Center(
                              child: Column(
                                children: const [
                                  Spacer(),
                                  Text('Fruit Salad',
                                    style: TextStyle(
                                      fontSize: 23,
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                  Spacer(),
                                  Text('Unit Price: Rs.500',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                  Spacer(),
                                ],
                              ),
                            ),
                          ),
                        ),
                        const Divider(
                          color: Color(0xFFfebf10),
                        ),
                        Expanded(
                          child: Container(
                            color: Colors.black38,
                            child: Row(
                              children: [
                                Expanded(
                                  child: Column(
                                    children: const [
                                      Spacer(),
                                      Text('Total Price',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                      Spacer(),
                                      Text('Rs.500',
                                        style: TextStyle(
                                          fontSize: 17,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                      Spacer(),
                                    ],
                                  ),
                                ),
                                Expanded(
                                  child: Row(
                                    children: [
                                      Expanded(
                                        child: IconButton(
                                          onPressed: () {},
                                          icon: const Icon(
                                            Icons.add_circle,
                                            color: Color(0xFFfebf10),
                                            size: 24.0,
                                          )
                                        ),
                                      ),
                                      const Expanded(
                                        child: Center(
                                          child: Text('1',
                                            style: TextStyle(
                                              fontSize: 17,
                                              fontWeight: FontWeight.bold,
                                              color: Color(0xFFfebf10),
                                            ),
                                          ),
                                        ),
                                      ),
                                      Expanded(
                                        child: IconButton(
                                            onPressed: () {},
                                            icon: const Icon(
                                              Icons.remove_circle,
                                              color: Color(0xFFfebf10),
                                              size: 24.0,
                                            )
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        const Divider(
                          color: Color(0xFFfebf10),
                        ),
                        Expanded(
                          child: Container(
                            color: Colors.black38,
                            child: Row(
                              children: [
                                Expanded(
                                  child: Center(
                                    child: Container(
                                      width: 150,
                                      height: 35,
                                      padding: const EdgeInsets.only(left: 5, right: 5),
                                      child: AnimatedButton(
                                        text: "Add To Cart",
                                        buttonTextStyle: const TextStyle(
                                          color: Colors.black,
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                        color: const Color(0xFFfebf10),
                                        pressEvent: () {},
                                        borderRadius: const BorderRadius.only(
                                          topLeft: Radius.circular(0),
                                          topRight: Radius.circular(80),
                                          bottomLeft: Radius.circular(80),
                                          bottomRight: Radius.circular(80),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                                Expanded(
                                  child: Center(
                                    child: Container(
                                      width: 150,
                                      height: 35,
                                      padding: const EdgeInsets.only(left: 5, right: 5),
                                      child: AnimatedButton(
                                        text: "Buy Now",
                                        buttonTextStyle: const TextStyle(
                                          color: Colors.black,
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                        ),
                                        color: const Color(0xFFfebf10),
                                        pressEvent: () {},
                                        borderRadius: const BorderRadius.only(
                                          topLeft: Radius.circular(0),
                                          topRight: Radius.circular(80),
                                          bottomLeft: Radius.circular(80),
                                          bottomRight: Radius.circular(80),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
