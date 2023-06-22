/*
*********************************************************** ATM PROJECT ***********************************************************
*************************************************** CREATED BY AVDHESH VARSHNEY ***************************************************
********************************************** (https://github.com/Avdhesh-Varshney) ********************************************** */

/* ATM Project
   -> Update the full data
   -> Check Balance
   -> Cash withdraw
   -> User Details
   -> Update Mobile No.
   -> Reset PIN No.
*/

// Including necessary libraries
#include <iostream>
#include <conio.h>
#include <string>
using namespace std;

// Creating a ATM class
class atm
{
private:
	// Private variables
	long long int accountNo;
	string name;
	string type = "CURRENT";
	int PIN;
	double balance = 0;
	long long int mobileNo;

public:
	// Set data of the user
	void setData(long long int AccountNo, string Name, string Type, int PIN_No, double Balance, long long int MobileNo)
	{
		accountNo = AccountNo;
		name = Name;
		type = Type;
		PIN = PIN_No;
		balance = Balance;
		mobileNo = MobileNo;
	}

	// Updating the data of the user
	void updateData()
	{
		// Getting data of user
		cout << "\n#### Enter The Details of Your Account ####\n";

		// data of name
		cout << "\nEnter your name: ";
		cin >> name;

		// Value of account number
		system("cls");
		cout << "\n#### Enter The Details of Your Account ####\n";
		cout << "\nEnter Account number: ";
		cin >> accountNo;
		while (to_string(accountNo).length() != 11)
		{
			cout << "\nThe entered Account number should be of 11 digits.\n";
			cout << "\nEnter valid account number: ";
			cin >> accountNo;
		}

		// Type of account
		system("cls");
		cout << "\n#### Enter The Details of Your Account ####\n";
		char flag;
		cout << "\nIs your account type is 'CURRENT' or not ? (y/n) ";
		cin >> flag;
		if (flag == 'n')
		{
			cout << "\nEnter your type of account: ";
			cin >> type;
		}

		// PIN number of the account
		system("cls");
		cout << "\n#### Enter The Details of Your Account ####\n";
		cout << "\nEnter your PIN number: ";
		cin >> PIN;
		while (to_string(PIN).length() != 4)
		{
			cout << "\nThe entered PIN number should be of 4 digits.\n";
			cout << "\nEnter a valid PIN number: ";
			cin >> PIN;
		}

		// Linked mobile number
		system("cls");
		cout << "\n#### Enter The Details of Your Account ####\n";
		cout << "\nLinked Mobile No. of your account: ";
		cin >> mobileNo;
		while (to_string(mobileNo).length() != 10)
		{
			cout << "\nThe entered Mobile number should be of 10 digits.\n";
			cout << "\nEnter a valid mobile no.: ";
			cin >> mobileNo;
		}

		// showing the updated data
		system("cls");
		showData();
	}

	// Displaying the data of the user
	void showData()
	{
		cout << "\n\t*** User Details ***\n";
		cout << "\n\tAccount no.  ->\t" << accountNo;
		cout << "\n\tName         ->\t" << name;
		cout << "\n\tType         ->\t" << type;
		cout << "\n\tBalance      ->\t" << balance;
		cout << "\n\tMobile No.   ->\t" << mobileNo;
		cout << endl;
	}

	// Get the value of Account Number
	long long int getAccountNo()
	{
		return accountNo;
	}

	// Get the value of User Name
	string getName()
	{
		return name;
	}

	// Get the value of the PIN
	int getPIN()
	{
		return PIN;
	}

	// Get the value of the Balance
	double getBalance()
	{
		return balance;
	}

	// Get the mobile number
	long long int getMobileNo()
	{
		return mobileNo;
	}

	// Get the type of the account
	string getType()
	{
		return type;
	}

