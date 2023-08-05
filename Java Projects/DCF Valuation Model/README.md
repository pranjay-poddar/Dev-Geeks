# Discounted Cash Flow (DCF) Valuation

This is a Java program that performs a Discounted Cash Flow (DCF) valuation. The DCF valuation is a financial method used to estimate the value of an investment based on its future cash flows, discounted to their present value.

### Prerequisites

- Java Development Kit (JDK) installed on your system.

# How the Program Works

The user is prompted to enter the initial cash flow (CF0), growth rate of cash flows (%), discount rate (%), and the number of cash flow projections.
The program then calculates the DCF valuation by projecting the cash flows for the specified number of years, applying the growth rate, and discounting the cash flows to their present value.
The program also uses the Gordon Growth Model to calculate the terminal value of the investment at the end of the projection period.
The DCF valuation is displayed to the user.

# Sensitivity Analysis

The program offers the option to perform a sensitivity analysis for different growth rates. This analysis helps to understand how changes in the growth rate can affect the valuation.
If the user chooses to perform sensitivity analysis, they will be prompted to enter the minimum, maximum, and interval values for the growth rate.
The program will then calculate the DCF valuation for each growth rate within the specified range and display the results in a tabular format.
