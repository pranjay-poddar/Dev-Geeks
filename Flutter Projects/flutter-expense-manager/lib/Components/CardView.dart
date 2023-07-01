import 'package:expense_manager/Model/CardModel.dart';
import 'package:flutter/material.dart';

class CardView extends StatefulWidget {

  final CardModel card;

  CardView(this.card) : super();

  @override
  _CardViewState createState() => _CardViewState();
}

class _CardViewState extends State<CardView> {
  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 3.1 / 2,
      child: GestureDetector(
        child: Container(
          margin: EdgeInsets.only(right: 20),
          decoration: BoxDecoration(
            color: Colors.black87,
            borderRadius: BorderRadius.circular(20.0),
          ),
          child: Padding(
            padding: EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Row(
                      children: <Widget>[
                        Container(
                          width: 40.0,
                          height: 40.0,
                          decoration: BoxDecoration(
                            color: Colors.red.withOpacity(.8),
                            shape: BoxShape.circle
                          ),
                        ),
                        Transform.translate(
                          offset: Offset(-15, 0),
                          child: Container(
                            width: 40.0,
                            height: 40.0,
                            decoration: BoxDecoration(
                              color: Colors.orange.withOpacity(.8),
                              shape: BoxShape.circle
                            ),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: <Widget>[
                        Text(widget.card.available.toString(), style: TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.bold),),
                        Text(" " + widget.card.currency, style: TextStyle(color: Colors.white, fontSize: 15),)
                      ],
                    )
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      child: Text(widget.card.name, style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),),
                    ),
                    SizedBox(
                      height: 15,
                    ),
                    FittedBox(
                      fit: BoxFit.contain,
                      child: Text(widget.card.number, style: TextStyle(color: Colors.white, fontSize: 20, letterSpacing: 10, fontWeight: FontWeight.bold)),
                    )
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}