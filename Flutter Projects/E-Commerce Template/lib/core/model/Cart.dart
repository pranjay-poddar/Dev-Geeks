import 'package:flutter/cupertino.dart';

class Cart {
  List<String> image;
  String name;
  int price;
  int count;

  Cart({
    @required this.image,
    @required this.name,
    @required this.price,
    @required this.count,
  });

  factory Cart.fromJson(Map<String, dynamic> json) {
    return Cart(
      image: json['image'],
      name: json['name'],
      price: json['price'],
      count: json['count'],
    );
  }
}
