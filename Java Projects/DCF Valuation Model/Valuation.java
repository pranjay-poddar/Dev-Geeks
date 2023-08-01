import java.util.Scanner;

public class Valuation {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Gather input from the user
        System.out.print("Enter the initial cash flow (CF0): ");
        double initialCashFlow = scanner.nextDouble();

        System.out.print("Enter the growth rate of cash flows (%): ");
        double growthRate = scanner.nextDouble() / 100;

        System.out.print("Enter the discount rate (%): ");
        double discountRate = scanner.nextDouble() / 100;

        System.out.print("Enter the number of cash flow projections: ");
        int numProjections = scanner.nextInt();

        // Perform DCF valuation
        double valuation = calculateDCFValuation(initialCashFlow, growthRate, discountRate, numProjections);

        System.out.println("DCF Valuation: " + valuation);

        // Perform sensitivity analysis for different growth rates
        performSensitivityAnalysis(initialCashFlow, discountRate, numProjections);

        scanner.close();
    }

    // Calculate the DCF valuation
    private static double calculateDCFValuation(double initialCashFlow, double growthRate, double discountRate,
                                                int numProjections) {
        double valuation = 0;

        for (int i = 1; i <= numProjections; i++) {
            // Calculate cash flow for each projection year based on the growth rate
            double cashFlow = initialCashFlow * Math.pow(1 + growthRate, i);
            
            // Discount the projected cash flow to present value
            double discountedCashFlow = cashFlow / Math.pow(1 + discountRate, i);
            
            valuation += discountedCashFlow;
        }

        // Terminal Value Calculation (using Gordon Growth Model)
        double lastProjectedCashFlow = initialCashFlow * Math.pow(1 + growthRate, numProjections);
        double terminalValue = lastProjectedCashFlow / (discountRate - growthRate);
        valuation += terminalValue / Math.pow(1 + discountRate, numProjections);

        return valuation;
    }

    // Perform sensitivity analysis by varying the growth rate
    private static void performSensitivityAnalysis(double initialCashFlow, double discountRate, int numProjections) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Perform Sensitivity Analysis? (y/n): ");
        String choice = scanner.next();

        if (choice.equalsIgnoreCase("y")) {
            System.out.print("Enter the minimum growth rate (%): ");
            double minGrowthRate = scanner.nextDouble() / 100;

            System.out.print("Enter the maximum growth rate (%): ");
            double maxGrowthRate = scanner.nextDouble() / 100;

            System.out.print("Enter the interval for growth rate (%): ");
            double growthRateInterval = scanner.nextDouble() / 100;

            System.out.println("\nSensitivity Analysis Results:");
            System.out.println("Growth Rate (%) | DCF Valuation");
            System.out.println("----------------|---------------");

            for (double rate = minGrowthRate; rate <= maxGrowthRate; rate += growthRateInterval) {
                double valuation = calculateDCFValuation(initialCashFlow, rate, discountRate, numProjections);
                System.out.printf("%14.2f | %14.2f\n", rate * 100, valuation);
            }
        }
    }
}
