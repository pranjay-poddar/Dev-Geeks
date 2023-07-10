#include <stdio.h>
#include <stdlib.h>

#define MAX_STUDENTS 1000

struct Student {
    int rollNumber;
    char name[50];
    int age;
};

struct Student database[MAX_STUDENTS];
int numStudents = 0;

void addStudent() {
    if (numStudents == MAX_STUDENTS) {
        printf("Database is full. Cannot add more students.\n");
        return;
    }

    struct Student newStudent;
    printf("Enter roll number: ");
    scanf("%d", &newStudent.rollNumber);
    printf("Enter name: ");
    scanf("%s", newStudent.name);
    printf("Enter age: ");
    scanf("%d", &newStudent.age);

    database[numStudents] = newStudent;
    numStudents++;

    printf("Student added to the database.\n");
}

void displayStudents() {
    if (numStudents == 0) {
        printf("Database is empty.\n");
        return;
    }

    printf("Roll Number\tName\t\tAge\n");
    printf("--------------------------------------\n");

    for (int i = 0; i < numStudents; i++) {
        struct Student student = database[i];
        printf("%d\t\t%s\t\t%d\n", student.rollNumber, student.name, student.age);
    }
}

void searchStudent() {
    int rollNumber;
    printf("Enter the roll number to search: ");
    scanf("%d", &rollNumber);

    for (int i = 0; i < numStudents; i++) {
        struct Student student = database[i];
        if (student.rollNumber == rollNumber) {
            printf("Roll Number\tName\t\tAge\n");
            printf("--------------------------------------\n");
            printf("%d\t\t%s\t\t%d\n", student.rollNumber, student.name, student.age);
            return;
        }
    }

    printf("Student not found.\n");
}

int main() {
    int choice;

    while (1) {
        printf("\nStudent Database\n");
        printf("1. Add Student\n");
        printf("2. Display Students\n");
        printf("3. Search Student\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                addStudent();
                break;
            case 2:
                displayStudents();
                break;
            case 3:
                searchStudent();
                break;
            case 4:
                exit(0);
            default:
                printf("Invalid choice. Please try again.\n");
                break;
        }
    }

    return 0;
}
