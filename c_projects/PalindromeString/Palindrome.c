#include <stdio.h>
#include <string.h>
#include <ctype.h>

void main() {
    int i, flag=0, count=0;
    char name[25];
    printf("Enter a word\n");
    scanf("%s", name);// to input a string
    count = strlen(name); //length of string: count

    // Palindrome string detector is case-insensitive, thus we are converting each character
    // to uppercase case first  
    
    for(i=0;i<=count/2;i++) {
        if(toupper(name[i]) != toupper(name[count-i-1])) {
            flag=1; //flag is an indicator when the letters at particular positions do not match
            break;
        }
    }
    
    if(flag==0){
        printf("%s is a palindrome\n", name);
    }
    else {
        printf("%s is not a palindrome\n", name);
    }
    return;
}
// eg., 'level' has 5 characters (count = 5)
// i=0,i=4-0; i=1,i=4-1; i=2,i=4-2 all matched, thus is a palindrome