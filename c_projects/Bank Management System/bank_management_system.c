#include<stdio.h>
#include<stdlib.h>
#include<string.h>

int i,j;
int exit_main;
void menu();
void new_acc();
void edit();
void transact();
void see();
void erase();
void view_list();
void mainorexit();
void close();
float interest(float t,float amount,int rate);

struct date
{
    int day,month,year;

};
struct info
{
    int acc_no,age;
    char name[50];
    char address[70];
    char adhaar_no[20];
    char acc_type[10];
    float amt;
    double phone;
    struct date dob;
    struct date deposit;
    struct date withdraw;

} add,upd,transaction,check,rem;

int main()
{
    int i=0;
    char passw[10],password[10]="123";
    printf("\n\n\t\tEnter the password to login:");
    scanf("%s",passw);

    if(strcmp(passw,password)==0)
    {
        system("cls");
        menu();
    }
    else
    {
        printf("\n\n\tWrong password!!\a\n");

login_again:

        printf("\nEnter 1 to try again and 0 to exit:");
        scanf("%d",&exit_main);
        if(exit_main==1)
        {
            system("cls");
            main();
        }

        else if(exit_main==0)
        {
            system("cls");
            close();
        }
        else
        {
            printf("\a");
            system("cls");
            goto login_again;
        }

    }
    return 0;
}


void menu()
{
    int choice;
    system("cls");
    system("color 09");
    printf("\n\n\t\t\t\t BANK MANAGEMENT SYSTEM");
    printf("\n\n\n\t\t\t\tWELCOME TO THE MAIN MENU ");
    printf("\n\n\t\t\t1.Create new account\n\t\t\t2.Update information of existing account\n\t\t\t3.For transactions\n\t\t\t4.Check the details of existing account\n\t\t\t5.Removing existing account\n\t\t\t6.View customer's list\n\t\t\t7.Exit\n\n\n\n\n\t\t\tEnter your choice:");
    scanf("%d",&choice);
    system("cls");

    switch(choice)
    {
    case 1:
        new_acc();
        break;
    case 2:
        edit();
        break;
    case 3:
        transact();
        break;
    case 4:
        see();
        break;
    case 5:
        erase();
        break;
    case 6:
        view_list();
        break;
    case 7:
        close();
        break;

    }
    if(choice==0 || choice>7&&choice<999)
    {
        menu();
    }
}

