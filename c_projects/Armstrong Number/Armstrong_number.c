#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int digits(int num) {//function to count number of digits in a number
    int count = 0;
    while(num>0) {
        count += 1;
        num /= 10;        
    }
    return count;
}

int main() {
    int n,ncopy, count, sum = 0;
    // ncopy stores the copy of input n
    printf("Enter a number to check if its Armstrong\n");
    scanf("%d",&n);
    if(n<=0) {
        printf("Invalid input\n");
        exit;
    }
    ncopy = n;
    count = digits(n);// counting digits in n
    while(ncopy > 0) {
        sum = sum + pow(ncopy%10, count);
        ncopy/=10;
    }
    // sum of digits each raised to number of digits
    // printing output
    if(sum == n) {
        printf("%d is an Armstrong number\n", n);
    }
    else {
        printf("%d is not an Armstrong number\n", n);
    }
    return 0;
}