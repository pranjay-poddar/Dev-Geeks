import 'package:flutter/material.dart';
import 'package:marketky/constant/app_color.dart';

class CustomAppBar extends StatelessWidget {
  const CustomAppBar({
    @required this.title,
    @required this.leftIcon,
    @required this.rightIcon,
    @required this.leftOnTap,
    @required this.rightOnTap,
  });

  final String title;
  final Function rightOnTap, leftOnTap;
  final Widget rightIcon, leftIcon;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: Container(
        height: 54,
        margin: EdgeInsets.only(top: 14),
        width: MediaQuery.of(context).size.width,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            SizedBox(
              width: 40,
              height: 40,
              child: ElevatedButton(
                onPressed: leftOnTap,
                style: ElevatedButton.styleFrom(
                  foregroundColor: AppColor.primary, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)), backgroundColor: AppColor.primarySoft,
                  elevation: 0,
                  padding: EdgeInsets.all(8),
                ),
                child: leftIcon,
              ),
            ),
            Container(
              width: MediaQuery.of(context).size.width * 5.5 / 10,
              height: 40,
              decoration: BoxDecoration(color: AppColor.primarySoft, borderRadius: BorderRadius.circular(15)),
              alignment: Alignment.center,
              child: Text(
                '$title',
                style: TextStyle(color: Colors.black, fontSize: 14, fontWeight: FontWeight.w600),
              ),
            ),
            SizedBox(
              width: 40,
              height: 40,
              child: ElevatedButton(
                onPressed: rightOnTap,
                style: ElevatedButton.styleFrom(
                  foregroundColor: AppColor.primary, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)), backgroundColor: AppColor.primarySoft,
                  elevation: 0,
                  padding: EdgeInsets.all(8),
                ),
                child: rightIcon,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
