#include <iostream>
#include <cmath>

using namespace std;

int main() {
    char operatorSymbol;
    double num1, num2, result;
    int fact=1;
    // Get operator symbol from the user
    cout << "Enter operator\n1. + for addition\n2. - for subtraction\n3. * for multiplication\n4. / for division\n5. ^ for calculating power\n6. S for sine\n7. C for cosine\n8. T for tan\n9. e for exponential\n10. l for log\n11. r for rounding off\n12. f for factorial\n13. p for percentage "<<endl;
    cin >> operatorSymbol;

    // Perform the operation based on the operator symbol
    switch (operatorSymbol) {
        case '+':
            cout << "Enter two numbers"<<endl;
            cin>>num1>>num2;
            result = num1 + num2;
            break;
        case '-':
            cout << "Enter two numbers"<<endl;
            cin>>num1>>num2;
            result = num1 - num2;
            break;
        case '*':
            cout << "Enter two numbers"<<endl;
            cin>>num1>>num2;
            result = num1 * num2;
            break;
        case '/':
            cout << "Enter two numbers"<<endl;
            cin>>num1>>num2;
            // Check if the second number is zero (division by zero)
            if (num2 == 0) {
                cout << "Error: Division by zero is not allowed." << endl;
                return 1;
            }
            result = num1 / num2;
            break;
        case '^':
            cout << "Enter two numbers"<<endl;
            cin>>num1>>num2;
            result = pow(num1, num2);
            break;
        case 'S':
            cout << "Enter angle in Radians"<<endl;
            cin>>num1;
            result = sin(num1);
            break;
        case 'C':
            cout << "Enter angle in Radians"<<endl;
            cin>>num1;
            result = cos(num1);
            break;
        case 'T':
            cout << "Enter angle in Radians"<<endl;
            cin>>num1;
            result = tan(num1);
            break;
        case 'e':
            cout<<"Enter number"<<endl;
            cin>>num1;
            result=exp(num1);
            break;
        case 'l':
            cout<<"Enter number"<<endl;
            cin>>num1;
            result=log(num1);
            break;
        case 'r':
            cout<<"Enter number"<<endl;
            cin>>num1;
            result=round(num1);
            break;
        case 'f':
            cout<<"Enter number"<<endl;
            cin>>num1;
            for(int i=1;i<=num1;i++){
                fact=fact*i;
            }
            result=fact;
            break;
        case 'p':
            cout<<"Enter marks obtained"<<endl;
            cin>>num1;
            cout<<"Enter total marks"<<endl;
            cin>>num2;
            result=100*((num1)/(num2));
            break;
        default:
            cout << "Error: Invalid operator." << endl;
            return 1;
    }

    // Display the result
    cout << "Result: " << result << endl;

    return 0;
}
