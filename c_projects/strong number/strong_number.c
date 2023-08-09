#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int fact(int num) {
    int prod=1;
    for(int i=1;i<=num;i++) {
        prod *= i;
    }
    return prod;
}

int check_strong(int num) {
    int ncopy=num, sum=0;
    while(ncopy>0) {
        sum += fact(ncopy%10);
        ncopy/=10;
    }
    if(sum==num) {
        return 1;
    }
    else {
        return 0;
    }
}

int main() {
    int n, res=0, count=0;
    printf("Enter a limit upto which the strong numbers are to be displayed\n");
    scanf("%d", &n);
    printf("Strong numbers in the specified limit: ");
    for(int i=0;i<=n;i++) {
        res = check_strong(i);
        if(res==1) {
            printf("%d ", i);
            count++;
        }
    }
    if(count==0) {
        printf("None\n");
    }
    return 0;
}