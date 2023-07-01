import 'package:expense_manager/Components/CardList.dart';
import 'package:expense_manager/Components/CardView.dart';
import 'package:expense_manager/Components/TransactionView.dart';
import 'package:expense_manager/Model/CardModel.dart';
import 'package:expense_manager/Model/TransactionModel.dart';
import 'package:expense_manager/Pages/AddCardPage.dart';
import 'package:expense_manager/Providers/CardProvider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() => runApp(
  ChangeNotifierProvider<CardProvider>(
    builder: (context) => CardProvider(),
    child: new MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(),
      home: HomePage(),
    )
  )
);

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(238, 241, 242, 1),
      appBar: AppBar(
        brightness: Brightness.light,
        title: Text("Home page", style: TextStyle(color: Colors.black),),
        backgroundColor: Color.fromRGBO(238, 241, 242, 1),
        elevation: 0,
        leading: null,
        actions: <Widget>[
          IconButton(
            icon: Icon(
              Icons.add,
              color: Colors.black45,
            ), onPressed: () {
              Navigator.push(context, MaterialPageRoute(builder: (context) => AddCardPage()));
            },
          )
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              (Provider.of<CardProvider>(context).getCardLength() > 0 ?
                Container(
                  height: 210,
                  child: Consumer<CardProvider>(
                    builder: (context, cards, child) => CardList(cards: cards.allCards,),
                  )
                ) :
                Container(
                  height: 210,
                  decoration: BoxDecoration(
                    color: Colors.blue,
                    borderRadius: BorderRadius.circular(20)
                  ),
                  child: Align(
                    alignment: Alignment.center,
                    child: Text("Add your new card click the \n + \n button in the top right.",
                    textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontSize: 20),),
                  ),
                )
              ),
              SizedBox(
                height: 30,
              ),
              Text("Last Transactions", style: 
              TextStyle(fontWeight: FontWeight.bold, fontSize: 15, color: Colors.black45),),
              SizedBox(
                height: 15,
              ),
              TransactionView(transaction: TransactionModel(name: 'Shopping', price: 1000, type: '-', currency: 'US'),),
              TransactionView(transaction: TransactionModel(name: 'Salary', price: 1000, type: '+', currency: 'US'),),
              TransactionView(transaction: TransactionModel(name: 'Receive', price: 200, type: '+', currency: 'US'),)
            ],
          ),
        ),
      ),
    );
  }
}
