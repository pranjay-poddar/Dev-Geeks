//Restaurant Management System
//CSA- Group 5

#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include <time.h>
#include <ctype.h>
#define BUFFER_SIZE 1000
struct node
{
    char foodname[50];
    int quantity;
    float price;
    int data;
    struct node *prev;
    struct node *next;
};


struct node *headc=NULL,*newnode,*tailc=NULL;
struct node *heada=NULL,*taila=NULL;
struct node *head_s;
FILE *fp;//file pointer

void adminmenu()
{
    printf("\n\t\t\t\t\t\t\t1. View Total Sales for the day\n");
    printf("\t\t\t\t\t\t\t2. Add new items in the order menu\n");
    printf("\t\t\t\t\t\t\t3. Delete items from the order menu\n");
    printf("\t\t\t\t\t\t\t4. Update price of an item\n");
    printf("\t\t\t\t\t\t\t5. Display order menu\n");
    printf("\t\t\t\t\t\t\t6. Back To Main Menu \n\n");
    printf("\t\t\t\t\t\t\t   Enter Your Choice --->");

}


void customermenu()
{
    printf("\n\t\t\t\t\t\t\t1. Place your order\n");
    printf("\t\t\t\t\t\t\t2. View your ordered items\n");
    printf("\t\t\t\t\t\t\t3. Delete an item from order\n");
    printf("\t\t\t\t\t\t\t4. Delete ordered list\n");
    printf("\t\t\t\t\t\t\t5. Display final bill\n");
    printf("\t\t\t\t\t\t\t6. Back To Main Menu \n\n");
    printf("\t\t\t\t\t\t\t   Enter Your Choice --->");
}

struct node *createadmin(struct node *head,int data, char foodname[], float price)
{
    newnode=(struct node *)malloc(sizeof(struct node));
    newnode->data=data;
    newnode->price=price;
    newnode->quantity=0;
    strcpy(newnode->foodname,foodname);
    newnode->next=NULL;
    newnode->prev=NULL;

    struct node *temp=head;
    if(temp==NULL)
    {
        heada=taila=newnode;
    }
    else
    {
        while(temp->next!=NULL)
        {
            temp=temp->next;
        }
        temp->next=newnode;
        newnode->prev=taila;
        taila=newnode;
    }
    return heada;
}


struct node *createcustomer(struct node *head,int data,int quantity,char foodname[],float price)
{
    newnode=(struct node *)malloc(sizeof(struct node));


        newnode->data=data;
        newnode->price=quantity*(price);
        newnode->quantity=quantity;
        strcpy(newnode->foodname,foodname);
        newnode->next=NULL;
        newnode->prev=NULL;

        struct node *temp=head;
        if(temp==NULL)
        {
            headc=tailc=newnode;
        }
        else
        {
            while(temp->next!=NULL)
            {
                temp=temp->next;
            }
            temp->next=newnode;
            newnode->prev=tailc;
            tailc=newnode;

        }


    return headc;
}
float feedback(){

    float rating;
    printf("Thank you!, please rate our overall service in range of (0-5): ");
    scanf("%f",&rating);

    return rating;
}

char *name()
{
    char* str = (char*)malloc(100 * sizeof(char));  // allocate memory for the string
    printf("Enter the name of the Customer: ");
    getchar();
    scanf("%[^\n]%*c",str);

    return str;
}

