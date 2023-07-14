#include<fstream.h>
#include<conio.h>
#include<process.h>             // exit() fuction
#include<string.h>              // strcmp() and strcpy() function
#include<stdio.h>               // gets() and puts()
class manager                   // 1st class for manager for products and details
{
	int pcode;              //Product code
	char pname[20];         //Product name
	float price;            //Product price
	int pquantity;          //Product Quantity
   public:
	void input();           //Adding data of products
	void output();          //displaying data of product
	void readfile();        //reading the manager.dat file
	void writefile();       //writing into the manager.dat file
	void modifile();        //modify the manager.dat file
	void deletefile();      //delete into the manager.dat file
	void searchfile();      //search onto the manager.dat file
};

void manager :: input()         // Function 1.1
{
	cout<<"\nEnter the Product Code: ";
	cin>>pcode;
	cout<<"Enter the Product Name: ";
	gets(pname);
	cout<<"Enter the price of Product: ";
	cin>>price;
	cout<<"Enter the Quantity of Product: ";
	cin>>pquantity;
	cout<<"\n--------------------------------";
}
void manager :: output()        // Function 1.2
{
	cout<<"\n Product Code: "<<pcode;
	cout<<"\n Product Name : "<<pname;
	cout<<"\n Product Price: "<<price;
	cout<<"\n Product Quantity: "<<pquantity;
	cout<<"\n--------------------------------";
}
void manager :: readfile()      // Function 1.3
{
	manager c;
	ifstream ifile("manager.dat",ios::binary|ios::in);
	if(!ifile)
		cout<<"!!File Does Not Exist!!";
	else
	{
		cout<<"!!Total Number Of Products Entered!!\n";
		while(ifile.read((char*)&c,sizeof(manager)))
		{
			c.output();
		}
		ifile.close();
	}
}
void manager :: writefile()     // Function 1.4
{
	int i,n;
	manager c[10];
	cout<<"!!Enter total Number of Products(MAX 10)!!";
	cin>>n;
	ofstream ofile("manager.dat",ios::binary|ios::out|ios::app);
	for(i=0;i<n;i++)
	{
		c[i].input();
		ofile.write((char*)&c[i],sizeof(manager));
	}
	ofile.close();
}
void manager :: modifile()      // Function 1.5
{
	manager c1,c2;
	int f=0;
	ifstream ifile("manager.dat",ios::binary|ios::in);
	ofstream ofile("temp.dat",ios::binary|ios::out);
	if(!ifile)
		cout<<"!!File Does Not Exist!!";
	else
	{
		cout<<"!!Enter Customer Number That Need To Be Modified!!\n";
		c1.input();
		while(ifile.read((char*)&c2,sizeof(c2)))
		{
			if(c1.pcode==c2.pcode)
			{
				f=1;
				ofile.write((char*)&c1,sizeof(c1));
			}
			else
				ofile.write((char*)&c2,sizeof(c2));
		}
		ifile.close();
		ofile.close();
		if(f==1)
		{
			remove("manager.dat");
			rename("temp.dat","manager.dat");
		}
		else
			cout<<"!!Information Does Not Exist!!";
	}
}
void manager :: deletefile()    // Function 1.6
{
	manager c;
	int f=0,PC;
	ifstream ifile("manager.dat",ios::binary|ios::in);
	ofstream ofile("temp.dat",ios::binary|ios::out);
	if(!ifile)
		cout<<"!!File Does Not Exist!!";
	else
	{
		cout<<"!!Enter Any Product Code That Need To Be Deleted!!: ";
		cin>>PC;
		while(ifile.read((char*)&c,sizeof(manager)))
		{
			if(c.pcode==PC)
			  {
				f=1;
				c.output();
			  }
			else
				ofile.write((char*)&c,sizeof(manager));
		}
		ifile.close();
		ofile.close();
		if(f==1)
		{
			remove("manager.dat");
			rename("temp.dat","manager.dat");
			cout<<"\n\n!!Record Delete!!";
		}
		else
			cout<<"!!Information Does Not Exist!!";
	}
}
void manager :: searchfile()    // Function 1.7
{
	int PC,f=0;
	manager c;
	ifstream ifile("manager.dat",ios::binary|ios::in);
	if(!ifile)
		cout<<"!!File Does Not Exist!!";
	else
	{
		cout<<"!!Enter Any Product Code That Need To Be Seached!!";
		cin>>PC;
		while(ifile.read((char*)&c,sizeof(manager))&&(f==0))
		{
			if(PC==c.pcode)
			{
				c.output();
				f=1;
			}
		}
		ifile.close();
		if(f==0)
			cout<<"!!Information Does Not Exist!!";
	}
}



