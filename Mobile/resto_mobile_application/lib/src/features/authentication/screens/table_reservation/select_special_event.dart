import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/table_reservation/select_table.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../common_widgets/background_image.dart';
import '../../../../constants/image_strings.dart';

class SelectSpecialEvent extends StatefulWidget {
  const SelectSpecialEvent({Key? key}) : super(key: key);

  @override
  State<SelectSpecialEvent> createState() => _SelectSpecialEventState();
}

class _SelectSpecialEventState extends State<SelectSpecialEvent> {

  final List<SelectTables> data = [];

  final List<SpecialEvents> eventData = [];

  String tableId = '';
  String tableNumber = '';
  String personCount = '';

  String eventName = '';
  String packageType = '';

  String eventPriceStr = '';
  String tablePriceStr = '';

  int eventPrice = 0;
  int tablePrice = 0;
  int totalPrice = 0;

  DateTime datetime = DateTime(2023, 04, 01);
  DateTime arrivalTime = DateTime(2023, 04, 01, 05, 30);
  DateTime departureTime = DateTime(2023, 04, 01, 07, 30);
  String arrivalPeriod = 'AM';
  String departurePeriod = 'AM';

  final List<TableIdList> bookTables = [];
  Map<String, dynamic>? paymentIntent;
  final List tableNumbers = [];

  void addDataToList(String tableId, String tableNumber) {
    bookTables.add(TableIdList(tableIdentity: tableId));
    tableNumbers.add(tableNumber);
  }

