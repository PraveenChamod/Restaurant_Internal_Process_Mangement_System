import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/Products/products_menu_categories.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/cart_item_container.dart';
import '../../../../constants/image_strings.dart';
import '../Customer/customer_main_page.dart';
import '../payments/delivery_online_order.dart';
import '../payments/dine_in_order.dart';

class ProductCart extends StatefulWidget {
  final int choice;
  const ProductCart({Key? key, required this.choice,}) : super(key: key);

  @override
  State<ProductCart> createState() => _ProductCartState();
}

class _ProductCartState extends State<ProductCart> {

  late Future<Map<String, dynamic>> _futureData;
  @override
  void initState() {
    super.initState();
    _futureData = getUserDetails();
  }

  final List<CartItems> data = [];
  num totalCartPrice = 0;

  var nameController = TextEditingController();
  var customerIdController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: AppBar(
          foregroundColor: const Color(0xFFfebf10),
          elevation: 0,
          leading: IconButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_){
                    return ProductMenuTitles(choice: widget.choice,);
                  },
                ),
              );
            },
            icon: const Icon(Icons.menu_book),
          ),
          title: const Text('Your Cart'),
          actions:  <Widget>[
            Padding(
              padding: const EdgeInsets.only(right: 20.0),
              child: IconButton(
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (_){
                        return const CustomerMainPage(choice: 2,);
                      },
                    ),
                  );
                },
                icon: const Icon(Icons.home),
              ),
            ),
          ],
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
        ),
        body: Stack(
          children: [
            const BackgroundImage(),
            Center(
              child: Column(
                children: [
                  Expanded(
                    flex: 6,
                    child: Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: FutureBuilder(
                        future: fetchCartData(),
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            return GridView.builder(
                              itemCount: snapshot.data!.length,
                              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 1,
                                mainAxisSpacing: 10,
                                mainAxisExtent: 140,
                              ),
                              itemBuilder: (BuildContext context, int index) {
                                return CartItemContainer(
                                  cartItemImagePath: 'http://$hostName:5000/Foodimages/${snapshot.data![index].cartFoodImagePath}',
                                  cartItemName: snapshot.data![index].cartFoodName,
                                  cartItemQty: snapshot.data![index].quantity,
                                  totalPrice: snapshot.data![index].totalPrice,
                                  cartId: snapshot.data![index].cartId,
                                  cartItemId: snapshot.data![index].foodId,
                                  choice: widget.choice,
                                );
                              },
                            );
                          }else if (snapshot.hasError) {
                            return Text('${snapshot.error}');
                          }
                          return const SizedBox(
                            height: 40,
                            width: 40,
                            child: Center(
                              child: CircularProgressIndicator(
                                color: Color(0xFFfebf10),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 1,
                    child: Container(
                      color: Colors.black38,
                      child: Column(
                        children: [
                          const Spacer(),
                          FutureBuilder(
                            future: fetchCartData(),
                            builder: (context, snapshot){
                              if (snapshot.hasData) {
                                for (int i = 0; i < snapshot.data!.length; i++) {
                                  totalCartPrice += snapshot.data![i].totalPrice;
                                }
                                return Center(
                                  child: Text('Total Price: Rs.$totalCartPrice',
                                    style: const TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                );
                              }else if (snapshot.hasError) {
                                return Text('${snapshot.error}');
                              }
                              return const SizedBox(
                                height: 20,
                                width: 20,
                                child: Center(
                                  child: CircularProgressIndicator(
                                    color: Color(0xFFfebf10),
                                  ),
                                ),
                              );
                            },
                          ),
                          const Spacer(),
                          Center(
                            child: Container(
                              width: 150,
                              height: 35,
                              padding: const EdgeInsets.only(left: 5, right: 5),
                              child: AnimatedButton(
                                text: "Check Out",
                                buttonTextStyle: const TextStyle(
                                  color: Colors.black,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                                color: const Color(0xFFfebf10),
                                pressEvent: () {
                                  String msg = '';
                                  widget.choice == 1
                                      ? msg = 'Your Order will prepared for Dine In the Restaurant!'
                                      : msg = 'Your Order will prepared for Delivery!';
                                  awesomeDialog(DialogType.infoReverse , msg, "Consider");
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
                          FutureBuilder(
                            future: _futureData,
                            builder: (context, snapshot) {
                              if(snapshot.hasData){
                                final String userName = snapshot.data!['user']['Name'];
                                final String userId = snapshot.data!['user']['id'];
                                nameController = TextEditingController(text: userName);
                                customerIdController = TextEditingController(text: userId);
                                return const Spacer();
                              }else if (snapshot.hasError) {
                                return Text('${snapshot.error}');
                              }
                              return const SizedBox(
                                height: 1,
                                width: 1,
                                child: Center(
                                  child: CircularProgressIndicator(
                                    color: Colors.transparent,
                                  ),
                                ),
                              );
                            }
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
    );
  }
  Future<List<dynamic>> fetchCartData() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/CartItems'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final cartFood = json.decode(response.body);
      return CartItems.fromJsonList(cartFood);
    } else {
      throw Exception('Failed to load data');
    }
  }
  awesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      showCloseIcon: true,
      title: title,
      desc: desc,
      btnOkOnPress: (){
        widget.choice == 1
            ? Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (_) {
                    return DineInOrder(
                      choice: widget.choice,
                      totalPrice: totalCartPrice,
                      customerId: customerIdController.text,
                      customerName: nameController.text,
                    );
                },
              ),
            ) : Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) {
                      return DeliveryOnlineOrder(totalPrice: totalCartPrice, choice: widget.choice,);
                    },
                  ),
              );
      },
    ).show();
  }
  Future<Map<String, dynamic>> getUserDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Auth/Profile'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load data');
    }
  }
}
class CartItems{
  final String cartFoodImagePath;
  final String cartFoodName;
  final String cartId;
  final String foodId;
  final int quantity;
  final int totalPrice;
  CartItems({
    required this.cartFoodImagePath,
    required this.cartFoodName,
    required this.totalPrice,
    required this.quantity,
    required this.cartId,
    required this.foodId,
  });
  factory CartItems.fromJson(Map<String, dynamic> json){
    return CartItems(
      cartFoodImagePath: json['image'],
      cartFoodName: json['name'],
      totalPrice: json['TotalPrice'],
      quantity: json['quantity'],
      cartId: json['cartId'],
      foodId: json['Foodid'],
    );
  }
  static List<CartItems> fromJsonList(dynamic jsonList){
    final cartItemsList = <CartItems>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        cartItemsList.add(CartItems.fromJson(json),);
      }
    }
    return cartItemsList;
  }
}
