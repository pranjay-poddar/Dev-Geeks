#include <stdio.h>
#include <math.h>

int arr[20],ray[20]; 
//global parameters (for integral and fractional parts resp.)

int dec2bin(int num, int idx) { // binary of integral part of the input number
    if(num==0) {
        arr[idx] = 0;
        return idx;
    }
    else if(num==1) {
        arr[idx] = 1;
        return idx;
    }
    else if(num>1) {
        arr[idx] = num%2;
        num/=2;
        dec2bin(num,idx+1);
    }
}
int frac2bin(float num, int idx) { // binary of fractional part, if any, of the input number
    if((num*2)-floor(num*2)==0.0) {
        ray[idx] = (int)floor(num*2);
        return idx;
    }
    else {
        ray[idx] = (int)floor(num*2);
        if(idx==9) {
            return idx;
        }
        idx += 1;
        frac2bin((num*2)-floor(num*2), idx);
    }
}

void main() {
    float n;
    int ingidx,fracidx; 
    // last indices of the respective arrays
    
    printf("Enter the number to convert to binary\n");
    scanf("%f", &n); // input could be integer or with fractional part.
    printf("Binary equivalent: ");
    if(n>=0) {
        ingidx = dec2bin((int)floor(n),0);
        for(int j=ingidx;j>=0;j--) {
            printf("%d",arr[j]);
        }
        if(n-floor(n) != 0.0) { // if there is fractional part
            fracidx = frac2bin(n-floor(n),0);
            printf(".");
            for(int k=0;k<=fracidx;k++) {
                printf("%d",ray[k]);
            }
        }
        printf("\n");
    }
    else {
        printf("Wrong input\n");
    }
}
