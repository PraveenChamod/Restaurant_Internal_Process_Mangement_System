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

  final List<PackagesData> eventData = [];

  String packageIdentity = '';

  String tableId = '';
  String tableNumberStr = '';
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
              flex: 6,
              child: Column(
                children: [
                  Expanded(
                    flex: 2,
                    child: Padding(
                      padding: const EdgeInsets.only(left: 15.0, top: 5.0, right: 5.0),
                      child: FutureBuilder(
                        future: getPackagesData(),
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            return ListView.builder(
                              scrollDirection: Axis.horizontal,
                              itemCount: snapshot.data!.length,
                              itemBuilder: (context, index) {
                                //final packagesDataItems = snapshot.data as PackagesData;
                                return Container(
                                  width: 280,
                                  margin: const EdgeInsets.only(right: 10.0),
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
                                                flex: 1,
                                                child: Padding(
                                                  padding: const EdgeInsets.only(left: 5.0, right: 5.0),
                                                  child: Container(
                                                    width: 10.0,
                                                    decoration: BoxDecoration(
                                                      borderRadius: BorderRadius.circular(10),
                                                      border: Border.all(
                                                        color: snapshot.data![index].packageName == 'Bronze'
                                                            ? const Color(0xFFCD7F32)
                                                            : snapshot.data![index].packageName == 'Silver'
                                                            ? const Color(0xFFC0C0C0)
                                                            : const Color(0xFFFFD700),
                                                        width: 1,
                                                      ),
                                                    ),
                                                    child: Column(
                                                      children: [
                                                        Expanded(
                                                          child: Text(
                                                            snapshot.data![index].packageName,
                                                            style: TextStyle(
                                                              color: snapshot.data![index].packageName == 'Bronze'
                                                                  ? const Color(0xFFCD7F32)
                                                                  : snapshot.data![index].packageName == 'Silver'
                                                                  ? const Color(0xFFC0C0C0)
                                                                  : const Color(0xFFFFD700),
                                                              fontSize: 17.0,
                                                            ),
                                                          ),
                                                        ),
                                                        Expanded(
                                                          child: Text(
                                                            'Package',
                                                            style: TextStyle(
                                                              color: snapshot.data![index].packageName == 'Bronze'
                                                                  ? const Color(0xFFCD7F32)
                                                                  : snapshot.data![index].packageName == 'Silver'
                                                                  ? const Color(0xFFC0C0C0)
                                                                  : const Color(0xFFFFD700),
                                                              fontSize: 15.0,
                                                            ),
                                                          ),
                                                        ),
                                                        Expanded(
                                                          child: Text(
                                                            "Rs. ${snapshot.data![index].packagePrice}",
                                                            style: TextStyle(
                                                              color: snapshot.data![index].packageName == 'Bronze'
                                                                  ? const Color(0xFFCD7F32)
                                                                  : snapshot.data![index].packageName == 'Silver'
                                                                  ? const Color(0xFFC0C0C0)
                                                                  : const Color(0xFFFFD700),
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
                                                flex: 2,
                                                child: Padding(
                                                  padding: const EdgeInsets.only(left: 5.0, right: 5.0),
                                                  child: Container(
                                                    width: 10.0,
                                                    decoration: BoxDecoration(
                                                      borderRadius: BorderRadius.circular(10),
                                                      border: Border.all(
                                                        color: snapshot.data![index].packageName == 'Bronze'
                                                            ? const Color(0xFFCD7F32)
                                                            : snapshot.data![index].packageName == 'Silver'
                                                            ? const Color(0xFFC0C0C0)
                                                            : const Color(0xFFFFD700),
                                                        width: 1,
                                                      ),
                                                    ),
                                                    child: Center(
                                                      child: ListView.builder(
                                                        itemCount: snapshot.data![index].items.length,
                                                        itemBuilder: (BuildContext context, int index) {
                                                          return Padding(
                                                            padding: const EdgeInsets.only(left: 10.0, right: 10.0,top: 2.0 ),
                                                            child: Text(
                                                              snapshot.data![index].items[index].itemName,
                                                              style: const TextStyle(
                                                                color: Colors.white ,
                                                                fontSize: 15.0,
                                                              ),
                                                            ),
                                                          );
                                                        },
                                                      ),
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
                                                text: "Select Package",
                                                buttonTextStyle: const TextStyle(
                                                  color: Colors.black,
                                                  fontSize: 15,
                                                ),
                                                color: const Color(0xFFfebf10),
                                                pressEvent: () {
                                                  setState(() {
                                                    eventName = snapshot.data![index].eventName;
                                                    packageType = '${snapshot.data![index].packageName} Package';
                                                    packageIdentity = snapshot.data![index].packageId;
                                                    eventPriceStr = 'Price: ${snapshot.data![index].packagePrice}';
                                                    eventPrice = snapshot.data![index].packagePrice;
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
                                                        tableNumberStr = 'Table No: ${snapshot.data![index].tableNumber}';
                                                        tableNumber = snapshot.data![index].tableNumber;
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
                ],
              ),
            ),
            Expanded(
              flex: 2,
              child: Container(
                color: Colors.black38,
                child: Column(
                  children: [
                    Row(
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
                                  tableNumberStr,
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
                    const SizedBox(
                      height: 5.0,
                    ),
                    Center(
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
                          print(tableNumbers);
                          print(bookTables);
                          print(totalPrice);
                          cardPayment(
                              tableNumbers,
                              bookTables,
                              '${datetime.year}/${datetime.month}/${datetime.day}',
                              '${arrivalTime.hour}:${arrivalTime.minute} $arrivalPeriod',
                              '${departureTime.hour}:${departureTime.minute} $departurePeriod',
                              totalPrice, packageIdentity, eventName);
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
  Future<void> cardPayment(List tableNumbers, List<TableIdList> tables, String date, String arrivalTime, String departureTime, int amount, String packageId, String eventName) async {
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
        reserveSpecialEventTable(tableNumbers, tables, date, arrivalTime, departureTime, amount, packageId, eventName),
      });
    }catch(error){
      unSuccessAwesomeDialog(DialogType.warning, 'Payment Unsuccessful Try Again!', "Warning");
      throw Exception(error);
    }
  }

  void reserveSpecialEventTable(List tableNumbers, List<TableIdList> tables, String date, String arrivalTime, String departureTime, int amount, String packageId, String eventName) async {
    try{
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
          "Package": packageId,
          "eventName": eventName
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
      }
    } catch (e) {
      // Handle other errors
      print('Error: $e');
      unSuccessAwesomeDialog(DialogType.warning, 'An error occurred. Please try again', "Warning");
      throw Exception(e);
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
  Future<List<PackagesData>> getPackagesData() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/packages'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final packagesData = jsonDecode(response.body);
      return PackagesData.fromJsonList(packagesData['data']['packages']);
    } else {
      throw Exception('Failed to load data');
    }
  }
}

class PackagesData{
  final String packageId;
  final String packageName;
  final String eventName;
  final int packagePrice;
  final List<ItemsDataStructure> items;
  PackagesData({
    required this.packageId,
    required this.packageName,
    required this.eventName,
    required this.packagePrice,
    required this.items,
  });
  factory PackagesData.fromJson(Map<String, dynamic> json) {
    return PackagesData(
      items: (json['Items'] as List<dynamic>)
          .map((e) => ItemsDataStructure.fromJson(e as Map<String, dynamic>))
          .toList(),
      packageId: json['id'],
      packageName: json['packageName'],
      eventName: json['type'],
      packagePrice: json['Price'],
    );
  }
  static List<PackagesData> fromJsonList(dynamic jsonList){
    final packageDataList = <PackagesData>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        packageDataList.add(PackagesData.fromJson(json),);
      }
    }
    return packageDataList;
  }
}

class ItemsDataStructure{
  final String itemName;
  ItemsDataStructure({
    required this.itemName,
  });
  factory ItemsDataStructure.fromJson(Map<String, dynamic> json) => ItemsDataStructure(
    itemName: json['ItemName'],
  );
}

class SelectTables{
  final String id;
  final String tableNumber;
  final int numberOfPersons;
  final int price;
  final String status;
  SelectTables({
    required this.tableNumber,
    required this.numberOfPersons,
    required this.price,
    required this.status,
    required this.id,
  });
  factory SelectTables.fromJson(Map<String, dynamic> json) {
    return SelectTables(
      tableNumber: json['TableNo'],
      numberOfPersons: json['NoOfPersons'],
      price: json['price'],
      status: json['Status'],
      id: json['id'],
    );
  }
  static List<SelectTables> fromJsonList(dynamic jsonList){
    final selectTablesList = <SelectTables>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        selectTablesList.add(SelectTables.fromJson(json),);
      }
    }
    return selectTablesList;
  }
}


class TableIdList {
  final String tableIdentity;
  TableIdList({required this.tableIdentity});

  Map<String, dynamic> toJson() => {
    'table': tableIdentity,
  };
}