#include<iostream>
#include<fstream>
#include<iomanip>
#include<stdio.h>
#include<conio.h>
using namespace std;

class student
{
	int rollno;
	char name[50];
	int p_marks, c_marks, m_marks, e_marks, cs_marks;
	float per;
	char grade;
	void calculate();
    public:
		void showdata();
		void getdata();
		int retrollno();
};


void student::calculate()
{
	per=(p_marks+c_marks+m_marks+e_marks+cs_marks)/5.0;
	if(per>=80)
		grade='A';
	else if(per>=70)
		grade='B';
	else if(per>=60)
		grade='C';
	else if(per>=50)
		grade='D';
	else if(per>=40)
		grade='E';
	else if(per>=33)
		grade='F';
	else
		grade='FAIL...!!!';
}

void student::getdata()
{
	system("CLS");
	cout<<"\nEnter The roll number of student: ";
	cin>>rollno;
	cout<<"\nEnter The Name of Student: ";
	cin>>name;
	cout<<"\nEnter The marks in physics out of 100 : ";
	cin>>p_marks;
	cout<<"\nEnter The marks in chemistry out of 100 : ";
	cin>>c_marks;
	cout<<"\nEnter The marks in maths out of 100 : ";
	cin>>m_marks;
	cout<<"\nEnter The marks in english out of 100 : ";
	cin>>e_marks;
	cout<<"\nEnter The marks in computer science out of 100 : ";
	cin>>cs_marks;
	calculate();
}

void student::showdata()
{
	system("CLS");
	cout<<"\t---------------------------";
	cout<<"\n\t      STUDENT DETAIL\n";
	cout<<"\t---------------------------";
	cout<<"\n\n\tRoll number of student : "<<rollno;
	cout<<"\n\n\tName of student : "<<name;
	cout<<"\n\n\tMarks in Physics : "<<p_marks;
	cout<<"\n\n\tMarks in Chemistry : "<<c_marks;
	cout<<"\n\n\tMarks in Maths : "<<m_marks;
	cout<<"\n\n\tMarks in English : "<<e_marks;
	cout<<"\n\n\tMarks in Computer Science :"<<cs_marks;
	cout<<"\n\n\tPercentage of student is  :"<<per;
	cout<<"\n\n\tGrade of student is :"<<grade;
}


int  student::retrollno()
{
	return rollno;
}

void write_student()
{
	student st;
	ofstream outFile;
	outFile.open("student.dat",ios::binary|ios::app);
	st.getdata();
	outFile.write((char *) &st, sizeof(student));
	outFile.close();
    cout<<"\n\nStudent record Has Been Created ";
	cin.ignore();
	getch();
}

void display_sp(int n)
{
	system("CLS");
	student st;
	ifstream inFile;
	inFile.open("student.dat",ios::binary);
	if(!inFile)
	{
		cout<<"File could not be open !! Press any Key...";
		getch();
		return;
	}

	int temp=0;
	while(inFile.read((char *) &st, sizeof(student)))
	{
		if(st.retrollno()==n)
		{
			 st.showdata();
			 temp=1;
		}
	}
	inFile.close();
	if(temp==0)
		cout<<"\n\n\tRECORD DOES NOT EXIST...!!!";
	getch();
}



void modify_student(int n)
{
	system("CLS");
	int found=0;
	student st;
	fstream File;
	File.open("student.dat",ios::binary|ios::in|ios::out);
	if(!File)
	{
		cout<<"\n\n\tFile could not be open !!";
		getch();
		return;
	}
	while(File.read((char *) &st, sizeof(student)) && found==0)
	{
		if(st.retrollno()==n)
		{
			st.showdata();

			cout<<"\n\n\tPlease Enter The New Details of student"<<endl;
			st.getdata();
		    	int pos=(-1)*sizeof(st);
		    	File.seekp(pos,ios::cur);
		    	File.write((char *) &st, sizeof(student));
		    	cout<<"\n\n\t Record Updated";
		    	found=1;
		}
	}
	File.close();
	if(found==0)
		cout<<"\n\n\tRecord Not Found ";
	getch();
}



