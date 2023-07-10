#include <stdio.h>

int isPerfectNumber(int number) {
   int i, sum = 0;

   for (i = 1; i < number; i++) {
      if (number % i == 0) {
         sum += i;
      }
   }

   if (sum == number) {
      return 1; // Number is perfect
   } else {
      return 0; // Number is not perfect
   }
}

int main() {
   int number;

   printf("Enter a number: ");
   scanf("%d", &number);

   if (isPerfectNumber(number)) {
      printf("%d is a perfect number.\n", number);
   } else {
      printf("%d is not a perfect number.\n", number);
   }

   return 0;
}