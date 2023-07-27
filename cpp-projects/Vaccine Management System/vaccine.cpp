#include<iostream>
#include<stdio.h>
#include<fstream>
#include<conio.h>
#include<string.h>
#include<windows.h> 
#include<iomanip>
#include<time.h>
#define num_of_vaccine 200
using namespace std;
int password();
void menu();
void show();
class Vaccine
{
	int age;
	int temperature;
	int bloodPressure;
	char gender;
	char name[100];
	char citizenship[100];
	char profession[100];
	char address[100];
	char mobileNumber[100];
	char vaccine[100];
	public:
		void setData();
		void addNew();
		void showData();
		void showList();
		void searchData();
		void viewVaccine();
		void search_by_citizenship();
    	void search_by_age();
    	void search_by_profession();
    	void search_by_gender();
    	void search_by_vaccine();
    	void view_all();
};

void Vaccine::setData()
{
    cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
  
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\t\t\t\t ENTER THE DETAILS ";
    cout<<"\n\t\t\t*****************************************\n\n";
    fflush(stdin);
        cout<<"\n\t\t Enter your name :-  ";
        gets(name);
        cout<<"\n\t\t Enter your citizenship no :-  ";
        gets(citizenship);
        cout<<"\n\t\t Enter your gender (M|F) :-  ";
        cin>>gender;
        cout<<"\n\t\t Enter your age:- ";
        cin>>age;
        fflush(stdin);
        cout<<"\n\t\t Enter your profession :-  ";
        gets(profession);
        cout<<"\n\t\t Enter your B.P. :-  ";
        cin>>bloodPressure;
        cout<<"\n\t\t Enter your Body temperature:-  ";
        cin>>temperature;
        fflush(stdin);
        cout<<"\n\t\t Enter your permanent address :-  ";
        gets(address);
        cout<<"\n\t\t Enter your Mobile number :- ";
        gets(mobileNumber);
        cout<<"\n\t\t Enter the vaccine injected :- ";
        gets(vaccine);
}

void Vaccine::addNew()
{
    fstream outin;
    outin.open("vaccinetrial.txt",ios::app|ios::out);
    setData();
    outin.write((char*)this,sizeof(Vaccine));
    cout<<"YOUR DATA HAS BEEN SUCCESSFULLY INSERTED "<<endl;
    getch();
    outin.close();
}

void Vaccine::showData()
{
    cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\t\t\t\t DETAILS  ";
    cout<<"\n\t\t\t*****************************************\n\n";
  	cout<<"\t\t Name is: "<<name<<endl;
   	cout<<"\t\t Citizenship number is: "<<citizenship<<endl;
    cout<<"\t\t Your age is "<<age<<endl;
    cout<<"\t\t Profession is : "<<profession<<endl;
    cout<<"\t\t Gender is : "<<gender<<endl;
    cout<<"\t\t Blood pressure is :"<<bloodPressure<<endl;
    cout<<"\t\t Body temperature is : "<<temperature<<endl;
    cout<<"\t\t Address is "<<address<<endl;
    cout<<"\t\t Mobile number is: "<<mobileNumber<<endl;
    cout<<"\n\t\t vaccine injected : "<<vaccine<<endl;
    
}

