#include <iostream>
#include <math.h>
#include <cmath>
#include <algorithm>
using namespace std;

void volume()
{

    double s, ans, r, h, l, w;
    cout << "--------------------------------------------" << endl;
    cout << "VOLUME CALCULATION" << endl
         << endl;
    cout << "1. Cube\n\n2. Sphere\n\n3. Cylinder\n\n4. Rectangular Prism" << endl
         << endl;
    int choiceV;
    cout << "Enter Your Choice" << endl;
    cin >> choiceV;
    switch (choiceV)
    {
    case 1:
        cout << "--------------------------------------------" << endl;
        cout << "Enter side of cube" << endl;
        cin >> s;
        ans = s * s * s;
        cout << "Volume of Cube is: " << ans;
        break;
    case 2:
        cout << "--------------------------------------------" << endl;
        cout << "Enter radius of sphere" << endl;
        cin >> r;
        ans = 4.190 * r * r * r;
        cout << "Volume of Sphere is: " << ans;
        break;
    case 3:
        cout << "--------------------------------------------" << endl;
        cout << "Enter radius of cylinder" << endl;
        cin >> r;
        cout << endl;
        cout << "Enter height of cylinder" << endl;
        cin >> h;
        ans = 3.14 * r * r * h;
        cout << "Volume of Cylinder is: " << ans;
        break;
    case 4:
        cout << "--------------------------------------------" << endl;
        cout << "Enter width of Prism" << endl;
        cin >> w;
        cout << endl;
        cout << "Enter length of Prism" << endl;
        cin >> l;
        cout << endl;
        cout << "Enter height of prism" << endl;
        cin >> h;
        cout << endl;
        ans = w * l * h;
        cout << "Volume of Rectangular Prism is: " << ans;
        break;
    default:
        cout << "Invalid Choice" << endl;
    }
}

