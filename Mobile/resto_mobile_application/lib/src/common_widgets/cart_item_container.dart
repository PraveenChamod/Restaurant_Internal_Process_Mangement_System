import 'dart:convert';
import 'package:animated_icon_button/animated_icon_button.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../constants/image_strings.dart';
import '../features/authentication/screens/Products/product_cart.dart';

class CartItemContainer extends StatefulWidget {
  final int choice;
  final String cartItemImagePath;
  final String cartItemName;
  final String cartId;
  final String cartItemId;
  final int cartItemQty;
  final int totalPrice;

  const CartItemContainer({Key? key,
    required this.cartItemImagePath,
    required this.cartItemName,
    required this.cartItemQty,
    required this.totalPrice,
    required this.cartId,
    required this.cartItemId,
    required this.choice,
  }) : super(key: key);

  @override
  State<CartItemContainer> createState() => _CartItemContainerState();
}

class _CartItemContainerState extends State<CartItemContainer> {
  int totalCount = 0;
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(left: 15.0, top: 15.0, right: 15.0, bottom: 5.0),
      decoration: BoxDecoration(
        color: Colors.black38,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          Expanded(
            flex: 1,
            child: Center(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.network(
                  widget.cartItemImagePath,
                  width: 100,
                ),
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  flex: 1,
                  child: Text(
                    widget.cartItemName,
                    style: const TextStyle(
                      color: Color(0xFFfebf10),
                      fontSize: 20.0,
                    ),
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Text(
                    'Quantity: ${widget.cartItemQty}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18.0,
                    ),
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Text(
                    'Sub Total: Rs.${widget.totalPrice}',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18.0,
                    ),
                  ),
                ),
                Expanded(
                  flex: 2,
                  child: Row(
                    children: [
                      Expanded(
                        child: Container(
                          color: Colors.transparent,
                          child: Center(
                            child: AnimatedIconButton(
                              onPressed: () {
                                openBottomSheet(widget.cartItemQty);
                              },
                              duration: const Duration(milliseconds: 500),
                              icons: <AnimatedIconItem>[
                                AnimatedIconItem(
                                  icon: const Icon(
                                    Icons.change_circle,
                                    color: Color(0xFFfebf10),
                                    size: 30.0,
                                  ),
                                  onPressed: () {},
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: Container(
                          color: Colors.transparent,
                          child: Center(
                            child: AnimatedIconButton(
                              onPressed: () {
                                removeFromCart(widget.cartId, widget.cartItemId);
                              },
                              duration: const Duration(milliseconds: 500),
                              icons: <AnimatedIconItem>[
                                AnimatedIconItem(
                                  icon: const Icon(
                                    Icons.delete,
                                    color: Colors.red,
                                    size: 30.0,
                                  ),
                                  onPressed: () {},
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                //Expanded(child: Container(),),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void openBottomSheet(int val){
    setState(() {
      totalCount = val;
    });
    showModalBottomSheet(
      backgroundColor: Colors.black38,
      context: context,
      builder: (BuildContext context){
        return SizedBox(
          height: 180,
          child: Container(
            color: Colors.black38,
            child: Column(
              children: [
                Expanded(
                  child: Center(
                    child: Text(widget.cartItemName,
                      style: const TextStyle(
                        fontSize: 23,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFFfebf10),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      Expanded(
                        child: IconButton(
                            onPressed: () {
                              setState(() {
                                totalCount++;
                              });
                              Navigator.pop(context);
                              openBottomSheet(totalCount);
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
                            if(totalCount > 1){
                              setState(() {
                                totalCount--;
                              });
                            }
                            Navigator.pop(context);
                            openBottomSheet(totalCount);
                          },
                          icon: const Icon(
                            Icons.remove_circle,
                            color: Color(0xFFfebf10),
                            size: 24.0,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Center(
                    child: Container(
                      width: 150,
                      height: 35,
                      padding: const EdgeInsets.only(left: 5, right: 5),
                      child: AnimatedButton(
                        text: "Update Cart",
                        buttonTextStyle: const TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                        color: const Color(0xFFfebf10),
                        pressEvent: () {
                          successAwesomeDialogBottomSheet(
                              DialogType.info,
                              '${widget.cartItemName} x $totalCount will add to the Cart.',
                              "Inform", totalCount,
                              widget.cartItemId
                          );
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
              ],
            ),
          ),
        );
      },
    );
  }
  successAwesomeDialogBottomSheet(DialogType type, String desc, String title, int updatedCount, String cartItemId) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      showCloseIcon: true,
      desc: desc,
      btnOkOnPress: (){
        updateCart(updatedCount, cartItemId);
      },
    ).show();
  }
  void updateCart(int qty, String foodId) async {
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

  awesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: (){
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              return ProductCart(choice: widget.choice);
            },
          ),
        );
      },
    ).show();
  }

  //Remove Cart Item
  void removeFromCart(String cartId, String foodId) async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    var response = await http.patch(
      Uri.parse("http://$hostName:5000/api/v1/FoodItem"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "cartId": cartId,
        "foodId": foodId
      }),
    );
    if(response.statusCode == 200) {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      successAwesomeDialog(DialogType.success, msg, "Success");
    } else {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      unSuccessAwesomeDialog(DialogType.warning, msg, "Warning");
    }
  }
  //AwesomeDialog for Remove Item from cart
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
  successAwesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: (){
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              return ProductCart(choice: widget.choice);
            },
          ),
        );
      },
    ).show();
  }
}
