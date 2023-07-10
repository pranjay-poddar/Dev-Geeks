/* 

Problem Statement 

Blood Bank management System: The aim of the project is to retrieve, process and store information related to donors and patients. The system inputs the details of patients (name, age, disease, doctor, admitted date, blood group required) and details of donors (name, age, blood group, any disease). There is a menu which has following choices:
•	Adding record of patient
•	Adding record of donor
•	Search donor with existing blood group
•	Search patient with name
•	List of patients with blood group required and admitted date sorted in ascending order

Definition of Done:
1.	The donor is allotted to a patient only if both blood group matches. 
2.	Above choices have to be implemented using functions
3.	If the age of a donor is greater than 20, then only he is allowed to give blood otherwise display “invalid age”.
4.	While assigning donor to patient, retrieve the list of patients who require blood with particular group. If there are more than one patient, then the patient with least admitted date is allotted blood.

*/

// importing the required built-in librarires
import java.util.*;
import java.io.*;

// Custom Exception: InvalidInputException
class InvalidInputException extends Exception {
    public InvalidInputException() {
        System.out.println("\nError: Invalid Input.");
    }
}

// Custom Exception: MinimumAgeException
class MinimumAgeException extends Exception {
    public MinimumAgeException() {
        System.out.println("\nError: The Entered Age is Below Minimum Age.");
    }
}

// Custom Exception: RecordNotFoundException
class RecordNotFoundException extends Exception {
    public RecordNotFoundException() {
        System.out.println("\nError: Record Not Found.");
    }
}

// Patient Class
class patient {

    private String name; // patient age
    private int age; // patient age
    private String disease; // patient disease
    private String doctorName; // patient doctor's name
    private String dateAdmitted = "YYYY-MM-DD"; // patient admitted date
    private String bloodGroupRequired; // required blood group by the patient

    // Empty constructor for patient class.
    public patient() {

    }

    // Parameterized constructor for patient class.
    // This construct is used for creating patient record.
    public patient(String Name, int Age, String Disease, String DoctorName, String DateAdmitted,
            String BloodGroupRequired) {

        setName(Name);
        setAge(Age);
        setDisease(Disease);
        setDoctorName(DoctorName);
        setDateAdmitted(DateAdmitted);
        setBloodGroupRequired(BloodGroupRequired);

    }

    // Method setName()
    // This method is used to set patient name.
    public void setName(String Name) {
        this.name = Name;
    }

    // Method setAge()
    // This method is used to set patient age.
    public void setAge(int Age) {
        this.age = Age;
    }

    // Method setDisease()
    // This method is used to set patient disease.
    public void setDisease(String Disease) {
        this.disease = Disease;
    }

    // Method setDoctorName()
    // This method is used to set patient doctor name.
    public void setDoctorName(String DoctorName) {
        this.doctorName = DoctorName;
    }

    // Method setDateAdmitted()
    // This method is used to set patient date admitted.
    public void setDateAdmitted(String DateAdmitted) {
        this.dateAdmitted = DateAdmitted;
    }

    // Method setBloodGroup Required()
    // This method is used to set patient blood group.
    public void setBloodGroupRequired(String BloodGroupRequired) {
        this.bloodGroupRequired = BloodGroupRequired;
    }

    // Method getName()
    // This method is used to fetch patient name.
    public String getName() {
        return this.name;
    }

    // Method getAge()
    // This method is used to fetch patient age.
    public int getAge() {
        return this.age;
    }

    // Method getDisease()
    // This method is used to fetch patient disease.
    public String getDisease() {
        return this.disease;
    }

    // Method getDoctorName()
    // This method is used to fetch patient doctor name.
    public String getDoctorName() {
        return this.doctorName;
    }

    // Method getDateAdmitted()
    // This method is used to fetch patient date admitted.
    public String getDateAdmitted() {
        return this.dateAdmitted;
    }

    // Method getBloodGroup()
    // This method is used to fetch patient blood group.
    public String getBloodGroupRequired() {
        return this.bloodGroupRequired;
    }

