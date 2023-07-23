import pickle
import os
import pathlib

class Account :

   accNo = 0
   name = ""
   deposit=0
   type =""

   def createAccount(self):

       self.accNo= int(input("Enter the account no : "))
       self.name = input("Enter the account holder name : ")
       self.type = input("Enter the type of account [C/S] : ")
       self.deposit = int(input("Enter The Initial amount(>=500 for Saving and >=1000 for current)"))
       print("\n\nAccount Created")

   def showAccount(self):

       print("Account Number : ",self.accNo)
       print("Account Holder Name : ", self.name)
       print("Type of Account" ,self.type)
       print("Balance : ",self.deposit)

   def modifyAccount(self):

       print("Account Number : ",self.accNo)
       self.name = input("Modify Account Holder Name :")
       self.type = input("Modify type of Account :")
       self.deposit = int(input("Modify Balance :"))

   def depositAmount(self,amount):

       self.deposit += amount  

   def withdrawAmount(self,amount):

       self.deposit -= amount  

   def report(self):

       print(self.accNo, " ",self.name ," ",self.type," ", self.deposit)  

   def getAccountNo(self):

       return self.accNo

   def getAcccountHolderName(self):

       return self.name

   def getAccountType(self):

       return self.type

   def getDeposit(self):

       return self.deposit

def intro():

   print("\t\t\t\t**********************")
   print("\t\t\t\tBANK MANAGEMENT SYSTEM")
   print("\t\t\t\t**********************")
  


def displayAll():

   file = pathlib.Path("accounts.data")
   if file.exists ():

       infile = open('accounts.data','rb')
       mylist = pickle.load(infile)
       for item in mylist :

           print(item.accNo," ", item.name, " ",item.type, " ",item.deposit )

       infile.close()

   else :

       print("No records to display")

def displaySp(num):

   file = pathlib.Path("accounts.data")
   if file.exists ():

       infile = open('accounts.data','rb')

       mylist = pickle.load(infile)
       infile.close()
       found = False
       for item in mylist :

           if item.accNo == num :
               print("Your account Balance is = ",item.deposit)
               found = True
   else :

       print("No records to Search")

   if not found :

       print("No existing record with this number")

def depositAndWithdraw(num1,num2):

   file = pathlib.Path("accounts.data")
   if file.exists ():

       infile = open('accounts.data','rb')
       mylist = pickle.load(infile)
       infile.close()
       os.remove('accounts.data')
       for item in mylist :

           if item.accNo == num1 :

               if num2 == 1 :

                   amount = int(input("Enter the amount to deposit : "))
                   item.deposit += amount
                   print("Your account is updted")

               elif num2 == 2 :

                   amount = int(input("Enter the amount to withdraw : "))
                   if amount <= item.deposit :

                       item.deposit -=amount

                   else :

                       print("You cannot withdraw larger amount")              

   else :

       print("No records to Search")

   outfile = open('newaccounts.data','wb')
   pickle.dump(mylist, outfile)
   outfile.close()

   os.rename('newaccounts.data', 'accounts.data')  

def deleteAccount(num):

   file = pathlib.Path("accounts.data")
   if file.exists ():

       infile = open('accounts.data','rb')
       oldlist = pickle.load(infile)
       infile.close()
       newlist = []

       for item in oldlist :

           if item.accNo != num :

               newlist.append(item)

       os.remove('accounts.data')
       outfile = open('newaccounts.data','wb')
       pickle.dump(newlist, outfile)
       outfile.close()

       os.rename('newaccounts.data', 'accounts.data')  

def modifyAccount(num):

   file = pathlib.Path("accounts.data")

   if file.exists ():

       infile = open('accounts.data','rb')
       oldlist = pickle.load(infile)
       infile.close()

       os.remove('accounts.data')

       for item in oldlist :

           if item.accNo == num :

               item.name = input("Enter the account holder name : ")
               item.type = input("Enter the account Type : ")
               item.deposit = int(input("Enter the Amount : "))      

       outfile = open('newaccounts.data','wb')
       pickle.dump(oldlist, outfile)
       outfile.close()

       os.rename('newaccounts.data', 'accounts.data')

