import 'package:expense_tracker/main.dart';
import 'package:expense_tracker/widgets/category_widget.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<double> costForEachRow = [];
  String title = appTitle;
  int totalRow = 0;
  void _addRow() {
    setState(() {
      totalRow += 1;
      costForEachRow.add(0);
    });
  }

  void _updateTotalCost() {
    setState(() {
      double totalCost = costForEachRow.isNotEmpty
          ? costForEachRow.reduce((value, element) => value + element)
          : 0;
      if (totalCost > 0.0) {
        title = "$appTitle | Total Cost: \$$totalCost";
      } else {
        title = appTitle;
      }
    });
  }

  void _deleteLastRow() {
    setState(() {
      int newTotalRow = totalRow - 1;
      totalRow = newTotalRow < 0 ? 0 : newTotalRow;
      if (costForEachRow.isNotEmpty) {
        costForEachRow.removeLast();
      }
    });
    _updateTotalCost();
  }

  void _updateCostForEachRow(int rowNum, double newVal) {
    //print("Row $rowNum - newVal $newVal");
    setState(() {
      if (costForEachRow.length > rowNum) {
        costForEachRow[rowNum] = newVal;
      }
    });
    _updateTotalCost();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          children: [
            for (int i = 0; i < totalRow; ++i)
              CategoryWidget(
                rowNumber: i,
                callback: _updateCostForEachRow,
              )
          ],
        ),
      ),
      appBar: AppBar(
        title: Text(appTitle),
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(left: 30),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            FloatingActionButton.extended(
              onPressed: _addRow,
              label: const Text('Add'),
              icon: const Icon(Icons.add),
              backgroundColor: Colors.cyan,
            ),
            Expanded(child: Container()),
            FloatingActionButton.extended(
              onPressed: _deleteLastRow,
              label: const Text('Delete'),
              icon: const Icon(Icons.delete),
              backgroundColor: Colors.red,
            ),
          ],
        ),
      ),
    );
  }
}
