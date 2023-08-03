import 'dart:math';

enum Gender {
  male,
  female,
}

class BmiCalculate {
  BmiCalculate({
    required this.height,
    required this.weight,
  });

  final int height;
  final int weight;
  double _bmi = 0;

  String get calculateBMI {
    _bmi = weight / pow((height / 100), 2);
    return _bmi.toStringAsFixed(1);
  }

  String get getResults {
    if (_bmi >= 25) {
      return 'Overweight';
    } else if (_bmi > 18.5) {
      return 'Normal';
    } else {
      return 'Underweight';
    }
  }

  String get getInterpretation {
    if (_bmi >= 25) {
      return 'You have a higher than normal body weight. Try to exercise more.\n 💪🚵🚴🏊🏇🏃';
    } else if (_bmi >= 18.5) {
      return 'You have a normal body weight. Good job!\n 🍇🍉🍍🍒🌽';
    } else {
      return 'You have a lower than normal body weight. You can eat a bit more.\n 🍲🍱🍳🍗🍒🍎';
    }
  }
}
