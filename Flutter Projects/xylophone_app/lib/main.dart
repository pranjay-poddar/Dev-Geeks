import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';

void main() => runApp(XylophoneApp());

class XylophoneApp extends StatelessWidget {

  void playSound(int num){
    final player = AudioCache();
    player.play("note$num.wav");
  }

  Expanded buildKey({Color color, int number}) {
    return Expanded(
      child: TextButton(
        style:
        ElevatedButton.styleFrom(backgroundColor: color),
        onPressed: () {
          playSound(number);
        },
      ),
    );
  }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Colors.black,
        body: SafeArea(
          child: Container(
            child: Container(
              child: Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    buildKey(color: Colors.red, number: 1),
                    buildKey(color: Colors.orange, number: 2),
                    buildKey(color: Colors.yellow, number: 3),
                    buildKey(color: Colors.green, number: 4),
                    buildKey(color: Colors.blue, number: 5),
                    buildKey(color: Colors.indigo, number: 6),
                    buildKey(color: Colors.purple, number: 7),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
