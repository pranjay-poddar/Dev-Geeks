#include <stdio.h>
//Solving the Tower of Hanoi puzzle using RECURSION
//Transferring n discs in order from 'Left' to 'Right' using 'Centre'(aux) rod
void towers(int n,char from,char to,char aux)
{
    if(n==1)
    {
        printf("Disk 1: %c -> %c\n",from,to);
        return;        //return here stops the program after disk 1, else infinite function calls
    }
    towers(n-1,from,aux,to);
    printf("Disk %d: %c -> %c\n",n,from,to);
    towers(n-1,aux,to,from);
}
void main()
{
    int x;
    printf("Enter number of discs x\n");
    scanf("%d",&x);// taking number of discs as input
    printf("Procedure with minimum number of moves:\n");
    towers(x,'L','R','C');//recursive call to towers() function
}
