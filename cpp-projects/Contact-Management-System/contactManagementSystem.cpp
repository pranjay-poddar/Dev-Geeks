#include <iostream>
#include <windows.h>
#include <iomanip>
#include <fstream>
#include <regex>
#include <sstream>
#include <unistd.h>
#include <cstring>
using namespace std;
void showContacts();        // displays all contacts from the file
void searchContact();       // search contacts from file
int count_contacts(string); // counts no. of contacts present in the ContactBook
void get_input(string *Name, string *Mobile);
class Person
{
    string name, mobile, address;

public:
    /* constructor to initialize data members*/
    Person(string Name, string Mobile, string Address)
    {
        name = Name;
        mobile = Mobile;
        address = Address;
    }
    bool chk_contact(string, int);    // checks already existing contact
    void add_contacts();   // adds new contact to file
    void edit_or_delete_contact(bool);   // edit or delete contact details
};

bool Person::chk_contact(string filename, int chk_type)
{
    fstream file0;
    string st, st2;
    bool no_match = true;
    file0.open(filename, ios::in);
    while (file0.eof() == 0)
    {
        getline(file0, st);
        getline(file0, st2);
        transform(st.begin(), st.end(), st.begin(), ::tolower);
        string name2 = name;
        transform(name2.begin(), name2.end(), name2.begin(), ::tolower);
        string chk_mobile = "Mobile: " + mobile;
        if(chk_type==1)
        {
            if ((st.find(name2, 0) != string::npos) || (st2 == chk_mobile))
            {
                no_match = false;
                break;
            }
        }
        else if(chk_type==2)
        {
            if ((st.find(name2, 0) != string::npos) && (st2 == chk_mobile))
            {
                no_match = false;
                break;
            }
        }
        else if(chk_type==3)
        {
            string st3, tmp;
            string address3 = address;
            getline(file0, st3); // 
            getline(file0, tmp);
            transform(st3.begin(), st3.end(), st3.begin(), ::tolower);
            transform(address3.begin(), address3.end(), address3.begin(), ::tolower);
            string chk_address = "address: "+address3;
            string chk_name = "name: "+name2;
            if ((st == chk_name) && (st2 == chk_mobile) && (st3 == chk_address))
            {
                no_match = false;
                break;
            }
        }
    }
    file0.close();
    return no_match;
}

void Person::add_contacts()
{
    bool no_match = chk_contact("ContactBook.txt", 1);
    if (no_match)
    {
        fstream file1;
        file1.open("ContactBook.txt", ios::app | ios::out);
        file1 << "Name: " << name << endl;
        file1 << "Mobile: " << mobile << endl;
        file1 << "Address: " << address << endl;
        file1 << endl; //
        cout << "Contact Details added successfully!!" << endl;
        file1.close();
    }
    else
    {
        cout << "A contact with this name or mobile no. already exists in your Contact Book." << endl;
        cout << "Please try again..." << endl;
    }
    cout << endl
         << "Press Enter key to continue : ";
    getchar();
}

void Person::edit_or_delete_contact(bool edit)
{
    bool no_match = chk_contact("ContactBook.txt", 2);
    if (no_match)
        cout << "\nThe entered Contact details were not found!" << endl;

    else
    {
        /*Checking if temp.txt already exists */
        ifstream ifile("temp.txt");
        if (ifile)
        {
            cout << "A file named 'temp.txt' already exists in this directory, kindly move it to a different directory." << endl;
        }
        else
        {
            char oldname[] = "ContactBook.txt";
            char newname[] = "temp.txt";
            int renaming = rename(oldname, newname); // Renaming the file from ContactBook.txt to temp.txt
        }
        ifile.close();
        string name2, mobile2, address2, tmp;
        fstream file1, file2;
        file1.open("temp.txt", ios::in);
        file2.open("ContactBook.txt", ios::app | ios::out); //Creating and opening a new ContactBook.txt
        int numcontacts = count_contacts("temp.txt");
        for (int i = 0; i < numcontacts; i++)
        {
            getline(file1, name2);
            getline(file1, mobile2);
            getline(file1, address2);
            getline(file1, tmp);
            transform(name.begin(), name.end(), name.begin(), ::tolower);
            string name3 = name2;
            transform(name3.begin(), name3.end(), name3.begin(), ::tolower);
            string chk_mobile = "Mobile: " + mobile;
            if ((name3.find(name, 0) != string::npos) && (mobile2 == chk_mobile))
            {
                if(edit)
                {
                    string name4, mobile4, address4;
                    cout<<endl<<"Enter new contact details -";
                    get_input(&name4, &mobile4);
                    cout << "Enter Address : ";
                    getline(cin, address4);
                    Person p(name4, mobile4, address4);
                    if (p.chk_contact("temp.txt", 3))
                    {
                        file2 << "Name: " << name4 << endl;
                        file2 << "Mobile: " << mobile4 << endl;
                        file2 << "Address: " << address4 << endl;
                        file2 << endl;
                        cout << "Contact Details Updated successfully!!" << endl;
                    }
                    else
                    {
                        file2 << name2 << endl;
                        file2 << mobile2 << endl;
                        file2 << address2 << endl;
                        file2 << endl;
                        cout<<"Contact Details already exist"<<endl;
                    }
                }
                else
                {
                    cout << "Deletion Successful!" << endl;
                    continue;
                }
            }
            else
            {
                file2 << name2 << endl;
                file2 << mobile2 << endl;
                file2 << address2 << endl;
                file2 << endl;
            }
            address2 = " ";
            mobile2 = " ";
            name2 = " ";
        }
        file1.close();
        file2.close();
        int status = remove("temp.txt");
    }
    cout << endl << "Press Enter key to continue : ";
    getchar();
}

