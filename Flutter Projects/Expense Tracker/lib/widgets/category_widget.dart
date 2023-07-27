import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CategoryWidget extends StatefulWidget {
  const CategoryWidget(
      {Key? key, required this.rowNumber, required this.callback})
      : super(key: key);

  final int rowNumber;
  final Function callback;

  @override
  State<CategoryWidget> createState() => _CategoryWidgetState();
}

class _CategoryWidgetState extends State<CategoryWidget> {
  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Padding(
              padding: const EdgeInsets.only(right: 20),
              child: Text(
                "${widget.rowNumber + 1}.",
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Expanded(
              child: TextField(
                onChanged: (text) {
                  print(text);
                },
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Category',
                ),
              ),
            ),
            const Icon(Icons.attach_money),
            Expanded(
              child: TextField(
                inputFormatters: [
                  FilteringTextInputFormatter.allow(
                      RegExp(r'[0-9]+(\.){0,1}[0-9]*'))
                ],
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Cost',
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
