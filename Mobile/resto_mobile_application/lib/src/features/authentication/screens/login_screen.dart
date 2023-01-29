import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/signup_screen.dart';
import '../../../constants/image_strings.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
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
            Positioned(
              top: MediaQuery.of(context).size.height/20,
              left: 0,
              right: 0,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  AnimatedPositioned(
                    duration: Duration(milliseconds: 2000),
                    top: 150,
                    left: 150,
                    child: Image(
                      image: AssetImage(commonLogo),
                      width: 200,
                    ),
                  ),
                ],
              ),
            ),
            Center(
              child: Container(
                height: MediaQuery.of(context).size.height/2,
                width: MediaQuery.of(context).size.width/1.25,
                padding: EdgeInsets.only(left:MediaQuery.of(context).size.width/12, right:MediaQuery.of(context).size.width/12),
                decoration: BoxDecoration(
                  //color: Colors.white,
                  color: const Color(0xFF1b1b1b),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    const SizedBox(height: 20,),
                    const Text('LOGIN',
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 10,),
                    const Text('Please login to Your Account',
                      style: TextStyle(
                        fontSize: 15,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(height: 10,),
                    SizedBox(
                      width: MediaQuery.of(context).size.width/1.25 - MediaQuery.of(context).size.width/6,
                      child: const TextField(
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
                    const SizedBox(height: 10,),
                    const SizedBox(
                      width: 250,
                      child: TextField(
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
                    const SizedBox(height: 10,),
                    Container(
                      alignment: Alignment.centerRight,
                      child: TextButton(
                        style: TextButton.styleFrom(
                          foregroundColor: const Color(0xFFfebf10),
                          padding: const EdgeInsets.only(left: 8.0, top: 8.0, right: 0.0, bottom: 8.0),
                          textStyle: const TextStyle(fontSize: 15),
                        ),
                        onPressed: () {},
                        child: const Text('Forgot Password ?'),
                      ),
                    ),
                    const SizedBox(height: 10,),
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
                          'LOGIN',
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
                        const Text('Doesn\'t Have An Account ?',
                          style: TextStyle(
                            fontSize: 15,
                            color: Colors.white70,
                          ),
                        ),
                        TextButton(
                          style: TextButton.styleFrom(
                            foregroundColor: const Color(0xFFfebf10),
                            //padding: const EdgeInsets.only(left: 8.0, top: 8.0, right: 8.0, bottom: 8.0),
                            textStyle: const TextStyle(fontSize: 15),
                          ),
                          onPressed: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (_){
                                  return const SignupScreen();
                                },
                              ),
                            );
                          },
                          child: const Text('Sign Up'),
                        ),
                      ],
                    ),
                    const SizedBox(height: 5,),
                    const Text('--OR Sign Up With--',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(height: 10,),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(CupertinoIcons.f_cursive_circle, color: Color(0xFFfebf10),),
                        Icon(Icons.g_mobiledata_rounded, color: Color(0xFFfebf10)),
                        Icon(CupertinoIcons.t_bubble, color: Color(0xFFfebf10)),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),

        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentIndex,
          iconSize: 30.0,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(
                Icons.home,
                color: Color(0xFFfebf10),
              ),
              label: 'Home',
              //backgroundColor: Color(0xFF030b0b),
              backgroundColor: Color(0xFF1b1b1b),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.support_agent,
                color: Color(0xFFfebf10),
              ),
              label: 'Support',
              backgroundColor: Color.fromRGBO(22, 26, 29, 100),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.notifications,
                color: Color(0xFFfebf10),
              ),
              label: 'Notification',
              backgroundColor: Color.fromRGBO(22, 26, 29, 100),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                Icons.menu,
                color: Color(0xFFfebf10),
              ),
              label: 'Menu',
              backgroundColor: Color.fromRGBO(22, 26, 29, 100),
            ),
          ],
          onTap: (index) {
            setState((){
              _currentIndex = index;
            });
          },
          selectedItemColor: const Color(0xFFfebf10),
        ),
        floatingActionButton: FloatingActionButton(
          backgroundColor: const Color(0xFFfebf10),
          onPressed: (){},
          child: const Icon(Icons.face),
        ),
      ),
    );
  }
}
