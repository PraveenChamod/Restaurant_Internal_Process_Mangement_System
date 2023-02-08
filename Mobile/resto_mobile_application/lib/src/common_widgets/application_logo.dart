import 'package:flutter/cupertino.dart';

import '../constants/image_strings.dart';

class ApplicationLogo extends StatelessWidget {
  const ApplicationLogo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Image(
      image: AssetImage(commonLogo),
      width: 200,
    );
  }
}
