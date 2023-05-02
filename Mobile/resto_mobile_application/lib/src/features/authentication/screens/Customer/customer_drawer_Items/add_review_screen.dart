import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../../common_widgets/background_image.dart';
import '../../../../../common_widgets/drawer_item_appbar.dart';
import '../../../../../constants/image_strings.dart';
import '../customer_main_page.dart';

class FavouritesScreen extends StatefulWidget {
  const FavouritesScreen({Key? key}) : super(key: key);

  @override
  State<FavouritesScreen> createState() => _FavouritesScreenState();
}

class _FavouritesScreenState extends State<FavouritesScreen> {
  var reviewController = TextEditingController();

  num rateValue = 0;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const DrawerItemAppbar(title: "Add Review"),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            Column(
              children: [
                Expanded(
                  flex: 5,
                  child: SingleChildScrollView(
                    keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: Container(
                            width: MediaQuery.of(context).size.width,
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
                              padding: const EdgeInsets.all(20.0),
                              child: Column(
                                children: [
                                  const SizedBox(height: 10.0,),
                                  RatingBar.builder(
                                    unratedColor: Colors.white70,
                                    initialRating: 3,
                                    minRating: 1,
                                    direction: Axis.horizontal,
                                    allowHalfRating: true,
                                    itemCount: 5,
                                    itemPadding: const EdgeInsets.symmetric(horizontal: 4.0),
                                    itemBuilder: (context, _) => const Icon(
                                      Icons.star,
                                      color: Color(0xFFfebf10),
                                    ),
                                    onRatingUpdate: (rating) {
                                      rateValue = rating;
                                    },
                                  ),
                                  const SizedBox(height: 20.0,),
                                  const Text(
                                    'Rate Us',
                                    style: TextStyle(
                                      fontSize: 23,
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                  const SizedBox(height: 10.0,),
                                ],
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(20.0),
                          child: Container(
                            width: MediaQuery.of(context).size.width,
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
                              padding: const EdgeInsets.all(20.0),
                              child: Column(
                                children: [
                                  const SizedBox(height: 10.0,),
                                  TextFormField(
                                    maxLines: null,
                                    keyboardType: TextInputType.multiline,
                                    controller: reviewController,
                                    style: const TextStyle(
                                      fontSize: 18,
                                      color: Color(0xFFfebf10),
                                      fontWeight: FontWeight.bold,
                                    ),
                                    decoration: InputDecoration(
                                      labelText: 'Share Your Opinion',
                                      labelStyle: const TextStyle(
                                        fontSize: 18,
                                        color: Color(0xFFfebf10),
                                      ),
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                      ),
                                      enabledBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                      ),
                                      focusedBorder: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(10),
                                        borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                      ),
                                      suffixIcon: const Icon(
                                        Icons.edit,
                                        color: Color(0xFFfebf10),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 20.0,),
                                  const Text(
                                    'Write A Review',
                                    style: TextStyle(
                                      fontSize: 23,
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xFFfebf10),
                                    ),
                                  ),
                                  const SizedBox(height: 10.0,),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Container(
                    width: MediaQuery.of(context).size.width,
                    decoration: const BoxDecoration(
                      color: Colors.black38,
                    ),
                    child: Center(
                      child: Container(
                        width: 150,
                        height: 35,
                        padding: const EdgeInsets.only(left: 5, right: 5),
                        child: AnimatedButton(
                          text: "Submit",
                          buttonTextStyle: const TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                          color: const Color(0xFFfebf10),
                          pressEvent: () {
                            addReview(reviewController.text, rateValue);
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

  void addReview(String reviewText, num rateValue) async {
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
    final http.Response response = await http.post(
      Uri.parse("http://$hostName:5000/api/v1/Blogs"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "Review":reviewText,
        "Rate":rateValue,
      }),
    );
    Navigator.pop(context);
    if(response.statusCode == 201) {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      awesomeDialog(DialogType.success, msg, "Success");
    }else{
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
