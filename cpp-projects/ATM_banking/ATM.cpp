#include<iostream>

#include<conio.h>

using namespace std;

int main()

double balance , deposit , withdraw;

    int option;

    balance=100; //default balance

    do{

    

	cout<<"\n\t***************MENU***************";

	cout<<"\n\t*                                *";

	cout<<"\n\t*      1. Check Balance          *";

	cout<<"\n\t*      2. Deposit                *";

	cout<<"\n\t*      3. Withdraw               *";

	cout<<"\n\t*      4. Transfer               *";

	cout<<"\n\t*      5. Exit                   *";

	cout<<"\n\t*                                *";

	cout<<"\n\t**********************************";

	cout<<"\n\t Please Choose an Option: ";

	cin>>option;

	switch(option)

	{

		case 1:

			cout<<"\n\tYour Balance is: $"<<balance<<endl;

			break;

		case 2:

			cout<<"\n\tAmount You Want to deposit: $";

			cin>>deposit;

			balance += deposit; // balance =balance + deposit;

			cout<<"\n\t Your Current Balance : $"<<balance<<endl;

			break;

		case 3:

			cout<<"\n\tHow much do you want to withdraw? $";

               cin>>withdraw;

			if(balance<withdraw)

			   cout<<"\n\tYou do not have enough money in your account to withdraw"<<endl;

			else

			balance -= withdraw; // balance =balance - deposit;

			cout<<"\n\t Your Current Balance : $"<<balance<<endl;

			break;

		case 4:

			cout<<"\n\t This Service is Currently Not Available!!!"<<endl;

			break;

		default:

			if(option !=5)

			cout<<"\n\t Invalid Option Please Try Again"<<endl;

			break;

			

			}

	

}while(option !=5);

system("pause");

	

	return 0;

	getch();

}
