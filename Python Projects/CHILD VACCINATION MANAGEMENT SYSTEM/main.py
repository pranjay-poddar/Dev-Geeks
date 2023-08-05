import pickle
import os
import sys

# Function to add new vaccination records
def create_data():
    file = open("vaccine.dat", "ab")
    n = int(input("ENTER THE NUMBER OF CHILDREN TO BE VACCINATED: "))
    for i in range(n):
        print("ENTER THE DETAILS OF THE CHILD", i + 1)
        child_details = {}
        try:
            child_details["AADHAR NUMBER"] = int(input("Enter the Aadhar number: "))
            child_details["NAME"] = input("Enter name: ")
            child_details["AGE"] = int(input("Enter age: "))
        except ValueError:
            print("Invalid input for Aadhar number or age. Please try again.")
            file.close()
            return

        child_details["VACCINE TYPE"] = input("Enter vaccine type: ")
        pickle.dump(child_details, file)
    file.close()

# Function to display all vaccination records
def display():
    file = open("vaccine.dat", "rb")
    try:
        while True:
            child_details = pickle.load(file)
            print(child_details)
    except EOFError:
        pass
    file.close()

# Function to search for a vaccination record using Aadhar number
def search():
    file = open("vaccine.dat", "rb")
    aadhar_to_search = int(input("Enter Aadhar number to be searched: "))
    found = False
    try:
        while True:
            child_details = pickle.load(file)
            if child_details["AADHAR NUMBER"] == aadhar_to_search:
                found = True
                print("Record Found:")
                print(child_details)
                break
    except EOFError:
        pass
    file.close()
    if not found:
        print("No records found for the given Aadhar number.")

# Function to update a vaccination record
def update():
    aadhar_to_update = int(input("Enter the Aadhar number to be updated: "))
    file = open("vaccine.dat", "rb")
    temp_file = open("temp.dat", "ab")
    try:
        while True:
            child_details = pickle.load(file)
            if child_details["AADHAR NUMBER"] == aadhar_to_update:
                print("Enter new details:")
                child_details["AADHAR NUMBER"] = int(input("Enter the Aadhar number: "))
                child_details["NAME"] = input("Enter the name: ")
                child_details["AGE"] = int(input("Enter the age: "))
                child_details["VACCINE TYPE"] = input("Enter the vaccine type: ")
            pickle.dump(child_details, temp_file)
    except EOFError:
        pass
    file.close()
    temp_file.close()

    os.remove("vaccine.dat")
    os.rename("temp.dat", "vaccine.dat")
    print("Record updated successfully.")

# Function to delete a vaccination record
def delete():
    aadhar_to_delete = int(input("Enter the Aadhar number to be deleted: "))
    file = open("vaccine.dat", "rb")
    temp_file = open("temp.dat", "ab")
    deleted = False
    try:
        while True:
            child_details = pickle.load(file)
            if child_details["AADHAR NUMBER"] == aadhar_to_delete:
                deleted = True
            else:
                pickle.dump(child_details, temp_file)
    except EOFError:
        pass
    file.close()
    temp_file.close()

    if not deleted:
        os.remove("temp.dat")
        print("No records found for the given Aadhar number.")
    else:
        os.remove("vaccine.dat")
        os.rename("temp.dat", "vaccine.dat")
        print("Record deleted successfully.")

# Main program
while True:
    print("\nMENU:")
    print("1 - ADD NEW RECORD")
    print("2 - DISPLAY ALL RECORDS")
    print("3 - SEARCH BY AADHAR NUMBER")
    print("4 - UPDATE RECORD")
    print("5 - DELETE RECORD")
    print("6 - EXIT")
    
    try:
        choice = int(input("Enter your choice: "))
    except ValueError:
        print("Invalid input. Please enter a number.")
        continue

    if choice == 1:
        create_data()
    elif choice == 2:
        display()
    elif choice == 3:
        search()
    elif choice == 4:
        update()
    elif choice == 5:
        delete()
    elif choice == 6:
        print("HAVE A NICE DAY")
        sys.exit()
    else:
        print("Invalid choice. Please try again.")


