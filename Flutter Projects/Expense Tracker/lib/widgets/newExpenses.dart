import 'dart:io';
import 'package:expense_tracker/models/expense.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'package:sizer/sizer.dart';

class NewExpense extends StatefulWidget {
  const NewExpense({
    super.key,
    required this.onAddExpense,
  });

  final void Function(Expense expense) onAddExpense;

  @override
  State<NewExpense> createState() => _NewExpenseState();
}

class _NewExpenseState extends State<NewExpense> {
  final _titleController = TextEditingController();
  final _amountController = TextEditingController();
  DateTime? _selectedDate;
  Category _selectedCategory = Category.leisure;

  @override
  void dispose() {
    _titleController.dispose();
    _amountController.dispose();
    super.dispose();
  }

  void _dialogBox() {
    Platform.isIOS
        ? showCupertinoDialog(
            context: context,
            builder: (ctx) => CupertinoAlertDialog(
              title: Text('Invalid Input'),
              content: Text('Please enter valid Title,Date and Amount.'),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: Text('Okay'),
                ),
              ],
            ),
          )
        : showDialog(
            context: context,
            builder: (ctx) => AlertDialog(
              title: Text('Invalid Input'),
              content: Text('Please enter valid Title,Date and Amount.'),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: Text('Okay'),
                ),
              ],
            ),
          );
  }

  void _submitExpenseData() {
    final enteredAmount = double.tryParse(_amountController.text);
    final amountIsInvalid = enteredAmount == null || enteredAmount <= 0;

    if (_titleController.text.trim().isEmpty ||
        amountIsInvalid ||
        _selectedDate == null) {
      _dialogBox();
      return;
    }
    widget.onAddExpense(
      Expense(
        title: _titleController.text,
        amount: enteredAmount,
        date: _selectedDate!,
        category: _selectedCategory,
      ),
    );
    Navigator.pop(context);
  }

  void _DatePicker() async {
    final now = DateTime.now();
    final firstDate = DateTime(now.year - 1, now.month, now.day);

    final pickedDate = await showDatePicker(
      context: context,
      initialDate: now,
      firstDate: firstDate,
      lastDate: now,
    );
    setState(() {
      _selectedDate = pickedDate;
    });
  }

  @override
  Widget build(BuildContext context) {
    final keyBoardSpace = MediaQuery.of(context).viewInsets.bottom;

    return LayoutBuilder(
      builder: (ctx, constraints) {
        final width = constraints.maxWidth;
        return SizedBox(
          height: double.infinity,
          child: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.fromLTRB(16, 48, 16, keyBoardSpace + 16),
              child: Column(
                children: [
                  width >= 600
                      ? Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _titleController,
                                decoration: InputDecoration(
                                  label: Text('Title'),
                                ),
                              ),
                            ),
                            SizedBox(
                              width: 2.w,
                            ),
                            Expanded(
                              child: TextField(
                                controller: _amountController,
                                keyboardType: TextInputType.number,
                                decoration: InputDecoration(
                                  label: Text('Amount'),
                                  prefixText: '\$',
                                ),
                              ),
                            ),
                          ],
                        )
                      : TextField(
                          controller: _titleController,
                          decoration: InputDecoration(
                            label: Text('Title'),
                          ),
                        ),
                  SizedBox(
                    height: 2.h,
                  ),
                  width >= 600
                      ? Row(
                          children: [
                            Padding(
                              padding: EdgeInsets.only(
                                left: 2.w,
                              ),
                              child: DropdownButton(
                                value: _selectedCategory,
                                items: Category.values
                                    .map(
                                      (category) => DropdownMenuItem(
                                        value: category,
                                        child:
                                            Text(category.name.toUpperCase()),
                                      ),
                                    )
                                    .toList(),
                                onChanged: (value) {
                                  if (value == null) {
                                    return;
                                  }
                                  setState(() {
                                    _selectedCategory = value;
                                  });
                                },
                              ),
                            ),
                            Expanded(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Text(
                                    _selectedDate == null
                                        ? 'No Date Selected'
                                        : formatter.format(_selectedDate!),
                                  ),
                                  IconButton(
                                    onPressed: _DatePicker,
                                    icon: Icon(Icons.calendar_month_outlined),
                                  ),
                                  SizedBox(
                                    width: 2.w,
                                  ),
                                ],
                              ),
                            ),
                          ],
                        )
                      : Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _amountController,
                                keyboardType: TextInputType.number,
                                decoration: InputDecoration(
                                  label: Text('Amount'),
                                  prefixText: '\$',
                                ),
                              ),
                            ),
                            Expanded(
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Text(
                                    _selectedDate == null
                                        ? 'No Date Selected'
                                        : formatter.format(_selectedDate!),
                                  ),
                                  IconButton(
                                    onPressed: _DatePicker,
                                    icon: Icon(Icons.calendar_month_outlined),
                                  ),
                                  SizedBox(
                                    width: 2.w,
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                  SizedBox(
                    height: 3.h,
                  ),
                  width >= 600
                      ? Row(
                          children: [
                            const Spacer(),
                            TextButton(
                              onPressed: () => Navigator.pop(context),
                              child: Text('Cancel'),
                            ),
                            SizedBox(
                              width: 1.w,
                            ),
                            ElevatedButton(
                              onPressed: _submitExpenseData,
                              child: Text('Save Expenses'),
                            ),
                          ],
                        )
                      : Row(
                          children: [
                            Padding(
                              padding: EdgeInsets.only(
                                left: 2.w,
                              ),
                              child: DropdownButton(
                                value: _selectedCategory,
                                items: Category.values
                                    .map(
                                      (category) => DropdownMenuItem(
                                        value: category,
                                        child:
                                            Text(category.name.toUpperCase()),
                                      ),
                                    )
                                    .toList(),
                                onChanged: (value) {
                                  if (value == null) {
                                    return;
                                  }
                                  setState(() {
                                    _selectedCategory = value;
                                  });
                                },
                              ),
                            ),
                            const Spacer(),
                            TextButton(
                              onPressed: () => Navigator.pop(context),
                              child: Text('Cancel'),
                            ),
                            SizedBox(
                              width: 1.w,
                            ),
                            ElevatedButton(
                              onPressed: _submitExpenseData,
                              child: Text('Save Expenses'),
                            ),
                          ],
                        ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
