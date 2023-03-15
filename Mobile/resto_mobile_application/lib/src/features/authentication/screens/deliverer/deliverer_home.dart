import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../common_widgets/background_image.dart';
import 'deliverer_home__drawer.dart';


class DelivererHome extends StatefulWidget {
  const DelivererHome({Key? key}) : super(key: key);

  @override
  State<DelivererHome> createState() => _DelivererHomeState();
}

class _DelivererHomeState extends State<DelivererHome> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        drawer: const DelivererHomeDrawer(),
        appBar: AppBar(
          foregroundColor: const Color(0xFFfebf10),
          elevation: 0,
          title: const Text('Deliverer'),
          actions:  <Widget>[
            Padding(
              padding: const EdgeInsets.only(right: 20.0),
              child: IconButton(
                onPressed: () {
                  // Navigator.of(context).push(
                  //   MaterialPageRoute(
                  //     builder: (_){
                  //       return const CustomerSearch();
                  //     },
                  //   ),
                  // );
                },
                icon: const Icon(Icons.search),
              ),
              //child: Icon(Icons.search),
            ),
          ],
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
        ),
        backgroundColor: const Color(0xFF161b1d),
        body: Stack(
          children: [
            const BackgroundImage(),
            Column(

            ),
          ],
        ),
      ),
    );
  }
}
