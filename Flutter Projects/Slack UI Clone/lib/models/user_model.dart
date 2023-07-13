import 'package:flutter/material.dart';
import 'package:slack_clone_app_ui/config/constants.dart';

class User {
  final String name;
  final String imageUrl;
  final bool isActive;
  final Status status;

  const User(
      {@required this.name,
      @required this.imageUrl,
      this.isActive = false,
      this.status = Status.normal});
}
