import 'package:flutter/material.dart';

class NamedIconContainer extends StatelessWidget {
  final String label;
  final IconData icon;
  final double fontSize;
  final Color fontColor;

  const NamedIconContainer({
    Key key,
    @required this.label,
    @required this.icon,
    @required this.fontColor,
    this.fontSize = 15,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width,
      child: InkWell(
        highlightColor: Colors.grey,
        splashColor: Colors.transparent,
        borderRadius: BorderRadius.circular(10),
        onTap: () => print(label),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 10),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                icon,
                color: fontColor,
                size: fontSize,
              ),
              SizedBox(
                width: 8,
              ),
              Text(
                label,
                style: TextStyle(
                  fontSize: 16,
                  color: Theme.of(context).primaryColor,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