class employee			// 2nd class for employee details
{
	int c_code;             //Employee code
	char c_name[20];        //Employee name
	char phnumber[20];      //Employee phone number
	char address[100];      //Employee address
	char doj[10];           //Employee Date of joining
   public:
	void input();           //Adding data of employees
	void output();          //displaying data of employees
	void readfile();        //reading the employee.dat file
	void writefile();       //writing into the employee.dat file
	void modifile();        //modify the employee.dat file
	void deletefile();      //delete into the employee.dat file
	void searchfile();      //search onto the employee.dat file
};
void employee :: input()        // Function 1.1
{
	cout<<"\nEnter Employee Code: ";
	cin>>c_code;
	cout<<"Enter Employee Name: ";
	gets(c_name);
	cout<<"Enter Employee Phone Number: ";
	cin>>phnumber;
	cout<<"Enter Employee Address: ";
	gets(address);
	cout<<"Enter D.O.J: ";
	cin>>doj;
	cout<<"\n--------------------------------";
}
void employee :: output()       // Function 1.2
{
	cout<<"\nEmployee Code: "<<c_code;
	cout<<"\nEnter Employee Name: ";
	puts(c_name);
	cout<<"\nEnter Employee Phone Number: "<<phnumber;
	cout<<"\nEnter Employee Address: ";
	puts(address);
	cout<<"\nEnter D.O.J: "<<doj;
	cout<<"\n--------------------------------";
}
void employee :: readfile()     // Function 1.3
{
	ifstream ifile("employee.dat",ios::binary|ios::in);
	employee c;
if(!ifile)
		cout<<"!!File Does Not Exist!!";
	else
	{
		cout<<"!!Total Number Of Employee Entered!!\n";
		while(ifile.read((char*)&c,sizeof(employee)))
		{
			c.output();
		}
		ifile.close();
	}
}
void employee :: writefile()    // Function 1.4
{
	int i,n;
	employee c[10];
	cout<<"!!Enter total Number of Employees(MAX 10)!!";
	cin>>n;
	ofstream ofile("employee.dat",ios::binary|ios::out|ios::app);
	for(i=0;i<n;i++)
	{
		c[i].input();
		ofile.write((char*)&c[i],sizeof(employee));
	}
	ofile.close();
}
void employee :: modifile()     // Function 1.5
{
	employee c1,c2;
	int f=0;
	ifstream ifile("employee.dat",ios::binary|ios::in);
	ofstream ofile("temp.dat",ios::binary|ios::out);
	if(!ifile)
		cout<<"!!File Does Not Exist!!";
	else
	{
		cout<<"!!Enter Employee Number That Need To Be Modified!!\n";
		c1.input();
		while(ifile.read((char*)&c2,sizeof(c2)))
		{
			if(c1.c_code==c2.c_code)
			{
				f=1;
				ofile.write((char*)&c1,sizeof(c1));
			}
			else
				ofile.write((char*)&c2,sizeof(c2));
		}
		ifile.close();
		ofile.close();
		if(f==1)
		{
			remove("employee.dat");
			rename("temp.dat","croma.dat");
		}
		else
			cout<<"!!Information Does Not Exist!!";
	}
}
void employee :: deletefile()   // Function 1.6
{
	employee c;
	int f=0,CC;
	ifstream ifile("employee.dat",ios::binary|ios::in);
	ofstream ofile("temp.dat",ios::binary|ios::out);
	if(!ifile)
		cout<<"!!File Does Not Exist!!";
	else
	{
		cout<<"!!Enter Any Employee Code That Need To Be Deleted!!: ";
		cin>>CC;
		while(ifile.read((char*)&c,sizeof(employee)))
		{
			if(c.c_code==CC)
			  {
				f=1;
				c.output();
			  }
			else
				ofile.write((char*)&c,sizeof(employee));
		}
		ifile.close();
		ofile.close();
		if(f==1)
		{
			remove("employee.dat");
			rename("temp.dat","employee.dat");
			cout<<"\n\n!!Record Delete!!";
		}
		else
			cout<<"!!Information Does Not Exist!!";
	}
}
void employee :: searchfile()   // Function 1.7
{
	int CC,f=0;
	employee c;
	ifstream ifile("employee.dat",ios::binary|ios::in);
	if(!ifile)
		cout<<"!!File Does Not Exist!!";
	else
	{
		cout<<"!!Enter Any employee Code That Need To Be Seached!!";
		cin>>CC;
		while(ifile.read((char*)&c,sizeof(c))&&(f==0))
		{
			if(CC==c.c_code)
			{
				c.output();
				f=1;
			}
		}
		ifile.close();
		if(f==0)
			cout<<endl<<"!!Information Does Not Exist!!";
	}
}