def writeAccountsFile(account) :  

   file = pathlib.Path("accounts.data")
   if file.exists ():

       infile = open('accounts.data','rb')
       oldlist = pickle.load(infile)
       oldlist.append(account)
       infile.close()

       os.remove('accounts.data')

   else :

       oldlist = [account]
   outfile = open('newaccounts.data','wb')
   pickle.dump(oldlist, outfile)
   outfile.close()

   os.rename('newaccounts.data', 'accounts.data')

def writeAccount():

    account = Account()
    account.createAccount()
    writeAccountsFile(account)
intro()
def menu():
    menu = ["MAIN MENU", "1. NEW ACCOUNT", "2. DEPOSIT AMOUNT", "3. WITHDRAW AMOUNT", "4. BALANCE ENQUIRY",
            "5. ALL ACCOUNT HOLDER LIST", "6. CLOSE AN ACCOUNT", "7. MODIFY AN ACCOUNT", "8. EXIT",
            "Select Your Option (1-8) "]
    for i in range(10):
        print("\t", menu[i])

def MainProgram():
    menu()
    ch = input()

    if ch == '1':

        writeAccount()
        let=input("Do you want to Exit? Press Y/y to exit or N/n to go to the main menu\t")
        if(let=='y' or let=='Y'):
            print("\tThanks for using bank management system")
            return 0
        else:
            return 1


    elif ch == '2':

        num = int(input("\tEnter The account No. : "))
        depositAndWithdraw(num, 1)
        let = input("Do you want to Exit? Press Y/y to exit or N/n to go to the main menu\t")
        if (let == 'y' or let == 'Y'):
            print("\tThanks for using bank management system")
            return 0
        else:
            return 1

    elif ch == '3':

        num = int(input("\tEnter The account No. : "))
        depositAndWithdraw(num, 2)
        let = input("Do you want to Exit? Press Y/y to exit or N/n to go to the main menu\t")
        if (let == 'y' or let == 'Y'):
            print("\tThanks for using bank management system")
            return 0
        else:
            return 1

    elif ch == '4':

        num = int(input("\tEnter The account No. : "))
        displaySp(num)
        let = input("Do you want to Exit? Press Y/y to exit or N/n to go to the main menu\t")
        if (let == 'y' or let == 'Y'):
            print("\tThanks for using bank management system")
            return 0
        else:
            return 1

    elif ch == '5':

        displayAll();
        let = input("Do you want to Exit? Press Y/y to exit or N/n to go to the main menu\t")
        if (let == 'y' or let == 'Y'):
            print("\tThanks for using bank management system")
            return 0
        else:
            os.system("cls")
            return 1

    elif ch == '6':

        num = int(input("\tEnter The account No. : "))
        deleteAccount(num)
        let = input("Do you want to Exit? Press Y/y to exit or N/n to go to the main menu\t")
        if (let == 'y' or let == 'Y'):
            print("\tThanks for using bank management system")
            return 0
        else:
            return 1

    elif ch == '7':

        num = int(input("\tEnter The account No. : "))
        modifyAccount(num)
        let = input("Do you want to Exit? Press Y/y to exit or N/n to go to the main menu\t")
        if (let == 'y' or let == 'Y'):
            print("\tThanks for using bank management system")
            return 0
        else:
            return 1

    elif ch == '8':

        let = input("Are you sure you want to Exit? Press Y/y to exit or N/n to go to the main menu\t")
        if (let == 'y' or let == 'Y'):
            print("\tThanks for using bank management system")
            return 0
        else:
            return 1

    else:
        print("Invalid choice")
        let = input("Do you want to Exit? Press Y/y to exit or N/n to go to the main menu\t")
        if (let == 'y' or let == 'Y'):
            print("\tThanks for using bank management system")
            return 0
        else:
            return 1


value=MainProgram()
while value==1:
    value=MainProgram()

