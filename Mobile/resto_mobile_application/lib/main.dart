import 'dart:ui';
import 'package:flutter/services.dart';
import 'package:device_preview/device_preview.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/Customer/customer_home.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/Customer/customer_main_page.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/Customer/customer_search.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/Products/Products_Menu_Titles.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/forget_password/getphonenumber.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/forget_password/gettemail.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/forget_password/make_selction.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/home_screen.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/login_screen.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/signup_screen.dart';
import 'package:resto_mobile_application/src/features/authentication/screens/splash_screen.dart';

void main() => runApp(
  DevicePreview(
    enabled: !kReleaseMode,
    builder: (context) => const MyApp(), // Wrap your app
  ),
);

// void main() {
//   runApp(const MyApp());
// }

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    return MaterialApp(
      scrollBehavior: AppScrollBehavior(),
      debugShowCheckedModeBanner: false,
      useInheritedMediaQuery: true,
      locale: DevicePreview.locale(context),
      builder: DevicePreview.appBuilder,
      theme: ThemeData.light(),
      darkTheme: ThemeData.dark(),
      //home: const SplashScreen(),
      //home: const HomeScreen(),
      //home: const CustomerMainPage(),
      //home: const CustomerHome(),
      //home: const CustomerSearch(),
      //home: const ProductMenuTitles(),
      home: const LoginScreen(),
    );
  }
}

class AppScrollBehavior extends MaterialScrollBehavior {
  @override
  Set<PointerDeviceKind> get dragDevices => {
    PointerDeviceKind.touch,
    PointerDeviceKind.mouse,
  };
}