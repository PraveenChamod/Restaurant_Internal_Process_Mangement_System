import 'dart:convert';
import 'package:animated_icon_button/animated_icon_button.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/table_reservation/select_table.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../common_widgets/background_image.dart';
import '../../../../constants/image_strings.dart';

class SelectDatingTable extends StatefulWidget {
  final int mainTablePrice;
  final String flowerVaseImagePath;
  final String beverageImagePath;
  final String candlesImagePath;
  final String tableNapkinImagePath;
  final String tableId;
  final String tableNumber;
  const SelectDatingTable({Key? key,
    required this.flowerVaseImagePath,
    required this.beverageImagePath,
    required this.candlesImagePath,
    required this.tableNapkinImagePath,
    required this.mainTablePrice,
    required this.tableId,
    required this.tableNumber
  }) : super(key: key);

  @override
  State<SelectDatingTable> createState() => _SelectDatingTableState();
}

class _SelectDatingTableState extends State<SelectDatingTable> {

  String flowerVaseImagePathVar = '';
  String beverageImagePathVar = '';
  String candlesImagePathVar = '';
  String tableNapkinImagePathVar = '';

  int mainTablePriceVar = 0;

  int selectedFlowerVasePrice = 0;
  int selectedBeveragePrice = 0;
  int selectedCandlesPrice = 0;
  int selectedNapkinPrice = 0;

  int selectedFlowerVaseIndex = -1;
  int selectedBeverageIndex = -1;
  int selectedCandlesIndex = -1;
  int selectedNapkinIndex = -1;

  DateTime datetime = DateTime(2023, 04, 01);
  DateTime arrivalTime = DateTime(2023, 04, 01, 05, 30);
  DateTime departureTime = DateTime(2023, 04, 01, 07, 30);
  String arrivalPeriod = 'AM';
  String departurePeriod = 'AM';

  final List<TableIdList> bookTables = [];
  final List tableNumbers = [];
  Map<String, dynamic>? paymentIntent;

  final List selectedDatingTableItemList = [];
  String currentFlowerVaseId = '';
  String currentBeverageId = '';
  String currentCandlesId = '';
  String currentNapkinId = '';

  void addItemsToList(String tableId) {
    selectedDatingTableItemList.add(tableId);
  }

  void removeItemsFromList(String tableId) {
    selectedDatingTableItemList.remove(tableId);
  }

  void addDataToList(String tableId, String tableNumber) {
    bookTables.add(TableIdList(tableIdentity: tableId));
    tableNumbers.add(tableNumber);
  }

  //Function for update the selected parameters
  void updateSelectItem(int value, String itemType, int index){
    if(itemType == 'Flower'){
      setState(() {
        selectedFlowerVasePrice = value;
        selectedFlowerVaseIndex = index;
        print('After Update');
        print('selectedFlowerVaseIndex: $selectedFlowerVaseIndex');
        print('selectedFlowerVasePrice: $selectedFlowerVasePrice');
      });
    }else if(itemType == 'Beverage'){
      setState(() {
        selectedBeveragePrice = value;
        selectedBeverageIndex = index;
      });
    }else if(itemType == 'Candles'){
      setState(() {
        selectedCandlesPrice = value;
        selectedCandlesIndex = index;
      });
    }else{
      setState(() {
        selectedNapkinPrice = value;
        selectedNapkinIndex = index;
      });
    }
  }
  //Function for add the Total Price
  void addPrice(int value, String itemType){
    if(itemType == 'Flower'){
      setState(() {
        mainTablePriceVar -= selectedFlowerVasePrice;
        mainTablePriceVar += value;
        print('After Adding');
        print('selectedFlowerVaseIndex: $selectedFlowerVaseIndex');
        print('selectedFlowerVasePrice: $selectedFlowerVasePrice');
      });
    }else if(itemType == 'Beverage'){
      setState(() {
        mainTablePriceVar -= selectedBeveragePrice;
        mainTablePriceVar += value;
      });
    }else if(itemType == 'Candles'){
      setState(() {
        mainTablePriceVar -= selectedCandlesPrice;
        mainTablePriceVar += value;
      });
    }else{
      setState(() {
        mainTablePriceVar -= selectedNapkinPrice;
        mainTablePriceVar += value;
      });
    }
  }
  //Function for subtract the Total Price
  void subtractPrice(int value, String itemType, int index){
    if(index == selectedFlowerVaseIndex || index == selectedBeverageIndex || index == selectedCandlesIndex || index == selectedNapkinIndex){
      if(itemType == 'Flower'){
        setState(() {
          flowerVaseImagePathVar = 'late';
          selectedFlowerVaseIndex = (-1);
          selectedFlowerVasePrice = 0;
          mainTablePriceVar -= value;
          print('After Substract');
          print('selectedFlowerVaseIndex: $selectedFlowerVaseIndex');
          print('selectedFlowerVasePrice: $selectedFlowerVasePrice');
        });
      }else if(itemType == 'Beverage'){
        setState(() {
          beverageImagePathVar = 'late';
          selectedBeverageIndex = (-1);
          selectedBeveragePrice = 0;
          mainTablePriceVar -= value;
        });
      }else if(itemType == 'Candles'){
        setState(() {
          candlesImagePathVar = 'late';
          selectedCandlesIndex = (-1);
          selectedCandlesPrice = 0;
          mainTablePriceVar -= value;
        });
      }else{
        setState(() {
          tableNapkinImagePathVar = 'late';
          selectedNapkinIndex = (-1);
          selectedNapkinPrice = 0;
          mainTablePriceVar -= value;
        });
      }
    }
  }

