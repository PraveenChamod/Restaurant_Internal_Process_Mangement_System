import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:path/path.dart' as path;
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../../common_widgets/background_image.dart';
import '../../../../../common_widgets/deliverer_drawer_item_appbar.dart';
import '../../../../../constants/image_strings.dart';

class DelivererAccount extends StatefulWidget {
  const DelivererAccount({Key? key}) : super(key: key);

  @override
  State<DelivererAccount> createState() => _DelivererAccountState();
}

class _DelivererAccountState extends State<DelivererAccount> {

  //For Get User Input
  var nameController = TextEditingController();
  var emailController = TextEditingController();
  var contactController = TextEditingController();

  ///-----------------------For get image from gallery----------------------------///
  File? _image;
  Future getImage(ImageSource source) async {
    try{
      final image = await ImagePicker().pickImage(source: source);
      if(image == null ) return;
      final imagePermanent = await saveFilePermanently(image.path);

      setState(() {
        _image = imagePermanent;
      });
    }on PlatformException catch (e){
      print('failed to pick Image: $e');
    }
  }
  Future<File> saveFilePermanently(String imagePath) async{
    final directory = await getApplicationDocumentsDirectory();
    final name = path.basename(imagePath);
    final image = File('${directory.path}/$name');
    return File(imagePath).copy(image.path);
  }
  ///----------------------------------------------------------------------------///
  late Future<Map<String, dynamic>> _futureData;
  @override
  void initState() {
    super.initState();
    _futureData = getUserDetails();
  }
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const DelivererDrawerItemAppbar(title: "My Account"),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            SingleChildScrollView(
              keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
              child: Container(
                padding: const EdgeInsets.all(10.0),
                margin: const EdgeInsets.all(10.0),
                decoration: BoxDecoration(
                  color: Colors.black38,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Center(
                  child: FutureBuilder(
                    future: _futureData,
                    builder: (context, snapshot){
                      if(snapshot.hasData){
                        final String userImagePath = snapshot.data!['user']['ProfileImage'];
                        final String userName = snapshot.data!['user']['Name'];
                        final String userEmail = snapshot.data!['user']['Email'];
                        final String userContact = snapshot.data!['user']['ContactNumber'];
                        final String imageUrl = 'http://$hostName:5000/images/$userImagePath';

                        nameController = TextEditingController(text: userName);
                        emailController = TextEditingController(text: userEmail);
                        contactController = TextEditingController(text: userContact);

                        return Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            _image != null
                                ? ClipRRect(
                                borderRadius: BorderRadius.circular(70.0),
                                child: Image.file(_image!, width: 140, height: 140, fit: BoxFit.cover,))
                                : CircleAvatar(
                              radius: 70,
                              backgroundImage: NetworkImage(imageUrl),
                            ),
                            const SizedBox(height: 10.0,),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Expanded(child: Container(),),
                                Center(
                                  child: Container(
                                    width: 160,
                                    height: 35,
                                    padding: const EdgeInsets.only(left: 5, right: 5),
                                    child: AnimatedButton(
                                      icon: Icons.camera_alt,
                                      text: 'Choose From Gallery',
                                      buttonTextStyle: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      color: Colors.transparent,
                                      pressEvent: () {
                                        getImage(ImageSource.gallery);
                                      },
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 10.0,),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Personal Info:',
                                  style: TextStyle(
                                    fontSize: 20,
                                    color: Colors.white,
                                  ),
                                ),
                                Expanded(
                                  flex: 1,
                                  child: Container(),
                                ),
                                Center(
                                  child: Container(
                                    width: 150,
                                    height: 35,
                                    padding: const EdgeInsets.only(left: 5, right: 5),
                                    child: AnimatedButton(
                                      text: "Upload Profile Img",
                                      buttonTextStyle: const TextStyle(
                                        color: Colors.black,
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      color: const Color(0xFFfebf10),
                                      pressEvent: () {
                                        _image != null
                                            ? updateProfilePicture()
                                            : unSuccessAwesomeDialog(DialogType.warning, 'Firstly you have to select new Image!', "Warning");
                                      },
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 10.0,),
                            TextFormField(
                              controller: nameController,
                              style: const TextStyle(
                                fontSize: 15,
                                color: Color(0xFFfebf10),
                                fontWeight: FontWeight.bold,
                              ),
                              decoration: InputDecoration(
                                labelText: 'Name',
                                labelStyle: const TextStyle(
                                  fontSize: 15,
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
                                  Icons.person,
                                  color: Color(0xFFfebf10),
                                ),
                              ),
                            ),
                            const SizedBox(height: 10.0,),
                            TextFormField(
                              controller: emailController,
                              style: const TextStyle(
                                fontSize: 15,
                                color: Color(0xFFfebf10),
                                fontWeight: FontWeight.bold,
                              ),
                              decoration: InputDecoration(
                                labelText: 'Email',
                                labelStyle: const TextStyle(
                                  fontSize: 15,
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
                                  Icons.email,
                                  color: Color(0xFFfebf10),
                                ),
                              ),
                            ),
                            const SizedBox(height: 10.0,),
                            TextFormField(
                              controller: contactController,
                              style: const TextStyle(
                                fontSize: 15,
                                color: Color(0xFFfebf10),
                                fontWeight: FontWeight.bold,
                              ),
                              decoration: InputDecoration(
                                labelText: 'Contact Number',
                                labelStyle: const TextStyle(
                                  fontSize: 15,
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
                                  Icons.phone_android,
                                  color: Color(0xFFfebf10),
                                ),
                              ),
                            ),
                            const SizedBox(height: 10.0,),
                            Center(
                              child: Container(
                                width: 150,
                                height: 35,
                                padding: const EdgeInsets.only(left: 5, right: 5),
                                child: AnimatedButton(
                                  text: "Update Profile",
                                  buttonTextStyle: const TextStyle(
                                    color: Colors.black,
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                  color: const Color(0xFFfebf10),
                                  pressEvent: () {
                                    updateDelivererDetails();
                                  },
                                ),
                              ),
                            ),
                          ],
                        );
                      }else if (snapshot.hasError) {
                        return Text('${snapshot.error}');
                      }
                      return const CircularProgressIndicator();
                    },
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
  Future<Map<String, dynamic>> getUserDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    print("In the getUserDetails() ${userToken!}");
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

  void updateDelivererDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userEmail = pref.getString("LoginEmail");
    String? userToken = pref.getString("JwtToken");
    var response = await http.patch(
      Uri.parse("http://$hostName:5000/api/v1/User/Profile/$userEmail"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "Name": nameController.text,
        "Email": emailController.text,
        "ContactNumber": contactController.text,
      }),
    );
    if(response.statusCode == 201) {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      print(msg);
      successAwesomeDialog(DialogType.success, msg, "Success");
    } else {
      final json = jsonDecode(response.body);
      final msg = json["message"];
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
              return const DelivererAccount();
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

  void updateProfilePicture() async {
    File? imageFile = _image;
    if (imageFile == null) {
      return;
    }
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userEmail = pref.getString("LoginEmail");
    String? userToken = pref.getString("JwtToken");
    var request = http.MultipartRequest(
      'PATCH',
      Uri.parse("http://$hostName:5000/api/v1/Auth/ProfilePicture"),
    );
    request.headers.addAll({
      "Authorization": "Bearer $userToken",
    });
    request.files.add(await http.MultipartFile.fromPath(
      'image',
      imageFile.path,
    ));
    var response = await request.send();
    if(response.statusCode == 201) {
      final json = jsonDecode(await response.stream.bytesToString());
      final msg = json["message"];
      print(msg);
      successAwesomeDialog(DialogType.success, msg, "Success");
    } else {
      final json = jsonDecode(await response.stream.bytesToString());
      final msg = json["message"];
      print(msg);
    }
  }
}
