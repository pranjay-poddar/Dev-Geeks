#include<stdio.h>
void listing(int a[],int b[],int n)
{
    int i,j,temp=0,roll_temp;
    for(i=0 ;i<n-1 ; i++)
    {
        for(j=0 ; j<n-i-1 ; j++)
        {
            if(b[j]<b[j+1])
            {
                temp=b[j];
                b[j]=b[j+1];
                b[j+1]=temp;

                roll_temp=a[j];
                a[j]=a[j+1];
                a[j+1]=roll_temp;
            }
        }
    }
}
void listPRINTING(int a[],int b[],int n)
{
    int i,j;
    printf("\nHence the list of students according to their descending roll numbers are ::");
    printf("\n\n\tROLL NO.\tMARKS");
    for(i=0 ; i<n ; i++)
    {
        printf("\n\n\t%d\t\t%d\n",a[i],b[i]);
    }
}
int main()
{
    int i,j,n;
    printf("ENTER THE NUMBER OF STUDENTS :: ");
    scanf("%d",&n);
    int a[n],b[n];
    printf("\nEnter thye roll numbers :: ");
    for(i=0 ; i<n ; i++)
    {
        scanf("%d",&a[i]);
    }
    printf("\nEnter the marks of students respectively :: ");
    for(i=0 ; i<n ; i++)
    {
        scanf("%d",&b[i]);
    }
    listing(a,b,n);
    listPRINTING(a,b,n);
    return 0;
}