  @override
  void initState() {
    setState(() {
      flowerVaseImagePathVar = widget.flowerVaseImagePath;
      beverageImagePathVar = widget.beverageImagePath;
      candlesImagePathVar = widget.candlesImagePath;
      tableNapkinImagePathVar = widget.tableNapkinImagePath;
      mainTablePriceVar = widget.mainTablePrice;
    });
    super.initState();
  }

  final List<DatingTableItems> datingTableItemsData = [];
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        const BackgroundImage(),
        Row(
          children: [
            Expanded(
              flex: 4,
              child: Column(
                children: [
                  Expanded(
                    flex: 1,
                    child: Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.black38,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Center(
                          child: Text(
                            'Customize The Table With Your Own Choice',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 18,
                              color: Color(0xFFfebf10),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 4,
                    child: Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.black38,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: const Color(0xFFfebf10),
                          ),
                        ),
                        child: Column(
                          children: [
                            Expanded(
                              flex: 3,
                              child: Column(
                                children: [
                                  Expanded(
                                    flex: 1,
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: Center(
                                            child: Container(
                                              margin: const EdgeInsets.only(left: 0.0, top: 5.0, right: 0.0, bottom: 5.0),
                                              decoration: BoxDecoration(
                                                borderRadius: BorderRadius.circular(10),
                                              ),
                                              child: Column(
                                                children: [
                                                  flowerVaseImagePathVar == 'late'
                                                      ?
                                                  Expanded(
                                                    flex: 3,
                                                    child: ClipRRect(
                                                      borderRadius: BorderRadius.circular(10),
                                                      child: Image.asset(
                                                        'assets/Tables/Empty.png',
                                                        width: 80,
                                                      ),
                                                    ),
                                                  )
                                                      :
                                                  Expanded(
                                                    flex: 3,
                                                    child: ClipRRect(
                                                      borderRadius: BorderRadius.circular(10),
                                                      child: Image.network(
                                                        flowerVaseImagePathVar,
                                                        width: 80,
                                                      ),
                                                    ),
                                                  ),
                                                  const Expanded(
                                                    flex: 1,
                                                    child: Text(
                                                      'Flower Vase',
                                                      textAlign: TextAlign.center,
                                                      style: TextStyle(
                                                        fontSize: 15,
                                                        color: Color(0xFFfebf10),
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                        Expanded(
                                          child: Center(
                                            child: Container(
                                              margin: const EdgeInsets.only(left: 0.0, top: 5.0, right: 0.0, bottom: 5.0),
                                              decoration: BoxDecoration(
                                                borderRadius: BorderRadius.circular(10),
                                              ),
                                              child: Column(
                                                children: [
                                                  beverageImagePathVar == 'late'
                                                      ?
                                                  Expanded(
                                                    flex: 3,
                                                    child: ClipRRect(
                                                      borderRadius: BorderRadius.circular(10),
                                                      child: Image.asset(
                                                        'assets/Tables/Empty.png',
                                                        width: 80,
                                                      ),
                                                    ),
                                                  )
                                                      :
                                                  Expanded(
                                                    flex: 3,
                                                    child: ClipRRect(
                                                      borderRadius: BorderRadius.circular(10),
                                                      child: Image.network(
                                                        beverageImagePathVar,
                                                        width: 80,
                                                      ),
                                                    ),
                                                  ),
                                                  const Expanded(
                                                    flex: 1,
                                                    child: Text(
                                                      'Beverage',
                                                      textAlign: TextAlign.center,
                                                      style: TextStyle(
                                                        fontSize: 15,
                                                        color: Color(0xFFfebf10),
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
                                    child: Row(
                                      children: [
                                        Expanded(
                                          child: Center(
                                            child: Container(
                                              margin: const EdgeInsets.only(left: 0.0, top: 5.0, right: 0.0, bottom: 5.0),
                                              decoration: BoxDecoration(
                                                borderRadius: BorderRadius.circular(10),
                                              ),
                                              child: Column(
                                                children: [
                                                  candlesImagePathVar == 'late'
                                                      ?
                                                  Expanded(
                                                    flex: 3,
                                                    child: ClipRRect(
                                                      borderRadius: BorderRadius.circular(10),
                                                      child: Image.asset(
                                                        'assets/Tables/Empty.png',
                                                        width: 80,
                                                      ),
                                                    ),
                                                  )
                                                      :
                                                  Expanded(
                                                    flex: 3,
                                                    child: ClipRRect(
                                                      borderRadius: BorderRadius.circular(10),
                                                      child: Image.network(
                                                        candlesImagePathVar,
                                                        width: 80,
                                                      ),
                                                    ),
                                                  ),
                                                  const Expanded(
                                                    flex: 1,
                                                    child: Text(
                                                      'Candles',
                                                      textAlign: TextAlign.center,
                                                      style: TextStyle(
                                                        fontSize: 15,
                                                        color: Color(0xFFfebf10),
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                        Expanded(
                                          child: Center(
                                            child: Container(
                                              margin: const EdgeInsets.only(left: 0.0, top: 5.0, right: 0.0, bottom: 5.0),
                                              decoration: BoxDecoration(
                                                borderRadius: BorderRadius.circular(10),
                                              ),
                                              child: Column(
                                                children: [
                                                  tableNapkinImagePathVar == 'late'
                                                      ?
                                                  Expanded(
                                                    flex: 3,
                                                    child: ClipRRect(
                                                      borderRadius: BorderRadius.circular(10),
                                                      child: Image.asset(
                                                        'assets/Tables/Empty.png',
                                                        width: 80,
                                                      ),
                                                    ),
                                                  )
                                                      :
                                                  Expanded(
                                                    flex: 3,
                                                    child: ClipRRect(
                                                      borderRadius: BorderRadius.circular(10),
                                                      child: Image.network(
                                                        tableNapkinImagePathVar,
                                                        width: 80,
                                                      ),
                                                    ),
                                                  ),
                                                  const Expanded(
                                                    flex: 1,
                                                    child: Text(
                                                      'Table Napkin',
                                                      textAlign: TextAlign.center,
                                                      style: TextStyle(
                                                        fontSize: 15,
                                                        color: Color(0xFFfebf10),
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
                                ],
                              ),
                            ),
                            Expanded(
                              flex: 2,
                              child: Center(
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(10),
                                  child: Image.asset(
                                    'assets/Tables/Main_Table.png',
                                    width: 200,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 1,
                    child: Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.black38,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            const Expanded(
                              child: Text(
                                'Total Price:',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 18,
                                  color: Color(0xFFfebf10),
                                ),
                              ),
                            ),
                            Expanded(
                              child: Text(
                                'Rs.$mainTablePriceVar',
                                textAlign: TextAlign.center,
                                style: const TextStyle(
                                  fontSize: 18,
                                  color: Color(0xFFfebf10),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 1,
                    child: Container(
                      decoration: const BoxDecoration(
                        color: Colors.black38,
                      ),
                      child: Center(
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
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              flex: 2,
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.black38,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: FutureBuilder(
                    future: getDatingTableItems(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        return ListView.builder(
                          scrollDirection: Axis.vertical,
                          itemCount: snapshot.data!.length,
                          itemBuilder: (context, index) {

                            if(snapshot.data![index].itemType != 'Special Event'){
                              return Container(
                                width: 120,
                                height: 220,
                                margin: const EdgeInsets.only(bottom: 15.0, top: 0.0, left: 0.0, right: 0.0),
                                padding: const EdgeInsets.all(10.0),
                                decoration: BoxDecoration(
                                  color: Colors.black38,
                                  borderRadius: BorderRadius.circular(10),
                                  border: Border.all(
                                    color: const Color(0xFFfebf10),
                                  ),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Expanded(
                                      flex: 4,
                                      child: Center(
                                        child: ClipRRect(
                                          borderRadius: BorderRadius.circular(10),
                                          child: Image.network(
                                            'http://$hostName:5000/tableitemimages/${snapshot.data![index].itemImagePath}',
                                            width: 90,
                                          ),
                                        ),
                                      ),
                                    ),
                                    Expanded(
                                      flex: 2,
                                      child: Text(
                                        snapshot.data![index].itemName,
                                        style: const TextStyle(
                                          fontSize: 15,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                    ),
                                    Expanded(
                                      flex: 1,
                                      child: Text(
                                        'Rs.${snapshot.data![index].itemPrice}',
                                        style: const TextStyle(
                                          fontSize: 15,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                    ),
                                    Expanded(
                                      flex: 2,
                                      child: Row(
                                        mainAxisAlignment: MainAxisAlignment.end,
                                        children: [
                                          Expanded(
                                            child: Container(
                                              color: Colors.transparent,
                                              child: Center(
                                                child: AnimatedIconButton(
                                                  onPressed: () {
                                                    setState(() {
                                                      addPrice(snapshot.data![index].itemPrice, snapshot.data![index].itemType);
                                                      updateSelectItem(snapshot.data![index].itemPrice, snapshot.data![index].itemType, index);
                                                      if(snapshot.data![index].itemType == 'Flower'){
                                                        setState(() {
                                                          flowerVaseImagePathVar = 'http://$hostName:5000/tableitemimages/${snapshot.data![index].itemImagePath}';
                                                          if(!selectedDatingTableItemList.contains('${snapshot.data![index].itemId}')){
                                                            if(currentFlowerVaseId == ''){
                                                              if(selectedDatingTableItemList.length <= 3){
                                                                addItemsToList('${snapshot.data![index].itemId}');
                                                              }
                                                            }else{
                                                              removeItemsFromList(currentFlowerVaseId);
                                                              addItemsToList('${snapshot.data![index].itemId}');
                                                            }
                                                          }
                                                          currentFlowerVaseId = '${snapshot.data![index].itemId}';
                                                        });
                                                      }else if(snapshot.data![index].itemType == 'Beverage'){
                                                        setState(() {
                                                          beverageImagePathVar = 'http://$hostName:5000/tableitemimages/${snapshot.data![index].itemImagePath}';
                                                          if(!selectedDatingTableItemList.contains('${snapshot.data![index].itemId}')){
                                                            if(currentBeverageId == ''){
                                                              if(selectedDatingTableItemList.length <= 3){
                                                                addItemsToList('${snapshot.data![index].itemId}');
                                                              }
                                                            }else{
                                                              removeItemsFromList(currentBeverageId);
                                                              addItemsToList('${snapshot.data![index].itemId}');
                                                            }
                                                          }
                                                          currentBeverageId = '${snapshot.data![index].itemId}';
                                                        });
                                                      }else if(snapshot.data![index].itemType == 'Candles'){
                                                        setState(() {
                                                          candlesImagePathVar = 'http://$hostName:5000/tableitemimages/${snapshot.data![index].itemImagePath}';
                                                          if(!selectedDatingTableItemList.contains('${snapshot.data![index].itemId}')){
                                                            if(currentCandlesId == ''){
                                                              if(selectedDatingTableItemList.length <= 3){
                                                                addItemsToList('${snapshot.data![index].itemId}');
                                                              }
                                                            }else{
                                                              removeItemsFromList(currentCandlesId);
                                                              addItemsToList('${snapshot.data![index].itemId}');
                                                            }
                                                          }
                                                          currentCandlesId = '${snapshot.data![index].itemId}';
                                                        });
                                                      }else{
                                                        setState(() {
                                                          tableNapkinImagePathVar = 'http://$hostName:5000/tableitemimages/${snapshot.data![index].itemImagePath}';
                                                          if(!selectedDatingTableItemList.contains('${snapshot.data![index].itemId}')){
                                                            if(currentNapkinId == ''){
                                                              if(selectedDatingTableItemList.length <= 3){
                                                                addItemsToList('${snapshot.data![index].itemId}');
                                                              }
                                                            }else{
                                                              removeItemsFromList(currentNapkinId);
                                                              addItemsToList('${snapshot.data![index].itemId}');
                                                            }
                                                          }
                                                          currentNapkinId = '${snapshot.data![index].itemId}';
                                                        });
                                                      }
                                                    });
                                                    print(selectedDatingTableItemList);
                                                  },
                                                  duration: const Duration(milliseconds: 500),
                                                  icons: const <AnimatedIconItem>[
                                                    AnimatedIconItem(
                                                      icon: Icon(
                                                        Icons.add_circle,
                                                        color: Color(0xFFfebf10),
                                                        size: 28.0,
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ),
                                          ),
                                          Expanded(
                                            child: Container(
                                              color: Colors.transparent,
                                              child: Center(
                                                child: AnimatedIconButton(
                                                  onPressed: () {
                                                    setState(() {
                                                      subtractPrice(snapshot.data![index].itemPrice, snapshot.data![index].itemType, index);
                                                      if(selectedDatingTableItemList.isNotEmpty){
                                                        if(selectedDatingTableItemList.contains('${snapshot.data![index].itemId}')){
                                                          removeItemsFromList('${snapshot.data![index].itemId}');
                                                          currentFlowerVaseId = '';
                                                        }
                                                      }
                                                    });
                                                    print('After remove');
                                                    print(selectedDatingTableItemList);
                                                  },
                                                  duration: const Duration(milliseconds: 500),
                                                  icons: const <AnimatedIconItem>[
                                                    AnimatedIconItem(
                                                      icon: Icon(
                                                        Icons.delete,
                                                        color: Colors.red,
                                                        size: 30.0,
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
                                  ],
                                ),
                              );
                            }
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
                          print(mainTablePriceVar);
                          print('${datetime.year}/${datetime.month}/${datetime.day}');
                          print('${arrivalTime.hour}.${arrivalTime.minute} $arrivalPeriod');
                          print('${departureTime.hour}.${departureTime.minute} $departurePeriod');

                          cardPayment(
                              tableNumbers,
                              bookTables,
                              '${datetime.year}/${datetime.month}/${datetime.day}',
                              '${arrivalTime.hour}.${arrivalTime.minute} $arrivalPeriod',
                              '${departureTime.hour}.${departureTime.minute} $departurePeriod',
                              mainTablePriceVar, selectedDatingTableItemList);
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

  Future<List<dynamic>> getDatingTableItems() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/TableItems'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final datingTableItems = json.decode(response.body);
      return DatingTableItems.fromJsonList(datingTableItems['data']['TableItems']);
    } else {
      throw Exception('Failed to load data');
    }
  }

  //Payment Intent
  Future<void> cardPayment(List tableNumbers, List<TableIdList> tables, String date, String arrivalTime, String departureTime, int amount, List itemList) async {
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
        reserveDatingTable(tableNumbers, tables, date, arrivalTime, departureTime, amount, itemList),
      });
    }catch(error){
      unSuccessAwesomeDialog(DialogType.warning, 'Payment Unsuccessful Try Again!', "Warning");
      throw Exception(error);
    }
  }

  void reserveDatingTable(List tableNumbers, List<TableIdList> tables, String date, String arrivalTime, String departureTime, int amount, List itemList) async {

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
          "Type": 'Dating',
          "Items": itemList
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
        print(msg);
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
}

class DatingTableItems{
  final String itemImagePath;
  final String itemName;
  final String itemType;
  final int itemPrice;
  final String itemId;
  DatingTableItems({
    required this.itemImagePath,
    required this.itemName,
    required this.itemType,
    required this.itemPrice,
    required this.itemId,
  });
  factory DatingTableItems.fromJson(Map<String, dynamic> json){
    return DatingTableItems(
      itemImagePath: json['TableItemImage'],
      itemName: json['ItemName'],
      itemPrice: json['ItemPrice'],
      itemType: json['ItemType'],
      itemId: json['id'],
    );
  }
  static List<DatingTableItems> fromJsonList(dynamic jsonList){
    final datingTableItemsList = <DatingTableItems>[];
    if (jsonList is List<dynamic>) {
      for (final json in jsonList) {
        datingTableItemsList.add(
          DatingTableItems.fromJson(json),
        );
      }
    }
    return datingTableItemsList;
  }
}
class TableIdList {
  final String tableIdentity;
  TableIdList({required this.tableIdentity});

  Map<String, dynamic> toJson() => {
    'table': tableIdentity,
  };
}
