import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class ContactBook {
    private static final String CONTACTS_FILE = "contacts.txt";
    private static Map<String, String> contacts = new HashMap<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        loadContactsFromFile();

        boolean isRunning = true;
        while (isRunning) {
            // Display the main menu options
            System.out.println("Contact Book");
            System.out.println("1. Add Contact");
            System.out.println("2. View All Contacts");
            System.out.println("3. Search Contact");
            System.out.println("4. Update Contact");
            System.out.println("5. Delete Contact");
            System.out.println("6. Save Contacts");
            System.out.println("7. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume the newline character after reading the integer input

            switch (choice) {
                case 1:
                    addContact();
                    break;
                case 2:
                    viewAllContacts();
                    break;
                case 3:
                    searchContact();
                    break;
                case 4:
                    updateContact();
                    break;
                case 5:
                    deleteContact();
                    break;
                case 6:
                    saveContactsToFile();
                    break;
                case 7:
                    System.out.println("Exiting the Contact Book. Goodbye!");
                    isRunning = false;
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
        scanner.close();
    }

    private static void addContact() {
        // Get contact information from the user
        System.out.print("Enter contact name: ");
        String name = scanner.nextLine();
        System.out.print("Enter contact number: ");
        String number = scanner.nextLine();

        // Add the contact to the contacts map
        contacts.put(name, number);
        System.out.println("Contact added successfully!");
    }

    private static void viewAllContacts() {
        if (contacts.isEmpty()) {
            System.out.println("No contacts found.");
        } else {
            // Display all contacts in the contacts map
            System.out.println("All Contacts:");
            for (String name : contacts.keySet()) {
                System.out.println(name + ": " + contacts.get(name));
            }
        }
    }

    private static void searchContact() {
        // Get the contact name to search from the user
        System.out.print("Enter the contact name to search: ");
        String name = scanner.nextLine();
        String number = contacts.get(name);

        if (number != null) {
            // Display the contact details if found
            System.out.println(name + ": " + number);
        } else {
            System.out.println("Contact not found.");
        }
    }

    private static void updateContact() {
        // Get the contact name to update from the user
        System.out.print("Enter the contact name to update: ");
        String name = scanner.nextLine();
        String number = contacts.get(name);

        if (number != null) {
            // Get the new contact number from the user
            System.out.print("Enter the new contact number: ");
            String newNumber = scanner.nextLine();
            // Update the contact with the new number
            contacts.put(name, newNumber);
            System.out.println("Contact updated successfully!");
        } else {
            System.out.println("Contact not found.");
        }
    }

    private static void deleteContact() {
        // Get the contact name to delete from the user
        System.out.print("Enter the contact name to delete: ");
        String name = scanner.nextLine();

        if (contacts.containsKey(name)) {
            // Delete the contact if it exists in the contacts map
            contacts.remove(name);
            System.out.println("Contact deleted successfully!");
        } else {
            System.out.println("Contact not found.");
        }
    }

    private static void saveContactsToFile() {
        try (PrintWriter writer = new PrintWriter(new FileWriter(CONTACTS_FILE))) {
            for (String name : contacts.keySet()) {
                String number = contacts.get(name);
                // Write each contact as "name,number" to the file
                writer.println(name + "," + number);
            }
            System.out.println("Contacts saved to file.");
        } catch (IOException e) {
            System.out.println("Error saving contacts to file.");
        }
    }

    private static void loadContactsFromFile() {
        try (BufferedReader reader = new BufferedReader(new FileReader(CONTACTS_FILE))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 2) {
                    // Split the line into name and number, then add to the contacts map
                    String name = parts[0];
                    String number = parts[1];
                    contacts.put(name, number);
                }
            }
            System.out.println("Contacts loaded from file.");
        } catch (IOException e) {
            System.out.println("No previous contacts found.");
        }
    }
}
