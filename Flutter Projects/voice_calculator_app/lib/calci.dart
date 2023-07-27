import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_neumorphic/flutter_neumorphic.dart';
import 'package:get/get.dart';
import 'package:math_parser/math_parser.dart';
import 'package:math_parser/integrate.dart';
import 'package:math_expressions/math_expressions.dart';
import 'package:resize/resize.dart';



class CalculateController extends GetxController {
  /* 
  UserInput = What User entered with the keyboard .
  UserOutput = Calculate the numbers that the user entered and put into userOutPut variable.
  */
  var userInput = "";
  var userOutput = "";

  /// Equal Button Pressed Func
  equalPressed() {
    String userInputFC = userInput;
    userInputFC = userInputFC.replaceAll("x", "*");
    Parser p = Parser();
    Expression exp = p.parse(userInputFC);
    ContextModel ctx = ContextModel();
    double eval = exp.evaluate(EvaluationType.REAL, ctx);
    userInputFC = userInputFC.replaceAllMapped(
    RegExp(r'(\d+(\.\d+)?)%(\d+(\.\d+)?)'),
    (match) {
      double percentage = double.parse(match.group(1)!);
      double value = double.parse(match.group(3)!);
      double result = (percentage / 100) * value;
      return result.toString();
    },
  );

    userOutput = eval.toString();
    update();
  }

  /// Clear Button Pressed Func
  clearInputAndOutput() {
    userInput = "";
    userOutput = "";
    update();
  }

  /// Delete Button Pressed Func
  deleteBtnAction() {
    userInput = userInput.substring(0, userInput.length - 1);
    update();
  }

  /// on Number Button Tapped
  onBtnTapped(List<String> buttons, int index) {
    userInput += buttons[index];
    update();
  }
}

/// Dark Colors
class DarkColors {
  static const scaffoldBgColor = Color(0xff22252D);
  static const sheetBgColor = Color(0xff292D36);
  static const btnBgColor = Color.fromARGB(255, 33, 36, 42);
  static const leftOperatorColor = Color.fromARGB(255, 7, 255, 209);
}

/// Light Colors
class LightColors {
  static const scaffoldBgColor = Color(0xffFFFFFF);
  static const sheetBgColor = Color(0xffF9F9F9);
  static const btnBgColor = Color.fromARGB(255, 243, 243, 243);
  static const operatorColor = Color(0xffEB6666);
  static const leftOperatorColor = Color.fromARGB(255, 1, 157, 128);
}

class CustomButton extends StatelessWidget {
  final Color color;
  final Color textColor;
  final String text;
  final VoidCallback buttonTapped;

  const CustomButton({
    Key? key,
    required this.color,
    required this.textColor,
    required this.text,
    required this.buttonTapped,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: buttonTapped,
      child: Container(
        width: 40,
        height: 40,
        margin: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(50),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.2),
              offset: const Offset(3, 3),
              blurRadius: 3,
              spreadRadius: 1,
            ),
            BoxShadow(
              color: Colors.white.withOpacity(0.7),
              offset: const Offset(-3, -3),
              blurRadius: 3,
              spreadRadius: 1,
            ),
          ],
        ),
        child: Center(
          child: Text(
            text,
            style: TextStyle(color: Colors.white, fontSize: 20),
          ),
        ),
      ),
    );
  }
}

class ThemeController extends GetxController {
  bool isDark = true;

  lightTheme() {
    isDark = false;
    update();
  }

  darkTheme() {
    isDark = true;
    update();
  }
}

