import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import '../constants/image_strings.dart';

class TableItemContainer extends StatelessWidget {
  final String tableNumber;
  final int numberOfPersons;
  final int price;
  final String status;
  const TableItemContainer({Key? key,
    required this.tableNumber,
    required this.numberOfPersons,
    required this.price,
    required this.status
  }) : super(key: key);
  Text setColorToStatus(String status){
    if(status == 'Available'){
      return Text(
        status,
        style: const TextStyle(
          color: Colors.green,
          fontSize: 17.0,
        ),
      );
    }
    return Text(
      status,
      style: const TextStyle(
        color: Colors.red,
        fontSize: 17.0,
      ),
    );
  }

  Image setImagePath(int personCount){
    String imagePath = '';
    switch (personCount) {
      case 1:
        imagePath = onePerson;
        break;
      case 2:
        imagePath = twoPerson;
        break;
      case 3:
        imagePath = threePerson;
        break;
      case 4:
        imagePath = fourPerson;
        break;
      case 5:
        imagePath = fivePerson;
        break;
      case 6:
        imagePath = sixPerson;
        break;
      case 7:
        imagePath = sevenPerson;
        break;
      default:
        imagePath = eightPerson;
    }
    return Image.asset(
      imagePath,
      width: 120,
    );
  }
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 300,
      padding: const EdgeInsets.all(10.0),
      decoration: BoxDecoration(
        color: Colors.black38,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Text(
                'No. $tableNumber',
                style: const TextStyle(
                  color: Color(0xFFfebf10),
                  fontSize: 17.0,
                ),
              ),
            ),
            const Spacer(),
            Center(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: setImagePath(numberOfPersons),
              ),
            ),
            const Spacer(),
            Text(
              '$numberOfPersons Persons',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 17.0,
              ),
            ),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const Expanded(
                  child: Text(
                    'Price: ',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 17.0,
                    ),
                  ),
                ),
                Expanded(
                  child: Text(
                    'Rs. $price',
                    style: const TextStyle(
                      color: Color(0xFFfebf10),
                      fontSize: 17.0,
                    ),
                  ),
                ),
              ],
            ),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const Expanded(
                  child: Text(
                    'Status: ',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 17.0,
                    ),
                  ),
                ),
                Expanded(
                  child: setColorToStatus(status),
                ),
              ],
            ),
            const Spacer(),
            Center(
              child: Container(
                width: 150,
                height: 35,
                padding: const EdgeInsets.only(left: 5, right: 5),
                child: AnimatedButton(
                  text: "Book Table",
                  buttonTextStyle: const TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                  color: const Color(0xFFfebf10),
                  pressEvent: () {},
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(0),
                    topRight: Radius.circular(80),
                    bottomLeft: Radius.circular(80),
                    bottomRight: Radius.circular(80),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
