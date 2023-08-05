import java.util.Scanner;

public class credit {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Gather input from the user
        System.out.print("Enter customer's credit score: ");
        int creditScore = scanner.nextInt();

        System.out.print("Enter customer's annual income: ");
        double annualIncome = scanner.nextDouble();

        System.out.print("Enter customer's total debt: ");
        double totalDebt = scanner.nextDouble();

        System.out.print("Enter customer's years of credit history: ");
        int yearsOfCreditHistory = scanner.nextInt();

        // Calculate debt-to-income ratio
        double debtToIncomeRatio = totalDebt / annualIncome;

        // Perform credit risk assessment
        double riskScore = calculateRiskScore(creditScore, debtToIncomeRatio, yearsOfCreditHistory);

        // Print the credit risk assessment result
        printRiskAssessmentResult(riskScore);

        scanner.close();
    }

    // Calculate credit risk score based on multiple factors
    private static double calculateRiskScore(int creditScore, double debtToIncomeRatio, int yearsOfCreditHistory) {
        double score = 0.2 * creditScore + 0.3 * (1 - debtToIncomeRatio) * 100 + 0.5 * yearsOfCreditHistory;
        return Math.min(score, 100); // Cap the risk score at 100
    }

    // Print the credit risk assessment result
    private static void printRiskAssessmentResult(double riskScore) {
        if (riskScore >= 80) {
            System.out.println("Low credit risk. Loan can be approved.");
        } else if (riskScore >= 50) {
            System.out.println("Moderate credit risk. Loan approval may require additional evaluation.");
        } else {
            System.out.println("High credit risk. Loan may not be approved.");
        }
    }

    // Additional Feature: Provide Suggestions
    // You can add more personalized suggestions based on the credit risk score.
    private static void provideSuggestions(double riskScore) {
        if (riskScore >= 80) {
            System.out.println("Consider offering lower interest rates to the customer.");
        } else if (riskScore >= 50) {
            System.out.println("Review the customer's financial history more closely before making a decision.");
        } else {
            System.out.println("Approach the loan application with caution and conduct a thorough assessment.");
        }
    }

    // Additional Feature: Calculate Loan Amount Eligibility
    // You can calculate the maximum loan amount the customer is eligible for based on their risk score and income.
    private static double calculateLoanAmountEligibility(double riskScore, double annualIncome) {
        // Higher risk scores result in lower eligible loan amounts.
        double maxLoanAmount = riskScore / 100.0 * annualIncome;
        return Math.min(maxLoanAmount, annualIncome * 0.8); // Cap the loan amount at 80% of annual income.
    }

    // Additional Feature: Provide Loan Amount Eligibility
    // You can inform the customer about their maximum eligible loan amount.
    private static void provideLoanAmountEligibility(double maxLoanAmount) {
        System.out.println("Based on your credit risk score and income, you are eligible for a maximum loan amount of: $" + maxLoanAmount);
    }
}
