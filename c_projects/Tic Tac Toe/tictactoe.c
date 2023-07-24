#include <stdio.h>
char board[3][3];
int i,j,count=0;

void initialize_board()
{
    for(i=0;i<3;i++)
        for(j=0;j<3;j++)
            board[i][j]=' ';
}

void print_board()    //printing current table
{
    printf("The current table:-\n");
    printf(" %c | %c | %c \n", board[0][0], board[0][1], board[0][2]);
    printf("-----------\n");
    printf(" %c | %c | %c \n", board[1][0], board[1][1], board[1][2]);
    printf("-----------\n");
    printf(" %c | %c | %c \n", board[2][0], board[2][1], board[2][2]);
}

int check_win()
{
    for(i=0;i<3;i++)
    {
        if(board[i][0]==board[i][1] && board[i][1]==board[i][2] && board[i][0] !=' ')
            if(board[i][0]=='X')
                return 1;
            else
                return 2;
        if(board[0][i]==board[1][i] && board[1][i]==board[2][i] && board[0][i] !=' ')
            if(board[0][i]=='X')
                return 1;
            else    
                return 2;
    }
    if(board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[0][0] !=' ')
        if(board[0][0]=='X')
            return 1;
        else
            return 2;
    if(board[0][2]==board[1][1] && board[1][1]==board[2][0] && board[0][2] !=' ')
        if(board[0][2]=='X')
            return 1;
        else
            return 2;
    
    return 0;
}

int main()
{
    int player=1,choice,r,c;
    char mark;
    initialize_board();
    
    do 
    {
        count++;
        printf("\nEnter your numbers according to the orientation below:-\n");
        printf(" 1 | 2 | 3 \n");
        printf("-----------\n");
        printf(" 4 | 5 | 6 \n");
        printf("-----------\n");
        printf(" 7 | 8 | 9 \n\n\n");
        print_board();
        player = (player % 2) ? 1: 2;
        printf("Player %d, Enter a number from 1 to 9 to place your mark: ",player);
        scanf("%d",&choice);
        printf("\n");
        r = --choice / 3;        //trick to assign number to each cell
        c = choice % 3;
        if(count>=10)       //checking for draw
        {
            printf("Draw!\n");
            return 0;
        }
        if(board[r][c]==' ')
        {
            mark = (player==1)? 'X' : 'O';
            board[r][c] = mark;
            player++;
        }
        else
            printf("Invalid Move, Try Again!\n");
    }while(check_win()==0);

    print_board();

    if(check_win()==1)
        printf("Player 1(X) wins!\n");
    else if(check_win()==2)
        printf("Player 2(O) wins!\n");

}