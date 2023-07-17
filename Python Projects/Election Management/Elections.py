# STATE ELECTIONS

print("-"*195)
print("***   WELCOME TO STATE ELECTIONS   ***".center(190))
print("-"*195)     

import mysql.connector


# General rules by Election Commission of India

print("-"*195)
print("***   THE MODEL CODE OF CONDUCT   ***".center(195))
rules =input("1. No party or candidate shall include in any activity which may aggravate existing differences or create mutual hatred or cause tension between different castes and communities,"
             "   religious or linguistic.\n2. Criticism of other political parties, when made, shall be confined to their policies and programme, past record and work."
             "   Parties and Candidates shall refrain from criticism of all aspects of private life, not connected with the public activities of the leaders or workers of other parties.\n3.There"
             "   shall be no appeal to caste or communal feelings for securing votes. Mosques, Churches, Temples or other places of worship shall not be used as forum for election propaganda.\n4."
             "   All parties and candidates shall avoid scrupulously all activities which are “corrupt practices” and offences under the election law, such as bribing of voters, intimidation"
             "   of voters, impersonation of voters, canvassing within 100 meters of polling stations, holding public meetings during the period of 48 hours ending with the hour fixed for the"
             "   close of the poll, and the transport and conveyance of voters to and from polling station.")
                          
             
print(rules)
print("-"*195)


# PREAMBLE

print("-"*195)
print("THE CONSTITUTION OF INDIA".center(190))
print("PREAMBLE".center(190))
print(" WE, THE PEOPLE OF INDIA, having\nsolemnly resolved to constitute India into a\nSOVEREIGN, SOCIALIST, SECULAR, DEMOCRATIC, REPUBLIC\nand to secure to all its citizens:\nJUSTICE,"
      " social, economic and political;\nLIBERTY of thought, expression, belief, faith and worship;\nEQUALITY of status and of opportunity and to promote among them all;\nFRATERNITY"
      " assuring the dignity of the individual and the unity and integrity of the Nation;\n IN OUR CONSTITUENT ASSEMBLY\nthis twenty-sixth day of November, 1949 do\nHEREBY ADOPT, ENACT"
      " AND GIVE TO\n OURSELVES THIS CONSTITUTION.")
print("-"*195)

mydb=mysql.connector.connect (user="root",
                              passwd="tiger",
                              host="localhost",
                              database="ELECTION_MANAGEMENT_SYSTEM"
                              )


mycursor=mydb.cursor(buffered=True)


# Created Database ELECTION_MANAGEMENT_SYSTEM
# mycursor.execute (" Create database ELECTION_MANAGEMENT_SYSTEM ")


def Menu():                     # Function to display menu
    print("*"*195)
    print("MAIN MENU".center(190))
    print("1. Insert Record/Records".center(190))
    print("2. Display records as per Candidate Number".center(190))
    print("   a. Sorted as per Candidate Number".center(190))
    print("   b. Sorted as per Candidate Name".center(190))
    print("   c. Sorted as per Election State".center(190))
    print("3. Search Record Details as per the Candidate Number".center(190))
    print("4. Update Record".center(190))
    print("5. Delete Record".center(190))
    print("6. Exit".center(190))
    print("*"*195)


def MenuSort():
    print("   a. Sorted as per Candidate Number".center(190))
    print("   b. Sorted as per Candidate Name".center(190))
    print("   c. Sorted as per Election State".center(190))
    print("   d. Back".center(190))


def Create():
    try:
        mycursor.execute("CREATE TABLE PROJECT (CANDIDATENO INT(1), NAME VARCHAR(20),MOBILE VARCHAR(10), SYMBOL VARCHAR(15), STATE VARCHAR(15), VOTES INT(3))")
        print("Table Created")
        Insert()
    except:
        print("Table Exist")
        Insert()
        
 
def Insert():               # Function to insert records as per ascending order of Candidate Registration Number.
    CANDIDATENO=int(input("Enter the candidate number:"))
    NAME=input("Enter the name of the candidate:")
    MOBILE=int(input("Enter the candidate's mobile number:"))
    SYMBOL=input("Enter the candidate's party symbol:")
    STATE=input("Enter the candidate's state of electing:")
    VOTES=int(input("Enter the candidate's number of votes:"))
    sqlf="insert into PROJECT(CANDIDATENO,NAME,MOBILE,SYMBOL,STATE,VOTES)values(%s,%s,%s,%s,%s,%s)"
    s=CANDIDATENO,NAME,MOBILE,SYMBOL,STATE,VOTES
    mycursor.execute(sqlf,s)
    print("Record inserted successfully")
    mydb.commit()
    


    
