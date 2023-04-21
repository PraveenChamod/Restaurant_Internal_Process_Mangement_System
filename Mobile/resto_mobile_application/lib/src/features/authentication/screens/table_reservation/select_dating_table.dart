import 'dart:convert';
import 'package:animated_icon_button/animated_icon_button.dart';
import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/material.dart';
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
  const SelectDatingTable({Key? key,
    required this.flowerVaseImagePath,
    required this.beverageImagePath,
    required this.candlesImagePath,
    required this.tableNapkinImagePath,
    required this.mainTablePrice
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
                          // border: Border.all(
                          //   color: const Color(0xFFfebf10),
                          // ),
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
                                          'http://$hostName:5000/Datingtableitemimages/${snapshot.data![index].itemImagePath}',
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
                                                        flowerVaseImagePathVar = 'http://$hostName:5000/Datingtableitemimages/${snapshot.data![index].itemImagePath}';
                                                      });
                                                    }else if(snapshot.data![index].itemType == 'Beverage'){
                                                      setState(() {
                                                        beverageImagePathVar = 'http://$hostName:5000/Datingtableitemimages/${snapshot.data![index].itemImagePath}';
                                                      });
                                                    }else if(snapshot.data![index].itemType == 'Candles'){
                                                      setState(() {
                                                        candlesImagePathVar = 'http://$hostName:5000/Datingtableitemimages/${snapshot.data![index].itemImagePath}';
                                                      });
                                                    }else{
                                                      setState(() {
                                                        tableNapkinImagePathVar = 'http://$hostName:5000/Datingtableitemimages/${snapshot.data![index].itemImagePath}';
                                                      });
                                                    }
                                                  });
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
                                                  });
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
  Future<List<dynamic>> getDatingTableItems() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/DatingTableItems'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 200) {
      final datingTableItems = json.decode(response.body);
      return DatingTableItems.fromJsonList(datingTableItems['data']['datingTableItems']);
    } else {
      throw Exception('Failed to load data');
    }
  }
}

class DatingTableItems{
  final String itemImagePath;
  final String itemName;
  final String itemType;
  final int itemPrice;
  DatingTableItems({
    required this.itemImagePath,
    required this.itemName,
    required this.itemType,
    required this.itemPrice,
  });
  factory DatingTableItems.fromJson(Map<String, dynamic> json){
    return DatingTableItems(
      itemImagePath: json['DatingTableItemImage'],
      itemName: json['ItemName'],
      itemPrice: json['ItemPrice'],
      itemType: json['ItemType'],
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
