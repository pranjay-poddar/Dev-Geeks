#include <iostream>
#include <string>
#include <cstring>
#include <conio.h>
#include<vector>
using namespace std;
int total_saving_accounts = 0;
int total_current_accounts = 0;
class account
{
    public :
    string name_of_account_holder;
    string name_of_joint_account_holder;
    long long int account_number;
    int balance;
    // int withdraw;
    // int deposit;
    string type_of_account;
    string pin;
    public :
    //In case of single holder account
    account(string accholdername,int bal,string typeofacc,string pc)
    {
        account_number = rand()%100000 + 1000000000;
        name_of_account_holder = accholdername;
        balance = bal;
        type_of_account = typeofacc;
        pin = pc;
        name_of_joint_account_holder = "No Joint Holder in this account";
    }
    //In case of multiple holder account
    account(string accholdername,string jointholdername,int bal,string typeofacc,string pc)
    {
        account_number = rand()%100000 + 1000000000;
        name_of_account_holder = accholdername;
        name_of_joint_account_holder = jointholdername;
        balance = bal;
        type_of_account = typeofacc;
        pin = pc;
    }
};
vector<account>accts;

void display_details(long long int accnum)
{
    bool acc_exists = false;
    for(auto it : accts)
    {
        if(it.account_number==accnum)
        {
            acc_exists = true;
            cout<<"\nAccount Number : "<<it.account_number;
            cout<<"\nAccount Holder Name : "<<it.name_of_account_holder;
            cout<<"\nJoint Holder Name : "<<it.name_of_joint_account_holder;
            cout<<"\nBalance in your account : "<<it.balance;
            cout<<"\nType of Account : "<<it.type_of_account;
        }
    }
    if(acc_exists == false){
    cout<<"Account doesn't exists with given Account Number.";
    exit(0);
    }
}

bool create_account(vector<account>&accts)
{
    system("cls");
    string accholder_name;
    cout<<"\nENTER YOUR DETAILS HERE : ";
    cout<<"\nName of Account Holder : ";
    cin>>accholder_name;
    string str;
    cout<<"\nDo you want to have joint holder account? Type YES/NO : ";
    cin>>str;
    string joint_holder;
    if(str=="YES")
    {
        cout<<"Enter the name of Joint Holder : ";
        cin>>joint_holder;
    }
    string pin;
    cout<<"\nEnter the pin : ";
    cin>>pin;
    string typeofacc;
    cout<<"\nEnter the type of account : ";
    int choice;
    cout<<"1 - Savings Account\n";
    cout<<"2 - Current Account\n";
    cout<<"Enter your choice here : ";
    cin>>choice;
    if(choice==1)
     typeofacc =  "Savings";
    else
     typeofacc = "Current";

    int balance;
    cout<<"\nEnter the balance you want to have initially in your account : ";
    cin>>balance;

         //========SINGLE HOLDER ACCOUNT===========//

    //If it is savings account
    if(typeofacc=="Savings" && str == "YES"){
    account ob(accholder_name,joint_holder,balance,typeofacc,pin);
    total_saving_accounts++;
    accts.push_back(ob);
    std::cout << "\t\t|-----------------------------------------------|" << "\n";; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|     ACCOUNT CREATED SUCCESSFULLY              |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
    display_details(ob.account_number);
    return true;
    }
    //If it is current account and balance is insufficient
    if(typeofacc=="Current" && balance < 10000 && str == "YES")
    {
    std::cout << "\t\t|-----------------------------------------------|" << "\n";; 
	std::cout << "\t\t|     INSUFFICIENT BALANCE                      |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
    return false;
    }
    //Current account with sufficient balance
    else{
    account ob(accholder_name,joint_holder,balance,typeofacc,pin);
    accts.push_back(ob);
    total_current_accounts++;
    std::cout << "\t\t|-----------------------------------------------|" << "\n";; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|     ACCOUNT CREATED SUCCESSFULLY              |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
    display_details(ob.account_number);
    return true;
    }


        //========JOINT HOLDER ACCOUNT===========//

      //If it is savings account
    if(typeofacc=="Savings" && str == "NO"){
    account ob(accholder_name,balance,typeofacc,pin);
    total_saving_accounts++;
    accts.push_back(ob);
    std::cout << "\t\t|-----------------------------------------------|" << "\n";; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|     ACCOUNT CREATED SUCCESSFULLY              |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
    display_details(ob.account_number);
    return true;
    }
    //If it is current account and balance is insufficient
    if(typeofacc=="Current" && balance < 10000 && str == "NO")
    {
    std::cout << "\t\t|-----------------------------------------------|" << "\n";; 
	std::cout << "\t\t|     INSUFFICIENT BALANCE                      |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
    return false;
    }
    //Current account with sufficient balance
    else{
    account ob(accholder_name,balance,typeofacc,pin);
    accts.push_back(ob);
    total_current_accounts++;
    std::cout << "\t\t|-----------------------------------------------|" << "\n";; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|     ACCOUNT CREATED SUCCESSFULLY              |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
    display_details(ob.account_number);
    return true;
    }
}
long long int accnumber;
bool change_pin()
{
    long long int accnum;
    cout<<"Enter your account number : ";
    cin>>accnum;
    bool acc_exists = false;
    for(auto it : accts)
    {
        if(it.account_number==accnum)
        {
            acc_exists = true;
            string newpin;
            string oldpin;
            cout<<"Enter the old pin : ";
            cin>>oldpin;
            if(oldpin==it.pin)
            {
                cout<<"Enter new pin : ";
                cin>>newpin;
                it.pin = newpin;
                display_details(it.account_number);
                accnumber = it.account_number;
                return true;
            }
            else{
            cout<<"Invalid Pin. Try Again";
            return false;
            }
        }
    }
    if(acc_exists == false){
    cout<<"Account doesn't exists with given Account Number.";
    return false;
    }
}

