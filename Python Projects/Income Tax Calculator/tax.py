import json

TAX_BRACKETS = [
    {"lower_bound": 0, "upper_bound": 50000, "rate": 0.05},
    {"lower_bound": 50001, "upper_bound": 100000, "rate": 0.1},
    {"lower_bound": 100001, "upper_bound": 200000, "rate": 0.15},
    {"lower_bound": 200001, "upper_bound": float("inf"), "rate": 0.2},
]

STANDARD_DEDUCTION = 12000
PERSONAL_ALLOWANCE = 5000


def calculate_income_tax(income):
    taxable_income = income - STANDARD_DEDUCTION - PERSONAL_ALLOWANCE

    if taxable_income <= 0:
        return 0

    tax_due = 0
    remaining_income = taxable_income

    for bracket in TAX_BRACKETS:
        if remaining_income <= 0:
            break

        taxable_amount_in_bracket = min(
            remaining_income, bracket["upper_bound"] - bracket["lower_bound"] + 1
        )
        tax_due += taxable_amount_in_bracket * bracket["rate"]
        remaining_income -= taxable_amount_in_bracket

    return tax_due


def save_tax_calculation(name, income, tax_due):
    with open("tax_calculations.json", "a") as file:
        data = {"name": name, "income": income, "tax_due": tax_due}
        json.dump(data, file)
        file.write("\n")


def get_float_input(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Invalid input. Please enter a valid number.")


def main():
    try:
        print("Welcome to the Income Tax Calculator!")

        name = input("Enter your name: ")

        income = get_float_input("Enter your annual income: ")
        if income < 0:
            print("Income cannot be negative.")
            return

        tax_due = calculate_income_tax(income)

        print(f"Your income tax due: ${tax_due:.2f}")

        save_calculation = input("Do you want to save this calculation? (y/n): ")

        if save_calculation.lower() == "y":
            save_tax_calculation(name, income, tax_due)
            print("Calculation saved successfully.")

    except KeyboardInterrupt:
        print("\nCalculation aborted. Goodbye!")

    except Exception as e:
        print("An error occurred:", str(e))


if __name__ == "__main__":
    main()
