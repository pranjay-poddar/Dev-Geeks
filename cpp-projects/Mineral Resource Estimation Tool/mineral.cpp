#include <iostream>
#include <vector>
#include <cmath>
#include <fstream>
#include <sstream>

using namespace std;

struct Point {
    double x;
    double y;
    double z;
};

// Function to calculate the Inverse Distance Weighting (IDW) estimation for a given point
double idwEstimation(const vector<Point>& dataPoints, double x, double y, double power) {
    double numerator = 0.0;
    double denominator = 0.0;

    for (const Point& point : dataPoints) {
        double distance = sqrt(pow(point.x - x, 2) + pow(point.y - y, 2));
        if (distance == 0.0) {
            return point.z; // Avoid division by zero, return the exact value if at the same location
        }

        double weight = pow(1.0 / distance, power);
        numerator += weight * point.z;
        denominator += weight;
    }

    return numerator / denominator;
}

// Function to read data points from a CSV file
vector<Point> readDataPointsFromCSV(const string& filename) {
    vector<Point> dataPoints;
    ifstream inputFile(filename);
    if (!inputFile) {
        cerr << "Error: Unable to read the CSV file." << endl;
        return dataPoints; // Return an empty vector if file read fails
    }

    string line;
    while (getline(inputFile, line)) {
        istringstream iss(line);
        Point point;
        char comma;
        if (iss >> point.x >> comma >> point.y >> comma >> point.z) {
            dataPoints.push_back(point); // Successfully read the data point, add it to the vector
        } else {
            cerr << "Error: Invalid data format in CSV file." << endl; // Display an error message if data format is invalid
        }
    }

    return dataPoints;
}

// Function to display the data points
void displayDataPoints(const vector<Point>& dataPoints) {
    cout << "Data Points:" << endl;
    for (const Point& point : dataPoints) {
        cout << "(" << point.x << ", " << point.y << ", " << point.z << ")" << endl; // Display each data point's coordinates
    }
}

int main() {
    vector<Point> dataPoints;
    string csvFilename;
    cout << "Enter the path to the CSV file containing data points: ";
    cin >> csvFilename;

    dataPoints = readDataPointsFromCSV(csvFilename);
    if (dataPoints.empty()) {
        return 1; // Exit the program if reading data points from CSV fails
    }

    displayDataPoints(dataPoints); // Display the read data points to the user

    double estimationX, estimationY;
    double power;
    cout << "Enter the X coordinate for estimation: ";
    cin >> estimationX;
    cout << "Enter the Y coordinate for estimation: ";
    cin >> estimationY;
    cout << "Enter the power value for IDW (typically between 1 and 3): ";
    cin >> power;

    double estimationZ = idwEstimation(dataPoints, estimationX, estimationY, power); // Calculate IDW estimation

    cout << "Estimated Z value at (" << estimationX << ", " << estimationY << ") is: " << estimationZ << endl;

    return 0;
}
