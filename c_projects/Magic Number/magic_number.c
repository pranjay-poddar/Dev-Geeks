#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int reverse(int num, int count) { // this function returns the reverse of a number
    int rev=0;
    for(int i=count-1;i>=0;i--) {
        rev += pow(10,i)*(num%10);
        num/=10;
    }
    return rev;
}

int digits(int num) { // this function calculates the number of digits in a number
    int count=0;
    while(num>0) {
        num /= 10;
        count += 1;
    }
    return count;
}

int main() {
    int n, ncopy, count, rev, digitSum, sum=0;
    printf("Magic numbers\n");
    printf("Enter a number to check if it is Magic number or not: ");
    scanf("%d", &n);
    ncopy = n;
    // calculating sum of digits of the input number
    count = digits(n);
    for(int i=0;i<count;i++) {
        sum += n%10;
        n/=10;
    }
    // finding the reverse of the sum of digits
    digitSum = digits(sum);
    rev = reverse(sum, digitSum);
    // checking if the product of sum and reverse sum is equal to the input number
    if(sum*rev == ncopy) {
        printf("%d is a Magic number\n", ncopy);
    }
    else {
        printf("%d is not a Magic number\n", ncopy);
    }
    return 0;
}