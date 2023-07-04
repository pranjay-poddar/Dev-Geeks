import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:marketky/constant/app_color.dart';
import 'package:marketky/core/model/Notification.dart';

class NotificationTile extends StatelessWidget {
  final Function onTap;
  final UserNotification data;

  NotificationTile({
    @required this.onTap,
    @required this.data,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: MediaQuery.of(context).size.width,
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        color: Colors.white,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image
            Container(
              width: 46,
              height: 46,
              decoration: BoxDecoration(
                color: AppColor.border,
                borderRadius: BorderRadius.circular(8),
                image: DecorationImage(image: AssetImage('${data.imageUrl}'), fit: BoxFit.cover),
              ),
              margin: EdgeInsets.only(right: 16),
            ),
            // Info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title
                  Text(
                    '${data.title}',
                    style: TextStyle(color: AppColor.secondary, fontFamily: 'poppins', fontWeight: FontWeight.w500),
                  ),
                  // Description
                  Container(
                    margin: EdgeInsets.only(top: 2, bottom: 8),
                    child: Text(
                      '${data.description}',
                      style: TextStyle(color: AppColor.secondary.withOpacity(0.7), fontSize: 12),
                    ),
                  ),
                  // Datetime
                  Row(
                    children: [
                      SvgPicture.asset('assets/icons/Time Circle.svg', color: AppColor.secondary.withOpacity(0.7)),
                      Container(
                        margin: EdgeInsets.only(left: 10),
                        child: Text(
                          '${data.dateTime}',
                          style: TextStyle(color: AppColor.secondary.withOpacity(0.7), fontSize: 12),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
