import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../../constants/image_strings.dart';
import 'login_screen.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({Key? key}) : super(key: key);

  @override
  State<SignupScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<SignupScreen> {
  int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {

    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.black,
        body: Stack(
          children: <Widget>[
            Container(
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: AssetImage(commonBackgroundImage),
                  fit: BoxFit.cover,
                ),
              ),
            ),

            SingleChildScrollView(
              keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  const SizedBox(height: 20,),
                  const Image(
                    image: AssetImage(commonLogo),
                    width: 200,
                  ),
                  const SizedBox(height: 10,),
                  Center(
                    child: Container(
                      height: 470,
                      //height: MediaQuery.of(context).size.height/1.45,
                      width: MediaQuery.of(context).size.width/1.25,
                      padding: const EdgeInsets.all(20.0),
                      decoration: BoxDecoration(
                        color: const Color(0xFF1b1b1d),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          const Text('SIGN UP',
                            style: TextStyle(
                              fontSize: 23,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          const SizedBox(height: 5,),
                          const Text('Please Enter User Informations',
                            style: TextStyle(
                              fontSize: 15,
                              color: Colors.white70,
                            ),
                          ),
                          //const SizedBox(height: 10),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: const TextField(
                              keyboardType: TextInputType.emailAddress,
                              decoration: InputDecoration(
                                labelText: 'Email',
                                labelStyle: TextStyle(color: Colors.white70),
                                suffixIcon: Icon(CupertinoIcons.envelope_fill, color: Colors.white70, size: 18,),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white),
                                ),
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                          //const SizedBox(height: 10,),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: const TextField(
                              obscureText: true,
                              keyboardType: TextInputType.visiblePassword,
                              decoration: InputDecoration(
                                labelText: 'Password',
                                labelStyle: TextStyle(color: Colors.white70),
                                suffixIcon: Icon(CupertinoIcons.eye_slash_fill, color: Colors.white70, size: 18,),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white),
                                ),
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                          //const SizedBox(height: 10,),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: const TextField(
                              obscureText: true,
                              keyboardType: TextInputType.visiblePassword,
                              decoration: InputDecoration(
                                labelText: 'Confirm Password',
                                labelStyle: TextStyle(color: Colors.white70),
                                suffixIcon: Icon(CupertinoIcons.eye_slash_fill, color: Colors.white70, size: 18,),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white),
                                ),
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                          //const SizedBox(height: 10,),
                          SizedBox(
                            width: MediaQuery.of(context).size.width/1.25 - 40,
                            child: const TextField(
                              keyboardType: TextInputType.number,
                              decoration: InputDecoration(
                                labelText: 'Contact No.',
                                labelStyle: TextStyle(color: Colors.white70),
                                suffixIcon: Icon(CupertinoIcons.phone_badge_plus, color: Colors.white70, size: 18,),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Colors.white),
                                ),
                                focusedBorder: UnderlineInputBorder(
                                  borderSide: BorderSide(color: Color(0xFFFFFF33)),
                                ),
                              ),
                              style: TextStyle(
                                color: Colors.white,
                              ),
                            ),
                          ),
                          const SizedBox(height: 20,),
                          Center(
                            child: ElevatedButton(
                              onPressed: () {
                                // Navigator.of(context).push(
                                //   MaterialPageRoute(
                                //       builder: (_){
                                //         return const LoginScreen();
                                //       },
                                //   ),
                                // );
                              },
                              style: ElevatedButton.styleFrom(
                                padding: const EdgeInsets.all(10.0),
                                fixedSize: const Size(150, 30),
                                backgroundColor: const Color.fromRGBO(254, 191, 16, 10),
                                elevation: 15,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(20.0),
                                ),
                              ),
                              child: const Text(
                                'SIGN UP',
                                style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 10,),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Text('Already Have An Account?',
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.white70,
                                ),
                              ),
                              TextButton(
                                style: TextButton.styleFrom(
                                  foregroundColor: const Color(0xFFfebf10),
                                  textStyle: const TextStyle(fontSize: 15),
                                ),
                                onPressed: () {
                                  Navigator.of(context).push(
                                    MaterialPageRoute(
                                      builder: (_){
                                        return const LoginScreen();
                                      },
                                    ),
                                  );
                                },
                                child: const Text('Login'),
                              ),
                            ],
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
        // bottomNavigationBar: BottomNavigationBar(
        //   currentIndex: _currentIndex,
        //   iconSize: 25.0,
        //   items: const [
        //     BottomNavigationBarItem(
        //       icon: Icon(
        //         Icons.home,
        //         color: Color(0xFFfebf10),
        //       ),
        //       label: 'Home',
        //       backgroundColor: Color(0xFF030b0b),
        //     ),
        //     BottomNavigationBarItem(
        //       icon: Icon(
        //         Icons.support_agent,
        //         color: Color(0xFFfebf10),
        //       ),
        //       label: 'Support',
        //       backgroundColor: Color.fromRGBO(22, 26, 29, 100),
        //     ),
        //     BottomNavigationBarItem(
        //       icon: Icon(
        //         Icons.notifications,
        //         color: Color(0xFFfebf10),
        //       ),
        //       label: 'Notification',
        //       backgroundColor: Color.fromRGBO(22, 26, 29, 100),
        //     ),
        //     BottomNavigationBarItem(
        //       icon: Icon(
        //         Icons.menu,
        //         color: Color(0xFFfebf10),
        //       ),
        //       label: 'Menu',
        //       backgroundColor: Color.fromRGBO(22, 26, 29, 100),
        //     ),
        //   ],
        //   onTap: (index) {
        //     setState((){
        //       _currentIndex = index;
        //     });
        //   },
        //   selectedItemColor: const Color(0xFFfebf10),
        // ),
      ),
    );
  }
}