def DispSortCandNo():           # Function to Display records as per ascending order of Candidate Registration Number.
    try:
        cmd = "SELECT * FROM PROJECT ORDER BY CANDIDATENO"
        mycursor.execute(cmd)
        F = "%15s %15s %15s %15s %15s %15s "
        print("="*195)
        print(F % ("CANDIDATENO", "NAME", "MOBILE", "SYMBOL", "STATE VARCHAR", "VOTES"))
        print("="*195)
        for i in mycursor:
            for j in i:
                print("%14s" % j, end=" ")
            print()
        print("="*195)
    except:
        print("Table does not exist!!")

def DispSortName():           # Function to Display records as per ascending order of Candidate Registration Number.
    try:
        cmd = "SELECT * FROM PROJECT ORDER BY NAME"
        mycursor.execute(cmd)
        F = "%15s %15s %15s %15s %15s %15s  "
        print("="*195)
        print(F % ("CANDIDATENO", "NAME", "MOBILE", "SYMBOL", "STATE VARCHAR", "VOTES"))
        print("="*195)
        for i in mycursor:
            for j in i:
                print("%14s" % j, end=" ")
            print()
        print("="*195)
    except:
        print("Table does not exist!!")

def DispSortVotes():        # Function to Display records as per ascending order of Candidate Registration Number.
    try:
        cmd = "SELECT * FROM PROJECT ORDER BY VOTES"
        mycursor.execute(cmd)
        F = "%15s %15s %15s %15s %15s %15s "
        print("="*195)
        print(F % ("CANDIDATENO", "NAME", "MOBILE", "SYMBOL", "STATE VARCHAR", "VOTES"))
        print("="*195)
        for i in mycursor:
            for j in i:
                print("%14s" % j, end=" ")
            print()
        print("="*195)
    except:
        print("Table does not exist!!")




def DispSearchCandNo(CANDIDATENO):           # Function to Search for the Record from the file with respect to Candidate Registration Number.
    mycursor.execute(" SELECT * FROM PROJECT WHERE CANDIDATENO="+str(CANDIDATENO) )
    for data in mycursor:
        print(data)
    print("Press enter to continue..")
    


def Update():               # Function to change the details of the candidate.
    mycursor=mydb.cursor()
    CANDIDATENO=int(input("Enter the candidate number:"))
    NAME=input("Enter name:")
    query="UPDATE PROJECT SET NAME=%s WHERE CANDIDATENO=%s"
    val=(NAME,CANDIDATENO)
    mycursor.execute(query,val)
    mydb.commit()
    print("Record updated Successfully!!")
   
                              
    
def Delete():         # Function to delete the details of the candidate.
    mycursor=mydb.cursor()
    CANDIDATENO=int(input("Enter the candidate number:"))
    query="DELETE FROM PROJECT WHERE CANDIDATENO =%s"
    val=(CANDIDATENO,)
    mycursor.execute(query,val)
    mydb.commit()
    print("Record Deleted Successfully!!")


while True:
    Menu()
    ch=input("Enter your choice:")
    if ch=="1":
        Create()
    elif ch=="2":
        MenuSort()
        ch1=input("Enter choice a/b/c/d:")
        if ch1 in ["a","A"]:
            DispSortCandNo()
        elif ch1 in ["b","B"]:
            DispSortName()
        elif ch1 in ["c","C"]:
            DispSortVotes()
        elif ch1 in ["d","D"]:
            print("Back to the main menu")
        else:
            print("Invalid choice!!")
    
    elif ch=="3":
        CANDIDATENO=int(input("Enter candidate number to get the details:"))
        DispSearchCandNo(CANDIDATENO)
    elif ch=="4":
        Update()
    elif ch=="5":
        Delete()
    elif ch=="6":
        print("Exitting...")
        break
    else:
        print("Wrong choice entered")


# PROJECT ENDS HERE