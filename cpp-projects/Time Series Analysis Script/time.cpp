#include <iostream>
#include <vector>
#include <algorithm> // for std::sort

using namespace std;

// Function to calculate the moving average of a time series data
vector<double> movingAverage(const vector<double>& data, int windowSize) {
    vector<double> result;

    // Loop through the time series data
    for (int i = 0; i < data.size() - windowSize + 1; ++i) {
        double sum = 0.0;
        // Calculate the sum of elements in the current window
        for (int j = i; j < i + windowSize; ++j) {
            sum += data[j];
        }
        // Calculate the average for the current window and store it in the result vector
        double average = sum / windowSize;
        result.push_back(average);
    }

    return result;
}

// Function to calculate the moving median of a time series data
vector<double> movingMedian(const vector<double>& data, int windowSize) {
    vector<double> result;

    // Loop through the time series data
    for (int i = 0; i < data.size() - windowSize + 1; ++i) {
        // Create a window of data of size windowSize
        vector<double> windowData(data.begin() + i, data.begin() + i + windowSize);
        // Sort the windowData vector
        sort(windowData.begin(), windowData.end());
        // Calculate the median for the current window and store it in the result vector
        double median = windowData[windowSize / 2];
        result.push_back(median);
    }

    return result;
}

// Function to detect the trend in the time series data
string detectTrend(const vector<double>& data) {
    // Calculate the slope between the first and last data points
    double slope = (data.back() - data.front()) / (data.size() - 1);
    // Determine the trend based on the slope
    if (slope > 0) {
        return "Upward Trend";
    } else if (slope < 0) {
        return "Downward Trend";
    } else {
        return "No Trend";
    }
}

int main() {
    // Sample time series data (you can replace it with your own data)
    vector<double> timeSeriesData = {10.2, 12.1, 14.0, 13.8, 11.5, 10.9, 12.5, 15.6, 16.8, 18.3};

    int windowSize = 3; // Sample window size (you can change it)

    // Calculate the moving average
    vector<double> movingAverageData = movingAverage(timeSeriesData, windowSize);

    // Calculate the moving median
    vector<double> movingMedianData = movingMedian(timeSeriesData, windowSize);

    // Detect the trend in the data
    string trend = detectTrend(timeSeriesData);

    // Display the original, smoothed, and trend-detected data
    cout << "Original Time Series Data:" << endl;
    for (const auto& dataPoint : timeSeriesData) {
        cout << dataPoint << " ";
    }
    cout << endl;

    cout << "Moving Average (Window Size = " << windowSize << "):" << endl;
    for (const auto& dataPoint : movingAverageData) {
        cout << dataPoint << " ";
    }
    cout << endl;

    cout << "Moving Median (Window Size = " << windowSize << "):" << endl;
    for (const auto& dataPoint : movingMedianData) {
        cout << dataPoint << " ";
    }
    cout << endl;

    cout << "Trend Detected: " << trend << endl;

    return 0;
}
