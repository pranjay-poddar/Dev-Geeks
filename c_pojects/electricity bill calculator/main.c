
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
    printf("\n Enter the number of units consumed\n");
    scanf("%f", &unit);
    if (unit <= 50)
    {
        bill = unit * 0.50;
    }
    else if (unit <= 150)
    {
        bill = 25 + (unit - 50) * 0.75;
    }
    else if (unit <= 250)
    {
        bill = 100 + (unit - 150) * 1.20;
    }
    else
    {
        bill = 220 + (unit - 250) * 1.50;
    }
    printf("\n Units consumed = %f .\n Electricity bill = %f", unit, bill);
    getch;
    return 0;
}
