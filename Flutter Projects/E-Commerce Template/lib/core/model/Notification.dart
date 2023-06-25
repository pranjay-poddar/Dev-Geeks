import 'package:flutter/cupertino.dart';

class UserNotification {
  String imageUrl;
  String title;
  String description;
  DateTime dateTime;

  UserNotification({
    @required this.imageUrl,
    @required this.title,
    @required this.description,
    @required this.dateTime,
  });

  factory UserNotification.fromJson(Map<String, dynamic> json) {
    return UserNotification(
      imageUrl: json['image_url'],
      title: json['title'],
      description: json['description'],
      dateTime: DateTime.parse(json['date_time']),
    );
  }
}
