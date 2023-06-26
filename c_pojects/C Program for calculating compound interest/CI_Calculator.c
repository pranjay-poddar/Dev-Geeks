#include <stdio.h>
#include <math.h>

int main()
{
    double principal, rate, time, compoundInterest;
    int frequency;

    while (1)
    {
         
        printf("Enter the principal amount: ");
        scanf("%lf", &principal);

        printf("Enter the interest rate (in percentage): ");
        scanf("%lf", &rate);

        printf("Enter the time period (in years): ");
        scanf("%lf", &time);

        printf("Enter the compounding frequency per year: ");
        scanf("%d", &frequency);
        rate = rate / 100;
        compoundInterest = principal * pow((1 + rate / frequency), frequency * time) - principal;
        printf("Compound Interest: %.2lf\n", compoundInterest);

        char choice;
        printf("Do you want to calculate compound interest again? (y/n): ");
        scanf(" %c", &choice);

        if (choice != 'y' && choice != 'Y')
        {
            break;
        }
        printf("\n");
    }

    return 0;
}