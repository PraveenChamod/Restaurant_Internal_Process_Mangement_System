import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/order_item_container.dart';
import '../../../../constants/image_strings.dart';
import '../Customer/customer_main_page.dart';
import 'delivery_online_order.dart';
class DeliverySaveOrder extends StatefulWidget {
  final int choice;
  final String paymentMethod;
  final String address;
  final String customerId;
  final num totalPrice;

  const DeliverySaveOrder({Key? key,
    required this.paymentMethod,
    required this.address,
    required this.totalPrice,
    required this.choice,
    required this.customerId
  }) : super(key: key);

  @override
  State<DeliverySaveOrder> createState() => _DeliverySaveOrderState();
}

class _DeliverySaveOrderState extends State<DeliverySaveOrder> {
  final List<FoodList> orderFoods = [];

  final List<CartItems> data = [];

  Map<String, dynamic>? paymentIntent;

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
                    return DeliveryOnlineOrder(totalPrice: widget.totalPrice, choice: widget.choice,);
                  },
                ),
              );
            },
            icon: const Icon(Icons.chevron_left),
          ),
          title: const Text('Checkout'),
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
            Column(
              children: [
                Expanded(
                  flex: 5,
                  child: SingleChildScrollView(
                    child: Container(
                      decoration: const BoxDecoration(
                        color: Colors.black38,
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(20),
                          topRight: Radius.circular(20),
                          bottomLeft: Radius.circular(20),
                          bottomRight: Radius.circular(20),
                        ),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(15.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            SizedBox(
                              height: 300,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      const Divider(color: Color(0xFFfebf10),),
                                      const SizedBox(height: 5.0,),
                                      const Text(
                                        'Payment Method:',
                                        style: TextStyle(
                                          fontSize: 18,
                                          color: Colors.white,
                                        ),
                                      ),
                                      const SizedBox(height: 5.0,),
                                      Text(
                                        widget.paymentMethod,
                                        style: const TextStyle(
                                          fontSize: 15,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                      const SizedBox(height: 5.0,),
                                    ],
                                  ),
                                  const Divider(color: Color(0xFFfebf10),),
                                  const SizedBox(height: 5.0,),
                                  const Text(
                                    'Deliver To:',
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Colors.white,
                                    ),
                                  ),
                                  const SizedBox(height: 5.0,),
                                  Text(
                                    widget.address,
                                    style: const TextStyle(
                                      fontSize: 15,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                  const Divider(color: Color(0xFFfebf10),),
                                  const SizedBox(height: 5.0,),
                                  const Text(
                                    'Total Price:',
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Colors.white,
                                    ),
                                  ),
                                  const SizedBox(height: 5.0,),
                                  Text(
                                    "Rs. ${widget.totalPrice}",
                                    style: const TextStyle(
                                      fontSize: 15,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                  const SizedBox(height: 5.0,),
                                  Center(
                                    child: FutureBuilder(
                                      future: fetchOrderData(),
                                      builder: (context, snapshot){
                                        if (snapshot.hasData) {
                                          for (int i = 0; i < snapshot.data!.length; i++) {
                                            if(snapshot.data![i].foodId != null){
                                              orderFoods.add(FoodList(
                                                  foodId: snapshot.data![i].foodId,
                                                  qty: snapshot.data![i].quantity,
                                                  offerId: 'No')
                                              );
                                            }else{
                                              orderFoods.add(FoodList(
                                                  offerId: snapshot.data![i].offerId,
                                                  qty: snapshot.data![i].quantity,
                                                  foodId: 'No')
                                              );
                                            }
                                          }
                                          return const Divider(color: Color(0xFFfebf10),);
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
                                  ),
                                  const SizedBox(height: 5.0,),
                                  const Text(
                                    'Order Items:',
                                    style: TextStyle(
                                      fontSize: 18,
                                      color: Colors.white,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            SizedBox(
                              height: 180,
                              child: Center(
                                child: FutureBuilder(
                                  future: fetchOrderData(),
                                  builder: (context, snapshot) {
                                    if (snapshot.hasData) {
                                      return ListView.builder(
                                        scrollDirection: Axis.vertical,
                                        itemCount: snapshot.data!.length,
                                        itemBuilder: (context, index) {
                                          return OrderItemContainer(
                                            foodQuantity: snapshot.data![index].quantity,
                                            foodName: snapshot.data![index].foodName,
                                          );
                                        },
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
                              ),
                            ),
                            const Divider(color: Color(0xFFfebf10),),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Container(
                    decoration: const BoxDecoration(
                      color: Colors.black38,
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(20),
                        topRight: Radius.circular(20),
                        bottomLeft: Radius.circular(20),
                        bottomRight: Radius.circular(20),
                      ),
                    ),
                    child: Center(
                      child: Container(
                        width: 150,
                        height: 35,
                        padding: const EdgeInsets.only(left: 5, right: 5),
                        child: AnimatedButton(
                          text: "Place Order",
                          buttonTextStyle: const TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                          color: const Color(0xFFfebf10),
                          pressEvent: () {
                            widget.paymentMethod == 'Card Payments'
                                ? cardPayment(orderFoods, widget.paymentMethod, widget.totalPrice, 'Online Order', widget.customerId)
                                : orderItems(orderFoods, widget.paymentMethod, widget.totalPrice, 'Online Order', widget.customerId)
                            ;
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
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void orderItems(List<FoodList> foods, String paymentMethod, num totalPrice, String type, String customerId) async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final http.Response response = await http.post(
      Uri.parse("http://$hostName:5000/api/v1/OrderItem"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "Foods":foods,
        "paymentMethod":paymentMethod,
        "TotalPrice":totalPrice,
        "Type":type,
        "Customer":customerId
      }),
    );
    if(response.statusCode == 201) {
      final json = jsonDecode(response.body);
      final orderDetails = json["data"];
      final msg = json["message"];
      if(widget.paymentMethod != 'Card Payments'){
        successAwesomeDialog(DialogType.success, 'Your Order Is Placed Successfully.', "Success");
      }
    }else{
      final json = jsonDecode(response.body);
      final msg = json["message"];
      unSuccessAwesomeDialog(DialogType.warning, msg, "Warning");
    }
  }

  //For get order data
  Future<List<dynamic>> fetchOrderData() async {
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

  //Payment Intent
  Future<void> cardPayment(List<FoodList> foods, String paymentMethod, num totalPrice, String type, String customerId) async {
    showDialog(
      context: context,
      builder: (context){
        return const Center(
          child: CircularProgressIndicator(
            color: Color(0xFFfebf10),
          ),
        );
      },
    );
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    String? userEmail = pref.getString("LoginEmail");
    final http.Response response = await http.post(
      Uri.parse("http://$hostName:5000/api/v1/Payment"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "amount":totalPrice,
        "receipt_email":userEmail,
      }),
    );
    Navigator.pop(context);
    if(response.statusCode == 201) {
      final json = jsonDecode(response.body);
      paymentIntent = json;
    }else{
      final json = jsonDecode(response.body);
    }
    //Initialize Payment Sheet
    await Stripe.instance.initPaymentSheet(
      paymentSheetParameters: SetupPaymentSheetParameters(
        paymentIntentClientSecret: paymentIntent!['clientSecret'],
        style: ThemeMode.system,
        merchantDisplayName: 'Resto_Mobile_App',)).then((value) => {}
    );
    //Display the payment sheet
    try{
      await Stripe.instance.presentPaymentSheet().then((value) => {
        print('Payment Success'),
        orderItems(foods, paymentMethod, totalPrice, type, customerId),
        successAwesomeDialog(DialogType.success, 'Payment Success & Your Order Is Placed.', "Success"),
      });
    }catch(error){
      unSuccessAwesomeDialog(DialogType.warning, 'Payment Unsuccessful Try Again!', "Warning");
      throw Exception(error);
    }
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
              return const CustomerMainPage(choice: 2,);
            },
          ),
        );
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
}

//For get orderliness data
class CartItems{
  final String foodName;
  final String? foodId;
  final String? offerId;
  final int quantity;
  CartItems({
    required this.quantity,
    required this.foodId,
    required this.offerId,
    required this.foodName,
  });
  factory CartItems.fromJson(Map<String, dynamic> json){
    return CartItems(
      quantity: json['quantity'],
      foodId: json['Foodid'],
      offerId: json['Offerid'],
      foodName: json['name']
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
class FoodList {
  final String foodId;
  final String offerId;
  final int qty;
  FoodList({required this.qty, required this.foodId, required this.offerId});
  Map<String, dynamic> toJson() {
    if (offerId == 'No') {
      return {
        'food': foodId,
        'Quantity': qty,
      };
    } else{
      return {
        'offer': offerId,
        'Quantity': qty,
      };
    }
  }
}