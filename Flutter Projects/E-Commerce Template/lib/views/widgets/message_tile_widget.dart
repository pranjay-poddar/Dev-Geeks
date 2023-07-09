import 'package:flutter/material.dart';
import 'package:marketky/constant/app_color.dart';
import 'package:marketky/core/model/Message.dart';
import 'package:marketky/views/screens/message_detail_page.dart';

class MessageTileWidget extends StatelessWidget {
  final Message data;

  MessageTileWidget({
    @required this.data,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context).push(MaterialPageRoute(builder: (context) => MessageDetailPage(data: data)));
      },
      child: Container(
        width: MediaQuery.of(context).size.width,
        padding: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
        decoration: BoxDecoration(
          color: (data.isReaded == true) ? Colors.white : AppColor.primarySoft,
          border: Border(bottom: BorderSide(color: AppColor.primarySoft, width: 1)),
        ),
        child: Row(
          children: [
            Container(
              width: 46,
              height: 46,
              padding: EdgeInsets.all(10),
              margin: EdgeInsets.only(right: 16),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                image: DecorationImage(image: AssetImage(data.shopLogoUrl)),
              ),
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('${data.shopName}', style: TextStyle(color: AppColor.secondary, fontFamily: 'poppins', fontWeight: FontWeight.w500)),
                  SizedBox(height: 2),
                  Text('${data.message}', style: TextStyle(color: AppColor.secondary.withOpacity(0.7), fontSize: 12)),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios,
              color: AppColor.border,
            ),
          ],
        ),
      ),
    );
  }
}