    // Method display()
    // This method displays patient record in structured view.
    public void display() {
        System.out.println("""
                -------------------
                Patient Details
                -------------------
                """);

        System.out.println("Name                        :      " + this.name);
        System.out.println("Age                         :      " + this.age);
        System.out.println("Disease                     :      " + this.disease);
        System.out.println("Doctor Name                 :      " + this.doctorName);
        System.out.println("Date Admitted (YYYY-MM-DD)  :      " + this.dateAdmitted);
        System.out.println("Blood Group Required        :      " + this.bloodGroupRequired);
    }

    // Method addPatientRecord()
    // This method takes patient details such as name, age, disesase, doctor
    // name,date admitted, blood group as input and create a record for donor.
    public void addPatientRecord() {
        Scanner sc = new Scanner(System.in);

        Boolean moreRecord = true;

        // A infinite while loop to take patient record as input from the user until
        // user wants to.
        while (moreRecord == true) {
            try {
                System.out.println(
                        """

                                ----------------------------------------------------------------------------------------------------
                                ------------------------
                                Enter Patient Details
                                ------------------------
                                """);

                System.out.print("Name                       :      ");
                String name = sc.nextLine();

                System.out.print("Age                        :      ");
                String age = sc.nextLine();

                System.out.print("Disease                    :      ");
                String disease = sc.nextLine();

                System.out.print("Doctor Name                :      ");
                String DoctorName = sc.nextLine();

                System.out.print("Date Admitted (YYYY-MM-DD) :      ");
                String DateAdmitted = sc.nextLine();

                System.out.print("Blood Group Required       :      ");
                String BloodGroupRequired = sc.nextLine();

                patient patient = new patient(name, Integer.parseInt(age), disease, DoctorName, DateAdmitted,
                        BloodGroupRequired);

                try {
                    patient.addPatientRecordToFile();
                    patient.display();
                    System.out.println("Patient Record Added Succesfully.");

                    System.out.println("\n");

                    System.out.println("Do You Want to Add Another Patient Record?");
                    System.out.print("Enter Y or N: ");
                }

                catch (Exception e) {
                    System.out.println("Error: " + e);
                }
            }

            catch (Exception e) {
                System.out.println("Error: " + e);
            }

            try {
                String user_input = sc.nextLine();
                if (user_input.equalsIgnoreCase("N")) {
                    moreRecord = false;
                }

                else if (user_input.equalsIgnoreCase("Y")) {
                    continue;
                }

                else {
                    throw new InvalidInputException();
                }
            }

            catch (InvalidInputException e) {
                System.out.println("Error: " + e);
            }
        }
    }

    // Method addPatientRecordToFile
    // This method appends the patient record to the file "patient_record.txt" text
    // file.
    public void addPatientRecordToFile() throws IOException {

        String outputText = this.getName() + "|" + this.getAge() + "|" + this.getDisease() + "|"
                + this.getDoctorName() + "|" + this.getDateAdmitted() + "|" + this.getBloodGroupRequired();

        File patientRecords = new File("patientRecords.txt");
        if (patientRecords.exists()) {
            FileWriter fileWriter = new FileWriter(patientRecords, true);
            PrintWriter printWriter = new PrintWriter(fileWriter);

            printWriter.println(outputText);
            printWriter.close();
        }

        else {
            FileWriter fileWriter = new FileWriter(patientRecords);
            PrintWriter printWriter = new PrintWriter(fileWriter);

            printWriter.println(outputText);
            printWriter.close();
        }
    }