void displayList(struct node *head)
{

    struct node *temp1=head;
    FILE *fp1;
    fp1=fopen("D:\\DSCourseProject\\bill.txt","a+");

    if(temp1==NULL)
    {
        printf("\n\t\t\t\t\t\t\t\tList is empty!!\n\n");
    }
    else
    {
        time_t t;   // not a primitive datatype
        time(&t);
           // scanf(" %49[^\n]"
           char *namec=name();

        fprintf(fp1,"Order Details for %s: \n",namec);

        while(temp1!=NULL){
            if(temp1->quantity==0)
            {
                printf("\t\t\t\t\t\t\t%d\t%s\t%0.2f\n",temp1->data,temp1->foodname,temp1->price);
                fprintf(fp1,"%d\t%s\t%0.2f\n",temp1->data,temp1->foodname,temp1->price);

            }
            else
            {
                printf("\t\t\t\t\t\t\t%d\t%s\t%d\t%0.2f\n",temp1->data,temp1->foodname,temp1->quantity,temp1->price);
                fprintf(fp1,"%d\t%s\t%d\t%0.2f\n",temp1->data,temp1->foodname,temp1->quantity,temp1->price);
            }
            temp1=temp1->next;
        }
        fprintf(fp1,"Food was ordered at: %s ",ctime(&t));
        fclose(fp1);
        printf("\n");
    }


}


void displayList1(struct node *head)
{

    struct node *temp1=head;
    if(temp1==NULL)
    {
        printf("\n\t\t\t\t\t\t\t\tList is empty!!\n\n");
    }
    else
    {


        while(temp1!=NULL){
            if(temp1->quantity==0)
            {
                printf("\t\t\t\t\t\t\t%d\t%s\t%0.2f\n",temp1->data,temp1->foodname,temp1->price);


            }
            else
            {
                printf("\t\t\t\t\t\t\t%d\t%s\t%d\t%0.2f\n",temp1->data,temp1->foodname,temp1->quantity,temp1->price);

            }
            temp1=temp1->next;
        }

        printf("\n");
    }


}


void deleteFromFile(int serial_no)
{
    FILE *fp1, *fp2;
   // int found = 0;
    char line[100];
    char name[50];
    float price;
    int num;

// Open the file in read mode
    fp1 = fopen("D:\\DSCourseProject\\menu.txt", "r");

// Open a temporary file in write mode
    fp2 = fopen("D:\\DSCourseProject\\temp.txt", "w");

// Get the serial number to delete


// Loop through each line of the file
    while (fgets(line, sizeof(line), fp1)) {
        // Get the serial number, name, and price from the line
        sscanf(line, "%d %s %f", &num, name, &price);

        // Check if the serial number matches
        if (serial_no == num) {
            //found = 1;
            //fclose(fp1);
            continue;
        } else {
            // If the serial number doesn't match, write the line to the temporary file
            fprintf(fp2, "%s", line);
        }
    }

// Close both files
    fclose(fp1);
    fclose(fp2);

// Delete the original file
    remove("D:\\DSCourseProject\\menu.txt");

// Rename the temporary file to the original file name
    rename("D:\\DSCourseProject\\temp.txt", "D:\\DSCourseProject\\menu.txt");

    /*if (found) {
        printf("Record deleted successfully.\n");
    } else {
        printf("Record not found.\n");
    }*/

}


struct node *totalsales(int data, int quantity)
{
    newnode=(struct node *)malloc(sizeof(struct node));
    int flag=0;
    struct node *temp1=headc;
    while(temp1->data!=data){
        temp1=temp1->next;
    }
    newnode->data=data;
    newnode->price=quantity*(temp1->price);
    newnode->quantity=quantity;
    strcpy(newnode->foodname,temp1->foodname);
    newnode->next=NULL;
    newnode->prev=NULL;

    struct node *temp=head_s;
    if(temp==NULL){
        head_s=newnode;
    }else{
        while(temp->next!=NULL){
            if(temp->data==data){
                flag=1;
                break;
            }
            temp=temp->next;
        }
        if(flag==1)
        {
            temp->quantity+=newnode->quantity;
            temp->price=newnode->price;
        }
        else{
            temp->next=newnode;
        }
    }
    return head_s;
}



void calculatetotsales()
{
    struct node *temp = headc;
    while(temp!=NULL)
    {
        head_s = totalsales(temp->data, temp->quantity);
        temp=temp->next;
    }
}


