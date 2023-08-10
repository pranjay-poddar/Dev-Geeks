#include <iostream>
#include <cmath>

using namespace std;

// Function to convert degrees to radians
double toRadians(double degrees) {
    return degrees * M_PI / 180.0;
}

// Function to convert radians to degrees
double toDegrees(double radians) {
    return radians * 180.0 / M_PI;
}

int main() {
    char operation;
    double num1, num2;

    cout << "Engineering Calculator Command-Line Tool" << endl;
    cout << "---------------------------------------" << endl;

    cout << "Available operations:" << endl;
    cout << "Basic arithmetic: +, -, *, /" << endl;
    cout << "Trigonometric: s (sin), c (cos), t (tan)" << endl;
    cout << "Unit conversions: d2r (degrees to radians), r2d (radians to degrees)" << endl;
    cout << "Vector operations: vadd (vector addition), vsub (vector subtraction)" << endl;

    cout << "Enter the operation: ";
    cin >> operation;

    if (operation == 's' || operation == 'c' || operation == 't' || operation == 'd' || operation == 'r') {
        cout << "Enter the value: ";
        cin >> num1;
    } else if (operation == 'v') {
        cout << "Enter the first vector (x1 y1): ";
        cin >> num1 >> num2;
    } else {
        cout << "Enter the first number: ";
        cin >> num1;
        cout << "Enter the second number: ";
        cin >> num2;
    }

    double result;

    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 == 0) {
                cout << "Error: Division by zero is not allowed!" << endl;
                return 1;
            }
            result = num1 / num2;
            break;
        case 's':
            result = sin(toRadians(num1));
            break;
        case 'c':
            result = cos(toRadians(num1));
            break;
        case 't':
            result = tan(toRadians(num1));
            break;
        case 'd':
            result = toRadians(num1);
            break;
        case 'r':
            result = toDegrees(num1);
            break;
        case 'v':
            // Vector operations
            double x2, y2;
            cout << "Enter the second vector (x2 y2): ";
            cin >> x2 >> y2;
            if (operation == 'vadd') {
                result = num1 + x2;
                cout << "Result (x y): " << result << " " << num2 + y2 << endl;
            } else if (operation == 'vsub') {
                result = num1 - x2;
                cout << "Result (x y): " << result << " " << num2 - y2 << endl;
            } else {
                cout << "Error: Invalid vector operation!" << endl;
                return 1;
            }
            return 0;
        default:
            cout << "Error: Invalid operation!" << endl;
            return 1;
    }

    cout << "Result: " << result << endl;

    return 0;
}
