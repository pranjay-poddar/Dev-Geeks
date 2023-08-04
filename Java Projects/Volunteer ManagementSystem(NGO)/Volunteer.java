import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

class Volunteer implements Comparable<Volunteer> {
    private int id;
    private String name;
    private String email;

    public Volunteer(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public int compareTo(Volunteer other) {
        // Compare two volunteers based on their IDs for sorting purposes
        return this.id - other.id;
    }
}

class VolunteerManagementSystem {
    private List<Volunteer> volunteers;
    private int nextVolunteerId;

    public VolunteerManagementSystem() {
        this.volunteers = new ArrayList<>();
        this.nextVolunteerId = 1;
    }

    public void addVolunteer(String name, String email) {
        // Create a new volunteer with the next available ID and add it to the list
        Volunteer volunteer = new Volunteer(nextVolunteerId++, name, email);
        volunteers.add(volunteer);
        System.out.println("Volunteer added successfully!");
    }

    public Volunteer getVolunteerById(int id) {
        // Find a volunteer in the list by their ID
        for (Volunteer volunteer : volunteers) {
            if (volunteer.getId() == id) {
                return volunteer;
            }
        }
        // If no matching volunteer is found, return null
        return null;
    }

    public void deleteVolunteer(int id) {
        // Find and remove a volunteer from the list by their ID
        Volunteer volunteerToRemove = getVolunteerById(id);
        if (volunteerToRemove != null) {
            volunteers.remove(volunteerToRemove);
            System.out.println("Volunteer removed successfully!");
        } else {
            System.out.println("Volunteer with ID " + id + " not found!");
        }
    }

    public List<Volunteer> getAllVolunteers() {
        // Sort the volunteers list by ID before returning to maintain consistency
        Collections.sort(volunteers);
        return volunteers;
    }
}

class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        VolunteerManagementSystem managementSystem = new VolunteerManagementSystem();

        while (true) {
            System.out.println("NGO Volunteer Management System");
            System.out.println("1. Add Volunteer");
            System.out.println("2. View All Volunteers");
            System.out.println("3. View Volunteer by ID");
            System.out.println("4. Delete Volunteer");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter volunteer name: ");
                    String name = scanner.next();
                    System.out.print("Enter volunteer email: ");
                    String email = scanner.next();
                    managementSystem.addVolunteer(name, email);
                    break;
                case 2:
                    List<Volunteer> volunteers = managementSystem.getAllVolunteers();
                    System.out.println("Volunteers List:");
                    for (Volunteer volunteer : volunteers) {
                        // Display details of all volunteers
                        System.out.println("ID: " + volunteer.getId() + ", Name: " + volunteer.getName() +
                                ", Email: " + volunteer.getEmail());
                    }
                    break;
                case 3:
                    System.out.print("Enter volunteer ID: ");
                    int id = scanner.nextInt();
                    Volunteer volunteer = managementSystem.getVolunteerById(id);
                    if (volunteer != null) {
                        // Display details of a specific volunteer
                        System.out.println("Volunteer details:");
                        System.out.println("ID: " + volunteer.getId() + ", Name: " + volunteer.getName() +
                                ", Email: " + volunteer.getEmail());
                    } else {
                        System.out.println("Volunteer with ID " + id + " not found!");
                    }
                    break;
                case 4:
                    System.out.print("Enter volunteer ID to delete: ");
                    int deleteId = scanner.nextInt();
                    managementSystem.deleteVolunteer(deleteId);
                    break;
                case 5:
                    System.out.println("Exiting the program. Goodbye!");
                    scanner.close();
                    System.exit(0);
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }
}
