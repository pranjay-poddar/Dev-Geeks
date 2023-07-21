import 'package:flutter/material.dart';

class Channel {
  final String name;
  final bool isPublic;

  const Channel({@required this.name, this.isPublic = true});
}
