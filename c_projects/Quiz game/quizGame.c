#include <stdio.h>
#include <stdlib.h>

int question(int num) { //function questionnaire
    switch(num) {
        case 1: printf("Fourth letter of Greek alphabet?\n");break;
        case 2: printf("Planet having the most moons?\n");break;
        case 3: printf("Who destroyed Rowena Ravenclaw's diadem in Harry Potter?\n");break;
        case 4: printf("Group of crows is called?\n");break;
        case 5: printf("Ancient Greek God of music?\n");break;
        case 6: printf("Longest river in the world?\n");break;
        case 7: printf("Country with the highest population?\n");break;
        case 8: printf("Number of spokes in Ashoka Chakra?\n");break;
        case 9: printf("Which is not a bone in the ear?\n");break;
        case 10: printf("When was the first Satyagraha campaign of India held?\n");break;
        default: exit;
    }
    return 0;
}

int options(int num) {// function to display options
    switch(num) {
        case 1: printf("1.Iota 2.Beta 3.Delta 4.Gamma \n");break;
        case 2: printf("1.Earth 2.Saturn 3.Jupiter 4.Uranus \n");break;
        case 3: printf("1.Neville Longbottom 2.Vincent Crabbe 3.Lord Voldemort 4.Harry Potter \n");break;
        case 4: printf("1.Murder 2.Flock 3.Embarassment 4.Herd \n");break;
        case 5: printf("1.Zeus 2.Athena 3.Apollo 4.Hera \n");break;
        case 6: printf("1.Congo River 2.Amazon River 3.Yellow River 4.Nile \n");break;
        case 7: printf("1.India 2.China 3.USA 4.Russia \n");break;
        case 8: printf("1.24 2.26 3.22 4.28 \n");break;
        case 9: printf("1.Malleus 2.Carpals 3.Stapes 4.Incus \n");break;
        case 10: printf("1.1890 2.1914 3.1917 4.1947 \n");break;
    }
    return 0;
}

int main() {
    int ch,ans,score=0;
    int crctans[10] = {3,2,2,1,3,4,1,1,2,3}; // array containing correct options
    printf("Press 0 to start\n");
    scanf("%d",&ch);
    // starting of quiz
    if(ch==0) {
        for (int i=0;i<10;i++) {
            printf("Question %d: ",i+1);
            question(i+1);// displaying a question
            options(i+1);// displaying its corresponding options
            printf("Answer: ");
            scanf("%d",&ans);// user inputs their choice
            if(ans==crctans[i]) {
                score += 1;// if user's choice matches with correct answer, 
                // score is incremented by 1.
            }
        }
        printf("You scored %d/10 points!\n",score);//displaying the score
        printf("End\n");exit;
    }
}
