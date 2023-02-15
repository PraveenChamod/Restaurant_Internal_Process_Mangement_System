import 'package:flutter/material.dart';

class Indicator extends StatelessWidget {
  final bool isActive;
  const Indicator({
    Key? key,
    required this.isActive
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      margin: const EdgeInsets.symmetric(horizontal: 2.0),
      width: isActive ? 20.0 : 8.0,
      height: 8.0,
      decoration: BoxDecoration(
        color: isActive ? const Color(0xFFfebf10) : Colors.grey,
        borderRadius: BorderRadius.circular(8.0),
      ), duration: const Duration(milliseconds: 250),
    );
  }
}