    // Method getRecordFromFile()
    // This method fetch the patient records from the file "patient_records.txt" and
    // add them to an ArrayList patient_records
    public ArrayList<patient> getPatientRecordFromFile() throws FileNotFoundException {
        File patientRecords = new File("patientRecords.txt");
        Scanner sc = new Scanner(patientRecords);

        ArrayList<patient> patientList = new ArrayList<patient>();

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            String[] detail = line.split("\\|");
            patient patient = new patient(detail[0], Integer.parseInt(detail[1]), detail[2], detail[3], detail[4],
                    detail[5]);
            patientList.add(patient);
        }
        return patientList;
    }

    // Method searchPatientWithName()
    // This method takes name as input and then search for patient record with the
    // enetered name and then displays the record if found.
    public void searchPatientWithName() {
        Scanner sc = new Scanner(System.in);

        patient patientDriver = new patient();

        ArrayList<patient> patientList = new ArrayList<patient>();

        try {
            patientList = patientDriver.getPatientRecordFromFile();
        }

        catch (Exception e) {
            System.out.println("Error: " + e);
        }

        System.out.println("""

                ----------------------------------------------------------------------------------------------------

                -----------------------------
                Search Patient With Name
                -----------------------------
                """);

        System.out.print("Enter Patient Name: ");
        String patientName = sc.nextLine();

        System.out.println("\n");
        try {
            int patientFound = 0;
            for (int i = 0; i <= patientList.size() - 1; i++) {
                if (patientList.get(i).getName().equalsIgnoreCase(patientName)) {
                    patientFound++;
                    patientList.get(i).display();
                    System.out.print(
                            "--------------------------------------------------------\n\n");
                }
            }
            if (patientFound == 0) {
                throw new RecordNotFoundException();
            }
        }

        catch (RecordNotFoundException RNFE) {

        }

        catch (Exception e) {
            System.out.println("Error: " + e);
        }
    }

    // Method getpatientListAscendingOrder()
    // This method sort the records in asscending order and the display all the
    // records.
    public void getpatientListAscendingOrder() {
        Scanner sc = new Scanner(System.in);

        patient patientDriver = new patient();

        ArrayList<patient> patientList = new ArrayList<patient>();
        try {
            patientList = patientDriver.getPatientRecordFromFile();
        } catch (Exception e) {
            System.out.println("Error:" + e);
        }

        System.out.println("""


                ----------------------------------------------------------------------------------------------------

                -------------------------------------------------------------------------------------------
                List of Patients With Blood Group Required And Admitted Date Sorted in Ascending Order
                -------------------------------------------------------------------------------------------
                """);

        try {
            for (int i = 0; i <= patientList.size() - 1; i++) {
                int minimum_index = i;
                for (int j = i + 1; j <= patientList.size() - 1; j++) {
                    if (patientList.get(j).getName().compareTo(patientList.get(minimum_index).getName()) < 0) {
                        minimum_index = j;
                        patient temp = patientList.get(minimum_index);
                        Collections.swap(patientList, minimum_index, i);
                        patientList.set(i, temp);
                    }
                }
            }

            for (int i = 0; i <= patientList.size() - 1; i++) {

                System.out.println("Name                      :      " + patientList.get(i).getName());
                System.out.println("Blood Group Required      :      " + patientList.get(i).getBloodGroupRequired());
                System.out.println("Date Admitted             :      " + patientList.get(i).getDateAdmitted());
                System.out.println(
                        "--------------------------------------------------------\n");

            }

        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
    }

    // Method getSuitableDonors()
    // This method displays a list of suitable donors for the entered patient.
    public void getSuitableDonors() {
        Scanner sc = new Scanner(System.in);

        patient patientDriver = new patient();

        ArrayList<patient> patientList = new ArrayList<patient>();
        try {
            patientList = patientDriver.getPatientRecordFromFile();

        } catch (Exception e) {
            System.out.println("Error: " + e);
        }

        donor donorDriver = new donor();

        ArrayList<donor> donorList = new ArrayList<donor>();
        try {
            donorList = donorDriver.getDonorRecordFromFile();

        } catch (Exception e) {
            System.out.println(e);
        }

        System.out.println("""

                ----------------------------------------------------------------------------------------------------

                ----------------------------------------------
                Get List of Suitable Donors For a Patient
                ----------------------------------------------
                """);

        System.out.print("Enter Patient Name: ");
        String patientName = sc.nextLine();

        try {
            int patientFound = 0;
            int donorFound = 0;

            int recordNumber = 0;

            for (int i = 0; i <= patientList.size() - 1; i++) {
                if (patientList.get(i).getName().equalsIgnoreCase(patientName)) {
                    patientFound++;
                    recordNumber = i;
                    break;
                }
            }
            if (patientFound == 0) {
                throw new RecordNotFoundException();
            }

            for (int j = 0; j <= donorList.size() - 1; j++) {
                if (patientList.get(recordNumber).getBloodGroupRequired()
                        .equalsIgnoreCase(donorList.get(j).getBloodGroup())) {
                    donorFound++;

                    System.out.println(
                            "--------------------------------------------------------\n\n");
                    donorList.get(j).display();
                }
            }
            if (donorFound == 0) {
                System.out.println("No Patient Found With Required Blood Group.");
            }
        }

        catch (RecordNotFoundException RNFE) {

        }

        catch (Exception e) {
            System.out.println("Error: " + e);
        }
    }

    // Method getPatientsRequireEnteredBloodGroup()
    // This method displays a list of patients that require the enetred blood group.
    public void getPatientsRequireEnteredBloodGroup() {
        Scanner sc = new Scanner(System.in);

        patient patientDriver = new patient();

        ArrayList<patient> patientList = new ArrayList<patient>();
        try {
            patientList = patientDriver.getPatientRecordFromFile();

        } catch (Exception e) {
            System.out.println("Error: " + e);
        }

        System.out.println("""
                ----------------------------------------------------------------------------------------------------

                --------------------------------------------------------------
                Get List of Patients That Require the Entered Blood Group
                --------------------------------------------------------------
                """);

        System.out.print("Enter Blood Group: ");
        String patientBloodGroupRequired = sc.nextLine();

        try {

            int patientFound = 0;
            for (int i = 0; i <= patientList.size() - 1; i++) {
                if (patientList.get(i).getBloodGroupRequired().equalsIgnoreCase(patientBloodGroupRequired)) {
                    patientFound++;
                    System.out.println(
                            "--------------------------------------------------------\n");
                    patientList.get(i).display();
                }
            }
            if (patientFound == 0) {
                throw new RecordNotFoundException();
            }
        }

        catch (RecordNotFoundException RNFE) {

        }
    }
}