void new_acc()
{
    int choice;
    FILE *ptr;
account_no:
    ptr=fopen("record.txt","a+");

    system("cls");                     //system("cls"); is used to clear command prompt screen
    printf("\t\t\t ADD RECORD  ");
    printf("\n\n\nEnter today's date(dd/mm/yyyy):");
    scanf("%d/%d/%d",&add.deposit.day,&add.deposit.month,&add.deposit.year);

    printf("\nEnter the account number:");
    scanf("%d",&check.acc_no);
    while(fscanf(ptr,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d\n",&add.acc_no,add.name,&add.dob.month,&add.dob.day,&add.dob.year,&add.age,add.address,add.adhaar_no,&add.phone,add.acc_type,&add.amt,&add.deposit.day,&add.deposit.month,&add.deposit.year)!=EOF)
    {
        if (check.acc_no==add.acc_no)
        {
            printf("Account no. already in use!");
            goto account_no;

        }
    }
    add.acc_no=check.acc_no;
    printf("\nEnter the name:");
    scanf("%s",add.name);
    printf("\nEnter the date of birth(mm/dd/yyyy):");
    scanf("%d/%d/%d",&add.dob.month,&add.dob.day,&add.dob.year);
    printf("\nEnter the age:");
    scanf("%d",&add.age);
    printf("\nEnter the address:");
    scanf("%s",add.address);
    printf("\nEnter the adhaar number:");
    scanf("%s",add.adhaar_no);
    printf("\nEnter the 10 digits of phone number: ");
    scanf("%lf",&add.phone);
    printf("\nEnter the amount to deposit in rupees:");
    scanf("%f",&add.amt);
    printf("\nType of account:\n\t#Saving\n\t#Current\n\t#Fixed1(for 1 year)\n\t#Fixed2(for 2 years)\n\t#Fixed3(for 3 years)\n\n\tEnter your choice:");
    scanf("%s",add.acc_type);

    fprintf(ptr,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d\n",add.acc_no,add.name,add.dob.month,add.dob.day,add.dob.year,add.age,add.address,add.adhaar_no,add.phone,add.acc_type,add.amt,add.deposit.day,add.deposit.month,add.deposit.year);


    fclose(ptr);
    printf("\nAccount created successfully!");

    mainorexit();

}

void edit()
{
    int choice,test=0;
    FILE *old,*newrec;
    old=fopen("record.txt","r");
    newrec=fopen("new.txt","w");

    printf("\nEnter the account no. of the customer whose info you want to change:");
    scanf("%d",&upd.acc_no);
    while(fscanf(old,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d",&add.acc_no,add.name,&add.dob.month,&add.dob.day,&add.dob.year,&add.age,add.address,add.adhaar_no,&add.phone,add.acc_type,&add.amt,&add.deposit.day,&add.deposit.month,&add.deposit.year)!=EOF)
    {
        if (add.acc_no==upd.acc_no)
        {
            test=1;
            printf("\nWhich information do you want to change?\n1.Address\n2.Phone\n\nEnter your choice(1 for address and 2 for phone):");
            scanf("%d",&choice);
            system("cls");
            if(choice==1)
            {
                printf("Current address is : %s",add.address);
                printf("\n\nEnter the new address:");
                scanf("%s",upd.address);
                fprintf(newrec,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d\n",add.acc_no,add.name,add.dob.month,add.dob.day,add.dob.year,add.age,upd.address,add.adhaar_no,add.phone,add.acc_type,add.amt,add.deposit.day,add.deposit.month,add.deposit.year);
                system("cls");
                printf("Current address is : %s\n\n",upd.address);
                printf("Changes saved!");
            }
            else if(choice==2)
            {
                printf("Current phone number is : %.0lf\n\n",add.phone);
                printf("Enter the new phone number:");
                scanf("%lf",&upd.phone);
                fprintf(newrec,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d\n",add.acc_no,add.name,add.dob.month,add.dob.day,add.dob.year,add.age,add.address,add.adhaar_no,upd.phone,add.acc_type,add.amt,add.deposit.day,add.deposit.month,add.deposit.year);
                system("cls");
                printf("Current phone number is : %.0lf\n\n",upd.phone);
                printf("Changes saved!");
            }

        }
        else
            {
                fprintf(newrec,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d\n",add.acc_no,add.name,add.dob.month,add.dob.day,add.dob.year,add.age,add.address,add.adhaar_no,add.phone,add.acc_type,add.amt,add.deposit.day,add.deposit.month,add.deposit.year);
            }
    }
    fclose(old);
    fclose(newrec);
    remove("record.txt");
    rename("new.txt","record.txt");

    if(test!=1)
    {
        system("cls");
        printf("\nRecord not found!!\a");
edit_invalidinput:
        printf("\nEnter 0 to try again,1 to return to main menu and 2 to exit:");
        scanf("%d",&exit_main);
        system("cls");
        if (exit_main==1)
           {
            menu();
           }
        else if (exit_main==2)
            {
                close();
            }
        else if(exit_main==0)
            {
             edit();
            }
        else
        {
            printf("\nInvalid!\a");
            goto edit_invalidinput;
        }
    }
    else
    {
        mainorexit();

    }
}

void transact()
{
    int choice,test=0;
    FILE *old,*newrec;
    old=fopen("record.txt","r");
    newrec=fopen("new.txt","w");

    printf("Enter the account no. of the customer:");
    scanf("%d",&transaction.acc_no);
    while (fscanf(old,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d",&add.acc_no,add.name,&add.dob.month,&add.dob.day,&add.dob.year,&add.age,add.address,add.adhaar_no,&add.phone,add.acc_type,&add.amt,&add.deposit.day,&add.deposit.month,&add.deposit.year)!=EOF)
    {

        if(add.acc_no==transaction.acc_no)
        {
            test=1;
            if(strcmpi(add.acc_type,"fixed1")==0||strcmpi(add.acc_type,"fixed2")==0||strcmpi(add.acc_type,"fixed3")==0)   //strcmpi is used to compare two strings but it is not case sensitve.
            {
                printf("\a\a\a\n\nYOU CANNOT DEPOSIT OR WITHDRAW CASH IN FIXED ACCOUNTS!!!!!");

                system("cls");
                menu();

            }
            printf("\n\nCurrent Balance is : %.2f",add.amt);
            printf("\n\nDo you want to\n1.Deposit\n2.Withdraw?\n\n");
            printf("Enter your choice(1 for deposit and 2 for withdraw:\n");
            scanf("%d",&choice);
            if (choice==1)
            {
                printf("Enter the amount you want to deposit in rupees: ");
                scanf("%f",&transaction.amt);
                add.amt+=transaction.amt;
                fprintf(newrec,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d\n",add.acc_no,add.name,add.dob.month,add.dob.day,add.dob.year,add.age,add.address,add.adhaar_no,add.phone,add.acc_type,add.amt,add.deposit.day,add.deposit.month,add.deposit.year);
                printf("\nCurrent Balance is : %.2f",add.amt);
                printf("\n\nDeposited successfully!");
            }
            else
            {
                printf("Enter the amount you want to withdraw in rupees: ");
                scanf("%f",&transaction.amt);
                add.amt-=transaction.amt;
                fprintf(newrec,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d\n",add.acc_no,add.name,add.dob.month,add.dob.day,add.dob.year,add.age,add.address,add.adhaar_no,add.phone,add.acc_type,add.amt,add.deposit.day,add.deposit.month,add.deposit.year);
                printf("\nCurrent Balance is : %.2f",add.amt);
                printf("\n\nWithdrawn successfully!");
            }
        }
        else
        {
            fprintf(newrec,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d\n",add.acc_no,add.name,add.dob.month,add.dob.day,add.dob.year,add.age,add.address,add.adhaar_no,add.phone,add.acc_type,add.amt,add.deposit.day,add.deposit.month,add.deposit.year);
        }
    }
    fclose(old);
    fclose(newrec);
    remove("record.txt");
    rename("new.txt","record.txt");
    if(test!=1)
    {
        printf("\n\nRecord not found!!");
transact_invalid:
        printf("\n\n\nEnter 0 to try again,1 to return to main menu and 2 to exit:");
        scanf("%d",&exit_main);
        system("cls");
        if (exit_main==0)
            transact();
        else if (exit_main==1)
            menu();
        else if (exit_main==2)
            close();
        else
        {
            printf("\nInvalid!");
            goto transact_invalid;
        }

    }
    else
    {
        mainorexit();

    }

}

void see()
{
    FILE *ptr;
    int test=0,rate;
    float time;
    float intrst;
    ptr=fopen("record.txt","r");

        printf("Enter the account number:");
        scanf("%d",&check.acc_no);

        while (fscanf(ptr,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d",&add.acc_no,add.name,&add.dob.month,&add.dob.day,&add.dob.year,&add.age,add.address,add.adhaar_no,&add.phone,add.acc_type,&add.amt,&add.deposit.day,&add.deposit.month,&add.deposit.year)!=EOF)
        {
            if(add.acc_no==check.acc_no)
            {
                system("cls");
                test=1;

                printf("\nAccount NO.:%d\nName:%s \nDOB:%d/%d/%d \nAge:%d \nAddress:%s \nAdhaar No:%s \nPhone number:%.0lf \nType Of Account:%s \nAmount deposited in rupees: %.2f \nDate Of Deposit:%d/%d/%d\n\n",add.acc_no,add.name,add.dob.month,add.dob.day,add.dob.year,add.age,add.address,add.adhaar_no,add.phone,
                       add.acc_type,add.amt,add.deposit.day,add.deposit.month,add.deposit.year);
                if(strcmpi(add.acc_type,"fixed1")==0)
                {
                    time=1.0;
                    rate=9;
                    intrst=interest(time,add.amt,rate);
                    printf("\n\nHe will get rupees%.2f as interest on %d/%d/%d",intrst,add.deposit.day,add.deposit.month,add.deposit.year+1);
                }
                else if(strcmpi(add.acc_type,"fixed2")==0)
                {
                    time=2.0;
                    rate=11;
                    intrst=interest(time,add.amt,rate);
                    printf("\n\nHe will get rupees %.2f as interest on %d/%d/%d",intrst,add.deposit.day,add.deposit.month,add.deposit.year+2);

                }
                else if(strcmpi(add.acc_type,"fixed3")==0)
                {
                    time=3.0;
                    rate=13;
                    intrst=interest(time,add.amt,rate);
                    printf("\n\nHe will get rupees .%.2f as interest on %d/%d/%d",intrst,add.deposit.day,add.deposit.month,add.deposit.year+3);

                }
                else if(strcmpi(add.acc_type,"saving")==0)
                {
                    time=(1.0/12.0);
                    rate=8;
                    intrst=interest(time,add.amt,rate);
                    printf("\n\nHe will get rupees %.2f as interest on %d of every month",intrst,add.deposit.month);

                }
                else if(strcmpi(add.acc_type,"current")==0)
                {

                    printf("\n\nHe will get no interest\a\a");

                }

        }
    }


    fclose(ptr);
    if(test!=1)
    {
        system("cls");
        printf("\nRecord not found!!\a\a\a");
see_invalid:
        printf("\nEnter 0 to try again,1 to return to main menu and 2 to exit:");
        scanf("%d",&exit_main);
        system("cls");
        if (exit_main==1)
            menu();
        else if (exit_main==2)
            close();
        else if(exit_main==0)
            see();
        else
        {
            system("cls");
            printf("\nInvalid!\a");
            goto see_invalid;
        }
    }
    else
    {
        printf("\nEnter 1 to go to the main menu and 0 to exit:");
        scanf("%d",&exit_main);
    }
    if (exit_main==1)
    {
        system("cls");
        menu();
    }

    else
    {

        system("cls");
        close();
    }

}

void erase()
{
    FILE *old,*newrec;
    int test=0;
    old=fopen("record.txt","r");
    newrec=fopen("new.txt","w");
    printf("Enter the account no. of the customer you want to delete:");
    scanf("%d",&rem.acc_no);
    while (fscanf(old,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d",&add.acc_no,add.name,&add.dob.month,&add.dob.day,&add.dob.year,&add.age,add.address,add.adhaar_no,&add.phone,add.acc_type,&add.amt,&add.deposit.day,&add.deposit.month,&add.deposit.year)!=EOF)
    {
        if(add.acc_no!=rem.acc_no)
            fprintf(newrec,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d\n",add.acc_no,add.name,add.dob.month,add.dob.day,add.dob.year,add.age,add.address,add.adhaar_no,add.phone,add.acc_type,add.amt,add.deposit.day,add.deposit.month,add.deposit.year);

        else
        {
            test++;
            printf("\nRecord deleted successfully!\n");
        }
    }
    fclose(old);
    fclose(newrec);
    remove("record.txt");
    rename("new.txt","record.txt");
    if(test==0)
    {
        printf("\nRecord not found!!\a\a\a");
erase_invalid:
        printf("\nEnter 0 to try again,1 to return to main menu and 2 to exit:");
        scanf("%d",&exit_main);

        if (exit_main==1)
            menu();
        else if (exit_main==2)
            close();
        else if(exit_main==0)
            erase();
        else
        {
            printf("\nInvalid!\a");
            goto erase_invalid;
        }
    }
    else
    {
        mainorexit();
    }

}

void view_list()
{
    FILE *view;
    view=fopen("record.txt","r");
    int test=0;
    system("cls");
    printf("\nACC. NO.\tNAME\t\t\tADDRESS\t\t\t\tPHONE\n");

    while(fscanf(view,"%d %s %d/%d/%d %d %s %s %lf %s %f %d/%d/%d",&add.acc_no,add.name,&add.dob.month,&add.dob.day,&add.dob.year,&add.age,add.address,add.adhaar_no,&add.phone,add.acc_type,&add.amt,&add.deposit.day,&add.deposit.month,&add.deposit.year)!=EOF)
    {
        printf("\n%6d\t %10s\t\t\t%20s\t\t%.0lf",add.acc_no,add.name,add.address,add.phone);
        test++;
    }

    fclose(view);
    if (test==0)
    {
        system("cls");
        printf("\nNO RECORDS FOUND!!\n");
    }

mainorexit();

}

void mainorexit()
{
    again:

    printf("\n\nEnter 1 to go to the main menu and 0 to exit:");
    scanf("%d",&exit_main);
    system("cls");

    if (exit_main==1)
        {
            menu();
        }
    else if(exit_main==0)
        {
            close();
        }
    else
    {
        printf("\n\t\tInvalid Input!\a");
        goto again;
    }
}

float interest(float t,float amount,int rate)
{
    float SI;
    SI=(amount*(float)rate*t)/100.0;                      //(P*R*T)/100
    return SI;

}

void close()
{
    printf("\n\n\n\n\t\tProgram closed successfully.");
}



