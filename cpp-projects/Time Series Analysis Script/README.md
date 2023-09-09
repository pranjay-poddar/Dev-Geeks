# Time Series Analysis with Moving Average and Moving Median

This C++ program performs time series analysis on a given set of data. It calculates the moving average and moving median of the time series data using a specified window size and detects the trend in the data based on the slope between the first and last data points.

## How to Run

1. Make sure you have a C++ compiler installed on your system.

2. Download the `main.cpp` file, which contains the C++ code for the Time Series Analysis program.
   
3. Compile the code using the C++ compiler

4. Run the program

# How it Works

- The program defines three functions:
  
        1. movingAverage
  
        2. movingMedian
  
        3. detectTrend

- The main function initializes the timeSeriesData vector with sample data. Modify this vector to include your own time series data.

- Set the windowSize variable to the desired size for the moving average and moving median calculations.

- The program calculates the moving average and moving median of the time series data using the specified window size.

- It then detects the trend in the data by calculating the slope between the first and last data points.

- Finally, the program displays the original time series data, the moving average, the moving median, and the detected trend.