// Donor Class

class donor {

    private String name; // Donor Name
    private int age; // Donor Age
    private String anyDisease; // Donor Suffering From Any Disease
    private String bloodGroup; // Donor Blood Group

    // Empty constructor for Donor class.
    public donor() {

    }

    // Parameterized constructor for Donor Class
    // This constructor is used for creating donor records.
    public donor(String Name, int Age, String AnyDisease, String BloodGroup) {
        setName(Name);
        setAge(Age);
        setAnyDisease(AnyDisease);
        setBloodGroup(BloodGroup);
    }

    // Method setName()
    // This method is used to set donor name.
    public void setName(String Name) {
        this.name = Name;
    }

    // Method setAge()
    // This method is used to set donor age.
    public void setAge(int Age) {
        this.age = Age;
    }

    // Method setAnyDisease()
    // This method is used to set donor suffering from any disease.
    public void setAnyDisease(String AnyDisease) {
        this.anyDisease = AnyDisease;
    }

    // Method setBloodGroup()
    // This method is used to set donor Blood.
    public void setBloodGroup(String BloodGroup) {
        this.bloodGroup = BloodGroup;
    }

    // Method getName()
    // This method is used to fetch donor name.
    public String getName() {
        return this.name;
    }

    // Method getAge()
    // This method is used to fetch donor age.
    public int getAge() {
        return this.age;
    }

    // Method getAnyDisease()
    // This method is used to fetch donor suffering any_disease.
    public String getAnyDisease() {
        return this.anyDisease;
    }

    // Method getBloodGroup()
    // This method is used to fetch donor blood group.
    public String getBloodGroup() {
        return this.bloodGroup;
    }

    // Method Display()
    // This method displays donor record in structured view.
    public void display() {
        System.out.println("""
                -------------------
                Donor Details
                -------------------
                """);

        System.out.println("Name           :    " + this.name);
        System.out.println("Age            :    " + this.age);
        System.out.println("Any Disease    :    " + this.anyDisease);
        System.out.println("Blood Group    :    " + this.bloodGroup);

    }

