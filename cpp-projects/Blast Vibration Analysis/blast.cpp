#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

// Function to calculate the Peak Particle Velocity (PPV) at a given distance from the blast
double calculatePPV(double distance, double chargeWeight, double distanceExponent) {
    const double k = 0.31; // Empirical constant

    return k * pow(chargeWeight, 0.8) / pow(distance, distanceExponent);
}

// Function to classify the blast vibration based on the PPV value
string classifyVibration(double ppv) {
    if (ppv < 5.0) {
        return "Negligible";
    } else if (ppv < 12.0) {
        return "Light";
    } else if (ppv < 25.0) {
        return "Moderate";
    } else if (ppv < 50.0) {
        return "Severe";
    } else {
        return "Destructive";
    }
}

// Function to calculate the scaled distance (SD) for a given distance and charge weight
double calculateScaledDistance(double distance, double chargeWeight) {
    return distance / pow(chargeWeight, 1.0 / 3.0);
}

// Function to estimate the air overpressure (noise) from the blast at a given distance
double calculateAirOverpressure(double distance, double chargeWeight, double scaledDistance) {
    const double kNoise = 10.0; // Empirical constant for air overpressure

    return kNoise * (chargeWeight / pow(distance, 2)) * exp(-scaledDistance);
}

// Function to estimate the ground vibration frequency based on charge weight
double estimateGroundVibrationFrequency(double chargeWeight) {
    const double kFrequency = 200.0; // Empirical constant for ground vibration frequency

    return kFrequency * pow(chargeWeight, 0.25);
}

int main() {
    double distance;        // Distance from the blast (in meters)
    double chargeWeight;    // Weight of the explosive charge (in kilograms)
    double distanceExponent;// Distance exponent (depends on the geology and type of explosive)

    // Input from user
    cout << "Blast Vibration Analysis" << endl;
    cout << "Enter the distance from the blast (in meters): ";
    cin >> distance;

    cout << "Enter the weight of the explosive charge (in kilograms): ";
    cin >> chargeWeight;

    cout << "Enter the distance exponent (typically between 0.5 and 2.0): ";
    cin >> distanceExponent;

    // Calculate blast effects
    double ppv = calculatePPV(distance, chargeWeight, distanceExponent);
    double scaledDistance = calculateScaledDistance(distance, chargeWeight);
    double airOverpressure = calculateAirOverpressure(distance, chargeWeight, scaledDistance);
    double groundVibrationFrequency = estimateGroundVibrationFrequency(chargeWeight);

    // Output blast effects
    cout << "Peak Particle Velocity (PPV) at " << distance << " meters from the blast: " << ppv << " mm/s" << endl;
    cout << "Scaled Distance: " << scaledDistance << endl;
    cout << "Air Overpressure at " << distance << " meters from the blast: " << airOverpressure << " Pa" << endl;
    cout << "Estimated Ground Vibration Frequency: " << groundVibrationFrequency << " Hz" << endl;

    // Classify vibration intensity
    string vibrationClassification = classifyVibration(ppv);
    cout << "Vibration Classification: " << vibrationClassification << endl;

    return 0;
}
