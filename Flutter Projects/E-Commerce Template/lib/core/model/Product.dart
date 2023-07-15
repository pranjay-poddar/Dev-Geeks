import 'package:flutter/cupertino.dart';
import 'package:marketky/core/model/ColorWay.dart';
import 'package:marketky/core/model/ProductSize.dart';
import 'package:marketky/core/model/Review.dart';

class Product {
  List<String> image;
  String name;
  int price;
  double rating;
  String description;
  List<ColorWay> colors;
  List<ProductSize> sizes;
  List<Review> reviews;
  String storeName;

  Product({
    @required this.image,
    @required this.name,
    @required this.price,
    @required this.rating,
    @required this.description,
    @required this.colors,
    @required this.sizes,
    @required this.reviews,
    @required this.storeName,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    try {
      return Product(
        image: json['image'],
        name: json['name'],
        price: json['price'],
        rating: json['rating'],
        description: json['description'],
        colors: (json['colors'] as List).map((data) => ColorWay.fromJson(data)).toList(),
        sizes: (json['sizes'] as List).map((data) => ProductSize.fromJson(data)).toList(),
        reviews: (json['reviews'] as List).map((data) => Review.fromJson(data)).toList(),
        storeName: json['store_name'],
      );
    } catch (e) {
      print(e);
      return e;
    }
  }
}