void SurfaceArea()
{

    double s, ans, r, h, l, w;
    cout << "--------------------------------------------" << endl;
    cout << "SURFACE AREA CALCULATION" << endl
         << endl;
    cout << "1. Cube\n\n2. Sphere\n\n3. Cylinder\n\n4. Rectangular Prism" << endl
         << endl;
    int choiceS;
    cout << "Enter Your Choice" << endl;
    cin >> choiceS;
    switch (choiceS)
    {
    case 1:
        cout << "--------------------------------------------" << endl;
        cout << "Enter side of cube" << endl;
        cin >> s;
        ans = 6 * s * s;
        cout << "Surface Area of Cube is: " << ans;
        break;
    case 2:
        cout << "--------------------------------------------" << endl;
        cout << "Enter radius of sphere" << endl;
        cin >> r;
        ans = 12.56 * r * r;
        cout << "Surface Area of Sphere is: " << ans;
        break;
    case 3:
        cout << "--------------------------------------------" << endl;
        cout << "Enter radius of cylinder" << endl;
        cin >> r;
        cout << endl;
        cout << "Enter height of cylinder" << endl;
        cin >> h;
        cout << endl;
        ans = 6.28 * r * (r + h);
        cout << "Surface Area of Cylinder is: " << ans;
        break;
    case 4:
        cout << "--------------------------------------------" << endl;
        cout << "Enter length of prism" << endl;
        cin >> l;
        cout << endl;
        cout << "Enter height of prism" << endl;
        cin >> h;
        cout << endl;
        cout << "Enter width of prism" << endl;
        cin >> w;
        cout << endl;
        ans = 2 * (w * l + h * l + h * w);
        cout << "Surface Area of Rectangular Prism is: " << ans;
        break;
    default:
        cout << "Invalid Choice" << endl;
    }
}
void Triangle()
{

    double s1, s2, s3, ans, maxi, mini1, mini2, s, heron;
    cout << "--------------------------------------------" << endl;
    cout << "1. Triangle Type\n\n2. Area of Triangle\n\n3. Perimeter of Triangle" << endl
         << endl;
    cout << "Enter your choice" << endl;
    int choiceT;
    cin >> choiceT;
    switch (choiceT)
    {
    case 1:
        cout << "--------------------------------------------" << endl;
        cout << "TRIANGLE TYPE" << endl
             << endl;
        cout << "Enter side 1: ";
        cin >> s1;
        cout << endl;
        cout << "Enter side 2: ";
        cin >> s2;
        cout << endl;
        cout << "Enter side 3: ";
        cin >> s3;
        cout << endl;
        if (((s1 + s2) > s3) && ((s2 + s3) > s1) && ((s1 + s3) > s2))
        {
            if (s1 != s2 && s2 != s3 && s1 != s3)
            {
                maxi = max(s1, s2);
                mini1 = min(s1, s2);
                maxi = max(maxi, s3);
                mini2 = min(maxi, s3);
                if (maxi * maxi == ((mini1 * mini1) + (mini2 * mini2)))
                {
                    cout << "Type of Triangle is: Right angled-Scalene" << endl;
                }
                else
                {
                    cout << "Type of Triangle is: Scalene" << endl;
                }
            }
            else if (s1 == s2 && s2 == s3)
            {
                cout << "Type of Triangle is: Equilateral" << endl;
            }
            else
            {
                cout << "Type of Triangle is: Isosceles" << endl;
                maxi = max(s1, s2);
                mini1 = min(s1, s2);
                maxi = max(maxi, s3);
                mini2 = min(maxi, s3);
                if (maxi * maxi == ((mini1 * mini1) + (mini2 * mini2)))
                {
                    cout << "Type of Triangle is: Right angled-Isosceles" << endl;
                }
                else
                {
                    cout << "Type of Triangle is: Isosceles" << endl;
                }
            }
        }
        else
        {
            cout << "This Triangle is not Possible" << endl;
        }
        break;
    case 2:
        cout << "--------------------------------------------" << endl;
        cout << "AREA OF TRIANGLE" << endl
             << endl;
        cout << "Enter side 1: ";
        cin >> s1;
        cout << endl;
        cout << "Enter side 2: ";
        cin >> s2;
        cout << endl;
        cout << "Enter side 3: ";
        cin >> s3;
        cout << endl;
        if (((s1 + s2) > s3) && ((s2 + s3) > s1) && ((s1 + s3) > s2))
        {
            s = (s1 + s2 + s2) / 2;
            heron = s * (s - s1) * (s - s2) * (s - s3);
            ans = pow(heron, 0.5);
            cout << "Area of Triangle is: " << ans;
        }
        else
        {
            cout << "This Triangle is not Possible" << endl;
        }
        break;
    case 3:
        cout << "--------------------------------------------" << endl;
        cout << "PERIMETER OF TRIANGLE" << endl
             << endl;
        cout << "Enter side 1: ";
        cin >> s1;
        cout << endl;
        cout << "Enter side 2: ";
        cin >> s2;
        cout << endl;
        cout << "Enter side 3: ";
        cin >> s3;
        cout << endl;
        if (((s1 + s2) > s3) && ((s2 + s3) > s1) && ((s1 + s3) > s2))
        {
            s = (s1 + s2 + s3);
            cout << "Perimeter of Triangle is: " << s;
        }
        else
        {
            cout << "This Triangle is not Possible" << endl;
        }
        break;
    default:
        cout << "Invalid Choice" << endl;
    }
}

void Distance()
{

    double x1, y1, x2, y2, ans, d;
    cout << "--------------------------------------------" << endl;
    cout << "2D DISTANCE CALCULATOR" << endl;
    cout << "Enter coordinates of point 1: ";
    cin >> x1 >> y1;
    cout << endl;
    cout << "Enter coordinates of point 2: ";
    cin >> x2 >> y2;
    d = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    ans = pow(d, 0.5);
    cout << "Distance between the 2 points is: " << ans;
}

