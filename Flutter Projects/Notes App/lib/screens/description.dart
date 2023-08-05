import 'package:flutter/material.dart';

class DescriptionNote extends StatefulWidget {
  final title;
  final description;

  DescriptionNote({required this.title, required this.description});

  @override
  State<DescriptionNote> createState() => _DescriptionNoteState();
}

class _DescriptionNoteState extends State<DescriptionNote> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Note Description'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: 1,
                itemBuilder: (context, index) {
                  return Card(
                    child: ListTile(
                      title: Text(widget.title),
                      subtitle: Text(widget.description),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
