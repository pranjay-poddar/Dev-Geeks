import java.io.*;
import java.util.Scanner;
import java.util.Random;

public class Prescription {
    private static final String DATA_FILE = "prescription_data.txt";
    private static final String DATA_DELIMITER = "----------------------------------------";
    private static Patient patient;
    private static String prescription;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Welcome message
        System.out.println("Welcome to the Medical Prescription System");

        // Gather patient information
        System.out.print("Enter your first name: ");
        String firstName = scanner.nextLine();

        System.out.print("Enter your last name: ");
        String lastName = scanner.nextLine();

        System.out.print("Enter your age: ");
        int age = scanner.nextInt();

        scanner.nextLine(); // Consume the new line after entering age

        System.out.print("Enter your gender: ");
        String gender = scanner.nextLine();

        System.out.print("Enter your symptoms: ");
        String symptoms = scanner.nextLine();

        // Create a Patient object with the provided information
        patient = new Patient(firstName, lastName, age, gender);

        // Generate prescription
        PrescriptionGenerator prescriptionGenerator = new PrescriptionGenerator();
        prescription = prescriptionGenerator.generatePrescription(symptoms);

        // Save the patient information and prescription to the file
        savePatientData();

        // Display patient information and generated prescription
        System.out.println("\nPatient Information:\n" + patient);
        System.out.println("\nGenerated Prescription:\n" + prescription);

        // Search for previous records if the user wants to
        System.out.print("\nDo you want to search previous records by patient name? (yes/no): ");
        String searchChoice = scanner.nextLine();

        if (searchChoice.equalsIgnoreCase("yes")) {
            System.out.print("Enter the patient's first name: ");
            String searchFirstName = scanner.nextLine();

            System.out.print("Enter the patient's last name: ");
            String searchLastName = scanner.nextLine();

            searchPatientRecord(searchFirstName, searchLastName);
        }

        scanner.close();
    }

    private static void savePatientData() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(DATA_FILE, true))) {
            // Write patient information and prescription to the file with a delimiter
            writer.write("Patient Information:\n");
            writer.write(patient.toString());
            writer.write("\nGenerated Prescription:\n");
            writer.write(prescription);
            writer.write("\n" + DATA_DELIMITER + "\n");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void searchPatientRecord(String firstName, String lastName) {
        try (BufferedReader reader = new BufferedReader(new FileReader(DATA_FILE))) {
            String line;
            boolean found = false;
            StringBuilder patientRecord = new StringBuilder();

            // Search for patient records in the file using first name, last name, age, and gender
            while ((line = reader.readLine()) != null) {
                if (line.contains("Patient Information:") && line.contains(firstName) && line.contains(lastName)) {
                    // If found, add the patient record to the StringBuilder
                    found = true;
                    patientRecord.append(line).append("\n");
                    while ((line = reader.readLine()) != null) {
                        patientRecord.append(line).append("\n");
                        if (line.equals(DATA_DELIMITER)) break;
                    }
                }
            }

            // Display the patient record if found, otherwise, show a message that it's not found
            if (found) {
                System.out.println("\nPatient record found:\n" + patientRecord);
            } else {
                System.out.println("\nPatient record not found for the given name.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

class Patient {
    private String firstName;
    private String lastName;
    private int age;
    private String gender;

    public Patient(String firstName, String lastName, int age, String gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
    }

    // Getters and setters (omitted for brevity)

    @Override
    public String toString() {
        return "Name: " + firstName + " " + lastName +
                ", Age: " + age +
                ", Gender: " + gender;
    }
}

class PrescriptionGenerator {
    private static final String[] MEDICINES = {"Paracetamol", "Ibuprofen", "Antibiotic", "Cough Syrup", "Vitamin C"};
    private static final String[] DIRECTIONS = {"Take once daily", "Take twice daily", "Take after meals"};
    private static final Random RANDOM = new Random();

    public String generatePrescription(String symptoms) {
        // Generate a random prescription using medicine and direction arrays
        String medicine = MEDICINES[RANDOM.nextInt(MEDICINES.length)];
        String direction = DIRECTIONS[RANDOM.nextInt(DIRECTIONS.length)];

        return "Prescription: " + medicine + "\nDirections: " + direction + "\nSymptoms: " + symptoms;
    }
}
