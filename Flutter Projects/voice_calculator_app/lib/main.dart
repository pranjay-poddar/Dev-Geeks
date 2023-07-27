import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'dart:io';
import 'package:math_parser/math_parser.dart';
import 'package:math_parser/integrate.dart';

import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_recognition_error.dart';
import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'calci.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:units_converter/units_converter.dart';

void main() {
  runApp(MyApp());
}
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData.dark().copyWith(
        primaryColor: const Color(0xFF0A0E21),
        scaffoldBackgroundColor: Colors.white,
      ),
      debugShowCheckedModeBanner: false,
      title: 'VoCal',
      home: MyHomePage(),
    );
  }
}
const Color colorDark = Color(0xFF374352);
const Color colorLight = Color(0xFFe6eeff);

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}
class _MyHomePageState extends State<MyHomePage> {
  SpeechToText _speechToText = SpeechToText();
  FlutterTts _flutterTts = FlutterTts();
  bool _speechEnabled = false;
  String _lastWords = '';
  String final_value = '';
  bool _SpeechIconBool = false;



  @override
  void initState() {
    super.initState();
    _initSpeech();
  }


  /// This has to happen only once per app
  void _initSpeech() async {
    _speechEnabled = await _speechToText.initialize();
    setState(() {});
  }

  /// Each time to start a speech recognition session
  void _startListening() async {
    await _speechToText.listen(onResult: _onSpeechResult);
    setState(() {});
  }

  /// Manually stop the active speech recognition session
  /// Note that there are also timeouts that each platform enforces
  /// and the SpeechToText plugin supports setting timeouts on the
  /// listen method.
  Future<void> getFinalOutput() async {
     
   var expression = MathNodeExpression.fromString(
        _lastWords
  ).calc(MathVariableValues.none);
  // Display the parsed expression in human-readable form
  //print(expression);

  setState(() {
    final_value = expression.toString();
  });

  await Future.delayed(Duration(seconds: 2));

  await _speak(final_value);
}

    Future<void> _speak(String text) async {
    await _flutterTts.speak(final_value);
  }

  void _stopListening() async {
    await _speechToText.stop();
    setState(() {});
  }

  /// This is the callback that the SpeechToText plugin calls when
  /// the platform returns recognized words.
  void _onSpeechResult(SpeechRecognitionResult result) {
    setState(() {
      _lastWords = result.recognizedWords;
    });
    getFinalOutput();
  }

  @override
  void dispose() {
    _flutterTts.stop();
    super.dispose();
  }
  bool darkMode=false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('VoCal'),
        backgroundColor: Color.fromARGB(37, 74, 0, 0),
      ),
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            SizedBox(height: 20,),
            Text('Input: $_lastWords', 
            style: TextStyle(fontSize: 20,color: Colors.black)),
            Text('Output: $final_value', style: TextStyle(fontSize: 20,color: Colors.black)),
            Expanded(
              child: Container(
                padding: EdgeInsets.all(16),
                child: Text(
                  // If listening is active show the recognized words
                  _speechToText.isListening
                      ? ''
                      // If listening isn't active but could be tell the user
                      // how to start it, otherwise indicate that speech
                      // recognition is not yet ready or not supported on
                      // the target device
                      : _speechEnabled
                      ? 'Tap the microphone to start listening...'
                      : 'Speech not available',
                      style: TextStyle(
                      fontSize: 15,
                      color: Colors.black,
      ),
                ),
              ),
            ),
            MainScreenState(),
          ],

        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _speechToText.isNotListening ? _startListening : _stopListening,
        tooltip: 'Listen',
        child: Icon(_speechToText.isNotListening ? Icons.mic_off : Icons.mic),
      ),
    );
  }
}