void Circle()
{
    int centerX, centerY,C,D,E;
    double radius;
    double centralAngle;
    double distanceFromCenter;

    int option;

    cout << "Circle Properties\n";
    cout << "1. General Equation of Circle\n";
    cout << "2. Calculate Sector Area\n";
    cout << "3. Calculate Length of Tangent\n";
    cout << "4. Calculate Chord Length\n";
    cout << "5. Calculate Arc Length\n";
    cout << "6. Quit\n";
    cout << "Select an option: ";
    cin >> option;

    switch (option)
    {
    case 1:
        cout << "Enter the x-coordinate of the center: ";
        cin >> centerX;
        cout << "Enter the y-coordinate of the center: ";
        cin >> centerY;
        cout << "Enter the radius: ";
        cin >> radius;

         C = 2 * centerX;
         D = 2 * centerY;
         E = centerX * centerX + centerY * centerY - radius * radius;

        if (centerX > 0 && centerY > 0)
        {
            cout << "General Equation of Circle: "
                 << "x^2"
                 << " + "
                 << "y^2"
                 << " - " << C << "x"
                 << " - " << D << "y"
                 << " + " << E << " = 0";
        }

        else if (centerX < 0 && centerY < 0)
        {
            cout << "General Equation of Circle: "
                 << "x^2"
                 << " + "
                 << "y^2"
                 << " + " << C << "x"
                 << " + " << D << "y"
                 << " + " << E << " = 0";
        }

        else if (centerX > 0 && centerY < 0)
        {
            cout << "General Equation of Circle: "
                 << "x^2"
                 << " + "
                 << "y^2"
                 << " - " << C << "x"
                 << " + " << D << "y"
                 << " + " << E << " = 0";
        }

        else if (centerX < 0 && centerY > 0)
        {
            cout << "General Equation of Circle: "
                 << "x^2"
                 << " + "
                 << "y^2"
                 << " + " << C << "x"
                 << " - " << D << "y"
                 << " + " << E << " = 0";
        }
        else
        {
            cout << "General Equation of Circle: "
                 << "x^2"
                 << " + "
                 << "y^2"
                 << " + " << E << " = 0";
        }
        break;
    case 2:
    {
        cout << "Enter the central angle in degrees: ";
        cin >> centralAngle;
        cout << "Enter the radius: ";
        cin >> radius;
        double sectorArea = (centralAngle / 360.0) * M_PI * pow(radius, 2);
        cout << "Sector Area: " << sectorArea << endl;
        break;
    }
    case 3:
    {
        cout << "Enter the distance from the center: ";
        cin >> distanceFromCenter;
        cout << "Enter the radius: ";
        cin >> radius;
        if (distanceFromCenter >= radius)
        {
            cout << "Error: Distance from center must be less than the radius.\n";
        }
        else
        {
            double tangentLength = sqrt(radius * radius - distanceFromCenter * distanceFromCenter);
            cout << "Tangent Length: " << tangentLength << endl;
        }
        break;
    }
    case 4:
    {
        cout << "Enter the distance from the center: ";
        cin >> distanceFromCenter;
        cout << "Enter the radius: ";
        cin >> radius;
        if (distanceFromCenter >= radius)
        {
            cout << "Error: Distance from center must be less than the radius.\n";
        }
        else
        {
            double chordLength = 2 * sqrt(radius * radius - distanceFromCenter * distanceFromCenter);
            cout << "Chord Length: " << chordLength << endl;
        }
        break;
    }
    case 5:
    {
        cout << "Enter the central angle in degrees: ";
        cin >> centralAngle;
        cout << "Enter the radius: ";
        cin >> radius;
        double arcLength = (centralAngle / 360.0) * (2 * M_PI * radius);
        cout << "Arc Length: " << arcLength << endl;
        break;
    }
    case 6:
        cout << "Exiting the program. Goodbye!\n";
        break;
    default:
        cout << "Invalid option. Please try again.\n";
        break;
    }
}

int main()
{

    cout << "\n====WELCOME TO MATHSCAPE MASTER====" << endl
         << endl;
    cout << "1. Volume Calculation\n\n2. Surface Area Calculation\n\n3. Triangle Solver\n\n4. 2D Distance Calculator\n\n5. Circle Properties/Calculations" << endl;
    int choice;
    cout << endl;
    cout << "Enter Your Choice" << endl;
    cin >> choice;
    switch (choice)
    {
    case 1:
        volume();
        break;
    case 2:
        SurfaceArea();
        break;
    case 3:
        Triangle();
        break;
    case 4:
        Distance();
        break;
    case 5:
        Circle();
        break;
    default:
        cout << "Invalid Choice" << endl;
    }

    return 0;
}