#include<stdio.h>
#include<conio.h>
void Kelvin(double K)  // Funtion to convert Kelvin to Celsius and Fahrenheit.
{
    printf("Temperature  ");
    printf("\nIn Celsius : %f ",K-273.15);       
    printf("\nIn Fahrenheit : %f ",((K-273.15)*9/5+32));
}
void Celsius(double C) // Funtion to convert Celsius to Kelvin and Fahrenheit.
{
    printf("Temperature  ");
    printf("\nIn Kelvin : %f ",(C+273.15));
    printf("\nIn Fahrenheit : %f ",(C * 9/5) + 32);
}
void Fahrenheit(double F) // Funtion to convert Fahrenheit to Kelvin and Celius.
{
    printf("Temperature  ");
    printf("\nIn Kelvin : %f ",((F - 32) * 5/9 + 273.15));
    printf("\nIn Celsius : %f ",((F - 32) * 5/9));
}
void main()
{
    int choice;
    double degree;
    printf("\nEnter 1 for Kelvin to Other Conversion. ");
    printf("\nEnter 2 for Celsius to Other Conversion. ");
    printf("\nEnter 3 for Fahrenheit to Other Conversion. ");
    printf("\nEnter your choice : ");
    scanf("%d",&choice);
    switch(choice)
    {
        case 1:
        printf("Enter the degree in Kelvin : ");
        scanf("%lf",&degree);
        Kelvin(degree);
        break;
        case 2:
        printf("Enter the degree in Celsius : ");
        scanf("%lf",&degree);
        Celsius(degree);
        break;
        case 3:
        printf("Enter the degree in Fahrenheit : ");
        scanf("%lf",&degree);
        Fahrenheit(degree);
        break;
        default:
        printf("Wrong Choice");
        break;
    }
    
}