// to import standard input and output  
#include<stdio.h>
// to import clear statements, etc. ( if any ) 
#include<conio.h>
 // to import standard libraries  
#include<stdlib.h>
// to import strings and use strings  
#include<string.h>

struct library
{
   // to store the name of the book  
char bk_name[30];
    // to store the name of the author of the book  
char author[30];
 // to store the number of pages of the book  
int pages;
 // to store the cost of the book  
float price;
};

int main()
{
  // using the struct library again.'  
    // in order to perform operations  
struct library l[100];
char ar_nm[30],bk_nm[30];
int i,j, keepcount;
i=j=keepcount = 0;
//while loops of repetition of statements
while(j!=6)
{
printf("\n\n1. Add book information\n2. Display book information\n");
printf("3. List all books of given author\n");
printf("4. List the title of specified book\n");
printf("5. List the count of books in the library\n");
printf("6. Exit");

printf ("\n\nEnter one of the above : ");
scanf("%d",&j);

switch (j)
{
// in order to add the book details  
/* Add book */
case 1:  

printf ("Enter book name = ");
scanf ("%s",l[i].bk_name);

printf ("Enter author name = ");
scanf ("%s",l[i].author);

printf ("Enter pages = ");
scanf ("%d",&l[i].pages);

printf ("Enter price = ");
scanf ("%f",&l[i].price);
keepcount++;

break;
case 2:
 // to view the list of the books  
printf("you have entered the following information\n");
for(i=0; i<keepcount; i++)
{
printf ("book name = %s",l[i].bk_name);

printf ("\t author name = %s",l[i].author);

printf ("\t  pages = %d",l[i].pages);

printf ("\t  price = %f",l[i].price);
}
break;

case 3:
printf ("Enter author name : ");
scanf ("%s",ar_nm);
for (i=0; i<keepcount; i++)
{
if (strcmp(ar_nm, l[i].author) == 0)
printf ("%s %s %d %f",l[i].bk_name,l[i].author,l[i].pages,l[i].price);
}
break;

case 4:
printf ("Enter book name : ");
scanf ("%s",bk_nm);
for (i=0; i<keepcount; i++)
{
if (strcmp(bk_nm, l[i].bk_name) == 0)
printf ("%s \t %s \t %d \t %f",l[i].bk_name,l[i].author,l[i].pages,l[i].price);
}
break;

case 5:
printf("\n No of books in library : %d", keepcount);
break;
case 6:
  // to exit from the program  
exit (0); 

}
}
return 0;

}