void delete_student(int n)
{
	system("CLS");
	student st;
	ifstream inFile;
	inFile.open("student.dat",ios::binary);
	if(!inFile)
	{
		cout<<"\n\n\tFile could not be open !! Press any Key...";
		getch();
		return;
	}
	ofstream outFile;
	outFile.open("Temp.dat",ios::out);
	inFile.seekg(0,ios::beg);
	while(inFile.read((char *) &st, sizeof(student)))
	{
		if(st.retrollno()!=n)
		{
			outFile.write((char *) &st, sizeof(student));
		}
	}
	outFile.close();
	inFile.close();
	remove("student.dat");
	rename("Temp.dat","student.dat");
	cout<<"\n\n\tRecord Deleted ..";
	getch();
}

void result()
{
	char ch;
	int rollno;
	system("CLS");
	cout<<"\n\n\n\tRESULT MENU";
	cout<<"\n\n\t1. Student Report Card";
	cout<<"\n\n\t2. Back to Main Menu";
	cout<<"\n\n\n\tEnter Choice (1/2)? ";
	cin>>ch;
	switch(ch)
	{
	case '1' :
		  cout<<"\n\n\tEnter Roll Number Of Student : ";
		  cin>>rollno;
		  display_sp(rollno); break;
	case '2' :
			break;
	default :
			cout<<"\a";
	}
}

void entry_menu()
{
	char ch;
	int num;
	system("CLS");
	cout<<"\n\n\n\tENTRY MENU";
	cout<<"\n\n\t1.CREATE STUDENT RECORD";
	cout<<"\n\n\t2.SEARCH STUDENT RECORD ";
	cout<<"\n\n\t3.MODIFY STUDENT RECORD";
	cout<<"\n\n\t4.DELETE STUDENT RECORD";
	cout<<"\n\n\t5.BACK TO MAIN MENU";
	cout<<"\n\n\tPlease Enter Your Choice (1-6) ";
	cin>>ch;
	switch(ch)
	{
	case '1':
			write_student(); break;
	case '2':
			cout<<"\n\n\tPlease Enter The roll number "; cin>>num;
			display_sp(num); break;
	case '3':
			cout<<"\n\n\tPlease Enter The roll number "; cin>>num;
			modify_student(num);break;
	case '4':
			cout<<"\n\n\tPlease Enter The roll number "; cin>>num;
			delete_student(num);break;
	case '5':
			break;
	default:
			cout<<"\a"; entry_menu();
	}
}

int main()
{
	int password();
	password();
	char ch;
	cout.setf(ios::fixed|ios::showpoint);
	cout<<setprecision(2);
	cout<<"\n\n\t\tREPORT CARD";
	do
	{
		system("CLS");
		cout<<"\t--------------------------------------------";
		cout<<"\n\t  STUDENT REPORT CARD MANAGEMENT SYSTEM\n";
		cout<<"\t--------------------------------------------";
		cout<<"\n\n\t\t**MAIN MENU**";
		cout<<"\n\n\t01. RESULT MENU";
		cout<<"\n\n\t02. CRUD MENU";
		cout<<"\n\n\t03. EXIT";
		cout<<"\n\n\tPlease Select Your Option : ";
		cin>>ch;
		switch(ch)
		{
			case '1': result();
				break;
			case '2': entry_menu();
				break;
			case '3':
			system("CLS");
                        cout<<"\n\nSTUDENT REPORT CARD MANAGEMENT SYSTEM \n\n";
                        return 0;
				break;
			default :
			    cout<<"\n\n\tError...!!!...Wrong Choice Entered...!!!";
		}
    	}while(ch!='3');
}

int password(){
	system("CLS");
   string pass ="";
   char ch;
   	cout<<"\n\n\n\n\n\n\t--------------------------------------------";
	cout<<"\n\tSTUDENT REPORT CARD MANAGEMENT SYSTEM LOGIN\n";
	cout<<"\t\--------------------------------------------\n";
   cout << "\n\n\tEnter Password: ";
   ch = _getch();
   while(ch != 13){
      pass.push_back(ch);
      cout << '*';
      ch = _getch();
   }
   if(pass == "12345"){

      cout << "\n\n\n\tAccess Granted \n\n\n";
      system("PAUSE");
   }else{
      cout << "\n\n\n\tAccess Aborted...Please Try Again!\n";
      system("PAUSE");
      password();
   }
}
