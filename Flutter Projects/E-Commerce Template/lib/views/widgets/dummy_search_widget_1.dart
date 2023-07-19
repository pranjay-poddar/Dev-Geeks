import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class DummySearchWidget1 extends StatelessWidget {
  final Function onTap;

  DummySearchWidget1({@required this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: MediaQuery.of(context).size.width,
        height: 40,
        margin: EdgeInsets.only(top: 24),
        padding: EdgeInsets.only(left: 16),
        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(15)),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              margin: EdgeInsets.only(right: 12),
              child: SvgPicture.asset(
                'assets/icons/Search.svg',
                color: Colors.black,
                width: 18,
                height: 18,
              ),
            ),
            Text(
              'Find a product...',
              style: TextStyle(color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
}
