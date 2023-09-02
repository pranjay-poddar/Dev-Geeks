#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int main() {
    int flag, fin_count, count = 6;
    char ch;
    char ans[7] = {"*******"};
    char word[7] = {"monsoon"} ;
    printf("START\n");
    printf("Action: To guess a season\n");
    
    do {
        printf("Enter a letter: ");
        ch = getchar();
        flag = 0;
        for(int i=0;i<7;i++) {
            if(word[i]==ch && ans[i]=='*') {
                ans[i] = ch;
                flag = 1;
            }
            else  {
                continue;
            }
        }
        if(flag == 1) {
            printf("Answer: ");
            for(int i=0;i<7;i++) {
                printf("%c", ans[i]);
            }
            printf("\n");
            printf("\nKeep going!\n");
        }
        else if(flag==0){
            printf("\nOops!\n");
            printf("%d more tries left\n", count);
            printf("Answer: ");
            for(int i=0;i<7;i++) {
                printf("%c", ans[i]);
            }
            printf("\n");
            count--;
        }
        for(int i=0;i<7;i++) {
            fin_count = 0;
            if(ans[i]!='*'){
                fin_count++;
            }
            else {
                continue;
            }
        }
        if(fin_count==7){
            printf("You won!\n");
            break;
        }
    }while(count>=0);
}