class MainScreenState extends StatefulWidget {
  MainScreenState({Key? key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreenState> {
  final List<String> buttons = [
    "C",
    "DEL",
    "%",
    "/",
    "9",
    "8",
    "7",
    "x",
    "6",
    "5",
    "4",
    "-",
    "3",
    "2",
    "1",
    "+",
    "0",
    ".",
    "ANS",
    "=",
  ];

  @override
  void initState() {
    super.initState();
  }

  String calval = "";
  String final_value = "";
  String final_ans = '';

  void validate(val) {
    if (val == '+' || val == '-' || val == 'x' || val == '/' || val == '%') {
      val = val.replaceAll("x", "*");
      setState(() {
        calval += ' $val ';
      });
    } else if (val == 'ANS') {
      setState(() {
        calval += final_ans;
      });
    } else {
      setState(() {
        calval += val;
      });
    }
  }

  getfinalOutput() {
    var expression = MathNodeExpression.fromString(calval).calc(MathVariableValues.none);

    setState(() {
      final_value = '= ${expression.toString()}';
      final_ans = final_value.replaceAll('=', '');
    });
  }

  void deletesatete() {
    setState(() {
      final_value = '';
      calval = '';
    });
  }

  void removesinglevalue() {
    setState(() {
      calval = calval.substring(0, calval.length - 1);
    });
  }

  bool isOperator(String y) {
    if (y == "%" || y == "/" || y == "x" || y == "-" || y == "+" || y == "=") {
      return true;
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height / 1.5,
      width: MediaQuery.of(context).size.width,
      child: Column(
        children: [
          Text(
            '$calval  $final_value',
            style: TextStyle(fontSize: 20,color: Colors.black),
          ),
          SizedBox(height: 20),
          Expanded(
            flex: 5,
            child: Container(
              padding: const EdgeInsets.all(3),
              child: GridView.builder(
                physics: const NeverScrollableScrollPhysics(),
                itemCount: buttons.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 4,
                ),
                itemBuilder: (context, index) {
                  switch (index) {
                    case 0:
                      return CustomButton(
                        buttonTapped: () {
                          deletesatete();
                        },
                        color: DarkColors.btnBgColor,
                        textColor: DarkColors.leftOperatorColor,
                        text: buttons[index],
                      );
                    case 1:
                      return CustomButton(
                        buttonTapped: () {
                          removesinglevalue();
                        },
                        color: DarkColors.btnBgColor,
                        textColor: DarkColors.leftOperatorColor,
                        text: buttons[index],
                      );
                    case 19:
                      return CustomButton(
                        buttonTapped: () {
                          getfinalOutput();
                        },
                        color: DarkColors.btnBgColor,
                        textColor: DarkColors.leftOperatorColor,
                        text: buttons[index],
                      );
                    default:
                      return CustomButton(
                        buttonTapped: () {
                          validate(buttons[index]);
                        },
                        color: DarkColors.btnBgColor,
                        textColor: isOperator(buttons[index])
                            ? LightColors.operatorColor
                            : Colors.black,
                        text: buttons[index],
                      );
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

Expanded outPutSection(ThemeController themeController, CalculateController controller) {
  return Expanded(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          alignment: Alignment.topCenter,
          width: 100,
          height: 45,
          decoration: BoxDecoration(
            color: DarkColors.sheetBgColor,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Center(
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                GestureDetector(
                  onTap: () {
                    themeController.lightTheme();
                  },
                  child: Icon(
                    Icons.light_mode_outlined,
                    color: Colors.black,
                    size: 25,
                  ),
                ),
                const SizedBox(
                  width: 10,
                ),
                GestureDetector(
                  onTap: () {
                    themeController.darkTheme();
                  },
                  child: Icon(
                    Icons.dark_mode_outlined,
                    color: Colors.grey,
                    size: 25,
                  ),
                ),
              ],
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(right: 20, top: 70),
          child: Column(
            children: [
              Container(
                alignment: Alignment.centerRight,
                child: TextField(
                  readOnly: true,
                  controller: TextEditingController(text: controller.userInput),
                  style: TextStyle(color: Colors.black, fontSize: 25),
                  cursorColor: Colors.blue, // Customize the cursor color
                  cursorWidth: 2.0, // Customize the cursor width
                  showCursor: true, // Show the cursor
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              Container(
                alignment: Alignment.bottomRight,
                child: TextField(
                  readOnly: true,
                  controller: TextEditingController(text: controller.userOutput),
                  style: TextStyle(color: Colors.black, fontSize: 32),
                  cursorColor: Colors.blue, // Customize the cursor color
                  cursorWidth: 2.0, // Customize the cursor width
                  showCursor: true, // Show the cursor
                ),
              ),
            ],
          ),

        ),
      ],
    ),
  );
}
}
