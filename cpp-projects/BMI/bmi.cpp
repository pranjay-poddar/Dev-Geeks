#include <iostream>
#include <iomanip>
using namespace std;

// Function to calculate BMI
double calculateBMI(double weight, double height, string weightUnit, string heightUnit)
{
    if (weightUnit == "lb")
    {
        weight *= 0.453592; // Convert pounds to kilograms
    }
    if (heightUnit == "ft")
    {
        height *= 0.3048; // Convert feet to meters
    }
    else if (heightUnit == "cm")
    {
        height *= 0.01; // Convert centimeters to meters
    }
    return weight / (height * height);
}

// Function to interpret BMI category
string interpretBMI(double bmi)
{
    if (bmi < 18.5)
    {
        return "Underweight";
    }
    else if (bmi < 25)
    {
        return "Normal weight";
    }
    else if (bmi < 30)
    {
        return "Overweight";
    }
    else
    {
        return "Obese";
    }
}

// Function to provide health advice for underweight
void getUnderweightAdvice()
{
    cout << "-------------------------------" << endl;
    cout << "Health Advice for Underweight:" << endl;
    cout << "1. Being underweight may indicate malnutrition or other health issues. It's important to focus on a balanced diet and consult with a healthcare professional for guidance." << endl;
    cout << "2. Incorporate nutrient-dense foods into your diet, such as lean proteins, whole grains, fruits, and vegetables." << endl;
    cout << "3. Consider working with a registered dietitian to develop a personalized meal plan to help you reach a healthy weight." << endl;
    cout << "4. Engage in strength training exercises to build muscle mass and improve overall body composition." << endl;
    cout << "5. Monitor your weight regularly and seek medical advice if you're unable to gain weight despite efforts." << endl;
    cout << "-------------------------------" << endl;
}

// Function to provide health advice for normal weight
void getNormalWeightAdvice()
{
    cout << "-------------------------------" << endl;
    cout << "Health Advice for Normal Weight:" << endl;
    cout << "1. Congratulations! Your weight is within the healthy range. Maintain a balanced diet and regular exercise to stay healthy." << endl;
    cout << "2. Continue to make healthy food choices and focus on nutrient-dense foods to support overall well-being." << endl;
    cout << "3. Engage in regular physical activity to maintain fitness and prevent weight gain." << endl;
    cout << "4. Monitor your weight regularly and adjust your lifestyle if you notice any significant changes." << endl;
    cout << "5. Prioritize self-care and mental well-being alongside maintaining a healthy weight." << endl;
    cout << "-------------------------------" << endl;
}

// Function to provide health advice for overweight
void getOverweightAdvice()
{
    cout << "-------------------------------" << endl;
    cout << "Health Advice for Overweight:" << endl;
    cout << "1. Being overweight may increase the risk of developing various health problems. Consider making lifestyle changes such as regular exercise and a balanced diet to achieve a healthier weight." << endl;
    cout << "2. Include more fruits, vegetables, whole grains, and lean proteins in your diet while reducing the intake of processed foods and sugary beverages." << endl;
    cout << "3. Engage in regular aerobic exercise, such as brisk walking, swimming, or cycling, for at least 150 minutes per week." << endl;
    cout << "4. Practice portion control and mindful eating to avoid overeating and manage weight effectively." << endl;
    cout << "5. Seek support from a healthcare professional or a registered dietitian for personalized guidance and support." << endl;
    cout << "-------------------------------" << endl;
}

// Function to provide health advice for obese
void getObeseAdvice()
{
    cout << "-------------------------------" << endl;
    cout << "Health Advice for Obese:" << endl;
    cout << "1. Obesity is associated with a higher risk of numerous health conditions. It's important to consult with a healthcare professional for guidance on weight management and developing a healthier lifestyle." << endl;
    cout << "2. Focus on a well-balanced diet consisting of whole foods, including fruits, vegetables, lean proteins, and whole grains." << endl;
    cout << "3. Engage in regular physical activity, such as cardiovascular exercises and strength training, to improve overall fitness and support weight loss." << endl;
    cout << "4. Consider seeking support from a registered dietitian or weight loss specialist for personalized meal plans and strategies to achieve weight loss goals." << endl;
    cout << "5. Prioritize self-care and mental well-being alongside making positive changes to your lifestyle." << endl;
    cout << "-------------------------------" << endl;
}

int main()
{
    // User inputs
    double weight, height;
    string weightUnit, heightUnit;

    // Prompt the user for weight, height, and units of measurement
    cout << "Welcome to the BMI calculator!" << endl;
    cout << "Enter your weight: ";
    cin >> weight;
    cout << "Enter the unit of measurement for weight (kg/lb): ";
    cin >> weightUnit;
    cout << "Enter your height: ";
    cin >> height;
    cout << "Enter the unit of measurement for height (ft/cm): ";
    cin >> heightUnit;

    // Calculate BMI
    double bmi = calculateBMI(weight, height, weightUnit, heightUnit);

    // Interpret BMI category
    string bmiCategory = interpretBMI(bmi);

    // Display BMI and category
    cout << fixed << setprecision(2);
    cout << "Your BMI is: " << bmi << endl;
    cout << "BMI Category: " << bmiCategory << endl;

    // Provide health advice based on BMI category
    cout << "Health Advice: " << endl;

    if (bmiCategory == "Underweight")
    {
        getUnderweightAdvice();
    }
    else if (bmiCategory == "Normal weight")
    {
        getNormalWeightAdvice();
    }
    else if (bmiCategory == "Overweight")
    {
        getOverweightAdvice();
    }
    else
    {
        getObeseAdvice();
    }

    return 0;
}