    // Method addDonorRecord()
    // This function takes donor details such as name, age, any disesase, blood
    // group as input and create a record for donor.
    public void addDonorRecord() {
        Scanner sc = new Scanner(System.in);
        Boolean moreRecord = true;
        while (moreRecord == true) {
            try {
                System.out.println(
                        """

                                ----------------------------------------------------------------------------------------------------

                                ------------------------
                                Enter Donor Details
                                ------------------------
                                """);

                System.out.print("Name          :    ");
                String name = sc.nextLine();

                System.out.print("Age           :    ");
                String age = sc.nextLine();

                if (Integer.parseInt(age) < 20) {
                    throw new MinimumAgeException();
                }

                System.out.print("Any Disease   :   ");
                String AnyDisease = sc.nextLine();

                System.out.print("Blood Group   :   ");
                String BloodGroup = sc.nextLine();

                donor donor = new donor(name, Integer.parseInt(age), AnyDisease, BloodGroup);
                donor.display();
                System.out.println("Donor Record Added Succesfully.");

                try {
                    donor.addDonorRecordToFile();
                }

                catch (Exception e) {
                    System.out.println("Error: " + e);
                }
            }

            catch (MinimumAgeException MAE) {

            }

            catch (Exception e) {
                System.out.println("Error: " + e);
            }

            System.out.println("\n");

            System.out.println("Do You Want to Add Another donor Record?");
            System.out.print("Enter Y or N: ");

            try {
                String user_input = sc.nextLine();
                if (user_input.equalsIgnoreCase("N")) {
                    moreRecord = false;
                }

                else if (user_input.equalsIgnoreCase("Y")) {
                    continue;
                }

                else {
                    throw new InvalidInputException();
                }
            } catch (InvalidInputException IIE) {

            }

            catch (Exception e) {
                System.out.println("Error: " + e);
            }
        }

    }

    // Method addDonorRecordToFile()
    // This method appends the donor record to the file "donorRecords.txt" text
    // file.
    public void addDonorRecordToFile() throws IOException {
        String outputText = this.getName() + "|" + this.getAge() + "|" + this.getAnyDisease() + "|"
                + this.getBloodGroup();

        File donorRecords = new File("donorRecords.txt");

        if (donorRecords.exists()) {

            FileWriter fileWriter = new FileWriter(donorRecords, true);

            PrintWriter printWriter = new PrintWriter(fileWriter);

            printWriter.println(outputText);
            printWriter.close();
        }

        else {
            FileWriter fileWriter = new FileWriter(donorRecords);

            PrintWriter printWriter = new PrintWriter(fileWriter);

            printWriter.println(outputText);
            printWriter.close();
        }
    }

    // Method getDonorRecordFromFile()
    // This method fetch the donor records from the file "donor_records.txt" and
    // add them to an ArrayList donor_records
    public ArrayList<donor> getDonorRecordFromFile() throws FileNotFoundException {
        File donorRecords = new File("donorRecords.txt");
        Scanner sc = new Scanner(donorRecords);

        ArrayList<donor> donorList = new ArrayList<donor>();

        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            String[] detail = line.split("\\|");
            donor donor = new donor(detail[0], Integer.parseInt(detail[1]), detail[2], detail[3]);
            donorList.add(donor);

        }
        return donorList;
    }

    // Method searchDonorWithBloodGroup
    // This function takes blood group as input and then search for donors with the
    // enetered blood group.
    public void searchDonorWithBloodGroup() {
        Scanner sc = new Scanner(System.in);

        donor donorDriver = new donor();

        ArrayList<donor> donorList = new ArrayList<donor>();
        try {
            donorList = donorDriver.getDonorRecordFromFile();

        } catch (Exception e) {
            System.out.println("Error: " + e);
        }

        System.out.println("""

                ----------------------------------------------------------------------------------------------------

                ----------------------------------
                Search Donor With Blood Group
                ----------------------------------
                """);

        System.out.print("Enter Blood Group: ");
        String donorBloodGroup = sc.nextLine();

        try {
            int donorFound = 0;
            for (int i = 0; i <= donorList.size() - 1; i++)
                if (donorList.get(i).getBloodGroup().equals(donorBloodGroup)) {
                    donorFound++;
                    donorList.get(i).display();
                    System.out.println(
                            "--------------------------------------------------------\n");
                }

            if (donorFound == 0) {
                throw new RecordNotFoundException();
            }
        }

        catch (RecordNotFoundException RNFE) {
        }
    }

    // Method getDonorListAscendingOrder()
    // This method sort the records in asscending order and the display all the
    // records.
    public void getDonorListAscendingOrder() {
        Scanner sc = new Scanner(System.in);

        donor donorDriver = new donor();

        ArrayList<donor> donorList = new ArrayList<donor>();

        try {
            donorList = donorDriver.getDonorRecordFromFile();
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }

        System.out.println("""

                ----------------------------------------------------------------------------------------------------

                --------------------------------------
                List of Donors in Ascending Order
                --------------------------------------
                """);

        try {
            for (int i = 0; i <= donorList.size() - 1; i++) {
                int minimumIndex = i;
                for (int j = i + 1; j <= donorList.size() - 1; j++) {
                    if (donorList.get(j).getName().compareTo(donorList.get(minimumIndex).getName()) < 0) {
                        minimumIndex = j;
                        donor temp = donorList.get(minimumIndex);
                        Collections.swap(donorList, minimumIndex, i);
                        donorList.set(i, temp);
                    }
                }
            }

            for (int i = 0; i <= donorList.size() - 1; i++) {

                System.out.println("Name            :    " + donorList.get(i).getName());
                System.out.println("Age             :    " + donorList.get(i).getAge());
                System.out.println("Blood Group     :    " + donorList.get(i).getBloodGroup());
                System.out.println("Any Disease     :    " + donorList.get(i).getAnyDisease());
                System.out.println(
                        "--------------------------------------------------------\n");

            }

        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
    }
}

