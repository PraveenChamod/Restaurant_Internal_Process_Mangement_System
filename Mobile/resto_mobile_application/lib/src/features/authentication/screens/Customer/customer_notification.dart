import 'package:flutter/cupertino.dart';

import '../../../../common_widgets/background_image.dart';

class CustomerNotification extends StatelessWidget {
  const CustomerNotification({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: const <Widget>[
        BackgroundImage(),
      ],
    );
  }
}