bool deposit_into_account()
{
   long long int accnum;
    cout<<"Enter your account number : ";
    cin>>accnum;
    bool acc_exists = false;
    for(auto it : accts)
    {
        if(it.account_number==accnum)
        {
            acc_exists = true;
            string pinfordepo;
            cout<<"Enter the pin : ";
            cin>>pinfordepo;
            if(pinfordepo==it.pin)
            {
                int deposit_amount;
                cout<<"Enter the amount you want to deposit : ";
                cin>>deposit_amount;
                it.balance = it.balance+deposit_amount;
                cout<<"Your Updated details : ";
                display_details(it.account_number);
                return true;
            }
            else{
            cout<<"Invalid Pin. Try Again";
            return false;
            }
        }
    }
    if(acc_exists == false){
    cout<<"Account doesn't exists with given Account Number.";
    return false;
    }
}



bool withdraw_from_account()
{
    long long int accnum;
    cout<<"Enter your account number : ";
    cin>>accnum;
    bool acc_exists = false;
    for(auto it : accts)
    {
        if(it.account_number==accnum)
        {
            acc_exists = true;
            string pinfordepo;
            cout<<"Enter the pin : ";
            cin>>pinfordepo;
            if(pinfordepo==it.pin)
            {
                int withdrawl_amount;
                cout<<"Enter the amount you want to deposit : ";
                cin>>withdrawl_amount;
                if(it.balance-withdrawl_amount > 0)
                {
                    it.balance = it.balance - withdrawl_amount;
                    cout<<"Your Updated details : ";
                    display_details(it.account_number);
                    return true;
                }
                else{
                    cout<<"Oooopssss!!!! Insufficient Balance";
                }
            }
            else{
            cout<<"Invalid Pin. Try Again";
            return false;
            }
        }
    }
    if(acc_exists == false){
    cout<<"Account doesn't exists with given Account Number.";
    return false;
    }
}

