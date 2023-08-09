from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=15)

filename = "receipt.txt"

with open(filename, 'w') as f:
    f.write("*************************  Template Store  *************************\n\n")

sum_total = 0
i = 1

while True:
    product_purchased = input("Enter the product name (Press q to print the final bill): \n")
    if product_purchased == 'q':
        break

    product_quantity = int(input("Enter the product quantity: \n"))
    product_code = input("Enter the product code: \n")
    product_price = float(input("Enter the unit price: \n"))

    if product_purchased != 'q':
        total_price = product_price * product_quantity
        sum_total += total_price

        billing = f"{i}). {product_purchased} (Code: {product_code}), Quantity: {product_quantity}, Price: Rs.{product_price:.2f} x {product_quantity} units = Rs.{total_price:.2f}"
        print(billing)
        with open(filename, 'a') as f:
            f.write(billing + '\n')

        i += 1

print(f"Order total so far: Rs.{sum_total:.2f}")
thank_you = f"\n\n!!! Your bill total is Rs.{sum_total:.2f} only. Thanks for shopping with us !!!\n\n"
print(thank_you)
with open(filename, 'a') as f:
    f.write(thank_you)

# Generate the bill in PDF format
pdf.set_font("Arial", size=12)
with open(filename, "r") as f:
    for line in f:
        pdf.cell(200, 10, txt=line, ln=True, align='L')

pdf.output("billGenerated.pdf")
