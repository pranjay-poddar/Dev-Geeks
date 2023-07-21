import 'package:flutter/material.dart';
import 'package:flutter_streaming_ui/screens/getStarted.dart';
import 'package:flutter_streaming_ui/theme.dart';


main() =>  runApp(App());

class App extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Streaming App',
      theme: CustomTheme.theme(),
      home: StartScreen(),
    );
  }
}