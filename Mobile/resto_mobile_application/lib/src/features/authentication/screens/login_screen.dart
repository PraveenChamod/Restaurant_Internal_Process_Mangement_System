import 'package:flutter/material.dart';
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
              backgroundColor: Color(0xFF030b0b), // Will work
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
        // floatingActionButton: FloatingActionButton(
        //   backgroundColor: const Color(0xFFfebf10),
        //   onPressed: (){},
        //   child: const ImageIcon(
        //     AssetImage("assets/images/Bot_Bg.png"),
        //     //color: Colors.red,
        //     size: 100,
        //   ),
        // ),
        floatingActionButton: FloatingActionButton(
          backgroundColor: const Color(0xFFfebf10),
          onPressed: (){},
          //tooltip: 'Increment',
          child: const Icon(Icons.face),
        ),
      ),
    );
  }
}