	// Updating the mobile number only
	void updateMobile()
	{
		long long int currMobile;
		cout << "\nEnter the current mobile number: ";
		cin >> currMobile;
		if (currMobile == mobileNo)
		{
			cout << "\nEnter the new mobile number: ";
			cin >> mobileNo;
			while (to_string(mobileNo).length() != 10)
			{
				cout << "\nEnter a valid Mobile Number: ";
				cin >> mobileNo;
			}
			cout << "\n Updated Mobile no. sucessfully updated.\n";
			_getch();
		}
		else
		{
			cout << "\nIncorrect mobile number.\n";
			_getch();
		}
	}

	// Withdrawing the balance
	void cashWithDraw()
	{
		int amt = 0;
		cout << "\nEnter the amount: ";
		cin >> amt;
		if (amt > 0 && amt < balance)
		{
			balance -= amt;
			cout << "\nPlease Collect Your Cash\n";
			cout << "\nAvailable Balance: " << balance;
			cout << endl;
			_getch();
		}
		else
		{
			cout << "\nInvalid Input or Insufficient Balance\n\n";
			_getch();
		}
	}

	// Reset the PIN
	void resetPIN()
	{
		int pin;
		cout << "\nEnter the current PIN number: ";
		cin >> pin;
		if (pin == PIN)
		{
			cout << "\nEnter PIN number: ";
			cin >> pin;
			while (to_string(pin).length() != 4)
			{
				cout << "\nThe PIN number should be of 4 digits.\n";
				cout << "\n Enter the valid PIN number: ";
				cin >> pin;
			}
			PIN = pin;
		}
		else
		{
			cout << "\nIncorrect PIN number.\n\n";
		}
	}
};

// Enter your choice
int getChoice()
{
	int choice = -1;
	system("cls");
	cout << "\n***** Welcome to ATM *****\n";
	cout << "\nSelect Options ";
	cout << "\n\t1. Update full data";
	cout << "\n\t2. Check Balance";
	cout << "\n\t3. Cash withdraw";
	cout << "\n\t4. Show User Details";
	cout << "\n\t5. Update Mobile no.";
	cout << "\n\t6. Update PIN number";
	cout << "\n\t0. Exit\n";
	cout << "\nEnter your choice: ";
	cin >> choice;
	return choice;
}

// Function controls the whole ATM Machine
void startATM(atm user)
{
	do
	{
		int choice = getChoice();

		switch (choice)
		{
		case 1:
			system("cls");
			user.updateData();
			cout << "\nPress 'Any key' to continue !\n";
			_getch();
			break;

		case 2:
			system("cls");
			cout << "\nYour Bank balance is :" << user.getBalance() << endl;
			cout << "\nPress 'Any key' to continue !\n";
			_getch();
			break;

		case 3:
			system("cls");
			user.cashWithDraw();
			cout << "\nPress 'Any key' to continue !\n";
			_getch();
			break;

		case 4:
			system("cls");
			user.showData();
			cout << "\nPress 'Any key' to continue !\n";
			_getch();
			break;

		case 5:
			system("cls");
			user.updateMobile();
			cout << "\nPress 'Any key' to continue !\n";
			_getch();
			break;

		case 6:
			system("cls");
			user.resetPIN();
			cout << "\nPress 'Any key' to continue !\n";
			_getch();
			break;

		case 0:
			system("cls");
			cout << "\nThanks for using the ATM !\n\n";
			exit(0);

		default:
			cout << "\nPress the valid key !!!";
		}

	} while (1);
}

// Driver function
int main()
{
	int enterPIN;
	long long int enterAccountNo;

	// Object the 'atm' class
	atm user;
	user.setData(12345678910, "Avdhesh", "CURRENT", 1111, 45000.90, 9087654321);

	do
	{
		system("cls");

		cout << "\n***** Welcome to ATM *****\n";
		cout << "\nEnter Your Account No.: ";
		cin >> enterAccountNo;

		cout << "\nEnter PIN: ";
		cin >> enterPIN;

		if ((enterAccountNo == user.getAccountNo()) && (enterPIN == user.getPIN()))
		{
			startATM(user);
		}
		else
		{
			cout << "\nUser Details are Invalid !!! \n";
			_getch();
		}
	} while (1);

	return 0;
}
