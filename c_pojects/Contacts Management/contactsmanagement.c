#include<stdio.h>
#include<string.h>

// define the limits of the contents
#define MAX_CONTACTS 100            
#define MAX_NAME_LEN 50
#define MAX_PHONE_LEN 15
#define MAX_EMAIL_LEN 50

struct contact
{
    char name[MAX_NAME_LEN];
    char phone[MAX_PHONE_LEN];
    char email[MAX_EMAIL_LEN];
};

struct contact contacts[MAX_CONTACTS];
int num_contacts=0;

void add_contact()
{
    if(num_contacts==MAX_CONTACTS) 
    {
        printf("Contacts list if full!\n");
        return;
    }        

    struct contact new_contact;
    
    printf("\nEnter name: ");
    fgets(new_contact.name, MAX_NAME_LEN, stdin);
    new_contact.name[strcspn(new_contact.name, "\n")] = '\0'; // remove trailing newline character

    printf("Enter phone number: ");
    fgets(new_contact.phone, MAX_PHONE_LEN, stdin);
    new_contact.phone[strcspn(new_contact.phone, "\n")] = '\0'; // remove trailing newline character

    printf("Enter email address: ");
    scanf("%s", new_contact.email);

    contacts[num_contacts++] = new_contact;

    printf("Contact added successfully\n");
} 

void list_contacts()  
{
    printf("\nContacts list:\n");
    for (int i = 0; i < num_contacts; i++) 
        printf("%d. %s, %s, %s\n", i+1, contacts[i].name, contacts[i].phone, contacts[i].email);
}

void delete_contact()
{
    int index,i;
    printf("\nEnter the index of the contact to delete: ");
    scanf("%d",&index);
    if(index <1 || index>num_contacts)     
    {
        printf("Invalid Index\n");
        return;
    }

    for(i=index-1;i<num_contacts-1;i++)  //deleting the selected contact
    {
        contacts[i]=contacts[i+1];
    }
    num_contacts--;
    printf("Contact succesfully deleted\n");
}

void edit_contact() 
{
    char search_name[MAX_NAME_LEN];
    int index = -1;

    printf("Enter name to edit: ");
    scanf("%s", search_name);

    for (int i = 0; i < num_contacts; i++)    // searching for the contact name which user wants to edit
    {
        if (strcmp(search_name, contacts[i].name) == 0) 
        {
            index = i;
            break;
        }
    }

    if (index == -1) 
    {
        printf("Contact not found\n");
        return;
    }

    // editing the contact details
    printf("Enter new name (leave blank to keep '%s'): ", contacts[index].name);  
    char new_name[MAX_NAME_LEN];
    fgets(new_name, MAX_NAME_LEN, stdin);
    new_name[strcspn(new_name, "\n")] = '\0';

    if (strlen(new_name) > 0) 
        strncpy(contacts[index].name, new_name, MAX_NAME_LEN);
    
    getchar();
    printf("Enter new phone number (leave blank to keep '%s'): ", contacts[index].phone);
    char new_phone[MAX_PHONE_LEN];
    fgets(new_phone, MAX_PHONE_LEN, stdin);
    new_phone[strcspn(new_phone, "\n")] = '\0';

    if (strlen(new_phone) > 0) 
        strncpy(contacts[index].phone, new_phone, MAX_PHONE_LEN);
    getchar();

    printf("Enter new email address (leave blank to keep '%s'): ", contacts[index].email);
    scanf("%s", contacts[index].email);

    printf("Contact edited successfully\n");
}

void main()  // to display the menu alongwith calling the other functions
{
    int choice;

    do 
    {
        printf("\nContacts Management\n");
        printf("1. Add Contact\n");
        printf("2. List Contacts\n");
        printf("3. Delete Contact\n");
        printf("4. Edit Contact\n");
        printf("5. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);
        getchar();
        switch (choice) 
        {
            case 1:
                add_contact();
                break;

            case 2:
                list_contacts();
                break;

            case 3:
                delete_contact();
                break;

            case 4:
                edit_contact();
                break;

            case 5:
                printf("Exiting...\n");
                break;

            default:
                printf("Invalid choice\n");
                break;
        }
    } while (choice != 5);
}