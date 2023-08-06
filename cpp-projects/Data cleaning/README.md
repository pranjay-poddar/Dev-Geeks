# CSV Data Cleaner

The CSV Data Cleaner is a C++ program that cleans CSV data by removing rows with missing values. It reads data from an input CSV file, processes each row, and writes the cleaned data to an output CSV file.

## How to Run

1. Make sure you have a C++ compiler installed on your system.

2. Download the `main.cpp` file, which contains the C++ code for the CSV Data Cleaner.

3. Prepare your input CSV file (`input.csv`) containing the data to be cleaned. The file should have values separated by commas and rows separated by newline characters.

4. Compile and run the code.

## Data Cleaning Process

1. The CSV Data Cleaner performs the following steps:

- Reads data from the input CSV file (input.csv).

- Processes each row of data and splits it into individual values based on the comma delimiter.

- Checks if any value in the row is empty (missing).

- If the row doesn't have any missing values, it writes the row to the output CSV file (cleaned_data.csv).

- The process is repeated for all rows in the input file, resulting in a cleaned CSV file with rows that have no missing values.
