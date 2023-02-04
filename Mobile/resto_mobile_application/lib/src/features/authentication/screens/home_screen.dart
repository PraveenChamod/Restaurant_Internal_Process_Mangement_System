import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../constants/image_strings.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
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
              top: 20,
              left: 0,
              right: 0,
              child: Column(
                //crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const AnimatedPositioned(
                    duration: Duration(milliseconds: 2000),
                    top: 150,
                    left: 150,
                    child: Image(
                      image: AssetImage(commonLogo),
                      width: 200,
                    ),
                  ),
                  const SizedBox(height: 20,),
                  Container(
                    height: MediaQuery.of(context).size.height/5,
                    width: MediaQuery.of(context).size.width/1.2,
                    //padding: EdgeInsets.only(left:MediaQuery.of(context).size.width/12, right:MediaQuery.of(context).size.width/12),
                    decoration: BoxDecoration(
                      //color: Colors.white,
                      color: const Color(0xFF1b1b1b),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      children: <Widget>[
                        Container(
                          width: MediaQuery.of(context).size.width/3,
                          height: 100,
                          color: Colors.orange,
                        ),
                        Container(
                          width: MediaQuery.of(context).size.width/3,
                          height: 100,
                          color: Colors.pink,
                        ),
                        Container(
                          width: MediaQuery.of(context).size.width/3,
                          height: 100,
                          color: Colors.blue,
                        ),
                      ],
                    ),
                    // child: Scrollbar(
                    //     child: ListView(
                    //       children: [
                    //         Container(
                    //           height: 100,
                    //           color: Colors.pink,
                    //         ),
                    //         Container(
                    //           height: 100,
                    //           color: Colors.grey,
                    //         ),
                    //         Container(
                    //           height: 100,
                    //           color: Colors.green,
                    //         ),
                    //       ],
                    //     ),
                    // ),
                  ),
                  const SizedBox(height: 20,),
                  const Text('Categories',
                    textAlign: TextAlign.start,
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
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
              //backgroundColor: Color(0xFF030b0b),
              //backgroundColor: Color(0xFF1b1b1b),
              backgroundColor: Color(0xFF030b0b),
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
        //   child: const Icon(Icons.face),
        // ),
      ),
    );
  }
}