struct node *delete(int data,struct node *head,struct node *tail){
    if(head==NULL){
        printf("\n\t\t\t\t\t\t\tList is empty\n");
    }else{
        struct node *temp;
        if(data==head->data){
            temp=head;
            head=head->next;
            if(head!=NULL){
                head->prev=NULL;
            }
            free(temp);
        }else if(data==tail->data){
            temp=tail;
            tail=tail->prev;
            tail->next=NULL;
            free(temp);
        }else{
            temp=head;
            while(temp->data!=data){
                temp=temp->next;
            }
            temp->prev->next=temp->next;
            temp->next->prev=temp->prev;
            free(temp);
        }
    }
    return head;
}


int deleteAdmin(){
    /*printf("\n\t\t\t\t\tEnter serial no. of the food item which is to be deleted: ");
    int num;
    scanf("%d",&num);*/

    FILE *fp1, *fp2;
    int serial_no, found = 0;
    char line[100];
    char name[50];
    int num;
    float price;

    // Open the file in read mode
    fp1 = fopen("D:\\DSCourseProject\\menu.txt", "r");

    // Open a temporary file in write mode
    //fp2 = fopen("D:\\DSCourseProject\\temp.txt", "w");
    printf("Enter the serial number of the food item to be deleted: ");
    scanf("%d", &serial_no);

    //printf("%d \n",serial_no);

    while (fgets(line, sizeof(line), fp1)) {
        // Get the serial number, food name and price from the line
        sscanf(line, "%d %s %f", &num, name,&price );
        printf("%d \n",num);

        // If the serial number matches, update the price and write back to the file
        if (serial_no == num) {
           //fprintf(fp2, "%d %s %0.2f\n", serial_no, name, newp);

            found = 1;


        } else {
            found=0;
        }
    }
    fclose(fp1);
    if (found==1) {
        deleteFromFile(num);
        printf("Record updated successfully.\n");
    } else {
        printf("Record not found.\n");
    }


}


int deletecustomer()
{
    printf("\n\t\t\t\t\tEnter serial no. of the food item which is to be deleted: ");
    int num;
    scanf("%d",&num);

    struct node* temp=headc;
    while(temp!=NULL)
    {
        if (temp->data == num)
        {
            headc = delete(num, headc, tailc);
            return 1;
        }
        temp=temp->next;
    }

    return 0;
}


void displaybill(){
    fp= fopen("D:\\DSCourseProject\\bill.txt", "a+");

    displayList(headc);
    struct node *temp = headc;
    float total_price=0;
    while(temp!=NULL){
        total_price += temp->price;
        temp=temp->next;
    }
    fprintf(fp,"The Total Amount is %.2f \n",total_price);
    fprintf(fp,"The rating of the service %.2f \n",feedback());
    fprintf(fp,"----------------------------------\n");
    fclose(fp);
}

struct node *deleteList(struct node *head){
    if(head==NULL){
        return NULL;
    }
    else{
        struct  node *temp=head;
        while(temp->next!=0){
            temp=temp->next;
            free(temp->prev);
        }
        free(temp);
        head=NULL;
    }//file empty
    return head;
}

void updatePrice(){
    FILE *fp1, *fp2;
    int serial_no, found = 0;
    char line[100];
    char name[50];
    float newp;
    float price;
    int num;
    // Open the file in read mode
    fp1 = fopen("D:\\DSCourseProject\\menu.txt", "r");

    // Open a temporary file in write mode
    fp2 = fopen("D:\\DSCourseProject\\temp.txt", "w");
    printf("Enter the serial number of the food item to update: ");
    scanf("%d", &serial_no);
    printf("Enter the new price: ");
    scanf("%f", &newp);
    printf("%d \n",serial_no);

    while (fgets(line, sizeof(line), fp1)) {
        // Get the serial number, food name and price from the line
        sscanf(line, "%d %s %f", &num, name, &price);
        //printf("%d \n",num);

        // If the serial number matches, update the price and write back to the file
        if (serial_no == num) {
            fprintf(fp2, "%d %s %0.2f\n", serial_no, name, newp);

            found = 1;
        } else {
            fprintf(fp2, "%s", line);
        }
    }

    // Close both files
    fclose(fp1);
    fclose(fp2);

    // Delete the original file
    remove("D:\\DSCourseProject\\menu.txt");

    // Rename the temporary file to the original file name
    rename("D:\\DSCourseProject\\temp.txt", "D:\\DSCourseProject\\menu.txt");


    if (found==1) {
        printf("Record updated successfully.\n");
    } else {
        printf("Record not found.\n");
    }

}