int count_contacts(string filename)
{
    string Name;
    int numcontacts = 0;
    fstream file;
    file.open(filename, ios::in);
    const regex format("^Name: .+");
    while (file.eof() == 0)
    {
        getline(file, Name);
        if (regex_match(Name, format))
            numcontacts++;
    }
    return numcontacts;
}

void showContacts()
{
    system("cls");
    if (count_contacts("ContactBook.txt") < 1)
        cout << setw(50) << endl
             << "Contact Book is empty!" << endl
             << endl;
    else
    {
        cout << setw(50) << endl
             << "Contact Details" << endl
             << endl;
        fstream file1;
        file1.open("ContactBook.txt", ios::in);
        string str = " ";
        while (file1.eof() == 0)
        {
            getline(file1, str);
            cout << str << endl;
        }
        file1.close();
    }
    cout << "Press Enter key to Continue : ";
    getchar();
}

void get_input(string *Name, string *Mobile) // Take contact details as input from the user
{
    cout << "\nEnter Name: ";
    getline(cin, *Name);
    while (true)
    {
        cout << "Enter Mobile no.(along with country code): ";
        getline(cin, *Mobile);
        const regex pattern("^[+]{1}[0-9]+");

        if (regex_match(*Mobile, pattern))
            break;
        else
            cout << "Please enter valid mobile number." << endl;
    }
}

void searchContact()
{
    system("cls");
    cout << setw(60) << "Search by Name || Number ||  Address" << endl
         << endl;
    int chk = 0;
    string search_str = " ";
    string name, number, address;
    cout << "Enter Name/Number/Address you want to search : ";
    getline(cin, search_str);
    cout << endl;
    fstream file1;
    file1.open("ContactBook.txt", ios::in);
    while (file1.eof() == 0)
    {
        getline(file1, name);
        string name2 = name;
        getline(file1, number);
        getline(file1, address);
        string address2 = address;
        transform(search_str.begin(), search_str.end(), search_str.begin(), ::tolower); //Converting to lowercase string
        transform(name.begin(), name.end(), name.begin(), ::tolower);
        transform(address.begin(), address.end(), address.begin(), ::tolower);
        if ((name.find(search_str, 0) != string::npos) || (number.find(search_str, 0) != string::npos) || (address.find(search_str, 0) != string::npos))
        {
            chk++;
            cout << name2 << endl;
            cout << number << endl;
            cout << address2 << endl;
            cout << endl;
        }
        getline(file1, name2);
        address = " ";
        number = " ";
        name = " ";
    }
    file1.close();
    if (chk < 1)
        cout << "No contacts were found having this contact detail." << endl;
    cout << endl
         << "Enter any key to continue : ";
    getchar();
}

int main()
{
    system("cls");
    /* to create a new file*/
    fstream file;
    file.open("ContactBook.txt", ios::app);
    file.close();
    /* infinite while loop*/
    while (true)
    {
        string choice;
        int ch = 0;
        cout << setw(50) << "****" << endl;
        cout << setw(50) << "Menu" << endl;
        cout << setw(50) << "****" << endl;

        cout << "You can perform following operations:-\n1. Add a new Contact\n2. Show all Contacts\n3. Search a Contact\n4. Edit a Contact\n5. Delete a Contact\n6. Exit" << endl;
        cout << "\nEnter the S.No. of the operation you want to perform: ";
        getline(cin, choice);
        stringstream stream(choice);
        stream >> ch; // takes first integer from entered string choice
        switch (ch)
        {
        case 1:
        {
            system("cls");
            string Name, Mobile, Address;
            cout << setw(60) << "Add Contacts" << endl
                 << endl;
            get_input(&Name, &Mobile); // Call by Address
            cout << "Enter Address: ";
            getline(cin, Address);
            Person p1(Name, Mobile, Address);
            p1.add_contacts();
            break;
        }
        case 2:
        {
            showContacts();
            break;
        }
        case 3:
        {
            searchContact();
            break;
        }
        case 4:
        {
            system("cls");
            string Name, Mobile;
            cout << setw(60) << "Edit a Contact" << endl<< endl;
            cout<<"Enter contact details to be edited - ";
            get_input(&Name, &Mobile); // Call by address
            Person p2(Name, Mobile, " ");
            p2.edit_or_delete_contact(true);
            break;
        }
        case 5:
        {
            system("cls");
            string Name, Mobile;
            cout << setw(60) << "Delete a Contact" << endl<< endl;
            get_input(&Name, &Mobile); // Call by address
            Person p2(Name, Mobile, " ");
            p2.edit_or_delete_contact(false);
            break;
        }
        case 6:
        {
            cout << "\nThank you for using the program!" << endl
                 << endl;
            exit(0);
        }
        default:
        {
            cout << "Please enter valid S.No.!!" << endl;
            usleep(1000000); // to take a pause
        }
        }
        system("cls");
    }
    return 0;
}
