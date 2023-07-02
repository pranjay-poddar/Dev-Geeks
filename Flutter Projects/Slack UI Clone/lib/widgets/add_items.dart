import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';

class AddItems extends StatelessWidget {
  final String itemName;

  const AddItems({Key key, this.itemName}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            itemName,
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: Theme.of(context).primaryColor,
            ),
          ),
          InkWell(
            highlightColor: Colors.grey,
            onTap: () => print(itemName),
            borderRadius: BorderRadius.circular(15),
            child: Padding(
              padding: const EdgeInsets.all(5),
              child: Icon(
                FlutterIcons.plus_ant,
                size: 20,
                color: Colors.black,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
