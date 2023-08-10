import 'package:flutter/material.dart';
import 'package:flutter_pdfview/flutter_pdfview.dart';
import 'getfile.dart';

class PdfLoader extends StatefulWidget {
  final String url;
  const PdfLoader({super.key, required this.url});

  @override
  State<PdfLoader> createState() => _PdfLoaderState();
}

class _PdfLoaderState extends State<PdfLoader> {
  String head = 'Loading...';
  String localPath = '';
  @override
  void initState() {
    ApiServiceProvider.loadPDF(widget.url).then((value) {
      setState(() {
        localPath = value;
        print('huahuahua');
        head = 'PDF Loader';
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(head),
        centerTitle: true,
      ),
      body: localPath != ''
          ? PDFView(
              fitPolicy: FitPolicy.BOTH,
              filePath: localPath,
            )
          : Center(child: CircularProgressIndicator()),
    );
  }
}
