#include <stdio.h>
#include <stdlib.h>
#include <string.h>
void addMov();
void dispMov();
void findMov();
void showmovie();
struct book
{
    int mnum;
    char cname[30];
    char mname[30];
    char mdate[12];
    int mtimehour;
    int mtime;
    char ttype[30];
    int guestsnum;
    int housenum;
    int fee;
};
void main()
{
    int option;
    printf("\n\t** Movie Ticketing System **\n");
    do
    {
        printf("\n\n--<: Main Menu:>\n");
        printf("\n 1. Add New Ticket Record(s)\n");
        printf("\n 2. Display All Ticket Records\n");
        printf("\n 3. Search Movie Ticketing Record(s)\n");
        printf("\n 4. All Movies\n");
        printf("\n 5. Quit\n");
        printf("\nWhat is your option (1-5)");
        scanf("%d", &option);
        switch (option)
        {
        case 1:
            addMov();
            break;
        case 2:
            dispMov();
            break;
        case 3:
            findMov();
            break;
        case 4:
            showmovie();
            break;
        case 5:
            printf("See you next time :)");
            exit(0);
            break;
        default:
            printf("Please select a correct number (1-7)!");
        }
    } while (option != 5);
}
// <------------------Add New Ticket Record---------------------->
void addMov()
{
    struct book b;
    char op;
    FILE *fp;
    printf("Enter Movie Booking Number (XXXX): ");
    scanf("%d", &b.mnum);
    while (b.mnum < 1 || b.mnum > 9999)
    {
        printf("Re-enter Movie Booking Number! It should be between 0001 to 9999!: ");
        scanf("%d", &b.mnum);
    };
    printf("Enter Name of Customer: ");
    gets(b.cname);
    gets(b.cname);
    printf("Enter Name of Movie: ");
    gets(b.mname);
    printf("Enter Movie Schedule (DD-MM-YYYY): ");
    gets(b.mdate);
    printf("Enter Time (XXXX): ");
    scanf("%d", &b.mtime);
    while (b.mtime < 1000 || b.mtime > 2300)
    {
        printf("Re-enetr Time! It should be in 24-hour format and between 1000 to 2300!: ");
    };
    printf("Enter Number of Guests: ");
    scanf("%d", &b.guestsnum);
    printf("Enter House Number: ");
    scanf("%d", &b.housenum);
    printf("Enter Ticket Type: ");
    scanf("%s", b.ttype);
    printf("Enter Total Fee: ");
    scanf("%d", &b.fee);
    fp = fopen("ticket.txt", "a");
    if (fp == NULL)
    {
        printf("File not found!");
    }
    else
    {
        fprintf(fp, "%d\n%s\n%s\n%s\n%d\n%d\n%d\n%s\n%d\n\n", b.mnum, b.cname, b.mname, b.mdate, b.mtime, b.guestsnum, b.housenum, b.ttype, b.fee);
        printf("Record insert sucessful!");
    }
    printf("\n");
    fclose(fp);
    do
    {
        printf("Add another record (y/n)?");
        scanf("%s", &op);
        switch (op)
        {
        case 'y':
            printf("\n");
            addMov();
        case 'n':
            printf("\n");
            main();
        default:
            printf("Please select (y) or (n)!\n");
        }
    } while (op != 'n');
}
// <------------------------------Display All Ticket Records-------------------------->
void dispMov()
{
    char ch;
    FILE *fp;
    printf("\n");
    fp = fopen("ticket.txt", "r");
    if (fp == NULL)
    {
        printf("File not found!");
        exit(1);
    }
    else
    {
        while ((ch = fgetc(fp)) != EOF)
        {
            printf("%c", ch);
        }
    }
    fclose(fp);
}
//<-------------------------------------Search Movie Ticketing Record-------------------->
void findMov()
{
    char op;
    char bk[100], line[250];
    char bnum[250], cname[250], mname[250], mdate[250], mtime[250], guestsnum[250], housenum[250], ttype[250], fee[250];
    struct book b;
    printf("Enter booking number: ");
    scanf("%s", bk);
    FILE *fp;
    fp = fopen("ticket.txt", "r");
    if (fp == NULL)
    {
        printf("File not found!");
    }
    else
    {
        while (fscanf(fp, "%s", bnum) != EOF)
        {
            if (strcmp(bk, bnum) == 0)
            {
                printf("\nRecord found. \n\nBooking number: %s", bnum);
                fgets(line, 250, fp); // skipping to new line
                fgets(cname, 250, fp);
                printf("\nName: %s", cname);
                fgets(mname, 250, fp);
                printf("Movie name: %s", mname);
                fgets(mdate, 250, fp);
                printf("Movie Schedule: %s", mdate);
                fgets(mtime, 250, fp);
                printf("Time: %s", mtime);
                fgets(guestsnum, 250, fp);
                printf("Number of Guests: %s", guestsnum);
                fgets(housenum, 250, fp);
                printf("House Number: %s", housenum);
                fgets(ttype, 250, fp);
                printf("Type: %s", ttype);
                fgets(fee, 250, fp);
                printf("Total fee: %s", fee);
            }
            else
            {
                printf("\nRecord not found!");
                break;
            }
        }
    }
    do
    {
        printf("\nFind another record (y/n)?");
        scanf("%s", &op);
        switch (op)
        {
        case 'y':
            printf("\n");
            findMov();
        case 'n':
            printf("\n");
            main();
        default:
            printf("Please select (y) or (n)!\n");
        }
    } while (op != 'n');
}
//<---------------------------All Movies-------------------------------------->
void showmovie()
{
    printf("\nChoose a type of movie:\n\n");
    int option;
    printf("1.Action movie\n");
    printf("2.War movie\n");
    printf("3.Sci-fi movie\n");
    printf("4.Horror movie\n");
    printf("5.Animated movie\n");
    printf("6.Back to main menu\n");
    printf("\nWhat is your option (1-6)? ");
    scanf("%d", &option);
    switch (option)
    {
    case 1:
        printf("\n1.The Equalizer\n");
        printf("2.Mad Max: Fury Road\n");
        printf("3. John Wick 3\n");
        printf("\nBack to main menu (1)\n");
        printf("Choose another type of movie select (2)\n");
        scanf("%d", &option);
        switch (option)
        {
        case 1:
            printf("\n");
        case 2:
            main();
            printf("\n");
            showmovie();
        default:
            printf("Please select (1) or (2)!\n");
        }
        while (option != 2)
            ;
        break;
    case 2:
        printf("\n1.Saving Private Ryan\n");
        printf("2.Un long dimanche de fiancailles\n");
        printf("3.Braveheart\n");
        printf("\nBack to main menu select (1)\n");
        printf("Choose another type of movie select (2)\n");
        scanf("%d", &option);
        switch (option)
        {
        case 1:
            printf("\n");
            main();
        case 2:
            printf("\n");
            showmovie();
        default:
            printf("Please select (1) or (2)!\n");
        }
        while (option != 2)
            ;
        break;
    case 3:
        printf("2.Captain Marvel\n");
        printf("3.Spider-Man: Far From Home\n");
        printf("\n1.Avengers: EndGame\n");
        printf("\nBack to main menu select (1)\n");
        printf("Choose another type of movie select (2)\n");
        scanf("%d", &option);
        switch (option)
        {
        case 1:
            printf("\n");
            main();
        case 2:
            printf("\n");
            showmovie();
        default:
            printf("Please select (1) or (2)!\n");
        }
        while (option != 2)
            ;
        break;
    case 4:
        printf("\n1.IT\n");
        printf("2.Get Out\n");
        printf("3. The Witch\n");
        printf("\nBack to main menu select (1)\n");
        printf("Choose another type of movie select (2)\n");
        scanf("%d", &option);
        switch (option)
        {
        case 1:
            printf("\n");
            main();
        case 2:
            printf("\n");
            showmovie();
        default:
            printf("Please select (1) or (2)!\n");
        }
        while (option != 2)
            ;
        break;
    case 5:
        printf("\n1.Inside Out\n");
        printf("2.Zootopia\n");
        printf("3. Finding Nemo\n");
        printf("\nBack to main menu select (1)\n");
        printf("Choose another type of movie select (2)\n");
        scanf("%d", &option);
        switch (option)
        {
        case 1:
            printf("\n");
            main();
        case 2:
            printf("\n");
            showmovie();
        default:
            printf("\nPlease select (1) or (2)!\n");
        }
        while (option != 2)
            ;
        break;
    case 6:
        main();
    default:
        printf("Please select a correct number (1-6)!");
    }
    while (option != 6)
        ;
}