int arrayEqual(char name1[],char name2[]){
    int len1=0;
    int len2=0;

    while(name1[len1]!='\0'){
        len1+=1;
    }
    while(name2[len2]!='\0'){
        len2+=1;
    }

    if(len1!=len2){
        return 0;
    }
    else{
        for(int i=0;i<len1;i++){
            if(name1[i]!=name2[i]){
                return 0;
            }
        }
    }
    return 1;
}

char* trim(char* str) {
    int i, j;
    char* trimmed = (char*) malloc(strlen(str) + 1);

    // Remove leading spaces
    for (i = 0; str[i] == ' '; i++);
    strcpy(trimmed, str + i);

    // Remove trailing spaces
    for (j = strlen(trimmed) - 1; j >= 0 && trimmed[j] == ' '; j--);
    trimmed[j + 1] = '\0';

    return trimmed;
}


void normalize_string(char* str, char* result) {
    int len = strlen(str);
    int j = 0;
    for (int i = 0; i < len; i++) {
        if (!isspace(str[i])) {
            result[j] = tolower(str[i]);
            j++;
        }
    }
    result[j] = '\0';

    // Remove newline character from the result string
    if (j > 0 && result[j-1] == '\n') {
        result[j-1] = '\0';
    }
}
void admin(){

    printf("\n\t\t\t\t\t   ----------------------------------------------\n");
    printf("\t\t\t\t\t\t\t    ADMIN SECTION\n");
    printf("\t\t\t\t\t   ----------------------------------------------\n");
    while(1){
        adminmenu();

        int opt;
        scanf("%d",&opt);


        if(opt==6){
            break;
        }

        time_t t;   // not a primitive datatype
        time(&t);
        switch(opt){
            case 1:
                displayList(head_s);

                break;
            case 2:
                fp= fopen("D:\\DSCourseProject\\menu.txt","a+");
                if (fp == NULL) {
                    printf("\n\t\t\t\t\t\t\tError: Unable to open file.\n");
                    break;
                }
                printf("\n\t\t\t\t\t\t\tEnter serial no. of the food item: ");
                int num,flag = 0;
                char name[50];
                float price;
                scanf("%d",&num);
                getchar();
                printf("\n\t\t\t\t\t\t\tEnter name of the food item: ");
                fgets(name,50,stdin);
                name[strcspn(name,"\n")]=0;
                char file_line[200];
                int file_serial_no;
                char file_product_name[100];
                float file_product_price;
                int flg=0;


                while (fgets(file_line, 200, fp)) {

                    sscanf(file_line, "%d %s %f", &file_serial_no, file_product_name, &file_product_price);


                    char normalized_input_name[100], normalized_file_name[100];
                    normalize_string(name, normalized_input_name);
                    normalize_string(file_product_name, normalized_file_name);


                    if (num == file_serial_no || strcasecmp(normalized_input_name, normalized_file_name) == 0) {
                        printf("\n\t\t\t\t\t\t\tError: Serial no or product name already exists in the file.\n");
                        flg = 1;
                        break;
                        }
                }


                if(flg!=1)
                {
                    printf("\n\t\t\t\t\t\t\tEnter price: ");
                    scanf("%f",&price);
                    heada = createadmin(heada,num,name,price);
                    struct node *temp1=heada;
                    while(temp1->data!=num)
                    {
                        temp1=temp1->next;
                    }
                    fprintf(fp,"%d %s %.2f\n",temp1->data,temp1->foodname,temp1->price);
                    printf("\n\t\t\t\t\t\t\tNew food item added to the list!!\n\n");


                }
                fclose(fp);



                break;

            case 3:
                if(deleteAdmin()){
                    printf("\n\t\t\t\t\t\t### Updated list of food items menu ###\n");
                    fp=fopen("D:\\DSCourseProject\\menu.txt","r");
                    char buffer[BUFFER_SIZE];
                    int totalRead = 0;
                    if(fp == NULL)
                    {
                        /* Unable to open file hence exit */
                        printf("Unable to open file.\n");
                        printf("Please check whether file exists and you have read privilege.\n");
                        exit(EXIT_FAILURE);
                    }
                    printf("File opened successfully. Reading file contents line by line. \n\n");


                    /* Repeat this until read line is not NULL */
                    while(fgets(buffer, BUFFER_SIZE, fp) != NULL)
                    {
                        /* Total character read count */
                        totalRead = strlen(buffer);


                        /*
                         * Trim new line character from last if exists.
                         */
                        buffer[totalRead - 1] = buffer[totalRead - 1] == '\n'
                                                ? '\0'
                                                : buffer[totalRead - 1];


                        /* Print line read on cosole*/
                        printf("%s\n", buffer);

                    }


                    /* Done with this file, close file to release resource */
                    fclose(fp);
                 //   displayList(heada);
                }
                else{
                    printf("\n\t\t\t\t\t\tFood item with given serial number doesn't exist!\n\n");
                }
                break;

            case 4:
                updatePrice();
                break;

            case 5:

                printf("\n\t\t\t\t\t\t\t   ### Order menu ###\n");
                //FILE *ptr;
                //displayList(heada);
                fp=fopen("D:\\DSCourseProject\\menu.txt","r");
                char buffer[BUFFER_SIZE];
                int totalRead = 0;
                if(fp == NULL)
                {
                    /* Unable to open file hence exit */
                    printf("Unable to open file.\n");
                    printf("Please check whether file exists and you have read privilege.\n");
                    exit(EXIT_FAILURE);
                }
                printf("File opened successfully. Reading file contents line by line. \n\n");


                /* Repeat this until read line is not NULL */
                while(fgets(buffer, BUFFER_SIZE, fp) != NULL)
                {
                    /* Total character read count */
                    totalRead = strlen(buffer);


                    /*
                     * Trim new line character from last if exists.
                     */
                    buffer[totalRead - 1] = buffer[totalRead - 1] == '\n'
                                            ? '\0'
                                            : buffer[totalRead - 1];


                    /* Print line read on cosole*/
                    printf("%s\n", buffer);

                }


                /* Done with this file, close file to release resource */
                fclose(fp);


                break;

            default:
                printf("\n\t\t\t\t\t\tWrong Input !! PLease choose valid option\n");
                break;


        }
    }
}

