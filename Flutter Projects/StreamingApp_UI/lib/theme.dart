import 'package:flutter/material.dart';

class CustomTheme {
  static Color mPrimaryColor = Color(0xff6f16c9);
  static Color mAccentColor = Color(0xff0c0314);
  static ThemeData theme() {
    return ThemeData(
        primaryColor: mPrimaryColor,
        accentColor: Color(0xff0c0314),
        backgroundColor: Color(0xff0c0314),
        textTheme: TextTheme(
            headline1: TextStyle(color: Colors.white, fontSize: 18),
            headline2: TextStyle(color: mPrimaryColor, fontWeight: FontWeight.bold,fontSize: 24),
            headline3: TextStyle(color: Colors.white,fontSize: 20,fontWeight: FontWeight.bold),
            headline4: TextStyle(color: Colors.white,fontSize: 16),
            caption: TextStyle(color: Colors.white,fontSize: 15,letterSpacing: 0.9,fontWeight: FontWeight.bold),
            button: TextStyle(
                color: Colors.white, fontSize: 16, letterSpacing: 1)));
  }
}

class CustomButtonColor extends MaterialStateColor {
  const CustomButtonColor() : super(_defaultColor);

  static const int _defaultColor = 0xff6f16c9;
  static const int _pressedColor = 0xff5810a1;

  @override
  Color resolve(Set<MaterialState> states) {
    if (states.contains(MaterialState.pressed)) {
      return const Color(_pressedColor);
    }
    return const Color(_defaultColor);
  }
}
