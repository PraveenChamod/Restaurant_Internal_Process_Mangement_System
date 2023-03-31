import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/Products/product_cart.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/Products/product_items.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/menu_item_appbar.dart';
import 'package:http/http.dart' as http;
import '../../../../constants/image_strings.dart';
class ProductDetails extends StatefulWidget {
  final int choice;
  final String itemImagePath;
  final String category;
  final String itemName;
  final String itemId;
  final int price;
  const ProductDetails({Key? key,
    required this.category,
    required this.itemName,
    required this.itemImagePath,
    required this.price,
    required this.itemId,
    required this.choice
  }) : super(key: key);

  @override
  State<ProductDetails> createState() => _ProductDetailsState();
}

class _ProductDetailsState extends State<ProductDetails> {

  int totalPrice = 0;
  int totalCount = 0;
  void incrementCounter(int init) {
    setState(() {
      totalPrice+=init;
      totalCount++;
    });
  }
  void decrementCounter(int init) {
    if(totalCount != 0 ){
      setState(() {
        totalPrice-=init;
        totalCount--;
      });
    }
  }

  @override
  Widget build(BuildContext context) {

    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: MenuItemAppBar(
          title: '',
          navigationScreen: () => ProductItems(category: widget.category, choice: widget.choice,),
          choice: widget.choice,
        ),
        body: Stack(
          children: [
            const BackgroundImage(),
            Center(
              child: Column(
                children: [
                  Expanded(
                    child: Container(
                      width: MediaQuery.of(context).size.width,
                      decoration: const BoxDecoration(
                        color: Colors.black38,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(0),
                          topRight: Radius.circular(80),
                          bottomLeft: Radius.circular(80),
                          bottomRight: Radius.circular(0),
                        ),
                      ),
                      child: Image.network(
                        widget.itemImagePath,
                        fit: BoxFit.cover,
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
                                children: [
                                  const Spacer(),
                                  Text(widget.itemName,
                                    style: const TextStyle(
                                      fontSize: 23,
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                  const Spacer(),
                                  Text('Unit Price: Rs.${widget.price}',
                                    style: const TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                  const Spacer(),
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
                                    children: [
                                      const Spacer(),
                                      const Text('Total Price',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                      const Spacer(),
                                      Text('Rs.$totalPrice',
                                        style: const TextStyle(
                                          fontSize: 17,
                                          fontWeight: FontWeight.bold,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                      const Spacer(),
                                    ],
                                  ),
                                ),
                                Expanded(
                                  child: Row(
                                    children: [
                                      Expanded(
                                        child: IconButton(
                                            onPressed: () {
                                              incrementCounter(widget.price);
                                            },
                                            icon: const Icon(
                                              Icons.add_circle,
                                              color: Color(0xFFfebf10),
                                              size: 24.0,
                                            )
                                        ),
                                      ),
                                      Expanded(
                                        child: Center(
                                          child: Text('$totalCount',
                                            style: const TextStyle(
                                              fontSize: 17,
                                              fontWeight: FontWeight.bold,
                                              color: Color(0xFFfebf10),
                                            ),
                                          ),
                                        ),
                                      ),
                                      Expanded(
                                        child: IconButton(
                                            onPressed: () {
                                              decrementCounter(widget.price);
                                            },
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
                                        pressEvent: () {
                                          if(totalCount != 0){
                                            successAwesomeDialog(
                                                DialogType.info,
                                                '${widget.itemName} x $totalCount will add to the Cart.',
                                                "Inform", totalCount, widget.itemId, widget.choice
                                            );
                                          }else{
                                            unSuccessAwesomeDialog(
                                                DialogType.warning,
                                                'Please add the item count',
                                                "Warning"
                                            );
                                          }
                                        },
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
  awesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: (){
        title == "Success" ?
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              return ProductCart(choice: widget.choice,);
            },
          ),
        ) : null;
      },
    ).show();
  }
  successAwesomeDialog(DialogType type, String desc, String title, int qty, String foodId, int choice) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      showCloseIcon: true,
      title: title,
      desc: desc,
      btnOkOnPress: (){
        addToCart(totalCount, widget.itemId);
      },
    ).show();
  }
  unSuccessAwesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: (){},
    ).show();
  }
  void addToCart(int qty, String foodId) async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    var response = await http.post(
      Uri.parse("http://$hostName:5000/api/v1/CartItem"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "foodId": foodId,
        "quantity": qty
      }),
    );
    if(response.statusCode == 201) {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      awesomeDialog(DialogType.success, msg, "Success");
    } else {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      unSuccessAwesomeDialog(DialogType.warning, msg, "Warning");
    }
  }
}