class sell			// 3rd class for product sold
{
	int s_code;             //Employee code
	char s_name[20];        //Customer Code
	char phnumber[20];      //Customer name
	char address[100];      //Customer Address
	int pcode;              //Product Code
	int quantity;           //Product quantity
	int quantitypurchased;  //Product Purchased
   public:
	void input();           //adding data
	void output();          //display data

};
void sell :: input()
{
	cout<<"Enter Customer Code: ";
	cin>>s_code;
	cout<<"Enter Customer Name: ";
	gets(s_name);
	cout<<"Enter Customer Phone Number: ";
	cin>>phnumber;
	cout<<"Enter Customer Address: ";
	gets(address);
	cout<<"Enter Product Code: ";
	cin>>pcode;
	cout<<"Enter Total Quantity: ";
	cin>>quantitypurchased;
	cout<<"\n--------------------------------";
}
void sell :: output()
{
	cout<<"\nCustomer Code: "<<s_code;
	cout<<"\nCustomer Name: ";
	puts(s_name);
	cout<<"\nCustomer Phone Number: "<<phnumber;
	cout<<"\nCustomer Address: ";
	puts(address);
	cout<<"\nProduct Code: "<<pcode;
	cout<<"\nQuantity purchased: "<<quantitypurchased;
	cout<<"\n--------------------------------";
}

