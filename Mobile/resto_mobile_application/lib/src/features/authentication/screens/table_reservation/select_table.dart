import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../common_widgets/background_image.dart';
import '../Customer/customer_main_page.dart';

class SelectTable extends StatefulWidget {
  const SelectTable({Key? key}) : super(key: key);

  @override
  State<SelectTable> createState() => _SelectTableState();
}

class _SelectTableState extends State<SelectTable>  with SingleTickerProviderStateMixin{
  //For change the tab bar color
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }




  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: DefaultTabController(
        length: 4,
        child: Scaffold(
          backgroundColor: const Color(0xFF161b1d),
          appBar: AppBar(
            foregroundColor: const Color(0xFFfebf10),
            elevation: 0,
            leading: IconButton(
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_){
                      return const CustomerMainPage(choice: 3,);
                    },
                  ),
                );
              },
              icon: const Icon(Icons.chevron_left),
            ),
            title: const Text("Select Table"),
            actions:  <Widget>[
              Padding(
                padding: const EdgeInsets.only(right: 20.0),
                child: IconButton(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_){
                          return const CustomerMainPage(choice: 3);
                        },
                      ),
                    );
                  },
                  icon: const Icon(Icons.home),
                ),
                //child: Icon(Icons.search),
              ),

            ],
            bottom:  TabBar(
              controller: _tabController,
              indicatorColor: const Color(0xFFfebf10),
              tabs: const [
                Tab(
                  icon: Icon(
                    Icons.table_restaurant,
                    color: Color(0xFFfebf10),
                  ),
                  text: 'Dine In',

                ),
                Tab(
                  icon: Icon(
                    CupertinoIcons.person_2_alt,
                    color: Color(0xFFfebf10),
                  ),
                  text: 'For Dating',
                ),
                Tab(
                  icon: Icon(
                    CupertinoIcons.gift_fill,
                    color: Color(0xFFfebf10),
                  ),
                  text: 'Special Events',
                ),
              ],
            ),
            backgroundColor: const Color(0xFF161b1d),
            centerTitle: true,
          ),
          body: TabBarView(
            controller: _tabController,
            children: [
              Stack(
                children: [
                  const BackgroundImage(),
                  SingleChildScrollView(
                    child: Column(
                      children: [
                        Container(
                          height: 200,
                          color: Colors.red,
                        ),
                        const Divider(),
                        Container(
                          height: 200,
                          color: Colors.red,
                        ),
                        const Divider(),
                        Container(
                          height: 200,
                          color: Colors.red,
                        ),
                        const Divider(),
                        Container(
                          height: 200,
                          color: Colors.red,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const Icon(Icons.ac_unit),
              const Icon(Icons.ac_unit),

            ],
          ),

        ),
      ),
    );
  }
}
