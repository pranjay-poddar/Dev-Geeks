import 'package:flutter/cupertino.dart';

class ExploreItem {
  final String imageUrl;

  ExploreItem({@required this.imageUrl});

  factory ExploreItem.fromJson(Map<String, dynamic> json) {
    return ExploreItem(imageUrl: json['image_url']);
  }
}
