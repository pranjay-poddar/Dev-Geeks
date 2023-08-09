#include <iostream>
#include <map>
#include <string>
#include <algorithm> // for std::transform
#include <locale>    // for std::locale and std::tolower

using namespace std;

// Function to calculate the Rock Mass Rating (RMR) based on input parameters
int calculateRMR(int cohesion, int frictionAngle, int jointSpacing, int jointCondition, int groundwater) {
    int rmr = cohesion + frictionAngle + jointSpacing + jointCondition + groundwater;
    return rmr;
}

// Function to classify the rock mass based on RMR values
string classifyRockMass(int rmr) {
    if (rmr >= 81)
        return "Class I - Very Good";
    else if (rmr >= 61)
        return "Class II - Good";
    else if (rmr >= 41)
        return "Class III - Fair";
    else if (rmr >= 21)
        return "Class IV - Poor";
    else
        return "Class V - Very Poor";
}

// Function to display the classification details and engineering recommendations
void displayClassificationDetails(int rmr) {
    cout << "Rock Mass Classification Details:" << endl;
    cout << "--------------------------------" << endl;
    cout << "Rock Mass Rating (RMR): " << rmr << endl;
    cout << "Rock Mass Class: " << classifyRockMass(rmr) << endl;

    // Add more classification details and engineering recommendations based on RMR value
    if (rmr >= 81) {
        cout << "Engineering Recommendations: Suitable for almost all types of excavation." << endl;
    } else if (rmr >= 61) {
        cout << "Engineering Recommendations: Suitable for most types of excavation with minor support requirements." << endl;
    } else if (rmr >= 41) {
        cout << "Engineering Recommendations: Suitable for some types of excavation with careful planning and support." << endl;
    } else if (rmr >= 21) {
        cout << "Engineering Recommendations: Suitable for very few types of excavation with extensive support measures." << endl;
    } else {
        cout << "Engineering Recommendations: Unsuitable for excavation without extensive support measures." << endl;
    }
}

// Function to display a summary of rock mass properties
void displayRockMassProperties(int cohesion, int frictionAngle, int jointSpacing, int jointCondition, int groundwater) {
    cout << "Rock Mass Properties:" << endl;
    cout << "---------------------" << endl;
    cout << "Cohesion (kPa): " << cohesion << endl;
    cout << "Friction Angle (degrees): " << frictionAngle << endl;
    cout << "Joint Spacing (cm): " << jointSpacing << endl;
    cout << "Joint Condition (1 to 3): " << jointCondition << endl;
    cout << "Groundwater (1 to 3): " << groundwater << endl;
}

int main() {
    int cohesion, frictionAngle, jointSpacing, jointCondition, groundwater;

    cout << "Rock Mass Classification System (Rock Mass Rating - RMR)" << endl;
    cout << "Enter the following parameters:" << endl;

    cout << "1. Cohesion (in kPa): ";
    cin >> cohesion;

    cout << "2. Friction Angle (in degrees): ";
    cin >> frictionAngle;

    cout << "3. Joint Spacing (in cm): ";
    cin >> jointSpacing;

    cout << "4. Joint Condition (1 to 3): ";
    cin >> jointCondition;

    cout << "5. Groundwater (1 to 3): ";
    cin >> groundwater;

    int rmr = calculateRMR(cohesion, frictionAngle, jointSpacing, jointCondition, groundwater);
    cout << "Rock Mass Rating (RMR): " << rmr << endl;

    displayClassificationDetails(rmr);

    displayRockMassProperties(cohesion, frictionAngle, jointSpacing, jointCondition, groundwater);

    return 0;
}
