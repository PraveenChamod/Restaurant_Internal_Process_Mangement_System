import 'dart:async';
import 'dart:convert';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../constants/image_strings.dart';
import 'package:http/http.dart' as http;
import '../features/authentication/screens/table_reservation/select_table.dart';

class TableItemContainer extends StatefulWidget {
  final String tableId;
  final String tableNumber;
  final int numberOfPersons;
  final int price;
  final String status;
  const TableItemContainer(
      {Key? key,
      required this.tableNumber,
      required this.numberOfPersons,
      required this.price,
      required this.status,
      required this.tableId})
      : super(key: key);

  @override
  State<TableItemContainer> createState() => _TableItemContainerState();
}

class _TableItemContainerState extends State<TableItemContainer> {
  DateTime datetime = DateTime(2023, 04, 01);
  DateTime arrivalTime = DateTime(2023, 04, 01, 05, 30);
  DateTime departureTime = DateTime(2023, 04, 01, 07, 30);
  String arrivalPeriod = 'AM';
  String departurePeriod = 'AM';
  final List<TableIdList> bookTables = [];
  final List tableNumbers = [];
  Map<String, dynamic>? paymentIntent;

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
      width: 120,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 220,
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
                'No. ${widget.tableNumber}',
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
                child: setImagePath(widget.numberOfPersons),
              ),
            ),
            const Spacer(),
            Text(
              '${widget.numberOfPersons} Persons',
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
                    'Rs. ${widget.price}',
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
                  child: setColorToStatus(widget.status),
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
                  pressEvent: () {
                    openBottomSheet();
                    addDataToList(widget.tableId, widget.tableNumber);
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
                              widget.price);
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

  void reserveDineInTable(List tableNumbers, List<TableIdList> tables, String date, String arrivalTime, String departureTime, int amount) async {
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
        "Type": 'Dine-in',
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
        reserveDineInTable(tableNumbers, tables, date, arrivalTime, departureTime, amount),
      });
    }catch(error){
      unSuccessAwesomeDialog(DialogType.warning, 'Payment Unsuccessful Try Again!', "Warning");
      throw Exception(error);
    }
  }
}

class TableIdList {
  final String tableIdentity;
  TableIdList({required this.tableIdentity});

  Map<String, dynamic> toJson() => {
        'table': tableIdentity,
      };
}
