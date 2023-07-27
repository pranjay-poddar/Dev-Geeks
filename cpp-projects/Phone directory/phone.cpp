#include <iostream>
#include <fstream>
#include <string>
#include <iomanip>
#include <conio.h>
#include <cwchar>
#include <windows.h>

using namespace std;

class directory
{
	int PhNo;
	char fname[50], lname [50];

	public:
		string getpword()
{
	char ch;
	string pass="";
	cout << "Please Enter the Password: ";
	oo:
	ch=getch();
	if(ch==8)
	{
		goto oo;
	}
	while(ch!=13)
	{
		if(ch==8)
		{
			if(pass.size()==0)
			{
				goto ps;
			}
			pass.erase(pass.size()-1);
			cout << "\b \b";
			ps:
			goto pp;
		}
		pass.push_back(ch);
		cout << "*";
		pp:
		ch=getch();
	}
	return pass;
}
int check(string a)
{
	int flag=0;
	string b;
	fstream f1("Accounts.dir",ios::in);
	while(f1)
	{
		f1 >> b;
		if(b==a)
		{
			flag = 1; break;
		}
	}
	f1.close();
	if(flag==1)
	{
		cout << "\nSorry! Username already exists. \nPlease try another: ";
		return 1;
	}
	return 0;
}

int SignIn()
{
	string uname, password, struname, strpassword, line;
	ghi:
	fstream file1("Accounts.dir");
	int flag=0, nextLoc=0;
	system("cls");
	cout << "\n\n\t\t----TELEPHONE DIRECTORY MANAGEMENT SYSTEM-----\n\n";
	cout << "Please Enter Your Username: ";
	cin >> struname;
	if (struname=="Admin")
	{
		return 2;
	}
	if (struname=="admin")
	{
		return 3;
	}
	while (! file1.eof() )
		{
			getline (file1,line);
			nextLoc=line.find(" ");
			uname=line.substr(0,nextLoc);
			line = line.substr(nextLoc+1,line.length());
			password=line;
			if(uname==struname)
			{
				flag=1;
				break;
			}
		}

	file1.close();
	if(flag==1)
	{

		def:
		strpassword=getpword();
		if(strpassword==password)
		{
			cout << "Sign-In Succesful.";
		}
		else
		{
			cout << "\nWrong Password! ";
			goto def;
		}
	}

	else
	{
		cout << "\n\nYour Username was not Found in our Database.\nPlease Sign-Up or Enter correct Username";
		cout << "\nPress   <1> To Sign-Up    OR\n        <2> To Sign-In Again\n";
		int choice1;
		cin >> choice1;
		if(choice1==1)
		{
			return 1;
		}
		else
		{
			goto ghi;
		}
	}
	return 0;
}

void SignUp()
{	string uname, struname, line, Password;
	int flag;
	system("cls");
	cout << "\n\n\t\t----TELEPHONE DIRECTORY MANAGEMENT SYSTEM-----\n\n";
	fstream file1("Accounts.dir",ios::in|ios::out|ios::app);
	cout << "Please Enter an Username: ";
	cv:
	cin >> struname;
	flag = check(struname);
	if(flag==1)
	{
		goto cv;
	}
	cout << "Please Enter a Password: ";
	cin >> Password;
 	file1 << "\n" << struname << " " << Password;
	cout << "\nAccount Created Successfully\n\n";
	system("pause");
	return;
}

void GetDetails()
{
	string fname, lname, tnumber;
	char choice = 'y';
	fstream myfile("Directory.dir",ios::app);
	while(choice=='Y'||choice=='y')
	{
	system("cls");
	cout << "\n\n\t\t----TELEPHONE DIRECTORY MANAGEMENT SYSTEM-----\n\n";
	cout << "Enter First Name : ";
	cin >> fname;
	myfile << fname << " ";
	cout << "\nEnter Last Name : ";
	cin >> lname;
	myfile << lname << " ";
	cout << "\nEnter Phone Number : ";
	cin >> tnumber;

	myfile << tnumber << "\n";
	cout << "\nDo you want to enter more? (y/n)";
	cin >> choice; cout << "\n";
	}

	myfile.close();
}

void SearchAndDisplay()
{
	string line;
	string fName,lName,tNumber, strFName, strLName;
	char choice;
	int flag=0;
	int nextLoc=0;
	system("cls");
	do{
		cout << "\n\n\t\t----TELEPHONE DIRECTORY MANAGEMENT SYSTEM-----\n\n";
			flag=0;
			ifstream myfile ("Directory.dir");
			if (myfile.is_open())
			{
				cout<<endl<<"Enter First Name: ";
				cin>>strFName;
				cout<<"Enter Last Name: ";
				cin>>strLName;
				while (! myfile.eof() )
				{
					getline (myfile,line);
					nextLoc=line.find(" ");
					fName=line.substr(0,nextLoc);
					line = line.substr(nextLoc+1,line.length());
					nextLoc=line.find(" ");
					lName=line.substr(0,nextLoc);
					line = line.substr(nextLoc+1,line.length());
					tNumber = line;
					if(fName==strFName && lName==strLName)
					{
						cout<<"\nFound!!"<<endl;
						cout<<endl<<"First Name: "<<fName<<"\n"<<"Last Name: "<<lName<<"\n"<<"Telephone Number: "<<tNumber<<endl ;
						flag=1;
						break;
					}
				}
			}
			else
			{
				cout << "Unable to open file"<<endl;
				exit(0);
			}
			if(flag==0)
			{
				cout<<"Not Found...Sorry."<<endl;
			}
			cout << "\nDo you want to enter more?(y/n) ";
			cin >> choice;
			system("cls");
	}while(choice=='y');
	return;
}

void Delete()
{
    system("cls");
    string line, fName, lName, strLName, strFName, tNumber;
    int nextLoc=0,flag=0;
    cout << "\n\n\t\t----TELEPHONE DIRECTORY MANAGEMENT SYSTEM-----\n\n";
    cout << "Please enter the first name of record you want to delete: ";
    cin>>strFName;
    cout << "\nPlease enter the last name of record you want to delete: ";
    cin>>strLName;
    ifstream myfile;
    ofstream temp;
    myfile.open("Directory.dir");
    temp.open("temp.dir");
    while (!myfile.eof())
    {
  	getline (myfile,line);
	nextLoc=line.find(" ");
	fName=line.substr(0,nextLoc);
	line = line.substr(nextLoc+1,line.length());
	nextLoc=line.find(" ");
	lName=line.substr(0,nextLoc);
	line = line.substr(nextLoc+1,line.length());
	tNumber = line;
	if(!(fName==strFName && lName==strLName))
      	temp << fName <<" "<< lName <<" "<< tNumber<< endl;
    else
    	flag++;

  }
  if(flag==0)
  {
  	 cout<<"\nRecord not found!!\n\n";
	 goto afg;
  }
  cout << "The record with the name " << strFName <<" "<<strLName<< " has been deleted " << endl;
  myfile.close();
  temp.close();
  remove("Directory.dir");
  rename("temp.dir", "Directory.dir");
  afg:
  return;
}
void mod()
{
	system("cls");
	string line, fName, lName, strLName, strFName, tNumber;
    int nextLoc=0,flag=0;
    cout << "\n\n\t\t----TELEPHONE DIRECTORY MANAGEMENT SYSTEM-----\n\n";
    afgh:
    cout << "Please enter the first name of record you want to modify: ";
    cin>>strFName;
    cout << "\nPlease enter the last name of record you want to modify: ";
    cin>>strLName;
    ifstream myfile;
    ofstream temp;
    myfile.open("Directory.dir");
    temp.open("temp1.dir");
    while (!myfile.eof())
    {
  	getline (myfile,line);
	nextLoc=line.find(" ");
	fName=line.substr(0,nextLoc);
	line = line.substr(nextLoc+1,line.length());
	nextLoc=line.find(" ");
	lName=line.substr(0,nextLoc);
	line = line.substr(nextLoc+1,line.length());
	tNumber = line;
	if(!(fName==strFName && lName==strLName))
      	temp << fName <<" "<< lName <<" "<< tNumber<< endl;
    else
    	flag++;

  }
  if(flag==0)
  {
  	 cout<<"\nRecord not found!! Try Again.\n\n";
	 goto afgh;
  }
  myfile.close();
  temp.close();
  remove("Directory.dir");
  rename("temp1.dir", "Directory.dir");



	string fname2, lname2, tnumber2;
	fstream myfile2("Directory.dir",ios::app);
	cout << "\n\nEnter New First Name : ";
	cin >> fname2;
	myfile2 << fname2 << " ";
	cout << "\nEnter New Last Name : ";
	cin >> lname2;
	myfile2 << lname2 << " ";
	cout << "\nEnter New Phone Number : ";
	cin >> tnumber2;

	myfile2 << tnumber2;
	myfile2.close();

	return;
}
};
int main()
{
	directory d;
	CONSOLE_FONT_INFOEX cfi;
    cfi.cbSize = sizeof(cfi);
    cfi.nFont = 0;
    cfi.dwFontSize.X = 0;
    cfi.dwFontSize.Y = 19;
    cfi.FontFamily = FF_DONTCARE;
    cfi.FontWeight = FW_NORMAL;
    std::wcscpy(cfi.FaceName, L"Consolas");
    SetCurrentConsoleFontEx(GetStdHandle(STD_OUTPUT_HANDLE), FALSE, &cfi);
	int choice, choice3, returnedValue;
	char choice2='y', choice4='y';
	string pword;
	dkj:
	system("cls");
	cout << "\n\n\t\t----TELEPHONE DIRECTORY MANAGEMENT SYSTEM-----\n\n";
	cout << "Please Sign-In or Sign-Up to Continue\n\n\t1.  Sign-In to an Existing Account\n\t2.  Create a new Account\n\t3.  Exit\n";
	cout << "\nPlease Enter your choice: ";
	cin >> choice3;
	if(choice3==1)
	{
		returnedValue=d.SignIn();
		if(returnedValue==1)
		{
			d.SignUp();
		}
		else if(returnedValue==2)
		{
			yz:
			pword=d.getpword();
			if(pword=="admin")
			{
				system("cls");
				cout << "Admin Signed In\n";
				system("pause");
				goto mno;
			}
			else
			{
				cout << "\nPassword Incorrect! Please Enter Again: ";
				goto yz;
			}
		}
		else if(returnedValue==3)
		{
			vwx:
			pword=d.getpword();
			if(pword=="admin")
			{
				system("cls");
				cout << "Admin Signed In\n";
				system("pause");
				goto mno;
			}
			else
			{
				cout << "\nPassword Incorrect. Please Enter Again: ";
				goto vwx;
			}
		}
	}

	else if(choice3==2)
	{

		jkl:
		d.SignUp();
	}

	else
	{
	exit(0);
	}

	while(choice2=='Y'||choice2=='y')
	{
	system("cls");
	cout << "\n\n\t\t----TELEPHONE DIRECTORY MANAGEMENT SYSTEM-----\n\n";
	cout <<"Do you want to \n\n\t1.View Existing Directories \n\t2.Log Out\n\t3.Log Out and Exit\n";
	cout<<"\nPlease enter your choice: ";
	abc:
	cin >> choice;

	switch (choice)
	{
		case 1: d.SearchAndDisplay(); break;
		case 2: cout<<"\nLogged out successfully!\n";
				system("pause");
				goto dkj;
		case 3:	exit(0); break;
		default: cout << "\nWrong Input! Try Again... "; goto abc;
	}

	}
	goto stu;
	mno:
	system("cls");
	cout << "\n\n\t\t----TELEPHONE DIRECTORY MANAGEMENT SYSTEM-----\n\n";
	cout << "Do you want to \n\n\t1.Enter New Directories\n\t2.View Existing Directories\n\t3.Delete Existing Directories\n\t4.Modify Existing Directories\n\t5.Log Out\n\t6.Log Out and Exit\n";
	cout<<"\nPlease enter your choice: ";
	pqr:
	cin >> choice;
	lok:
	switch (choice)
	{
		case 1: d.GetDetails(); break;
		case 2: d.SearchAndDisplay(); break;
		case 3: d.Delete();break;
		case 4: d.mod();break;
		case 5: cout<<"\nLogged out successfully!\n";
				system("pause");
				goto dkj;
		case 6:	exit(0);
		default: cout << "\nWrong Input! Try Again... "; goto pqr;
	}
	cout << "Do you want to continue? (y/n) : ";
	choice4=getch();
	if(choice4=='Y'||choice4=='y')
	{
		goto lok;
	}
	else
	goto mno;

	stu:
	exit(0);
}
