# Blood Bank Management System

This is a Java-based command-line application that serves as a Blood Bank Management System. The application uses text files as a database to store the donor and blood bank details.

## Installation
To run the application, you need to have Java 8 or higher installed on your system. Clone the repository from GitHub.

```
git clone https://github.com/Piyush-Gambhir/Blood-Bank-Management-System.git
```

## Usage 
Upon running the application, you will be presented with a menu that allows you to choose from the following options:

1. Add Patient Record
2. Add Donor Record
3. Search and Get List of Donors With Entered Blood Group
4. Search and Get Patient With Entered Name
4. Get List of Patients With Blood Group Required And Admitted Date Sorted in Ascending Order
5. Get List of Donors in Asscending Order
6. Get List of Suitable Donors For a Patient
7. Get List of Patients that Requires the Entered Blood Group
8. Exit

You can select an option by entering the corresponding number and hitting enter. The application will guide you through the rest of the process.

### Add Patient Record<br>
To add a new patient record, you will be prompted to enter the patient's details, such as patient name, blood group, and admitted date. The details will be saved to a text file for later retrieval.

### Add Donor Record<br>
To add a new donor record, you will be prompted to enter the donor's details, such as donor name, blood group, and contact details. The details will be saved to a text file for later retrieval.

### Search and Get List of Donors With Entered Blood Group<br>
To search for all donors with a specific blood group, select option 3 from the menu. You will be prompted to enter the blood group. The application will search for all donor records with the entered blood group and display them on the screen.

### Search and Get Patient With Entered Name<br>
To search for a patient with a specific name, select option 4 from the menu. You will be prompted to enter the patient name. The application will search for the patient record with the entered name and display it on the screen.

### Get List of Patients With Blood Group Required And Admitted Date Sorted in Ascending Order<br>
To get a list of all patients with a specific blood group and sorted by admitted date in ascending order, select option 5 from the menu. You will be prompted to enter the blood group. The application will search for all patient records with the entered blood group, sort them by admitted date in ascending order, and display them on the screen.

### Get List of Donors in Asscending Order<br>
To get a list of all donors in ascending order, select option 6 from the menu. The application will read the donor records from the text file, sort them by name in ascending order, and display them on the screen.

### Get List of Suitable Donors For a Patient<br>
To get a list of all suitable donors for a specific patient, select option 7 from the menu. You will be prompted to enter the patient blood group. The application will search for all donor records with the same blood group as the patient and display them on the screen.

### Get List of Patients that Requires the Entered Blood Group<br>
To get a list of all patients that require a specific blood group, select option 8 from the menu. You will be prompted to enter the blood group. The application will search for all patient records with the entered blood group and display them on the screen.

### Exiting the application <br>
To exit the application, select option 9 from the menu. The application will terminate.

## Contributing
If you'd like to contribute to the project, you can fork the repository and make changes to the code. Once you're done, create a pull request and the changes will be reviewed by the project maintainers.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
