#include <iostream>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include<fstream>
#include<iomanip>
#include<cmath>
using namespace std;
void Items() {
  int order, quantity, option, option1, orderNo;
  double price = 0.0;
  string item = " ", customerName;
 
  cout << "\t\t\t\t\t-----------------------------------------------Welcome To "
          "VegHub Mania---------------------------------------\n";

  cout << "   Press 1 to Order Junks Foods \n";
  cout << "   Press 2 to Order Dinner/Lunch \n";
  cout << "   Press 3 to Order Cold Drinks \n";
  cout << "   Press 4 to Exit Portal \n";
  cin >> option;
  if (option > 4) {
    cout << "Invalid Value Enterd ! ";
  } else {
    system("clear");
    switch (option) {
    case 1:
      cout << "**********************JUNK FOODS **********************\n";
      cout << "  Press 1 to Order Panipuri \n";
      cout << "  Press 2 to Order Pizza \n";
      cout << "  Press 3 to Order Burger \n";
      cout << "  Press 4 to Order Sandwich\n";
      cin >> option1;
      if (option1 == 1) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Panipuri ";
        //   price=15;
        price = 15 * quantity;
      }
      if (option1 == 2) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Pizza";
        //   price=139;
        price = 139 * quantity;
      }
      if (option1 == 3) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Burger ";
        //   price=79;
        price = 79 * quantity;
      }
      if (option1 == 4) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Sandwich";
        //   price=99;
        price = 99 * quantity;
      }
      break;
    case 2:
      cout << "******************** Dinner FOODS **********************\n";
      cout << "  Press 1 to Order Rice \n";
      cout << "  Press 2 to Order Chapatis\n";
      cout << "  Press 3 to Order Panneer Rotla \n";
      cout << "  Press 4 to Order Egg Curry \n";
      cin >> option1;
      if (option1 == 1) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Rice ";
        //   price=150;
        price = 150 * quantity;
      }
      if (option1 == 2) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Chapatis";
        //   price=23;
        price = 23 * quantity;
      }
      if (option1 == 3) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Panneer Rotla ";
        price = 179;
        price = 179 * quantity;
      }
      if (option1 == 4) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Egg Curry";
        //   price=299;
        price = 23 * quantity;
      }

      break;
    case 3:
      cout << "********************** Shakes *************************\n";
      cout << "  Press 1 to Order Oreo Shake \n";
      cout << "  Press 2 to Order Chocolate Shake\n";
      cout << "  Press 3 to Order chochoPines Shake \n";
      cout << "  Press 4 to Order Fruit Mix \n";
      cin >> option1;
      if (option1 == 1) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Oreo Shake ";
        //   price=179;
        price = 173 * quantity;
      }
      if (option1 == 2) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Chocolate Shake ";
        //   price=149;
        price = 149 * quantity;
      }
      if (option1 == 3) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " ChocoPines Shake  ";
        //   price=129;
        price *= quantity;
      }
      if (option1 == 4) {
        cout << "Enter Quantity :- ";
        cin >> quantity;
        item = " Fruit Mix ";
        //   price=99;
        price = 99 * quantity;
      }
      break;
    case 4:
      exit(0);
    }
    //   int discount=0.10*price;
    // int Netprice = price;
    cout << "Enter Customer Name :- ";
    cin >> customerName;
    cout << "Enter Order No.";
    cin >> orderNo;
    cout << "\n************************************************ VegHub Mania "
            "**********************************************\n";
    cout << "                                                DATE:- 31/03/2023 "
            "\n";
    cout << "                                 Customer Name :- " << customerName
         << "\t\t\t\t"
         << " Order NO. :- " << orderNo << "\n";
    cout
        << "            ITEM NAME \t\t\t\t\t\t\t\tQUANTITY\t\t\t\t\t\tPRICE \n";
    cout << "------------------------------------------------------------------"
            "------------------------------------------\n";
    cout << "         " << item << "\t\t\t\t\t\t\t\t " << quantity
         << "\t\t\t\t\t\t\t" << price << "\n";
    cout << "------------------------------------------------------------------"
            "------------------------------------------\n";
     }
     price=ceil(price);
     string on=to_string(orderNo),price1=to_string(price),qty=to_string(quantity);
     string  data= " Customer Name: - "+ customerName + " Order NO:- " + on + " Item Ordered :- "+item+" Quantity:- "+ qty +" Bill Paid :- "+  price1;
    ofstream out("Main.txt");
    out<<data;
    cout<<data;
  }

int main() {
  Items();
  return 0;
}