bool balance_inquiry()
{
    long long int accnum;
    cout<<"Enter your account number : ";
    cin>>accnum;
    bool acc_exists = false;
    for(auto it : accts)
    {
        if(it.account_number==accnum)
        {
            cout<<"The balance in your account is : "<<it.balance;
            return true;
        }
    }
    if(acc_exists == false){
    cout<<"Account doesn't exists with given Account Number.";
    return false;
    }
}

bool close_account()
{
    long long int accnum;
    cout<<"Enter your account number : ";
    cin>>accnum;
    bool acc_exists = false;
    int count = 0;
    for(auto it : accts)
    {
        count++;
        if(it.account_number==accnum)
        {
            accts.erase(accts.begin()+count);
            return true;
        }
    }
    if(acc_exists == false){
    cout<<"Account doesn't exists with given Account Number.";
    return false;
    }
}

bool view_account_details()
{
    for(auto it : accts)
    {
        display_details(it.account_number);
    }
    return true;
} 

void admin_menu()
{
	int option;
    system("cls");
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
	std::cout << "\t\t|   Choose your option:                         |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|     1) View Total Number of Accounts          |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|     2) View Account Details                   |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
	cin>>option;

    switch(option)
    {
        case 1:
            cout<<"Total Number of Accounts : "<<accts.size();
            break;
        case 2:
            view_account_details();
            break;
        default:
            cout<<"Invalid Option";
            break;
    }   
}

void user_menu()
{
    system("cls");
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
	std::cout << "\t\t|   Choose your option:                         |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|     1) Create a New Account                   |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|     2) Change your pin                        |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
    std::cout << "\t\t|     3) Deposit Money                          |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
    std::cout << "\t\t|     4) Withdraw Money                         |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
    std::cout << "\t\t|     5) Balance Inquiry                        |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
    std::cout << "\t\t|     6) Close Account                          |" << "\n"; 
    std::cout << "\t\t|                                               |" << "\n"; 
    std::cout << "\t\t|     7) Display Account                        |" << "\n";
	std::cout << "\t\t|                                               |" << "\n"; 
    std::cout << "\t\t|     8) Exit                                   |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
    int choice;
    do{
        cout<<"\nEnter your choice : ";
        cin>>choice;
        if(choice==1){
        bool ans = create_account(accts);
        }
        else if(choice==2)
        {
            bool pinchanged = change_pin();
        }
        else if(choice==3)
        {
            bool successfuldeposit = deposit_into_account();
        }
        else if(choice==4)
        {
            bool successfulwithdraw = withdraw_from_account();
        }
        else if(choice==5)
        {
            bool successinquiry = balance_inquiry();
        }
        else if(choice==6)
        {
            bool successful_close_account = close_account();
        }
        else if(choice==7)
        {
            long long int account_number;
            cout<<"Enter the account number for details to be displayed : ";
            cin>>account_number;
            display_details(account_number);
        }
        else if(choice==8)
        {
            exit(0);
        }
    }while(choice!=8);

}

void welcome()
{
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|     WELCOME TO DEV GEEKS BANKING SYSTEM       |" << "\n";
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
	std::cout << "\t\t|\t Choose your option:\t                |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|\t\t 1) ADMINISTRATOR               |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|\t\t 2) USER                        |" << "\n"; 
	std::cout << "\t\t|                                               |" << "\n"; 
	std::cout << "\t\t|\t\t 3) EXIT                        |" << "\n"; 
	std::cout << "\t\t|-----------------------------------------------|" << "\n";

	int choice;
	std::cout << "\n\nEnter: ";
	std::cin >> choice;	
    if(choice==1)
    admin_menu();
    else if(choice==2){
    user_menu();
    display_details(accnumber);
    }
    else if(choice==3)
    exit(0);
    else
    system("pause");
}
int main()
{
	welcome();
    return 0;
}

