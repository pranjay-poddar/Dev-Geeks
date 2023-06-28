import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:slack_clone_app_ui/screens/navigation_screen.dart';
import 'package:slack_clone_app_ui/utils/disable_overscroll_animation.dart';
import 'package:slack_clone_app_ui/config/palette.dart';
import 'package:slack_clone_app_ui/screens/screens.dart';

void main() {
  /* Makes statusBar color same as appBar color.
  It is different from setting up the brightness
  in which status bar color will not be exactly
  as you appBar color.
  */
  SystemChrome.setSystemUIOverlayStyle(
    SystemUiOverlayStyle(
        statusBarColor: Palette.appbar, systemNavigationBarColor: Colors.white),
  );
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  int selectedIndex = 0;
  List<Widget> screen = [HomeScreen(), Scaffold(), Scaffold(), Scaffold()];
  Map<String, IconData> bottomNavigationItems = {
    'Home': FlutterIcons.home_ent,
    'DMs': FlutterIcons.chat_bubble_outline_mdi,
    'Mentions': FlutterIcons.email_ent,
    'You': FlutterIcons.face_mdi
  };
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Slack ',
      theme: ThemeData(primaryColor: Colors.grey.shade700),
      debugShowCheckedModeBanner: false,
      builder: (context, child) {
        return ScrollConfiguration(
          //Adding custom Scroll behaviour will help us to disable glowing animation on reaching the end of the screen
          behavior: DisableOverscrollAnimation(),
          child: child,
        );
      },
      home: NavigationScreen(),
    );
  }
}
