#include <iostream>
#include <vector>
#include <cmath>

// Function to calculate the average of a vector of doubles
double calculateAverage(const std::vector<double>& data) {
    double sum = 0.0;
    for (const double& value : data) {
        sum += value;
    }
    return sum / data.size();
}

// Function to calculate the standard deviation of a vector of doubles
double calculateStandardDeviation(const std::vector<double>& data) {
    double avg = calculateAverage(data);
    double sumSquaredDiff = 0.0;
    for (const double& value : data) {
        double diff = value - avg;
        sumSquaredDiff += diff * diff;
    }
    return std::sqrt(sumSquaredDiff / data.size());
}

// Function to find the minimum and maximum values in a vector of doubles
void findMinMax(const std::vector<double>& data, double& min, double& max) {
    if (data.empty()) {
        min = max = 0.0; // Set default values if the vector is empty
        return;
    }
    min = max = data[0];
    for (const double& value : data) {
        if (value < min) {
            min = value;
        }
        if (value > max) {
            max = value;
        }
    }
}

// Function to remove outliers from a vector of doubles using sigma-clipping
void sigmaClip(std::vector<double>& data, double sigmaThreshold) {
    double avg = calculateAverage(data);
    double stddev = calculateStandardDeviation(data);
    double threshold = sigmaThreshold * stddev;

    std::vector<double> clippedData;
    for (const double& value : data) {
        if (std::abs(value - avg) <= threshold) {
            clippedData.push_back(value);
        }
    }
    data = std::move(clippedData);
}

int main() {
    // Get the number of data points from the user
    int numDataPoints;
    std::cout << "Enter the number of astronomical data points: ";
    std::cin >> numDataPoints;

    // Input the astronomical data from the user
    std::vector<double> astronomicalData;
    std::cout << "Enter the astronomical data:\n";
    for (int i = 0; i < numDataPoints; ++i) {
        double value;
        std::cin >> value;
        astronomicalData.push_back(value);
    }

    // Calculate the average and standard deviation
    double average = calculateAverage(astronomicalData);
    double standardDeviation = calculateStandardDeviation(astronomicalData);

    // Find the minimum and maximum values
    double min, max;
    findMinMax(astronomicalData, min, max);

    // Remove outliers using sigma-clipping with a threshold of 2
    sigmaClip(astronomicalData, 2.0);

    // Output the results
    std::cout << "Average of the astronomical data: " << average << std::endl;
    std::cout << "Standard deviation: " << standardDeviation << std::endl;
    std::cout << "Minimum value: " << min << std::endl;
    std::cout << "Maximum value: " << max << std::endl;

    std::cout << "After sigma-clipping, data: ";
    for (const double& value : astronomicalData) {
        std::cout << value << " ";
    }
    std::cout << std::endl;

    return 0;
}
