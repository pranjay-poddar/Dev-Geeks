#include <iostream>
#include <conio.h>
#include <fstream>

using namespace std;

class contact{
private:
	char fName[50], lName[50], address[50], email[50];
	long long phNo;
		
public:
	void createContact() {
		cout<<"Enter your first name: ";
		cin>>fName;
		cout<<"Enter your last name: ";
		cin>>lName;
		cout<<"Enter phone: ";
		cin>>phNo;
		cout<<"Enter address: ";
		cin>>address;
		cout<<"Enter email: ";
		cin>>email;	
	}
		
	void showContact() {
		cout<<"Name: "<<fName<<" "<<lName<<endl;
		cout<<"Phone: "<<phNo<<endl;
		cout<<"Address: "<<address<<endl;
		cout<<"Email: "<<email<<endl;	
	}
		
	void writeOnFile() {
		char ch;
		ofstream f1;
		f1.open("CMS.dat",ios::binary|ios::app);

		do {
			createContact();
			f1.write(reinterpret_cast<char*>(this),sizeof(*this));
			cout<<"Do you have next data?(y/n)";
			cin>>ch;
		}while(ch=='y');

		cout<<"Contact has been Sucessfully Created...";
		f1.close();
	}
		
	void readFromFile() {
		ifstream f2;
		f2.open("CMS.dat",ios::binary);

		cout<<"\n================================\n";
		cout<<"LIST OF CONTACTS";
		cout<<"\n================================\n";

		while(!f2.eof()) {
			if(f2.read(reinterpret_cast<char*>(this),sizeof(*this)))
			{
				showContact();
				cout<<"\n================================\n";
			}
		}
		f2.close();
	}
		
	void searchOnFile() {
		ifstream f3;
		long long phone;
		cout<<"Enter phone no.: ";
		cin>>phone;
		f3.open("CMS.dat",ios::binary);

		while(!f3.eof()) {
			if(f3.read(reinterpret_cast<char*>(this), sizeof(*this))) {
				if (phone==phNo) {
					showContact();
					return;
				}
			}
		}
		cout<<"\n\n No record not found";
		f3.close(); 
	}
		
	void deleteFromFile() {
		long long num;
		int flag = 0;
		ofstream f4;
		ifstream f5;

		f5.open("CMS.dat",ios::binary);
		f4.open("temp.dat",ios::binary);

		cout<<"Enter phone no. to delete: ";
		cin>>num;

		while(!f5.eof()) {
			if(f5.read(reinterpret_cast<char*>(this),sizeof(*this))) {
				if(phNo!=num) {
					f4.write(reinterpret_cast<char*>(this),sizeof(*this));
				}
				else 
					flag = 1;
			}
		}
		f5.close();
		f4.close();
		remove("CMS.dat");
		rename("temp.dat","CMS.dat");

		flag==1?
		cout<<endl<<endl<<"\tContact Deleted...":
		cout<<endl<<endl<<"\tContact Not Found...";
	}
		
	void editContact() {
		long long num;
		fstream f6;

		cout<<"Edit contact";
		cout<<"\n===============================\n\n";
		cout<<"Enter the phone number to be edit: ";
		cin>>num;

		f6.open("CMS.dat",ios::binary|ios::out|ios::in);

		while(!f6.eof()) {
			if(f6.read(reinterpret_cast<char*>(this),sizeof(*this))) {
				if (phNo==num) {
					cout<<"Enter new record\n";
					createContact();
					int pos=-1*sizeof(*this);
					f6.seekp(pos,ios::cur);
					f6.write(reinterpret_cast<char*>(this),sizeof(*this));
					cout<<endl<<endl<<"\t Contact Successfully Updated...";
					return;
				}
			}
		}
		cout<<"\n\n No record not found";
		f6.close(); 
	}
};

int main() {
	system("cls");
	system("Color 3F"); // "Color XY", X - backgroung color, Y - text color

	cout<<"\n\n\n\n\n\n\n\n\t\t\t * WELCOME TO CONTACT MANAGEMENT SYSTEM *";
	getch();

	while(1) {
		contact c1;
		int choice;

		system("cls");
		system("Color 03");

		cout<<"\nCONTACT MANAGEMENT SYSTEM";
        cout<<"\n\nMAIN MENU";
		cout<<"\n=====================\n";
        cout<<"[1] Add a new Contact\n";
        cout<<"[2] List all Contacts\n";
        cout<<"[3] Search for contact\n";
        cout<<"[4] Delete a Contact\n";
        cout<<"[5] Edit a Contact\n";
        cout<<"[0] Exit";
		cout<<"\n=====================\n";
        cout<<"Enter your choice: ";
        cin>>choice;

        switch(choice) {
        	case 1:
        		system("cls");
        		c1.writeOnFile();
        		break;

        	case 2:
				system("cls");
        		c1.readFromFile();
        		break;

			case 3:
        		system("cls");
        		c1.searchOnFile();
        		break;

        	case 4:
				system("cls");
        		c1.deleteFromFile();
        		break;

        	case 5:
			    system("cls");
        		c1.editContact();
        		break;

        	case 0:
        		system("cls");
        		cout<<"\n\n\n\t\t\tThank you for using CMS."<<endl<<endl;
        		exit(0);
        		break;

        	default:
				continue;	
		}

		int opt;
		cout<<"\n\n..::Enter the Choice:\n[1] Main Menu\t\t[0] Exit\n";
		cin>>opt;

		switch (opt) {
			case 0:
        		system("cls");
        		cout<<"\n\n\n\t\t\tThank you for using CMS."<<endl<<endl;
        		exit(0);
        		break;

			default:
				continue;
		}
	}

	return 0;
}