  Text setColorToStatus(String status) {
    if (status == 'Available') {
      return Text(
        status,
        style: const TextStyle(
          color: Colors.green,
          fontSize: 16.0,
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

  Image setImagePath(int personCount) {
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
      width: 80,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        const BackgroundImage(),
        Column(
          children: [
            Expanded(
              flex: 2,
              child: Padding(
                padding: const EdgeInsets.only(left: 15.0, top: 5.0, right: 5.0),
                child: FutureBuilder(
                  future: getSpecialEvents(),
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      return ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: snapshot.data!.length,
                        itemBuilder: (context, index) {
                          return Container(
                            width: 280,
                            padding: const EdgeInsets.all(5.0),
                            decoration: BoxDecoration(
                              color: Colors.black38,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(2.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Expanded(
                                    flex: 1,
                                    child: Text(
                                      snapshot.data![index].eventName,
                                      style: const TextStyle(
                                        color: Color(0xFFfebf10),
                                        fontSize: 17.0,
                                      ),
                                    ),
                                  ),
                                  Expanded(
                                    flex: 2,
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Expanded(
                                          child: Padding(
                                            padding: const EdgeInsets.only(left: 5.0, right: 5.0),
                                            child: Container(
                                              width: 10.0,
                                              decoration: BoxDecoration(
                                                borderRadius: BorderRadius.circular(10),
                                                border: Border.all(color: const Color(0xFFCD7F32), width: 1),
                                              ),
                                              child: Column(
                                                children: [
                                                  const Expanded(
                                                    child: Text(
                                                      'Bronze',
                                                      style: TextStyle(
                                                        color: Color(0xFFCD7F32),
                                                        fontSize: 17.0,
                                                      ),
                                                    ),
                                                  ),
                                                  const Expanded(
                                                    child: Text(
                                                      'Package',
                                                      style: TextStyle(
                                                        color: Color(0xFFCD7F32),
                                                        fontSize: 15.0,
                                                      ),
                                                    ),
                                                  ),
                                                  Expanded(
                                                    child: Text(
                                                      "Rs. ${snapshot.data![index].bronzePrice}",
                                                      style: const TextStyle(
                                                        color: Color(0xFFCD7F32),
                                                        fontSize: 15.0,
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                        Expanded(
                                          child: Padding(
                                            padding: const EdgeInsets.only(left: 5.0, right: 5.0),
                                            child: Container(
                                              width: 10.0,
                                              decoration: BoxDecoration(
                                                borderRadius: BorderRadius.circular(10),
                                                border: Border.all(color: const Color(0xFFC0C0C0), width: 1),
                                              ),
                                              child: Column(
                                                children: [
                                                  const Expanded(
                                                    child: Text(
                                                      'Silver',
                                                      style: TextStyle(
                                                        color: Color(0xFFC0C0C0),
                                                        fontSize: 17.0,
                                                      ),
                                                    ),
                                                  ),
                                                  const Expanded(
                                                    child: Text(
                                                      'Package',
                                                      style: TextStyle(
                                                        color: Color(0xFFC0C0C0),
                                                        fontSize: 15.0,
                                                      ),
                                                    ),
                                                  ),
                                                  Expanded(
                                                    child: Text(
                                                      "Rs. ${snapshot.data![index].silverPrice}",
                                                      style: const TextStyle(
                                                        color: Color(0xFFC0C0C0),
                                                        fontSize: 15.0,
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                        Expanded(
                                          child: Padding(
                                            padding: const EdgeInsets.only(left: 5.0, right: 5.0),
                                            child: Container(
                                              width: 10.0,
                                              decoration: BoxDecoration(
                                                borderRadius: BorderRadius.circular(10),
                                                border: Border.all(color: const Color(0xFFFFD700), width: 1),
                                              ),
                                              child: Column(
                                                children: [
                                                  const Expanded(
                                                    child: Text(
                                                      'Gold',
                                                      style: TextStyle(
                                                        color: Color(0xFFFFD700),
                                                        fontSize: 17.0,
                                                      ),
                                                    ),
                                                  ),
                                                  const Expanded(
                                                    child: Text(
                                                      'Package',
                                                      style: TextStyle(
                                                        color: Color(0xFFFFD700),
                                                        fontSize: 15.0,
                                                      ),
                                                    ),
                                                  ),
                                                  Expanded(
                                                    child: Text(
                                                      "Rs. ${snapshot.data![index].goldPrice}",
                                                      style: const TextStyle(
                                                        color: Color(0xFFFFD700),
                                                        fontSize: 15.0,
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Expanded(
                                    flex: 1,
                                    child: Center(
                                      child: Container(
                                        width: 130,
                                        height: 25,
                                        padding: const EdgeInsets.only(left: 5, right: 5, top: 5.0),
                                        child: AnimatedButton(
                                          text: "More Details",
                                          buttonTextStyle: const TextStyle(
                                            color: Colors.black,
                                            fontSize: 15,
                                          ),
                                          color: const Color(0xFFfebf10),
                                          pressEvent: () {
                                            showDialog(
                                              context: context,
                                              builder: (BuildContext context) {
                                                return AlertDialog(
                                                  backgroundColor: const Color(0xFF161b1d),
                                                  title: Center(
                                                    child: Text(
                                                      snapshot.data![index].eventName,
                                                      style: const TextStyle(
                                                        color: Colors.white,
                                                        fontSize: 20.0,
                                                      ),
                                                    ),
                                                  ),
                                                  content: SizedBox(
                                                    height: 220,
                                                    child: Column(
                                                      children: [
                                                        Container(
                                                          decoration: BoxDecoration(
                                                            borderRadius: BorderRadius.circular(10),
                                                            border: Border.all(
                                                              color: const Color(0xFFfebf10),
                                                            ),
                                                          ),
                                                          child: Center(
                                                            child: Padding(
                                                              padding: const EdgeInsets.all(5.0),
                                                              child: Column(
                                                                children: [
                                                                  const Text(
                                                                    'Bronze Package:',
                                                                    style: TextStyle(
                                                                      fontSize: 16,
                                                                      color: Colors.white,
                                                                    ),
                                                                  ),
                                                                  Text(snapshot.data![index].item1, style: const TextStyle(fontSize: 15, color: Colors.white,),),
                                                                ],
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                        const SizedBox(
                                                          height: 5.0,
                                                        ),
                                                        Container(
                                                          decoration: BoxDecoration(
                                                            borderRadius: BorderRadius.circular(10),
                                                            border: Border.all(
                                                              color: const Color(0xFFfebf10),
                                                            ),
                                                          ),
                                                          child: Center(
                                                            child: Padding(
                                                              padding: const EdgeInsets.all(5.0),
                                                              child: Column(
                                                                children: [
                                                                  const Text(
                                                                    'Silver Package:',
                                                                    style: TextStyle(fontSize: 16, color: Colors.white,),
                                                                  ),
                                                                  Text(snapshot.data![index].item1, style: const TextStyle(fontSize: 15, color: Colors.white,),),
                                                                  Text(snapshot.data![index].item2, style: const TextStyle(fontSize: 15, color: Colors.white,),),
                                                                ],
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                        const SizedBox(
                                                          height: 5.0,
                                                        ),
                                                        Container(
                                                          decoration: BoxDecoration(
                                                            borderRadius: BorderRadius.circular(10),
                                                            border: Border.all(
                                                              color: const Color(0xFFfebf10),
                                                            ),
                                                          ),
                                                          child: Center(
                                                            child: Padding(
                                                              padding: const EdgeInsets.all(5.0),
                                                              child: Column(
                                                                children: [
                                                                  const Text(
                                                                    'Gold Package:',
                                                                    style: TextStyle(
                                                                      fontSize: 16,
                                                                      color: Colors.white,
                                                                    ),
                                                                  ),
                                                                  Text(snapshot.data![index].item1, style: const TextStyle(fontSize: 15, color: Colors.white,),),
                                                                  Text(snapshot.data![index].item2, style: const TextStyle(fontSize: 15, color: Colors.white,),),
                                                                  Text(snapshot.data![index].item3, style: const TextStyle(fontSize: 15, color: Colors.white,),),
                                                                ],
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                  actions: [
                                                    Center(
                                                      child: Container(
                                                        width: 150,
                                                        height: 35,
                                                        padding: const EdgeInsets.only(left: 5, right: 5, top: 5.0),
                                                        child: AnimatedButton(
                                                          text: "Select Bronze",
                                                          buttonTextStyle: const TextStyle(
                                                            color: Colors.black,
                                                            fontSize: 17,
                                                          ),
                                                          color: const Color(0xFFfebf10),
                                                          pressEvent: () {
                                                            setState(() {
                                                              eventName = snapshot.data![index].eventName;
                                                              packageType = 'Bronze Package';
                                                              eventPriceStr = 'Price: ${snapshot.data![index].bronzePrice}';
                                                              eventPrice = snapshot.data![index].bronzePrice;
                                                            });
                                                            Navigator.of(context).pop();
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
                                                    const SizedBox(
                                                      height: 5.0,
                                                    ),
                                                    Center(
                                                      child: Container(
                                                        width: 150,
                                                        height: 35,
                                                        padding: const EdgeInsets.only(left: 5, right: 5, top: 5.0),
                                                        child: AnimatedButton(
                                                          text: "Select Silver",
                                                          buttonTextStyle: const TextStyle(
                                                            color: Colors.black,
                                                            fontSize: 17,
                                                          ),
                                                          color: const Color(0xFFfebf10),
                                                          pressEvent: () {
                                                            setState(() {
                                                              eventName = snapshot.data![index].eventName;
                                                              packageType = 'Silver Package';
                                                              eventPriceStr = 'Price: Rs. ${snapshot.data![index].silverPrice}';
                                                              eventPrice = snapshot.data![index].silverPrice;
                                                            });
                                                            Navigator.of(context).pop();
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
                                                    const SizedBox(
                                                      height: 5.0,
                                                    ),
                                                    Center(
                                                      child: Container(
                                                        width: 150,
                                                        height: 35,
                                                        padding: const EdgeInsets.only(left: 5, right: 5, top: 5.0),
                                                        child: AnimatedButton(
                                                          text: "Select Gold",
                                                          buttonTextStyle: const TextStyle(
                                                            color: Colors.black,
                                                            fontSize: 17,
                                                          ),
                                                          color: const Color(0xFFfebf10),
                                                          pressEvent: () {
                                                            setState(() {
                                                              eventName = snapshot.data![index].eventName;
                                                              packageType = 'Gold Package';
                                                              eventPriceStr = 'Price: Rs. ${snapshot.data![index].goldPrice}';
                                                              eventPrice = snapshot.data![index].goldPrice;
                                                            });
                                                            Navigator.of(context).pop();
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
                                                    TextButton(
                                                      child: const Text(
                                                        'Close',
                                                        style: TextStyle(
                                                          color: Colors.white,
                                                          fontSize: 17.0,
                                                        ),
                                                      ),
                                                      onPressed: () {
                                                        Navigator.of(context).pop();
                                                      },
                                                    ),
                                                  ],
                                                );
                                              },
                                            );
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
                                ],
                              ),
                            ),
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
              flex: 4,
              child: Padding(
                padding: const EdgeInsets.all(10.0),
                child: Center(
                  child: FutureBuilder(
                    future: getTables(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: snapshot.data!.length,
                            itemBuilder: (context, index){
                              return Padding(
                                padding: const EdgeInsets.only(right: 10.0, left: 8.0),
                                child: Container(
                                  width: 180,
                                  height: 300,
                                  padding: const EdgeInsets.all(5.0),
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
                                            'No. ${snapshot.data![index].tableNumber}',
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
                                            child: setImagePath(snapshot.data![index].numberOfPersons),
                                          ),
                                        ),
                                        const Spacer(),
                                        Text(
                                          '${snapshot.data![index].numberOfPersons} Persons',
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
                                              flex: 1,
                                              child: Text(
                                                'Price: ',
                                                style: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 16.0,
                                                ),
                                              ),
                                            ),
                                            Expanded(
                                              flex: 1,
                                              child: Text(
                                                'Rs. ${snapshot.data![index].price}',
                                                style: const TextStyle(
                                                  color: Color(0xFFfebf10),
                                                  fontSize: 16.0,
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
                                              flex: 1,
                                              child: Text(
                                                'Status: ',
                                                style: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 16.0,
                                                ),
                                              ),
                                            ),
                                            Expanded(
                                              flex: 1,
                                              child: setColorToStatus(snapshot.data![index].status),
                                            ),
                                          ],
                                        ),
                                        const Spacer(),
                                        Center(
                                          child: Container(
                                            width: 150,
                                            height: 25,
                                            padding: const EdgeInsets.only(left: 5, right: 5),
                                            child: AnimatedButton(
                                              text: "Select Table",
                                              buttonTextStyle: const TextStyle(
                                                color: Colors.black,
                                                fontSize: 18,
                                              ),
                                              color: const Color(0xFFfebf10),
                                              pressEvent: () {
                                                setState(() {
                                                  tableNumber = 'Table No: ${snapshot.data![index].tableNumber}';
                                                  tableId = snapshot.data![index].id;
                                                  personCount = 'No. Of Persons: ${snapshot.data![index].numberOfPersons}';
                                                  tablePriceStr = 'Price: Rs. ${snapshot.data![index].price}';
                                                  tablePrice = snapshot.data![index].price;
                                                });
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
                                      ],
                                    ),
                                  ),
                                ),
                              );
                            }
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
            ),
            Expanded(
              flex: 2,
              child: Container(
                color: Colors.black38,
                child: Column(
                  children: [
                    Expanded(
                      flex: 2,
                      child: Row(
                        children: [
                          Expanded(
                            child: Padding(
                              padding: const EdgeInsets.only(left: 20.0,),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const SizedBox(
                                    height: 10.0,
                                  ),
                                  const Center(
                                    child: Text(
                                      'Special Event:',
                                      style: TextStyle(
                                        color: Color(0xFFfebf10),
                                        fontSize: 17.0,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5.0,
                                  ),
                                  Text(
                                    eventName,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 15.0,
                                    ),
                                  ),
                                  Text(
                                    packageType,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 15.0,
                                    ),
                                  ),
                                  Text(
                                    eventPriceStr,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 15.0,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Expanded(
                            child: Padding(
                              padding: const EdgeInsets.only(left: 20.0,),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const SizedBox(
                                    height: 10.0,
                                  ),
                                  const Center(
                                    child: Text(
                                      'Table Details:',
                                      style: TextStyle(
                                        color: Color(0xFFfebf10),
                                        fontSize: 17.0,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(
                                    height: 5.0,
                                  ),
                                  Text(
                                    tableNumber,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 15.0,
                                    ),
                                  ),
                                  Text(
                                    personCount,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 15.0,
                                    ),
                                  ),
                                  Text(
                                    tablePriceStr,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 15.0,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Expanded(
                      flex: 1,
                      child: Center(
                        child: Container(
                          width: 150,
                          height: 35,
                          padding: const EdgeInsets.only(left: 5, right: 5, top: 5.0),
                          child: AnimatedButton(
                            text: "Book Table",
                            buttonTextStyle: const TextStyle(
                              color: Colors.black,
                              fontSize: 17,
                              fontWeight: FontWeight.bold,
                            ),
                            color: const Color(0xFFfebf10),
                            pressEvent: () {
                              setState(() {
                                totalPrice = eventPrice + tablePrice;
                              });
                              openBottomSheet();
                              addDataToList(tableId, tableNumber);
                              print(totalPrice);

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
                  ],
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  void openBottomSheet() {
    showModalBottomSheet(
      backgroundColor: Colors.black38,
      context: context,
      builder: (BuildContext context) {
        return Padding(
          padding: const EdgeInsets.all(15.0),
          child: SizedBox(
            height: 250,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Row(
                    children: [
                      const Expanded(
                        child: Text(
                          'Select Date: ',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color(0xFFfebf10),
                            fontSize: 17.0,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Center(
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              foregroundColor: Colors.black,
                              backgroundColor:
                              const Color(0xFFfebf10), // text color
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(
                                    10), // button border radius
                              ),
                              elevation: 5, // button elevation
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 20,
                                  vertical: 10), // button padding
                            ),
                            onPressed: () async {
                              final date = await pickDate();
                              if (date == null) return;
                              setState(() => datetime = date);
                              Navigator.pop(context);
                              openBottomSheet();
                            },
                            child: Text(
                                '${datetime.year}/${datetime.month}/${datetime.day}'),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      const Expanded(
                        child: Text(
                          'Arrival Time: ',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color(0xFFfebf10),
                            fontSize: 17.0,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Center(
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              foregroundColor: Colors.black,
                              backgroundColor:
                              const Color(0xFFfebf10), // text color
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(
                                    10), // button border radius
                              ),
                              elevation: 5, // button elevation
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 20,
                                  vertical: 10), // button padding
                            ),
                            onPressed: () async {
                              final arrivalTimePick = await pickArrivalTime();
                              if (arrivalTimePick == null) return;
                              final newArrivalTime = DateTime(
                                arrivalTime.year,
                                arrivalTime.month,
                                arrivalTime.day,
                                arrivalTimePick.hour,
                                arrivalTimePick.minute,
                              );
                              setState(() => arrivalTime = newArrivalTime);
                              TimeOfDay arrivalTimeOfDay =
                              TimeOfDay.fromDateTime(newArrivalTime);
                              arrivalPeriod =
                              arrivalTimeOfDay.period == DayPeriod.am
                                  ? 'AM'
                                  : 'PM';
                              Navigator.pop(context);
                              openBottomSheet();
                            },
                            child: Text(
                                '${arrivalTime.hour}:${arrivalTime.minute}'),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Row(
                    children: [
                      const Expanded(
                        child: Text(
                          'Departure Time: ',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Color(0xFFfebf10),
                            fontSize: 17.0,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Center(
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              foregroundColor: Colors.black,
                              backgroundColor:
                              const Color(0xFFfebf10), // text color
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(
                                    10), // button border radius
                              ),
                              elevation: 5, // button elevation
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 20,
                                  vertical: 10), // button padding
                            ),
                            onPressed: () async {
                              final departureTimePick =
                              await pickDepartureTime();
                              if (departureTimePick == null) return;
                              final newDepartureTime = DateTime(
                                departureTime.year,
                                departureTime.month,
                                departureTime.day,
                                departureTimePick.hour,
                                departureTimePick.minute,
                              );
                              setState(() => departureTime = newDepartureTime);
                              TimeOfDay departureTimeOfDay =
                              TimeOfDay.fromDateTime(newDepartureTime);
                              departurePeriod =
                              departureTimeOfDay.period == DayPeriod.am
                                  ? 'AM'
                                  : 'PM';
                              Navigator.pop(context);
                              openBottomSheet();
                            },
                            child: Text(
                                '${departureTime.hour}:${departureTime.minute}'),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: Center(
                    child: Container(
                      width: 150,
                      height: 35,
                      padding: const EdgeInsets.only(left: 5, right: 5),
                      child: AnimatedButton(
                        text: "Confirm",
                        buttonTextStyle: const TextStyle(
                          color: Colors.black,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                        color: const Color(0xFFfebf10),
                        pressEvent: () {
                          cardPayment(
                              tableNumbers,
                              bookTables,
                              '${datetime.year}/${datetime.month}/${datetime.day}',
                              '${arrivalTime.hour}:${arrivalTime.minute} $arrivalPeriod',
                              '${departureTime.hour}:${departureTime.minute} $departurePeriod',
                              totalPrice);
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
              ],
            ),
          ),
        );
      },
    );
  }

  Future<DateTime?> pickDate() => showDatePicker(
    context: context,
    initialDate: datetime,
    firstDate: DateTime(2022),
    lastDate: DateTime(2500),
  );
  Future<TimeOfDay?> pickArrivalTime() => showTimePicker(
    context: context,
    initialTime: TimeOfDay(
      hour: arrivalTime.hour,
      minute: arrivalTime.minute,
    ),
  );
  Future<TimeOfDay?> pickDepartureTime() => showTimePicker(
    context: context,
    initialTime: TimeOfDay(
      hour: departureTime.hour,
      minute: departureTime.minute,
    ),
  );

  //Payment Intent
  Future<void> cardPayment(List tableNumbers, List<TableIdList> tables, String date, String arrivalTime, String departureTime, int amount) async {
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
        "amount":amount,
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
          style: ThemeMode.dark,
          merchantDisplayName: 'Resto_Mobile_App',)).then((value) => {}
    );
    //Display the payment sheet
    try{
      await Stripe.instance.presentPaymentSheet().then((value) => {
        print('Payment Success'),
        reserveSpecialEventTable(tableNumbers, tables, date, arrivalTime, departureTime, amount),
      });
    }catch(error){
      unSuccessAwesomeDialog(DialogType.warning, 'Payment Unsuccessful Try Again!', "Warning");
      throw Exception(error);
    }
  }

  void reserveSpecialEventTable(List tableNumbers, List<TableIdList> tables, String date, String arrivalTime, String departureTime, int amount) async {
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
    String? cusId = pref.getString("LoginId");
    final http.Response response = await http.post(
      Uri.parse("http://$hostName:5000/api/v1/TableReservation"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "Customer": cusId,
        "TableNo": tableNumbers,
        "Tables": tables,
        "Date": date,
        "ArrivalTime": arrivalTime,
        "DepartureTime": departureTime,
        "amount": amount,
        "Type": 'Special-Events',
      }),
    );
    Navigator.pop(context);
    if (response.statusCode == 201) {
      final json = jsonDecode(response.body);
      final orderDetails = json["data"];
      final msg = json["message"];
      successAwesomeDialog(DialogType.success, 'Payment Success & Your Order Is Placed.', "Success");

    } else {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      unSuccessAwesomeDialog(DialogType.warning, msg, "Warning");
    }
  }
  successAwesomeDialog(DialogType type, String desc, String title) {
    AwesomeDialog(
      context: context,
      dialogType: type,
      animType: AnimType.topSlide,
      title: title,
      desc: desc,
      btnOkOnPress: () {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) {
              return const SelectTable();
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
      btnOkOnPress: () {},
    ).show();
  }



  Future<List<SelectTables>> getTables() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/availabletables'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final ordersFoods = jsonDecode(response.body);
      return SelectTables.fromJsonList(ordersFoods['data']['availableTables']);
    } else {
      throw Exception('Failed to load data');
    }
  }
  Future<List<SpecialEvents>> getSpecialEvents() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/SpecialEvents'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final ordersFoods = jsonDecode(response.body);
      return SpecialEvents.fromJsonList(ordersFoods['data']['specialEvents']);
    } else {
      throw Exception('Failed to load data');
    }
  }
}
class SpecialEvents{
  final String eventName;
  final String item1;
  final String item2;
  final String item3;
  final int bronzePrice;
  final int silverPrice;
  final int goldPrice;
  SpecialEvents({
    required this.eventName,
    required this.item1,
    required this.item2,
    required this.item3,
    required this.bronzePrice,
    required this.silverPrice,
    required this.goldPrice,
  });
  factory SpecialEvents.fromJson(Map<String, dynamic> json) {
    return SpecialEvents(
      eventName: json['EventName'],
      item1: json['Item1'],
      item2: json['Item2'],
      item3: json['Item3'],
      bronzePrice: json['BronzePrice'],
      silverPrice: json['SilverPrice'],
      goldPrice: json['GoldPrice'],
    );
  }
  static List<SpecialEvents> fromJsonList(dynamic jsonList){
    final specialEventList = <SpecialEvents>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        specialEventList.add(SpecialEvents.fromJson(json),);
      }
    }
    return specialEventList;
  }
}

class TableIdList {
  final String tableIdentity;
  TableIdList({required this.tableIdentity});

  Map<String, dynamic> toJson() => {
    'table': tableIdentity,
  };
}