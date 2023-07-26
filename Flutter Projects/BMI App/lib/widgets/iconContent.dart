import 'package:bmi_calculator/customColor.dart';
import 'package:flutter/material.dart';

class IconContent extends StatelessWidget {
  IconContent({
    super.key,
    required this.icon,
    required this.label,
  });

  final IconData icon;
  final String label;
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(
          icon,
          size: 80.0,
        ),
        SizedBox(
          height: 15,
        ),
        Text(
          label,
          style: kLabelTextStyle,
        ),
      ],
    );
  }
}
