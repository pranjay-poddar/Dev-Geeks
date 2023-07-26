#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int zeroes(int x) {
    if(x==0) {
        return 1;
    }
    else if(x>0 && x<10) {
        return 0;
    }
    else if(x%10==0) {
        return (1+zeroes(x/10));
    }
    else {
        return zeroes(x/10);
    }
}

void main() {
    int num;
    printf("Enter a number to count number of zeroes\n");
    scanf("%d", &num); // taking input number
    if(num<0) { // if entered number is negative, taking its absolute value
        num = abs(num);// ignoring the negative sign
    }
    printf("Number of zeroes: %d\n", zeroes(num));// printing output
}