void main()
{                               // manager`s object
 manager c1;                    // employee`s object
 employee C1;                   // sell`s object
 sell S1;
 int choice,ch1,ch2,f=1,i=0,j=0;
 char ch3[4];
 clrscr();
				//mains screen
 cout<<"\n\n\n\n\n\t\t\t\t  DEVELOPED BY \n\t\t\t Rahul Veer Singh";
 cout<<"\n\n\n\n\n\t\t\t***********************************";
 cout<<"\n\t\t\t\t  WELCOME TO THE ";
 cout<<"\n\t\t\t        ELECTRONICS MEGASTORE";
 cout<<"\n\t\t\t***********************************";
 cout<<"\n\n\n\n\n\n\n\n\nPRESS ANY KEY TO CONTINUE ";
 getch();
				//1st login screen
 do{
 clrscr();
 char username[20],password[20];
 cout<<"\n\n\n\n\n\t\t LOGIN ";
 cout<<"\n\t\t\t USERNAME:- ";
 cin>>username;
 cout<<"\n\t\t\t PASSWORD:-";
while(i<=5)
{
password[i]=getch();
cout<<"*";
++i;
}
 password[i]='\0';
 getch();

 if(strcmp(username,"admin")==0 && strcmp(password,"admin1")==0)
  {
   f=0;
   goto I;
  }
 else
 {
  cout<<"\nINVALID USERNAME OR PASSWORD!!";
  cout<<"\n\n\n\n\n\nDO YOU WANT TO EXIT(y/n):- ";
  cin>>ch3;
  if(strcmp(ch3,"y")==0)
   {
    exit(0);
   }

 }

 }while(f!=0);
 getch();
				// 1st menu
 do
  {
   I:
   clrscr();

   cout<<"\n\n\n\n\n\t\t     ####################################";
   cout<<"\n\t\t     %\t\t\t\t\t%\n\t\t     %\t\t\t\t\t%\n\t\t     %\t\t   1.MANAGER\t\t%";
   cout<<"\n\t\t     %\t\t\t\t\t%\n\t\t     %\t\t\t\t\t%\n\t\t     %\t\t\t\t\t%";
   cout<<"\n\t\t     %\t\t\t\t\t%\n\t\t     %\t\t  2.INVOICE\t\t%";
   cout<<"\n\t\t     %\t\t\t\t\t%\n\t\t     %\t\t\t\t\t%\n\t\t     %\t\t\t\t\t%";
   cout<<"\n\t\t     %\t\t\t\t\t%\n\t\t     %\t\t  3.exit\t\t%";
   cout<<"\n\t\t     %\t\t\t\t\t%\n\t\t     %\t\t\t\t\t%";
   cout<<"\n\t\t     ####################################";
   cout<<"\n\t\t ENTER YOUR CHOICE:-";
   cin>>choice;
   switch(choice)
   {
    case 1:
	   do{
				// 2nd login screen
	       clrscr();
	       char username1[20],password1[20];
		 cout<<"\n\n\n\n\n\t\t LOGIN ";
		 cout<<"\n\t\t\t USERNAME:- ";
		 cin>>username1;
		 cout<<"\n\t\t\t PASSWORD:-";
		while(j<7)
		{
		password1[j]=getch();
		cout<<"*";
		++j;
		}
		 password1[j]='\0';
		 getch();

		 if(strcmp(username1,"manager")==0 && strcmp(password1,"madmin1")==0)
		  {
		   f=0;
		  }

		 else
		  {
		    cout<<"INVALID USERNAME OR PASSWORD!!";
		    cout<<"\n\n\n\n\n\nDO YOU WANT TO EXIT(y/n):- ";
		    cin>>ch3;
		   if(strcmp(ch3,"y")==0)
		    {
		     exit(0);
		    }
		    else{
		    goto I;
		    }

		  }

		}while(f!=0);
	     A:
	   do
	    {
				// 2nd menu
	     clrscr();
	     cout<<"\n\n\n\n\t\t================================";
	     cout<<"\n\n\n\n\t\t1.ADD PRODUCTS";
	     cout<<"\n\t\t2.DETAILS OF PRODUCTS";
	     cout<<"\n\t\t3.EDIT PRODUCTS DETAILS";
	     cout<<"\n\t\t4.DELETE PRODUCTS";
	     cout<<"\n\t\t5.SEARCH PRODUCTS";
	     cout<<"\n\t\t6.EMPLOYEE DETAILS ";
	     cout<<"\n\t\t7.EXIT";
	     cout<<"\n\n\n\t\t=====================================";
	     cout<<"\n\t\tENTER YOUR CHOICE:-";
	     cin>>ch1;
	     clrscr();
	     switch(ch1)
	     {
	      case 1:
		     clrscr();
		     c1.writefile();
		     getch();
		     break;
	      case 2:
		     clrscr();
		     c1.readfile();
		     getch();
		     break;
	      case 3:
		     clrscr();
		     c1.modifile();
		     getch();
		     break;
	      case 4:
		     clrscr();
c1.deletefile();
		     getch();
		     break;
	      case 5:
		     clrscr();
		     c1.searchfile();
		     getch();
		     break;
	      case 6: do
	    {
				//3rd menu
	     clrscr();
	     cout<<"\n\n\n\t\t===============EMPLOYEE===============";
	     cout<<"\n\n\t\t1.ADD EMPLOYEE";
	     cout<<"\n\t\t2.DETAILS OF EMPLOYEE ";
	     cout<<"\n\t\t3.EDIT EMPLOYEE";
	     cout<<"\n\t\t4.DELETE EMPLOYEE";
	     cout<<"\n\t\t5.SEARCH EMPLOYEE";
	     cout<<"\n\t\t6.BACK";
	     cout<<"\n\n\n\t\t======================================";
	     cout<<"\n\t\tENTER YOUR CHOICE:-";
	     cin>>ch2;
	     clrscr();
	     switch(ch2)
	     {
	      case 1:
		     clrscr();
		     C1.writefile();
		     getch();
		     break;
	      case 2:
		     clrscr();
		     C1.readfile();
		     getch();
		     break;
	      case 3:
		     clrscr();
		     C1.modifile();
		     getch();
		     break;
	      case 4:
		     clrscr();
		     C1.deletefile();
		     getch();
		     break;
	      case 5:
		     clrscr();
		     C1.searchfile();
		     getch();
		     break;
	      case 6:
		     goto A;

	     }
	   }while(ch2!=6);
	   break;
	       case 7:
		      goto I;
	     }
	    }while(ch1!=6);
	    default: cout<<"\t\tWRONG INPUT";
	    break;

    case 2:

	    do
	    {
				// 4rd menu
	     clrscr();
	     cout<<"\n\n\n\t\t=================SELL================";
	     cout<<"\n\n\t\t1. SELL";
	     cout<<"\n\t\t2. READ BILLS";
	     cout<<"\n\t\t3. Exit";
	     cout<<"\n\n\n\t\t======================================";
	     cout<<"\n\t\tENTER YOUR CHOICE:-";
	     cin>>ch2;
	     clrscr();
	     switch(ch2)
	     {
	      case 1:
		     clrscr();
		     S1.input();
		     getch();
		     break;
	      case 2:
		     clrscr();
		     S1.output();
		     getch();
		     break;

	      case 3:
		     goto I;

	     }
	   }while(ch2!=6);
	   break;
    case 3:
	   clrscr();
	   cout<<"\n\n\n\n\n\n\n\t\t\t\tEND OF PROGRAM";
	   cout<<"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\t\t\t BY Rahul Veer Singh";

   }
  }while(choice<3);
  getch();
}
