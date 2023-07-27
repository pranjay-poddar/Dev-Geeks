import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart'; // For formatting dates

class AddToDoPage extends StatefulWidget {
  final Map? ToDo;
  const AddToDoPage({super.key, this.ToDo});

  @override
  State<AddToDoPage> createState() => _AddToDoPageState();
}

class _AddToDoPageState extends State<AddToDoPage> {
  TextEditingController titleController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  DateTime selectedDate = DateTime.now();
  TimeOfDay selectedTime = TimeOfDay.now();
  bool isEdit = false;

  @override
  void initState() {
    super.initState();
    final ToDo = widget.ToDo;
    if (ToDo != null) {
      isEdit = true;
      final title = ToDo['title'];
      final description = ToDo['description'];
      final date = DateTime.parse(ToDo['date']); // Convert String to DateTime
      final time = TimeOfDay.fromDateTime(date); // Convert DateTime to TimeOfDay
      titleController.text = title;
      descriptionController.text = description;
      selectedDate = date;
      selectedTime = time;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(isEdit ? 'Edit Todo' : 'Add Todo'),
      ),
      body: ListView(padding: const EdgeInsets.all(20), children: [
        TextField(
          controller: titleController,
          decoration: const InputDecoration(hintText: 'Title'),
        ),
        const SizedBox(height: 20),
        TextField(
          controller: descriptionController,
          decoration: const InputDecoration(hintText: 'Description'),
          keyboardType: TextInputType.multiline,
          minLines: 5,
          maxLines: 8,
        ),
        const SizedBox(height: 20),
        // Date Picker
        ListTile(
          title: Text('Date'),
          subtitle: Text(DateFormat('dd-MM-yyyy').format(selectedDate)),
          onTap: () => _selectDate(context),
        ),
        // Time Picker
        ListTile(
          title: Text('Time'),
          subtitle: Text(selectedTime.format(context)),
          onTap: () => _selectTime(context),
        ),
        const SizedBox(height: 20),
        Padding(
          padding: const EdgeInsets.all(15.0),
          child: ElevatedButton(
            onPressed: isEdit ? updateData : submitData,
            child: Text(
              isEdit ? 'Update' : 'Submit',
            ),
          ),
        )
      ]),
    );
  }

  Future<void> updateData() async {
    final ToDo = widget.ToDo;
    if (ToDo == null) {
      return;
    }
    final id = ToDo['_id'];

    final title = titleController.text;
    final description = descriptionController.text;
    final selectedDateTime = DateTime(selectedDate.year, selectedDate.month, selectedDate.day, selectedTime.hour, selectedTime.minute);
    final body = {
      "title": title,
      "description": description,
      "date": selectedDateTime.toIso8601String(), // Convert DateTime to String
      "is_completed": false,
    };
    final url = 'https://api.nstack.in/v1/todos/$id';
    final uri = Uri.parse(url);
    final response = await http.put(
      uri,
      body: jsonEncode(body),
      headers: {'Content-Type': 'application/json'},
    );
    if (response.statusCode == 200) {
      showSuccessMessage('Updated');
    } else {
      showErrorMessage('Failed');
    }
  }

  Future<void> submitData() async {
    final title = titleController.text;
    final description = descriptionController.text;
    final selectedDateTime = DateTime(selectedDate.year, selectedDate.month, selectedDate.day, selectedTime.hour, selectedTime.minute);
    final body = {
      "title": title,
      "description": description,
      "date": selectedDateTime.toIso8601String(), // Convert DateTime to String
      "is_completed": false,
    };
    const url = 'https://api.nstack.in/v1/todos';
    final uri = Uri.parse(url);
    final response = await http.post(uri,
        body: jsonEncode(body), headers: {'Content-Type': 'application/json'});

    if (response.statusCode == 201) {
      titleController.text = '';
      descriptionController.text = '';
      showSuccessMessage('Creation Success');
    } else {
      showErrorMessage('Creation Failed');
    }
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(Duration(days: 365)),
    );

    if (pickedDate != null && pickedDate != selectedDate) {
      setState(() {
        selectedDate = pickedDate;
      });
    }
  }

  Future<void> _selectTime(BuildContext context) async {
    final TimeOfDay? pickedTime = await showTimePicker(
      context: context,
      initialTime: selectedTime,
    );

    if (pickedTime != null && pickedTime != selectedTime) {
      setState(() {
        selectedTime = pickedTime;
      });
    }
  }

  void showSuccessMessage(String message) {
    final snackBar = SnackBar(
      content: Text(message),
    );
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  void showErrorMessage(String message) {
    final snackBar = SnackBar(
      content: Text(
        message,
        style: const TextStyle(color: Colors.white),
      ),
      backgroundColor: Colors.red,
    );
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }
}
