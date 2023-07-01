import 'package:expense_manager/Model/CardModel.dart';
import 'package:expense_manager/Providers/CardProvider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AddCardPage extends StatefulWidget {
  @override
  _AddCardPageState createState() => _AddCardPageState();
}

class _AddCardPageState extends State<AddCardPage> {

  TextEditingController nameController = new TextEditingController();
  TextEditingController numberController = new TextEditingController();
  TextEditingController bankNameController = new TextEditingController();
  TextEditingController availableController = new TextEditingController();
  TextEditingController currencyController = new TextEditingController();

  void onAdd() {
    CardModel card = CardModel(name: nameController.text, 
      number: numberController.text, 
      bankName: bankNameController.text, 
      available: num.tryParse(availableController.text),
      currency: currencyController.text
    );

    Provider.of<CardProvider>(context).addCard(card);

    Navigator.of(context).pop(true);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(238, 241, 242, 1),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Text("Add Card", style: TextStyle(color: Colors.black),),
        brightness: Brightness.light,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_ios, color: Colors.black45, size: 20,), 
          onPressed: () {
            Navigator.of(context).pop(true);
          },
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: Padding(
            padding: EdgeInsets.all(15.0),
            child: Column(
              children: <Widget>[
                Container(
                  padding: EdgeInsets.all(10.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10)
                  ),
                  child: TextField(
                    controller: nameController,
                    keyboardType: TextInputType.text,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Card name",
                      hintStyle: TextStyle(color: Colors.grey)
                    ),
                  ),
                ),
                SizedBox(
                  height: 15,
                ),
                Container(
                  padding: EdgeInsets.all(10.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10)
                  ),
                  child: TextField(
                    controller: numberController,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Card Number",
                      hintStyle: TextStyle(color: Colors.grey)
                    ),
                  ),
                ),
                SizedBox(
                  height: 15,
                ),
                Container(
                  padding: EdgeInsets.all(10.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10)
                  ),
                  child: TextField(
                    controller: bankNameController,
                    keyboardType: TextInputType.text,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Bank Name",
                      hintStyle: TextStyle(color: Colors.grey)
                    ),
                  ),
                ),
                SizedBox(
                  height: 15,
                ),
                Container(
                  padding: EdgeInsets.all(10.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10)
                  ),
                  child: TextField(
                    controller: availableController,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Available Balance",
                      hintStyle: TextStyle(color: Colors.grey)
                    ),
                  ),
                ),
                SizedBox(
                  height: 15,
                ),
                Container(
                  padding: EdgeInsets.all(10.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(10)
                  ),
                  child: TextField(
                    controller: currencyController,
                    keyboardType: TextInputType.text,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Currency",
                      hintStyle: TextStyle(color: Colors.grey)
                    ),
                  ),
                ),
                SizedBox(
                  height: 15,
                ),
                MaterialButton(
                  elevation: 0,
                  minWidth: double.infinity,
                  padding: EdgeInsets.all(15),
                  color: Colors.blue,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10)
                  ),
                  child: Text('Add', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),), 
                  onPressed: () => onAdd(),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}