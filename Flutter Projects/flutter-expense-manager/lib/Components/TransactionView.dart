import 'package:expense_manager/Model/TransactionModel.dart';
import 'package:flutter/material.dart';

class TransactionView extends StatefulWidget {

  final TransactionModel transaction;

  TransactionView({Key key, this.transaction}) : super(key: key);

  @override
  _TransactionViewState createState() => _TransactionViewState();
}

class _TransactionViewState extends State<TransactionView> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 15),
      padding: EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20)
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Row(
            children: <Widget>[
              widget.transaction.type == "-" ?
              Icon(Icons.arrow_upward, color: Colors.red,)
              :
              Icon(Icons.arrow_downward, color: Colors.green,),
              SizedBox(
                width: 10,
              ),
              Text(widget.transaction.name, style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.grey),)
            ],
          ),
          Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: <Widget>[
              Text(widget.transaction.type + widget.transaction.price.toString(), style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Colors.grey),),
              Text(widget.transaction.currency, style: TextStyle(color: Colors.grey, fontSize: 12),)
            ],
          )
        ],
      ),
    );
  }
}