// Main Class
// Class bloodBank
public class bloodBank {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        patient patientDriver = new patient(); // Patient object patientDriver to call Patient class methods.
        donor donorDriver = new donor(); // Donor object donorDriver to call Donor class methods.

        Boolean runAgain = true;

        // An infinite while loop to run the driver menu until user wants to exit.
        while (runAgain == true) {

            /*
             * Driver Menu
             */

            System.out.println("""

                    ----------------------------------------------------------------------------------------------------

                    -----------------------------------------
                    -Welcome To Blood Bank Management System-
                    -----------------------------------------
                                        """);
            System.out.println("""
                    1. Add Patient Record.
                    2. Add Donor Record.
                    3. Search and Get List of Donors With Entered Blood Group.
                    4. Search and Get Patient With Entered Name.
                    5. Get List of Patients With Blood Group Required And Admitted Date Sorted in Ascending Order.
                    6. Get List of Donors in Asscending Order.
                    7. Get List of Suitable Donors For a Patient
                    8. Get List of Patients that Requires the Entered Blood Group.
                    9. Exit.

                    Enter the Number To Choose an Option.
                    """);

            try {
                System.out.print("Enter Your Choice: ");
                int user_choice = sc.nextInt();

                // Using switch case to run the menu
                switch (user_choice) {

                    case 1: // Add patient Record
                        patientDriver.addPatientRecord();
                        break;

                    case 2: // Add Donor Record
                        donorDriver.addDonorRecord();
                        break;

                    case 3: // Search Donor With Blood Group
                        donorDriver.searchDonorWithBloodGroup();
                        break;

                    case 4: // Search Patient With Name
                        patientDriver.searchPatientWithName();
                        break;

                    case 5: // Get List of Patients With Blood Group Required And Admitted Date Sorted in
                            // Asscending Order
                        patientDriver.getpatientListAscendingOrder();
                        break;

                    case 6: // Get List of of Donors Sorted in Asscending Order
                        donorDriver.getDonorListAscendingOrder();
                        break;

                    case 7: // Get List of Suitable Donors For a Patient
                        patientDriver.getSuitableDonors();
                        break;

                    case 8: // Get List of Patients That Requires the Entered Blood Group
                        patientDriver.getPatientsRequireEnteredBloodGroup();
                        break;

                    case 9: // Exit The Program
                        runAgain = false;
                        break;

                    default: // In Case of Invalid Input
                        System.out.println("Invalid Input! Enter a Valid Input.");
                        System.out.println("Try Again.");
                        break;
                }
            }

            catch (Exception e) {
                System.out.println("Error: " + e);
            }
        }
    }
}