void Vaccine::showList()
{
    cout<<"\n";
    cout<<setw(15)<<setiosflags(ios::left)<<name;
    cout<<setw(15)<<citizenship;
    cout<<setw(15)<<age;
    cout<<setw(15)<<profession;
    cout<<setw(15)<<bloodPressure;
    cout<<setw(15)<<temperature;
    cout<<setw(15)<<gender;
    cout<<setw(15)<<mobileNumber;
    cout<<setw(15)<<address;
    cout<<setw(15)<<vaccine<<endl;
    
    
}
void Vaccine ::viewVaccine()
{
    ifstream ind;
    int i=0;
    ind.open("vaccinetrial.txt");
    ind.seekg(0,ios::beg);
    while(ind.read((char*)this,sizeof(Vaccine)))
    {
        i++;
    }
    ind.close();
    int ch;
    int s=num_of_vaccine-i;
       cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\t\t\t\tVACCINE STATISTICS";
    cout<<"\n\t\t\t*****************************************\n\n";
    cout<<"\t\t 1. Add more        \t\t\t2.View available \n\t\t\t\t\t 3. Back"<<endl;
    cin>>ch;
    int f_var=0;
    fstream file("count.txt",ios::in);
    file>>f_var;
    file.close();
    switch(ch)
    {
    case 1:
        int m;
        cout<<"\t Enter number of vaccines you want to add :"<<endl;
        cin>>m;
        f_var=f_var+m;
        file.open("count.txt",ios::out);
        file.seekg(0);
        file<<f_var;
        cout<<"\t\t Now total number of vaccines are : "<<f_var+s;
        file.close();
        break;
    case 2:
    	file.open("count.txt",ios::in);
        cout<<"\n\nAvailable number of vaccines are : "<<s+f_var;
        file.close();
        break;
    case 3:
        system("cls");
        menu();
    default:
        system("cls");
        cout<<"\nEnter valid option "<<endl;
        menu();
    }
    file.close();
    getch();
}

void Vaccine::searchData()
{
    Vaccine item;
    cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\t\t\t\tSEARCHING STATISTICS";
    cout<<"\n\t\t\t*****************************************\n\n";
    cout<<"From which option you want to perform searching "<<endl;
    cout<<"\n\t\t 1. By Citizenship No. \t\t\t 2. By Age "<<endl;
    cout<<"\n\t\t 3. By Profession \t\t\t 4. By Gender "<<endl;
    cout<<"\n\t\t 5. By Vaccine \t\t\t\t 6. Back to Main Menu "<<endl;
    cout<<"\n\n\t\tEnter your choice : ";
    int ch;
    cin>>ch;
    switch(ch)
    {
    case 1:
        system("cls");
        search_by_citizenship();
        getch();
        break;
    case 2:
        system("cls");
        search_by_age();
        getch();
        break;
    case 3:
        system("cls");
        search_by_profession();
        getch();
        break;
    case 4:
        system("cls");
        search_by_gender();
        getch();
        break;
    case 5:
        system("cls");
        search_by_vaccine();
        getch();
        break;
    case 6:
    	system("cls");
        menu();
        break;
    default:
        system("cls");
        cout<<"ENTER VALID OPTION"<<endl;
        menu();
    }
}

void Vaccine::search_by_citizenship()
{
    ifstream in;
	in.open("vaccinetrial.txt");
	int flag,p =0;
    char cs[100];
     cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\t\t\t\t Citizenship SEARCHING ";
    cout<<"\n\t\t\t*****************************************\n\n";
    cout<<"Enter your Citizenship number "<<endl;
  	fflush(stdin);
    gets(cs);
    show();
    while(!in.eof())
	{
	if(in.read(reinterpret_cast<char*>(this),sizeof(*this))){

        if(strcmp(cs,citizenship)==0)
        {
            showList();
            flag=1;
            p++;
			
        }
		}
    }
    if(flag=0)
    {
    	    cout<<"Citizenship you entered doesnot exist";
	}
	cout<<"\n\n\n\nNO of people vaccinated  by this age"<<p;
    in.close();

}

void Vaccine::search_by_age()
{
   ifstream in;
   in.open("vaccinetrial.txt");
    int flag =0;
    int a,p=0;
     cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\t\t\t\t AGE SEARCHING ";
    cout<<"\n\t\t\t*****************************************\n\n";
    cout<<"Enter Age by which you want to search "<<endl;
    cin>>a;
    show();
   while(!in.eof())
	{
	if(in.read(reinterpret_cast<char*>(this),sizeof(*this))){

        if(a==this->age)
        {
            showList();
            flag=1;
            p++;
			
            
        }
		}
    }
    if(flag==0)
    {
    cout<<"Age you entered is not found"<<endl;
    }
    cout<<"\n\n\n\nNO of people vaccinated  by this age"<<p;
    in.close();

}

