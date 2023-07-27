#include <stdio.h>
#include <math.h>

void towers(int n, char from, char to, char aux) {
    if(n==1) {
        printf("Disc 1: %c -> %c\n", from, to);
        return;
    }
    towers(n-1, from, aux, to);
    // first, discs are transferred from L to C using R as support
    printf("Disc %d: %c -> %c\n", n, from, to);
    towers(n-1, aux, to, from);
    // next, discs are transferred from C to R using L as support

}

int main() {
    int x, minmoves;
    printf("Enter number of discs\n");
    scanf("%d", &x); // x is the input number of discs
    minmoves = pow(2,x) - 1;
    printf("number of minimum moves: %d\n", (int)minmoves);
    printf("Procedure with minimum number of moves:\n");
    towers(x,'L','R','C');// L: left rod, R: right rod, C: centre rod
    // initially, L: from, R: to, C: auxiliary
}