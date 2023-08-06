import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Financial {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        List<Transaction> transactions = new ArrayList<>();

        // Input transactions from the user
        System.out.println("Enter transactions (type 'done' to finish):");
        while (true) {
            System.out.print("Description: ");
            String description = scanner.nextLine();

            if (description.equalsIgnoreCase("done")) {
                break;
            }

            System.out.print("Amount: ");
            double amount = Double.parseDouble(scanner.nextLine());

            System.out.print("Type (Income/Expense): ");
            String typeStr = scanner.nextLine();
            TransactionType type = TransactionType.valueOf(typeStr.toUpperCase());

            transactions.add(new Transaction(description, amount, type));
        }

        // Generate and display the financial statement
        FinancialStatement financialStatement = generateFinancialStatement(transactions);
        displayFinancialStatement(financialStatement);

        scanner.close();
    }

    // Enum to represent different transaction types (Income, Expense, etc.)
    enum TransactionType {
        INCOME, EXPENSE
    }

    // Class to represent a financial transaction
    static class Transaction {
        private String description;
        private double amount;
        private TransactionType type;

        public Transaction(String description, double amount, TransactionType type) {
            this.description = description;
            this.amount = amount;
            this.type = type;
        }

        public double getAmount() {
            return amount;
        }

        public TransactionType getType() {
            return type;
        }
    }

    // Class to represent the financial statement
    static class FinancialStatement {
        private double totalIncome;
        private double totalExpenses;
        private double netIncome;

        public FinancialStatement(double totalIncome, double totalExpenses, double netIncome) {
            this.totalIncome = totalIncome;
            this.totalExpenses = totalExpenses;
            this.netIncome = netIncome;
        }

        public double getTotalIncome() {
            return totalIncome;
        }

        public double getTotalExpenses() {
            return totalExpenses;
        }

        public double getNetIncome() {
            return netIncome;
        }
    }

    // Method to generate the financial statement from a list of transactions
    private static FinancialStatement generateFinancialStatement(List<Transaction> transactions) {
        double totalIncome = 0;
        double totalExpenses = 0;

        for (Transaction transaction : transactions) {
            if (transaction.getType() == TransactionType.INCOME) {
                totalIncome += transaction.getAmount();
            } else if (transaction.getType() == TransactionType.EXPENSE) {
                totalExpenses += transaction.getAmount();
            }
        }

        double netIncome = totalIncome - totalExpenses;
        return new FinancialStatement(totalIncome, totalExpenses, netIncome);
    }

    // Method to display the financial statement
    private static void displayFinancialStatement(FinancialStatement financialStatement) {
        System.out.println("Financial Statement");
        System.out.println("-------------------");
        System.out.println("Total Income: $" + financialStatement.getTotalIncome());
        System.out.println("Total Expenses: $" + financialStatement.getTotalExpenses());
        System.out.println("Net Income: $" + financialStatement.getNetIncome());
        
        // Additional features (Optional): Display profit or loss message
        if (financialStatement.getNetIncome() >= 0) {
            System.out.println("Status: Profit");
        } else {
            System.out.println("Status: Loss");
        }
        
        
    }
}
