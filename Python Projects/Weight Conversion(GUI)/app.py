import tkinter as tk
from tkinter import ttk

def convert():
    try:
        a = float(entry_a.get())
        b = combo_b.get()
        c = combo_c.get()

        factors = {
            'Pounds': {
                'Kilograms': 0.453592,
                'Ounces': 16
            },
            'Kilograms': {
                'Pounds': 2.20462,
                'Ounces': 35.27396
            },
            'Ounces': {
                'Pounds': 0.0625,
                'Kilograms': 0.0283495
            }
        }

        result = a * factors[b][c]
        label_result.config(text=f"{a:.2f} {b} = {result:.2f} {c}")
    except ValueError:
        label_result.config(text="Invalid input. Please enter a valid number.")

root = tk.Tk()
root.title("Weight Conversion")
root.configure(bg='black')

style = ttk.Style()
style.theme_use('clam')
style.configure('.', background='black', foreground='white', fieldbackground='black')
style.map('TButton', background=[('active', 'blue')])

label_a = ttk.Label(root, text="Value:")
label_a.grid(row=0, column=0, padx=5, pady=5)
entry_a = ttk.Entry(root)
entry_a.grid(row=0, column=1, padx=5, pady=5)

label_b = ttk.Label(root, text="From:")
label_b.grid(row=1, column=0, padx=5, pady=5)
combo_b = ttk.Combobox(root, values=['Pounds', 'Kilograms', 'Ounces'])
combo_b.grid(row=1, column=1, padx=5, pady=5)
combo_b.set('Pounds')

label_c = ttk.Label(root, text="To:")
label_c.grid(row=2, column=0, padx=5, pady=5)
combo_c = ttk.Combobox(root, values=['Pounds', 'Kilograms', 'Ounces'])
combo_c.grid(row=2, column=1, padx=5, pady=5)
combo_c.set('Kilograms')

button_convert = ttk.Button(root, text="Convert", command=convert)
button_convert.grid(row=3, columnspan=2, padx=5, pady=5)

label_result = ttk.Label(root, text="")
label_result.grid(row=4, columnspan=2, padx=5, pady=10)

root.mainloop()
