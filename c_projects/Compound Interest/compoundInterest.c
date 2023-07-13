#include <stdio.h>
#include <math.h>

float amount(float p, float r, float t, float n) {
    float a;
    a = p*(pow(1+r*0.01/n,n*t));
    return a;
}

int main() {
    float p,r,t,n,a;
    printf("Compound interest\n");
    printf("Enter the principal amount (in Rs.): ");
    scanf("%f", &p);
    printf("\nEnter the rate of interest (in percentage): ");
    scanf("%f", &r);
    printf("\nEnter the time in years: ");
    scanf("%f", &t);
    printf("\nEnter the freq. (number of times interest is compounded in a year): ");
    scanf("%f", &n); // compounding frequency
    a = amount(p,r,t,n);
    printf("\nAmount (in Rs.): %f\n", a);
    return 0;
}
// amount = principal + interest
// interest can be calculated as amount - principal amount