void Vaccine::search_by_profession()
{
    ifstream in;
	in.open("vaccinetrial.txt");
    int flag =0;
    int p=0;
    char pf[100];
     cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\t\t\t\t PROFESSION SEARCHING ";
    cout<<"\n\t\t\t*****************************************\n\n";
    cout<<"Enter Profession by which you want to search:"<<endl;
    fflush(stdin);
    gets(pf);
    show();
   while(!in.eof())
	{
	if(in.read(reinterpret_cast<char*>(this),sizeof(*this))>0){

        if(strcmp(pf,profession)==0)
        {
            showList();
            flag=1;
            p++;
            return;
			
            
        }
		}
    }
    if(flag==0)
    {
    cout<<"SORRY!! No people by this Profession is vaccinated."<<endl;
    }
    cout<<"\n\n\n No of people vaccinated by this profession: "<<p<<endl;
    in.close();
}

void Vaccine::search_by_gender()
{
    ifstream in("vaccinetrial.txt");
    int flag =0;
    char g;
    int p=0;
     cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\t\t\t\t GENDER SEARCHING ";
    cout<<"\n\t\t\t*****************************************\n\n";
    cout<<"Enter gender by which you want to search "<<endl;
    cin>>g;
    show();
    while(!in.eof())
	{
	if(in.read(reinterpret_cast<char*>(this),sizeof(*this))){

        if(g==this->gender)
        {
            showList();
            flag=1;
            p++;
			
        }
		}
    }
    if(flag==0)
    {
    cout<<"SORRY!! No people by this Gender is vaccinated."<<endl;
    }
    cout<<"\n\n\n NO. of people vaccinated by this gender: "<<p<<endl;
    in.close();
}

void Vaccine::search_by_vaccine()
{
    ifstream in;
	in.open("vaccinetrial.txt");
    int flag =0;
    int p=0;
    char pf[100];
     cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\t\t\t\t PROFESSION SEARCHING ";
    cout<<"\n\t\t\t*****************************************\n\n";
    cout<<"Enter Vaccine to search: ";
    fflush(stdin);
    gets(pf);
    show();
   while(!in.eof())
	{
	if(in.read(reinterpret_cast<char*>(this),sizeof(*this))>0){

        if(strcmp(pf,vaccine)==0)
        {
            showList();
            flag=1;
            p++;
            return;
			
            
        }
		}
    }
    if(flag==0)
    {
    cout<<"SORRY!! No people by this vaccine is vaccinated."<<endl;
    }
    cout<<"\n\n\n No of people vaccinated by this vaccine: "<<p<<endl;
    in.close();
}

void show()
{
	cout<<"\n\n\n";
    cout<<setw(15)<<setiosflags(ios::left)<<"Name ";
    cout<<setw(15)<<"Aadhar No.";
    cout<<setw(15)<<"Age";
    cout<<setw(15)<<"Profession";
    cout<<setw(15)<<"B.P.";
    cout<<setw(15)<<"Temperature";
    cout<<setw(15)<<"gender";
    cout<<setw(15)<<"Mobile No.";
    cout<<setw(15)<<"Address";
    cout<<setw(15)<<"Vaccine"<<endl;
}

void Vaccine::view_all(){
			fstream outfile;
			outfile.open("vaccinetrial.txt",ios::binary|ios::in);
			if(!outfile){
				cout<<"File doesnot exist";
			}
			cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    		cout<<"\n\t\t\t*****************************************\n";
    		cout<<"\t\t\t\t\tALL DATA ";
    		cout<<"\n\t\t\t*****************************************\n\n";
			show();
			while(!outfile.eof()){
				if(outfile.read(reinterpret_cast<char*>(this),sizeof(*this))>0){
					showList();
				}
				
			}
			getch();
			outfile.close();
}

