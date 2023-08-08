#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

// Function to calculate the average grade of the ore
double calculateAverageGrade(const vector<double>& grades) {
    double sum = 0.0;
    for (double grade : grades) {
        sum += grade;
    }

    return sum / grades.size();
}

// Function to calculate the highest grade of the ore
double calculateHighestGrade(const vector<double>& grades) {
    return *max_element(grades.begin(), grades.end());
}

// Function to calculate the lowest grade of the ore
double calculateLowestGrade(const vector<double>& grades) {
    return *min_element(grades.begin(), grades.end());
}

// Function to calculate the grade variability (range) of the ore
double calculateGradeVariability(const vector<double>& grades) {
    double highestGrade = calculateHighestGrade(grades);
    double lowestGrade = calculateLowestGrade(grades);
    return highestGrade - lowestGrade;
}

// Function to calculate the ore reserve based on average grade and volume
double calculateOreReserve(double averageGrade, double volume) {
    return averageGrade * volume;
}

// Function to calculate the cutoff grade and classify ore as low-grade or high-grade
string classifyOreGrade(double averageGrade, double cutoffGrade) {
    if (averageGrade >= cutoffGrade) {
        return "High-Grade Ore";
    } else {
        return "Low-Grade Ore";
    }
}

// Function to perform statistical analysis on the ore grades
void performStatisticalAnalysis(const vector<double>& grades) {
    double sum = 0.0;
    double sumSquared = 0.0;
    double mean = calculateAverageGrade(grades);

    for (double grade : grades) {
        sum += grade;
        sumSquared += grade * grade;
    }

    double variance = (sumSquared - (sum * sum) / grades.size()) / (grades.size() - 1);
    double standardDeviation = sqrt(variance);

    cout << "Mean: " << mean << endl;
    cout << "Variance: " << variance << endl;
    cout << "Standard Deviation: " << standardDeviation << endl;
}

int main() {
    vector<double> oreGrades;
    int numSamples;
    double volume;
    double cutoffGrade;

    cout << "Ore Grade Analysis" << endl;
    cout << "Enter the number of ore samples: ";
    cin >> numSamples;

    cout << "Enter the ore grades for " << numSamples << " samples: " << endl;
    for (int i = 0; i < numSamples; i++) {
        double grade;
        cin >> grade;
        oreGrades.push_back(grade);
    }

    cout << "Enter the volume of the ore deposit (in cubic units): ";
    cin >> volume;

    double averageGrade = calculateAverageGrade(oreGrades);
    double highestGrade = calculateHighestGrade(oreGrades);
    double lowestGrade = calculateLowestGrade(oreGrades);
    double gradeVariability = calculateGradeVariability(oreGrades);
    double oreReserve = calculateOreReserve(averageGrade, volume);

    cout << "Average Grade: " << averageGrade << endl;
    cout << "Highest Grade: " << highestGrade << endl;
    cout << "Lowest Grade: " << lowestGrade << endl;
    cout << "Grade Variability: " << gradeVariability << endl;
    cout << "Ore Reserve: " << oreReserve << endl;

    // Ask the user for a cutoff grade to classify the ore
    cout << "Enter the cutoff grade to classify the ore (0 to 100): ";
    cin >> cutoffGrade;

    string oreClassification = classifyOreGrade(averageGrade, cutoffGrade);
    cout << "Ore Classification: " << oreClassification << endl;

    // Perform statistical analysis on the ore grades
    cout << "Statistical Analysis:" << endl;
    performStatisticalAnalysis(oreGrades);

    return 0;
}
