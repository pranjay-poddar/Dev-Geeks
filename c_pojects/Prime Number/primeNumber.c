#include <stdio.h>

int main() {
    int n, count=0;
    printf("Enter the number to be tested\n");
    scanf("%d", &n);
    // taking input number
    printf("Divisors of %d: ", n);
    // printing the divisors of that number
    for(int i=1; i<=n; i++) {
        if(n%i==0) {
            printf("%d ", i);
            ++count;
        }
    }
    // iterating from 1 to n to find divisors
    if(count==2) {
        printf("\n%d is prime\n", n);
    } // only two divisors (1 and n) implies n is prime
    else {
        printf("\n%d is not prime\n", n);
    }// more than two divisors implies composite
    return 0;
}