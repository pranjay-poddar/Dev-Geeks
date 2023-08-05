#include <stdio.h>
#include <math.h>
#include <stdlib.h>

int digits(int num) {
    int count = 0;
    while(num>0) {
        num /= 10;
        count += 1;
    }
    return count;
}

int main() {
    int n, ncopy, count, sum=0;
    printf("Dudeney numbers in base 10 and power 3\n");
    printf("Enter a number to check if it is Dudeney number or not: ");
    scanf("%d", &n);
    ncopy = n;
    count = digits(n);
    for(int i=0;i<count;i++) {
        sum += n%10;
        n/=10;
    }
    if(pow(sum,3) == ncopy) {
        printf("%d is a Dudeney number\n", ncopy);
    }
    else {
        printf("%d is not a Dudeney number\n", ncopy);
    }
    return 0;
}