void customer(){
    int flag=0,j=1;
    char ch;
    printf("\n\t\t\t\t\t   ----------------------------------------------\n");
    printf("\t\t\t\t\t\t\t    CUSTOMER SECTION\n");
    printf("\t\t\t\t\t   ----------------------------------------------\n");
    while(1){
        customermenu();

        int opt;
        scanf("%d",&opt);

        if(opt==6){
            break;
        }
        int choice=1;
        switch(opt){
            case 1:
                choice = 1;

                while(choice == 1) {
                    //displayList(heada);
                    printf("\n\t\t\t\t\t\t\t   ### Order menu ###\n");
                    fp = fopen("D:\\DSCourseProject\\menu.txt", "r");
                    // Open the file in read mode
                    char buffer[BUFFER_SIZE];
                    int totalRead = 0;
                    if (fp == NULL) {
                        /* Unable to open file hence exit */
                        printf("Unable to open file.\n");
                        printf("Please check whether file exists and you have read privilege.\n");
                        exit(EXIT_FAILURE);
                    }
                    printf("File opened successfully. Reading file contents line by line. \n\n");


                    /* Repeat this until read line is not NULL */
                    while (fgets(buffer, BUFFER_SIZE, fp) != NULL) {
                        /* Total character read count */
                        totalRead = strlen(buffer);


                        /*
                         * Trim new line character from last if exists.
                         */
                        buffer[totalRead - 1] = buffer[totalRead - 1] == '\n'
                                                ? '\0'
                                                : buffer[totalRead - 1];


                        /* Print line read on cosole*/
                        printf("%s\n", buffer);

                    }


                    /* Done with this file, close file to release resource */

                    //   displayList(heada);

                    // Read and print each record in the file

                    // Close the file
                    fclose(fp);
                    printf("\n\t\t\t\t\t\tEnter number corresponding to the item you want to order: ");
                    int n;
                    scanf("%d", &n);
                    printf("\t\t\t\t\t\tEnter quantity: ");
                    int quantity;
                    scanf("%d", &quantity);
                    //headc = createcustomer(headc,n,quantity);

                    FILE *fp1;
                    int serial_no, found = 0;
                    char line[100];
                    char name[50];
                    float price;
                    // Open the file in read mode
                    fp1 = fopen("D:\\DSCourseProject\\menu.txt", "r");
                    while (fgets(line, sizeof(line), fp1)) {
                        // Get the serial number, food name and price from the line
                        sscanf(line, "%d %s %f", &serial_no, name, &price);
                        if (serial_no == n) {

                            found = 1;
                            break;
                        }
                    }
                    if (found == 1) {
                        headc = createcustomer(headc, n, quantity, name, price);
                    } else {
                        printf("\t\t\t\t\t\tFood item doesn't exist in the menu\n");
                    }
                    printf("\t\t\t\t\t\tEnter 1 to add more items: ");
                    scanf("%d", &choice);
                }
                break;
            case 2:
                printf("\n\t\t\t\t\t\t\t  ### List of ordered items ###\n");
                displayList1(headc);

                break;
            case 3:
                if(deletecustomer())
                {
                    printf("\n\t\t\t\t\t\t### Updated the list of your ordered food items successfully ###\n");
                    //displayList(headc);
                }
                else
                    printf("\n\t\t\t\t\t\tFood item with given serial number doesn't exist!!\n");
                break;
            case 4:
                headc = deleteList(headc);
                break;
            case 5:
                calculatetotsales();
                printf("\n\t\t\t\t\t\t\t  ### Final Bill ###\n");
                displaybill();
                headc = deleteList(headc);
                //feedback();
                printf("\n\t\t\t\t\t\tPress any key to return to main menu:\n\t\t\t\t\t\t");
                fflush(stdin);
                ch=fgetc(stdin);
                flag=1;
                break;

            default:
                printf("\n\t\t\t\t\t\tWrong Input !! PLease choose valid option\n");
                break;
        }
        if(flag==1)
            break;
    }
}



void mainMenu()
{
    printf("\n                                 **************************************************************************\n");
    printf("                                                     RESTAURANT MANAGEMENT SYSTEM BY G5\n");
    printf("                                 **************************************************************************\n\n\n");
    printf("\t\t\t\t\t\t\t1. ADMIN SECTION--> \n");
    printf("\t\t\t\t\t\t\t2. CUSTOMER SECTION--> \n");
    printf("\t\t\t\t\t\t\t3. Exit--> \n\n");
    printf("\t\t\t\t\t\t\tPlease Enter Your Choice --->");
}


int main()
{
    heada=createadmin(heada,1,"Tomato_Soup",90);
    heada=createadmin(heada,2,"Mango_Juice",60);
    while(1)
    {
        mainMenu();
        int choice;
        scanf("%d",&choice);

        if(choice==3)
        {
            printf("\n\n\t\t\t\t\t\t\t**********Thank you!!**********\n");
            break;
        }

        switch(choice)
        {
            case 1:
                admin();
                break;
            case 2:
                customer();
                break;
            case 3:
                break;
            default:
                printf("\n\t\t\t\t\t\tWrong Input !! PLease choose valid option\n");
                break;
        }
    }


    return 0;
}