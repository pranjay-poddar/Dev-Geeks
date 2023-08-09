import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiServiceProvider {
  static String BASE_URL = '';

  ApiServiceProvider(String url) {
    BASE_URL = url;
    print(BASE_URL);
  }

  static Future<String> loadPDF(String urls) async {
    Uri baseurl = Uri.parse(urls);
    var response = await http.get(baseurl);

    var dir = await getApplicationDocumentsDirectory();
    File file = File("${dir.path}/data.pdf");
    file.writeAsBytesSync(response.bodyBytes, flush: true);
    return file.path;
  }
}
