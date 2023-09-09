import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Scanner;

class BankAccount {
    private int accountNumber;
    private double balance;

    public BankAccount(int accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public int getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public void withdraw(double amount) {
        if (balance >= amount) {
            balance -= amount;
        } else {
            System.out.println("Insufficient funds!");
        }
    }

    @Override
    public String toString() {
        return "BankAccount{" +
                "accountNumber=" + accountNumber +
                ", balance=" + balance +
                '}';
    }
}

class Customer {
    private static int nextCustomerId = 1001; // Initialize customer ID counter
    private String name;
    private int customerId;
    private LinkedList<BankAccount> accounts;

    public Customer(String name) {
        this.name = name;
        this.customerId = nextCustomerId++;
        this.accounts = new LinkedList<>();
    }

    public String getName() {
        return name;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void addAccount(BankAccount account) {
        accounts.add(account);
    }

    public LinkedList<BankAccount> getAccounts() {
        return accounts;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "name='" + name + '\'' +
                ", customerId=" + customerId +
                '}';
    }
}

class TrieNode {
    private Map<Character, TrieNode> children;
    private Customer customer;

    public TrieNode() {
        this.children = new HashMap<>();
        this.customer = null;
    }

    public Map<Character, TrieNode> getChildren() {
        return children;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}

public class BankManagementSystem {
    private TrieNode root;

    public BankManagementSystem() {
        root = new TrieNode();
    }

    public void addCustomer(Customer customer) {
        String name = customer.getName().toLowerCase();
        TrieNode currentNode = root;

        for (char c : name.toCharArray()) {
            currentNode.getChildren().putIfAbsent(c, new TrieNode());
            currentNode = currentNode.getChildren().get(c);
        }

        currentNode.setCustomer(customer);
    }

    public Customer getCustomer(String name) {
        String lowerCaseName = name.toLowerCase();
        TrieNode currentNode = root;

        for (char c : lowerCaseName.toCharArray()) {
            currentNode = currentNode.getChildren().get(c);
            if (currentNode == null) {
                return null;
            }
        }

        return currentNode.getCustomer();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        BankManagementSystem bankSystem = new BankManagementSystem();

        System.out.println("Welcome to the Bank Management System!");

        while (true) {
            System.out.println("\nChoose an option:");
            System.out.println("1. Add a new customer");
            System.out.println("2. Create a new bank account for a customer");
            System.out.println("3. Perform a transaction");
            System.out.println("4. Exit");

            int choice = scanner.nextInt();
            scanner.nextLine(); // Consume the newline character

            switch (choice) {
                case 1:
                    System.out.println("Enter customer name:");
                    String name = scanner.nextLine();
                    Customer newCustomer = new Customer(name);
                    bankSystem.addCustomer(newCustomer);
                    System.out.println("Customer created successfully.");
                    break;

                case 2:
                    System.out.println("Enter customer name:");
                    String customerName = scanner.nextLine();
                    Customer selectedCustomer = bankSystem.getCustomer(customerName);

                    if (selectedCustomer == null) {
                        System.out.println("Customer not found. Please create a customer first.");
                        break;
                    }

                    System.out.println("Enter initial balance:");
                    double initialBalance = scanner.nextDouble();
                    scanner.nextLine(); // Consume the newline character

                    int accountNumber = (selectedCustomer.getCustomerId() + 1) * 1000; // Generate an account number
                    BankAccount newAccount = new BankAccount(accountNumber, initialBalance);
                    selectedCustomer.addAccount(newAccount);
                    System.out.println("Bank account created successfully.");
                    break;

                    case 3:
                    System.out.println("Enter customer name:");
                     customerName = scanner.nextLine();
                     selectedCustomer = bankSystem.getCustomer(customerName);
                
                    if (selectedCustomer == null) {
                        System.out.println("Customer not found. Please create a customer first.");
                        break;
                    }
                
                    LinkedList<BankAccount> accounts = selectedCustomer.getAccounts();
                    if (accounts.isEmpty()) {
                        System.out.println("No bank accounts found for this customer. Please create a bank account first.");
                        break;
                    }
                
                    System.out.println("Select a bank account (Enter account number):");
                    for (BankAccount account : accounts) {
                        System.out.println(account.getAccountNumber() + ". Balance: " + account.getBalance());
                    }
                
                    int selectedAccountNumber = scanner.nextInt();
                    scanner.nextLine(); // Consume the newline character
                
                    BankAccount selectedAccount = null;
                    for (BankAccount account : accounts) {
                        if (account.getAccountNumber() == selectedAccountNumber) {
                            selectedAccount = account;
                            break;
                        }
                    }
                
                    if (selectedAccount == null) {
                        System.out.println("Invalid account number.");
                        break;
                    }
                
                    System.out.println("Choose a transaction:");
                    System.out.println("1. Deposit");
                    System.out.println("2. Withdraw");
                
                    int transactionChoice = scanner.nextInt();
                    scanner.nextLine(); // Consume the newline character
                
                    switch (transactionChoice) {
                        case 1:
                            System.out.println("Enter deposit amount:");
                            double depositAmount = scanner.nextDouble();
                            scanner.nextLine(); // Consume the newline character
                            selectedAccount.deposit(depositAmount);
                            System.out.println("Deposit successful. New balance: " + selectedAccount.getBalance());
                            break;
                
                        case 2:
                            System.out.println("Enter withdrawal amount:");
                            double withdrawalAmount = scanner.nextDouble();
                            scanner.nextLine(); // Consume the newline character
                            selectedAccount.withdraw(withdrawalAmount);
                            System.out.println("Withdrawal successful. New balance: " + selectedAccount.getBalance());
                            break;
                
                        default:
                            System.out.println("Invalid choice.");
                    }
                    break;
                
                case 4:
                    System.out.println("Exiting the Bank Management System. Goodbye!");
                    scanner.close();
                    System.exit(0);

                default:
                    System.out.println("Invalid choice.");
            }
        }
    }
}
