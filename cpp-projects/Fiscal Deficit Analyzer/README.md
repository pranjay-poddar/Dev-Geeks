# Fiscal Deficit Analyzer

This C++ program reads fiscal data from a CSV file, calculates the average fiscal deficit, and displays the data along with the calculated average.

## How to Run

1. Make sure you have a C++ compiler installed on your system.

2. Download the `main.cpp` file, which contains the C++ code for the Fiscal Deficit Analyzer program.

3. Prepare a CSV file named `fiscal_data.csv` containing fiscal data..

4. Compile and run the program.

## How it Works

- The program defines a FiscalData struct to represent each fiscal data entry with year and fiscalDeficit attributes.

- It provides three functions:
        1. readFiscalDataFromFile
  
        2. calculateAverageFiscalDeficit
  
        3. displayFiscalData

- The main function sets the filename to fiscal_data.csv (modify it to match your file) and reads fiscal data using the readFiscalDataFromFile function.

- If the file reading fails, the program exits with an error code.

- The program displays the fiscal data and calculates the average fiscal deficit using the calculateAverageFiscalDeficit function.

- The final result, including the fiscal data and the average fiscal deficit, is displayed on the console.

