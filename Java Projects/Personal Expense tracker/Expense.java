import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

class Expense {
    private String category;
    private double amount;

    public Expense(String category, double amount) {
        this.category = category;
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public double getAmount() {
        return amount;
    }
}
class PersonalExpenseTracker {
    private List<Expense> expenses;
    private Map<String, Double> categoryTotals;
    private double budget;

    public PersonalExpenseTracker() {
        expenses = new ArrayList<>();
        categoryTotals = new HashMap<>();
        budget = 0.0;
    }

    public void addExpense(String category, double amount) {
        expenses.add(new Expense(category, amount));
        categoryTotals.put(category, categoryTotals.getOrDefault(category, 0.0) + amount);
    }

    public void setBudget(double budget) {
        this.budget = budget;
    }

    public double getTotalSpending() {
        double total = 0.0;
        for (Expense expense : expenses) {
            total += expense.getAmount();
        }
        return total;
    }

    public void showExpenses() {
        System.out.println("Expenses:");
        for (Expense expense : expenses) {
            System.out.println("Category: " + expense.getCategory() + ", Amount: $" + expense.getAmount());
        }
    }

    public void showExpenseByCategory() {
        System.out.println("Expense Analysis by Category:");
        for (String category : categoryTotals.keySet()) {
            System.out.println("Category: " + category + ", Total Amount: $" + categoryTotals.get(category));
        }
    }

    public void showBudgetStatus() {
        double totalSpending = getTotalSpending();
        System.out.println("Budget Status:");
        System.out.println("Total Spending: $" + totalSpending);
        System.out.println("Budget: $" + budget);

        if (totalSpending > budget) {
            double overspentAmount = totalSpending - budget;
            System.out.println("You have overspent by $" + overspentAmount);
        } else {
            double remainingBudget = budget - totalSpending;
            System.out.println("You have $" + remainingBudget + " left in your budget");
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        PersonalExpenseTracker expenseTracker = new PersonalExpenseTracker();

        while (true) {
            System.out.println("Personal Expense Tracker");
            System.out.println("1. Add Expense");
            System.out.println("2. View Expenses");
            System.out.println("3. View Expense Analysis by Category");
            System.out.println("4. Set Budget");
            System.out.println("5. View Budget Status");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter expense category: ");
                    String category = scanner.next();
                    System.out.print("Enter expense amount: ");
                    double amount = scanner.nextDouble();
                    expenseTracker.addExpense(category, amount);
                    break;
                case 2:
                    expenseTracker.showExpenses();
                    break;
                case 3:
                    expenseTracker.showExpenseByCategory();
                    break;
                case 4:
                    System.out.print("Enter your monthly budget: ");
                    double budget = scanner.nextDouble();
                    expenseTracker.setBudget(budget);
                    break;
                case 5:
                    expenseTracker.showBudgetStatus();
                    break;
                case 6:
                    System.out.println("Exiting the program. Goodbye!");
                    scanner.close();
                    System.exit(0);
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }
}
