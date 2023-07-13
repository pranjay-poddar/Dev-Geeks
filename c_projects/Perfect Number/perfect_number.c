#include <stdio.h>

char perfect(int x) {
    int sum=0;
    for(int j=1;j<x;j++) {
        if(x%j==0) {
            sum+=j;
        }
    }
    if(x==sum) {
        return 'Y';
    }
    else {
        return 'N';
    }

}
void main() {
    int lowl, upl; //lowl, upl denote the lower and upper boundaries of the range respectively
    int count=0;
    printf("Enter lower limit of search\n");
    scanf("%d",&lowl);
    printf("Enter upper limit of search\n");
    scanf("%d",&upl);
    if(lowl<0 || upl<0 || lowl>upl) {
        printf("invalid input\n");
        return;
    }
    printf("Perfect numbers in the said range: ");
    for(int i=lowl;i<=upl;i++) {
        if(perfect(i)=='Y') {
            printf("%d ",i);
            count += 1;
        }
    }
    if(count==0) {
        printf("None\n");
    }
}