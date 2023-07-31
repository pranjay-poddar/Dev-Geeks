import 'package:flutter/cupertino.dart';

class ColorWay {
  String name;
  Color color;

  ColorWay({@required this.name, @required this.color});

  factory ColorWay.fromJson(Map<String, dynamic> json) {
    return ColorWay(name: json['name'], color: json['color']);
  }
}