int password()
{
    char cname[30],pass[20];
    int ch, i=0,cap=0,capt=0;
    cout<<"\n\n\n\n\t\t\t\t\tUSER NAME:  ";
    fflush(stdin);
    gets(cname);
    cout<<"\n\t\t\t\t\tPASSWORD:    ";
    while((ch=getch()) != 13)
    {
        cout<<"*";
        pass[i]=ch;
        i++;
    }
    pass[i] = '\0';
    srand(time(0));
    cap=rand();
    cout<<"\n\n\t\t\t\t\tCAPTURE:-> "<<cap<<endl;
    cout<<" Please enter the valid capture :-   ";
    cin>>capt;
    if( (strcmp(cname,"admin")==0) && (strcmp(pass,"Dev-Geeks")==0) && cap==capt)
        return 1;
    else
        return 0;
}

void menu()//c
{
    system("cls");
    cout<<"\n\n\t\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\t\t\t\t WELCOME TO THE MAIN MENU";
    cout<<"\n\t\t\t*****************************************\n";
    cout<<"\n\t\t1: Add NEW Record\t\t\t 2: View VACCINE DATA"<<endl;
    cout<<"\n\t\t3: search   \t\t\t\t 4: View All Data"<<endl;
    cout<<"\n\t\t5: exit"<<endl;
}

int main()
 {
     Vaccine obj;
     int k=3;
     int num_vac;
    cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
    cout<<"\t\n\n Press any key to continue.............  "<<endl;
    getch();
    B:
    system("cls");
    cout<<"  \n\n\t\t\t\t\xB2\xB2\xB2\xB2\xB2\xB2\xB2   WELCOME TO LOGIN PAGE   \xB2\xB2\xB2\xB2\xB2\xB2\xB2"<<endl;
    cout<<"\n\n\t\t\t\t*********************************************";
    cout<<"\n\t\t\t\t\tEnter User name and Password\n";
    cout<<"\t\t\t\t*********************************************\n";
    while(k>=1)
    {
    int c = password();
    if(c==1)
        break;
    else
        cout<<"\n\n\t\t Wrong Password Or User Name \n\n\t\t You Can try Only "<<k-1<<" times more";
    k--;
    if(k<1)
        {
            for(int i=59; i>=0; i--)
            {
              system("cls");
              cout<<"\n\n\n\n\n\n\n\n\t\t\t\t\tYOU ARE BLOCKED FOR 1 MINUTE!!";
              cout<<"\n\n\n\n\n\n\t\t\t\t\tTRY AFTER "<<i<<" SECONDS.....";
              Sleep(1000);
            }
              k=3;
              goto B;
        }
    }
      int ch;
      do{
            cout<<"\n\n\t\t\xB3\xB2=\xB2=\xB2-\xB3 VACCINE MANAGEMENT SYSTEM  \xB3\xB2=\xB2=\xB2-\xB3\n\n"<<endl;
            
            menu();
            cout<<"\n\t\n\tChoose according to your need : ";
            cin>>ch;
             Vaccine v1;
      switch(ch)
       {
         case 1: system("cls");
	             obj.addNew();
                 break;
         case 2: system("cls");
       	   	  	obj.viewVaccine();
                 break;
         case 3:system("cls");
            	obj.searchData();
                break;
          case 4:system("cls");
            	obj.view_all();
                break;
        
         case 5:  system("cls");
                    exit(0);
         default: system("cls");
                  cout<<"\n\n\n\n\n\n\n\n\t\t\t\t\t\tTHANK YOU!!";
                  cout<<"\n\n\t\t\t\t\t****HAVE A NICE DAY*****";
                  Sleep(3000);
                  exit(0);
       }
      }while(ch!=0);

      return 0;
}

