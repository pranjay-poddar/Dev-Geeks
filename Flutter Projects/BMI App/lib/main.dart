import 'package:flutter/material.dart';

void main() {
  runApp(BMICalculatorApp());
}

class BMICalculatorApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: BMICalculator(),
    );
  }
}

class BMICalculator extends StatefulWidget {
  @override
  _BMICalculatorState createState() => _BMICalculatorState();
}

class _BMICalculatorState extends State<BMICalculator> {
  double height = 160.0; // Default height in centimeters
  double weight = 60.0; // Default weight in kilograms
  double bmi = 0.0;

  void calculateBMI() {
    setState(() {
      bmi = weight / ((height / 100) * (height / 100));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title:const Text('BMI Calculator'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
           const Text(
              'Enter Your Height (cm)',
              style: TextStyle(fontSize: 20.0),
            ),
            const SizedBox(height: 10.0),
            Slider(
              value: height,
              min: 100.0,
              max: 250.0,
              onChanged: (newValue) {
                setState(() {
                  height = newValue;
                });
              },
            ),
            Text(
              height.toStringAsFixed(1),
              style:const TextStyle(fontSize: 24.0),
            ),
           const SizedBox(height: 20.0),
           const Text(
              'Enter Your Weight (kg)',
              style: TextStyle(fontSize: 20.0),
            ),
            const SizedBox(height: 10.0),
            Slider(
              value: weight,
              min: 30.0,
              max: 150.0,
              onChanged: (newValue) {
                setState(() {
                  weight = newValue;
                });
              },
            ),
            Text(
              weight.toStringAsFixed(1),
              style:const TextStyle(fontSize: 24.0),
            ),
            const SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () {
                calculateBMI();
              },
              child: const Text('Calculate BMI'),
            ),
            const SizedBox(height: 20.0),
            Text(
              'BMI: ${bmi.toStringAsFixed(2)}',
              style: const TextStyle(fontSize: 24.0),
            ),
          ],
        ),
      ),
    );
  }
}
