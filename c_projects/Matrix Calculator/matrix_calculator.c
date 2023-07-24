#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int matrix_transpose() {
    int row, column,matrix[7][7],transpmatrix[7][7];
    printf("Enter the order of matrix: ");
    scanf("%d %d",&row,&column);
    printf("\nEnter the values of the matrix element wise\n");
    for(int i=0;i<row;i++) {
        for(int j=0;j<column;j++) {
            scanf("%d",&matrix[i][j]);
        }
    }
    // transposing the matrix
    for(int i=0;i<column;i++) {
        for(int j=0;j<row;j++) {
            transpmatrix[i][j] = matrix[j][i];
        }
    }
    //printing the transposed matrix
    printf("Transposed matrix: \n");
    for(int i=0;i<column;i++){
        for(int j=0;j<row;j++) {
            printf("%d  ",transpmatrix[i][j]);
        }
        printf("\n");
    }
    printf("End\n");exit;
}

int matrix_mult() {
    int mr,mc,nr,nc,k,sum,matrix_one[7][7], matrix_two[7][7],matrixProd[7][7];
    printf("Enter the order of the first matrix: ");
    scanf("%d %d",&mr,&mc);
    printf("\nEnter the order of the second matrix: ");
    scanf("%d %d",&nr,&nc);
    //multiplication possible only when number of columns of first matrix is equal to number of rows of second matrix
    if(mc==nr) { 
        printf("Enter the values of first matrix element wise\n");
        for(int i=0;i<mr;i++) {
            for(int j=0;j<mc;j++) {
                scanf("%d",&matrix_one[i][j]);
            }
        }
        printf("Enter the values of second matrix element wise\n");
        for(int i=0;i<nr;i++) {
            for(int j=0;j<nc;j++) {
                scanf("%d",&matrix_two[i][j]);
            }
        }
        
        for (int i=0;i<mr;i++) {
            for (int j=0;j<nc;j++) {
                sum=0;
                for (int k=0;k<mc;k++) {
                    sum += matrix_one[i][k]*matrix_two[k][j];
                    matrixProd[i][j] = sum;
                }
            }
        }
        printf("Product of two matrices: \n");
        // displaying product of the two matrices
        for (int i=0;i<mr;i++){
            for(int j=0;j<nc;j++) {
                printf("%d  ",matrixProd[i][j]);
            }
            printf("\n");
        }
        
    }
    else {
        printf("Multiplication not possible\n");
    }
    printf("End\n");exit;
}

int matrix_sub() {
    int mr,mc,nr,nc,matrix_one[7][7], matrix_two[7][7],matrixDiff[7][7];
    printf("Enter the order of the first matrix: ");
    scanf("%d %d",&mr,&mc);
    printf("\nEnter the order of the second matrix: ");
    scanf("%d %d",&nr,&nc);
    if(mr==nr && mc==nc) { // subtraction possible only when order is same for both matrices
        printf("Enter the values of first matrix element wise\n");
        for(int i=0;i<mr;i++) {
            for(int j=0;j<mc;j++) {
                scanf("%d",&matrix_one[i][j]);
            }
        }
        printf("Enter the values of second matrix element wise\n");
        for(int i=0;i<nr;i++) {
            for(int j=0;j<nc;j++) {
                scanf("%d",&matrix_two[i][j]);
            }
        }
        for(int i=0;i<mr;i++) {
            for(int j=0;j<mc;j++) {
                matrixDiff[i][j] = matrix_one[i][j] - matrix_two[i][j];
            }
        }
        printf("Difference of the two entered matrices: \n");
        // printing the difference of the two matrices
        for(int i=0;i<mr;i++) {
            for(int j=0;j<mc;j++) {
                printf("%d  ", matrixDiff[i][j]);
            }
            printf("\n");
        }
    }
    else {
        printf("Order mismatch\n");exit;
    }
    printf("End\n");exit;
}

int matrix_add() {
    int mr,mc,nr,nc,matrix_one[7][7], matrix_two[7][7],matrixSum[7][7];
    printf("Enter the order of the first matrix: ");
    scanf("%d %d",&mr,&mc);
    printf("\nEnter the order of the second matrix: ");
    scanf("%d %d",&nr,&nc);
    if(mr==nr && mc==nc) { // addition possible only when order is same for both matrices
        printf("Enter the values of first matrix element wise\n");
        for(int i=0;i<mr;i++) {
            for(int j=0;j<mc;j++) {
                scanf("%d",&matrix_one[i][j]);
            }
        }
        printf("Enter the values of second matrix element wise\n");
        for(int i=0;i<nr;i++) {
            for(int j=0;j<nc;j++) {
                scanf("%d",&matrix_two[i][j]);
            }
        }
        for(int i=0;i<mr;i++) {
            for(int j=0;j<mc;j++) {
                matrixSum[i][j] = matrix_one[i][j] + matrix_two[i][j];
            }
        }
        printf("Sum of the two entered matrices: \n");
	// printing the sum of the two matrices
        for(int i=0;i<mr;i++) {
            for(int j=0;j<mc;j++) {
                printf("%d  ", matrixSum[i][j]);
            }
            printf("\n");
        }
    }
    else {
        printf("Order mismatch\n");
    }
    printf("End\n");exit;
}
void main() {
    int ch;
    printf("1. Matrix addition   2. Matrix subtraction\n");
    printf("3. Matrix multiplication   4. Matrix transpose\n");
    printf("Enter the choice of operation: ");
    scanf("%d",&ch);
    switch(ch) {
        case 1: matrix_add();break;
        case 2: matrix_sub();break;
        case 3: matrix_mult();break;
        case 4: matrix_transpose();break;
        default: printf("Invalid choice\nEnd\n");
    }
}
