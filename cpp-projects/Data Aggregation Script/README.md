# Aggregated Data Generator

This C++ program reads data from a CSV file, aggregates it based on a specified column (grouping key), and calculates the sum, count, and average for each group. The aggregated data is then written to an output CSV file.

## How to Run

1. Make sure you have a C++ compiler installed on your system.

2. Prepare a CSV file named `data.csv` containing the data to be aggregated. The file should have the following format:

3. Download the `main.cpp` file, which contains the C++ code for the Data Aggregation program.

4. Compile the code using the C++ compiler.

# How it Works

- The program defines a splitString function to split a string into substrings based on a delimiter (used for parsing CSV lines).

- It reads the data from the input file data.csv and aggregates it based on the grouping key specified in the Group column.

- The aggregated results are stored in two unordered maps: sumMap to store the sum of values for each group, and countMap to store the count of values for each group.

- Invalid rows with incomplete data or non-integer values are skipped, and an error message is displayed.

- The aggregated results, including the sum, count, and average for each group, are written to the output file aggregated_data.csv.
