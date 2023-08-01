import java.util.*;
import java.io.*;
import java.text.SimpleDateFormat;

public class GST {
    private static final String DATA_FILE = "gst_transactions.csv";
    private static Map<String, Double> gstRecords = new HashMap<>();

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Welcome to GST Compliance Tracker");

        loadGSTTransactions(); // Load existing transactions from file

        while (true) {
            // Display the main menu options
            System.out.println("\nMenu:");
            System.out.println("1. Add GST Transaction");
            System.out.println("2. View GST Transactions");
            System.out.println("3. Calculate Total GST Paid");
            System.out.println("4. View Transactions by Date Range");
            System.out.println("5. Export GST Transactions to CSV");
            System.out.println("6. Exit");

            // Prompt the user to enter their choice
            System.out.print("Enter your choice (1/2/3/4/5/6): ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume the newline character after reading the choice

            // Use a switch statement to perform the selected action
            switch (choice) {
                case 1:
                    addGSTTransaction(scanner);
                    break;
                case 2:
                    viewGSTTransactions();
                    break;
                case 3:
                    calculateTotalGSTPaid();
                    break;
                case 4:
                    viewTransactionsByDateRange(scanner);
                    break;
                case 5:
                    exportToCSV();
                    break;
                case 6:
                    saveGSTTransactions(); // Save transactions to file before exiting
                    System.out.println("Exiting GST Compliance Tracker. Goodbye!");
                    scanner.close();
                    return;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private static void addGSTTransaction(Scanner scanner) {
        // Prompt the user to enter the GST number and amount
        System.out.print("Enter the GST number: ");
        String gstNumber = scanner.nextLine();

        System.out.print("Enter the GST amount: ");
        double gstAmount = scanner.nextDouble();
        scanner.nextLine(); // Consume the newline character after reading the amount

        // Add the GST transaction to the map
        gstRecords.put(gstNumber, gstAmount);
        System.out.println("GST Transaction added successfully.");
    }

    private static void viewGSTTransactions() {
        // Check if the map is empty
        if (gstRecords.isEmpty()) {
            System.out.println("No GST transactions found.");
            return;
        }

        // Display all GST transactions
        System.out.println("\nGST Transactions:");
        for (Map.Entry<String, Double> entry : gstRecords.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }

    private static void calculateTotalGSTPaid() {
        // Calculate the total GST paid by summing up all the amounts
        double totalGSTPaid = 0.0;
        for (double amount : gstRecords.values()) {
            totalGSTPaid += amount;
        }
        System.out.println("Total GST paid: " + totalGSTPaid);
    }

    private static void viewTransactionsByDateRange(Scanner scanner) {
        // Check if the map is empty
        if (gstRecords.isEmpty()) {
            System.out.println("No GST transactions found.");
            return;
        }

        // Prompt the user to enter the start and end dates for the date range
        System.out.println("Enter the start date (YYYY-MM-DD): ");
        String startDateStr = scanner.nextLine();

        System.out.println("Enter the end date (YYYY-MM-DD): ");
        String endDateStr = scanner.nextLine();

        try {
            // Parse the date strings to Date objects for comparison
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date startDate = dateFormat.parse(startDateStr);
            Date endDate = dateFormat.parse(endDateStr);

            // Display GST transactions within the specified date range
            System.out.println("\nGST Transactions in the specified date range:");
            for (Map.Entry<String, Double> entry : gstRecords.entrySet()) {
                String gstNumber = entry.getKey();
                double gstAmount = entry.getValue();

                // Extract the date from the GST number (assuming the first 10 characters represent the date)
                String transactionDateStr = gstNumber.substring(0, 10);
                Date transactionDate = dateFormat.parse(transactionDateStr);

                // Check if the transaction date is within the date range
                if (transactionDate.after(startDate) && transactionDate.before(endDate)) {
                    System.out.println(gstNumber + ": " + gstAmount);
                }
            }
        } catch (Exception e) {
            System.out.println("Invalid date format. Please enter dates in YYYY-MM-DD format.");
        }
    }

    private static void exportToCSV() {
        // Check if the map is empty
        if (gstRecords.isEmpty()) {
            System.out.println("No GST transactions found.");
            return;
        }

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(DATA_FILE))) {
            // Write the CSV header
            writer.write("GST Number,Amount\n");

            // Write each GST transaction to the CSV file
            for (Map.Entry<String, Double> entry : gstRecords.entrySet()) {
                String gstNumber = entry.getKey();
                double gstAmount = entry.getValue();
                writer.write(gstNumber + "," + gstAmount + "\n");
            }
            System.out.println("GST transactions exported to " + DATA_FILE);
        } catch (IOException e) {
            System.out.println("Error exporting GST transactions to CSV file.");
            e.printStackTrace();
        }
    }

    private static void loadGSTTransactions() {
        try (BufferedReader reader = new BufferedReader(new FileReader(DATA_FILE))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Skip the header line
                if (!line.equals("GST Number,Amount")) {
                    String[] data = line.split(",");
                    String gstNumber = data[0];
                    double gstAmount = Double.parseDouble(data[1]);
                    gstRecords.put(gstNumber, gstAmount);
                }
            }
        } catch (IOException e) {
            System.out.println("No existing GST transactions found.");
        }
    }

    private static void saveGSTTransactions() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(DATA_FILE))) {
            // Write the CSV header
            writer.write("GST Number,Amount\n");

            // Write each GST transaction to the CSV file
            for (Map.Entry<String, Double> entry : gstRecords.entrySet()) {
                String gstNumber = entry.getKey();
                double gstAmount = entry.getValue();
                writer.write(gstNumber + "," + gstAmount + "\n");
            }
            System.out.println("GST transactions saved to " + DATA_FILE);
        } catch (IOException e) {
            System.out.println("Error saving GST transactions to CSV file.");
            e.printStackTrace();
        }
    }
}
