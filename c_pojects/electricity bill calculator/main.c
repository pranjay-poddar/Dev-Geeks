
/*  Program to input electricity units consumed and calculate the electricity bill accordingly
For first 50 units - Rs 0.50/unit
For next 100 units - Rs 0.75/unit
For next 100 units - Rs 1.20/unit
For units above 250 - Rs 1.50/unit */

#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
int main()
{
    float unit, bill;
    int choice;
    printf("\n\n\t\t\t\t\t\t Electricity Bill Calculator");
    printf("\n\n Enter the number of units consumed:");
    scanf("%f", &unit);

    printf("Please select from the given options\n\n");

    printf("1.Less than or Equal to 50 units\n");
    printf("2.Less than or Equal to 150 units\n");
    printf("3.Less than or Equal to 250 units\n");
    printf("4.More than 250 units\n");
    printf("Option no:");
    scanf("%d", &choice);
    switch (choice)
    {
    case 1:
        if (unit <= 50)
            bill = unit * 0.50;
        break;
    case 2:
        if (unit <= 150)
            bill = 25 + (unit - 50) * 0.75;
        break;
    case 3:
        if (unit <= 250)
            bill = 100 + (unit - 150) * 1.20;
        break;
    case 4:
        if (unit > 250)
            bill = 220 + (unit - 250) * 1.50;
        break;
    default:
        printf("Invalid Choice\n");
    }

    printf("\t\t\t\t\t\t Bill Summary\n\n");

    printf(" Units consumed = %f \n Electricity bill = Rs.%f", unit, bill);
    return 0;
}
