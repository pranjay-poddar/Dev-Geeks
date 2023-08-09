#include <iostream>
#include <algorithm>
#include<vector>
using namespace std;

// PRINTING ARRAY

void printArray(int arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        cout << arr[i];
    }
    return;
}

// PRINTING 2D ARRAY

void print2D(int arr[][100], int rows, int col)
{
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < col; j++)
        {
            cout << arr[i][j] << " ";
        }
        cout << endl;
    }
}

// SORTING

void SelectionSort(int arr[], int n)
{
    int min;
    for (int i = 0; i < n - 1; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            if (arr[j] < arr[i])
            {
                swap(arr[i], arr[j]);
            }
        }
        cout << "step " << i << ": ";
        printArray(arr, n);
        cout << endl;
    }
}

void BubbleSort(int arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        cout << "PASS " << i << endl;
        for (int j = 0; j < n; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
            }
            cout << "step " << j + 1 << ": ";
            printArray(arr, n);
            cout << endl;
        }
        cout << endl;
    }
}

void InsertionSort(int arr[], int n)
{

    for (int i = 1; i < n; i++)
    {
        int current = arr[i];
        int j = i - 1;
        cout << "PASS " << i << endl;
        while (arr[j] > current && j >= 0)
        {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
        printArray(arr, n);
        cout << endl;
    }
}

// SEARCHING

void LinearSearch(int arr[], int n, int key)
{

    int i = 0;
    while (i < n)
    {
        cout << "Comparing key with element number " << i << " of the array" << endl;
        if (arr[i] == key)
        {
            cout << key << "=" << arr[i] << endl;
            cout << "Element found at " << i << " position" << endl;
            break;
        }
        else if (i != n - 1)
        {
            cout << key << "!=" << arr[i] << endl;
            cout << "Moving to next element" << endl;
            i++;
        }
        else if (i == n - 1)
        {
            cout << key << " not found in array!!" << endl;
            break;
        }
    }
}

void BinarySearch(int arr[], int n, int key)
{
    cout << "-----------------------------" << endl;
    int low = 0, high = n - 1;
    int m = low + (high - low) / 2;
    cout << "low = " << low << endl;
    cout << "high = " << high << endl;
    cout << "mid = " << m << endl;

    while (low <= high)
    {
        cout << "-----------------------------" << endl;
        if (arr[m] == key)
        {
            cout << "element at mid position = " << arr[m] << endl;
            cout << "element found at " << m << " position" << endl;
            break;
        }
        else if (arr[m] > key)
        {
            cout << "element at mid position = " << arr[m] << endl;
            cout << "element is lesser than mid" << endl;
            high = m;
            m = low + (high - low) / 2;
            cout << "low = " << low << endl;
            cout << "high = " << high << endl;
            cout << "mid = " << m << endl;
        }
        else if (low == high)
        {
            cout << "element not found in array" << endl;
        }
        else
        {
            cout << "element at mid position = " << arr[m] << endl;
            cout << "element is greater than mid" << endl;
            low = m + 1;
            m = low + (high - low) / 2;
            cout << "low = " << low << endl;
            cout << "high = " << high << endl;
            cout << "mid = " << m << endl;
        }
    }
}

// 2D Array

void transpose(int arr[][100], int rows, int col)
{
    cout << "Creating a transpose matrix and initialising it with 0" << endl;
    int count = 1;
    int mat[col][100] = {0};
    for (int i = 0; i < rows; i++)
    {
        for (int j = 0; j < col; j++)
        {
            mat[j][i] = arr[i][j];
            cout << "step: " << count << endl;
            print2D(mat, rows, col);
            count++;
        }
    }
}

// MULTIPLICATION OF MATRICES

void multiplication(int A[][100], int B[][100], int r1, int c1, int c2)
{
    cout << "Consider the resultant matrix C which is initialised with 0" << endl;
    int count = 1;
    int C[r1][100] = {0};
    for (int i = 0; i < r1; i++)
    {
        for (int j = 0; j < c2; j++)
        {
            C[i][j] = 0;
            for (int k = 0; k < c1; k++)
            {
                C[i][j] += A[i][k] * B[k][j];
                cout << endl
                     << "step " << count << ": " << endl;
                print2D(C, r1, c2);
                count++;
            }
        }
    }
}

// SPIRAL MATRIX

void Spiral(int mat[][100], int r, int c)
{
    int top = 0, bottom = r - 1, left = 0, right = c - 1;
    cout << "The spiral order is: " << endl;
    while (top <= bottom && left <= right)
    {
        // Print the top row from left to right
        cout << "Print the top row from left to right" << endl;
        for (int i = left; i <= right; i++)
            cout << mat[top][i] << " ";
        top++;
        cout << endl;

        // Print the rightmost column from top to bottom
        cout << "Print the rightmost column from top to bottom" << endl;
        for (int i = top; i <= bottom; i++)
            cout << mat[i][right] << " ";
        right--;
        cout << endl;

        // Print the bottom row from right to left

        if (top <= bottom)
        {
            cout << "Print the bottom row from right to left" << endl;
            for (int i = right; i >= left; i--)
                cout << mat[bottom][i] << " ";
            bottom--;
            cout << endl;
        }

        // Print the leftmost column from bottom to top

        if (left <= right)
        {
            cout << "Print the leftmost column from bottom to top" << endl;
            for (int i = bottom; i >= top; i--)
                cout << mat[i][left] << " ";
            left++;
            cout << endl;
        }
    }
}

void Rotate(int c, int r, int mat[][100])
{

    int arr[c][100] = {0};
    cout << "Step 1: Transposed Matrix:" << endl
         << endl;
    for (int i = 0; i < r; i++)
    {
        for (int j = 0; j < c; j++)
        {
            arr[i][j] = mat[j][i];
        }
    }
    print2D(arr, r, c);

    cout << endl
         << endl;
    cout << "Step 2: Reverse Rows:" << endl
         << endl;
    for (int i = 0; i < r; i++)
    {
        int start = 0;
        int end = c - 1;
        while (start < end)
        {
            swap(arr[i][start], arr[i][end]);
            start++;
            end--;
        }
    }
    print2D(arr, r, c);
}

int BSearch(int mat[][100], int c, int r, int target)
{

    int s = 0, e = r * c - 1;
    int m = s + (e - s) / 2;
    cout << "-----------------------------" << endl;
    cout << "Consider the entire matrix as a one-dimensional array of length " << e << endl;
    cout << "Compare target with middle element of array " << endl;

    while (s <= e)
    {
        int element = mat[m / c][m % c];
        cout << "Mid element is: " << element << endl;

        if (target == element)
        {
            cout << "Element found at :"
                 << "row: " << (m / c) << "column: " << (m % c) << endl;
            return 1;
        }
        else if (target > element)
        {
            cout << target << " > " << element << endl;
            s = m + 1;
        }
        else
        {
            cout << target << " < " << element << endl;
            e = m - 1;
        }
        m = s + (e - s) / 2;
        cout << "start: " << s << endl;
        cout << "mid: " << m << endl;
        cout << "end: " << e << endl;
        cout << "-----------------------------" << endl;
    }
    cout << "Element not found" << endl;
    return 0;
}

int staircase(int mat[][100], int r, int c, int target)
{

    cout << "Start from the top-right element of the matrix " << endl;

    int rowstart = 0;
    int rowend = r - 1;
    int colend = c - 1;

    while (rowstart < r && colend >= 0)
    {
        int element = mat[rowstart][colend];
        cout << "Current element is: " << element << endl;
        if (target == element)
        {
            cout << "Element found at row: " << rowstart << " and column: " << colend << endl;
            return 1;
        }
        else if (target < element)
        {
            cout << "Moving leftward " << endl;
            colend--;
        }
        else
        {
            cout<<"Moving downwards"<<endl;
            rowstart++;
        }
    }
    cout<<"Element not found "<<endl;
    return 0;
}

void Prime(){
    cout << "-----------------------------" << endl;
    cout<<"COUNT PRIMES - SIEVE OF ERATOSTHENES"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"DESCRIPTION"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"The 'Count Prime' algorithm is used to find the number of prime numbers that exist within a given range [M, N]. The goal is to count how many prime numbers are present between the two specified integers M and N (both inclusive).\nOne of the most efficient algorithms to solve this problem is the 'Sieve of Eratosthenes'.It works as follows:\n\nInitialize: Create an array or list of size N+1, where each element represents a number from 0 to N. Initially, mark all elements as potential primes.\n\nStarting Point: Begin with the first prime number 2.\n\nMark Multiples: Starting from 2, mark all its multiples as non-prime. To do this, iterate through the list and mark numbers that are multiples of 2 as non-prime (i.e., set them as false).\n\nNext Prime: Move to the next unmarked number greater than the previous prime (in this case, 3) and mark all its multiples as non-prime.\n\nRepeat: Continue this process until you reach the square root of N. At this point, all remaining unmarked numbers are prime."<<endl;
    cout << "-----------------------------" << endl;
    cout<<"TIME COMPLEXITY"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"The time complexity of the Count Prime algorithm using the Sieve of Eratosthenes is O(N log log N), where N is the upper limit of the range of numbers for which we want to count prime numbers"<<endl;
    cout << "-----------------------------" << endl;
    int n;
    cout<<"Enter the Number til which you want to count primes: ";
    cin>>n;
    cout<<endl;
    vector<bool> prime(n+1,true);
        int count=0;
        prime[0]=prime[1]=false;
        for(int i=2;i<n;i++){
            if(prime[i]){
                count++;
            }
            for(int j=2*i;j<n;j=j+i){
                prime[j]=0;
            }
            
        }
        cout<<endl;
        cout<<"The number of prime numbers between 1-"<<n<<" are "<<count<<endl;
}

void GCD(){

    cout << "-----------------------------" << endl;
    cout<<"GCD-EUCLIDEAN ALGORITHM"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"DESCRIPTION"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"The Euclidean Algorithm is a classic and efficient method used to find the Greatest Common Divisor (GCD) of two non-negative integers, let's call them a and b. The GCD of two numbers is the largest positive integer that divides both a and b without leaving any remainder.\nThe Euclidean Algorithm is based on the following property: If we have two positive integers a and b, where a > b, then the GCD of a and b is the same as the GCD of b and the remainder of the division a by b."<<endl;
    cout << "-----------------------------" << endl;
    cout<<"TIME COMPLEXITY"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"The Euclidean Algorithm is very efficient and has a time complexity of O(log min(a, b)), where a and b are the two input integers"<<endl;
    cout << "-----------------------------" << endl;
    int a,b;
    cout<<"Enter a"<<endl;
    cin>>a;
    cout<<"Enter b"<<endl;
    cin>>b;
    int remainder;
    while (b != 0) {
        remainder = a % b;
        cout << a << " = " << a / b << " * " << b << " + " << remainder << endl;
        a = b;
        b = remainder;
    }
    cout << "GCD is " << a << endl;
}

void fact(){
    cout << "-----------------------------" << endl;
    cout<<"FACTORIAL"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"DESCRIPTION"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"The factorial algorithm is used to compute the factorial of a non-negative integer. The factorial of a non-negative integer n, denoted by n!, is the product of all positive integers from 1 to n."<<endl;
    cout << "-----------------------------" << endl;
    cout<<"TIME COMPLEXITY"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"The time complexity is O(n), where n is the number whose factorial is to be calculated"<<endl;   
    cout << "-----------------------------" << endl;
    int n;
    cout<<"Enter n: ";
    cin>>n;
    cout<<endl;
    int result=1;
    for(int i=1;i<=n;i++){
        cout<<"result = "<<result<<"X"<<i<<endl;
        result=result*i;
    }
    cout<<"Factorial of "<<n<<" is "<<result<<endl;
}

void fib(){
    cout << "-----------------------------" << endl;
    cout<<"FACTORIAL"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"DESCRIPTION"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"The Fibonacci sequence is a famous mathematical sequence that starts with 0 and 1. Each subsequent number in the sequence is the sum of the two preceding numbers."<<endl;
    cout << "-----------------------------" << endl;
    cout<<"TIME COMPLEXITY"<<endl;
    cout << "-----------------------------" << endl;
    cout<<"The time complexity is O(n), where n is the nth element of fibonacci sequence";
    cout << "-----------------------------" << endl;
    int n;
    cout<<"Enter n"<<endl;
    cin>>n;
    int sum =0;
        int a=0;
        int b=1;
        cout<<"a="<<a<<endl<<"b="<<b<<endl<<"sum="<<sum<<endl<<endl;
        if(n==1){
            cout<<"1"<<endl;
        }
        for(int i=1;i<n;i++){
            sum=a+b;
            a=b;
            b=sum;
            cout<<"a="<<a<<endl<<"b="<<b<<endl<<"sum="<<sum<<endl<<endl;
        }
        cout<<n<<"th number in fibonacci sequence is: "<<sum<<endl;


}

void merge(vector<int> &arr, int left, int mid, int right)
{
    int i, j, k;
    int n1 = mid - left + 1;
    int n2 = right - mid;

    vector<int> leftArr(n1);
    vector<int> rightArr(n2);

    // Copy data to temporary arrays
    for (i = 0; i < n1; i++)
        leftArr[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        rightArr[j] = arr[mid + 1 + j];

    // Merge the two temporary arrays back into arr
    i = 0;
    j = 0;
    k = left;
    while (i < n1 && j < n2)
    {
        if (leftArr[i] <= rightArr[j])
        {
            arr[k] = leftArr[i];
            i++;
        }
        else
        {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of leftArr, if any
    while (i < n1)
    {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    // Copy the remaining elements of rightArr, if any
    while (j < n2)
    {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

// Recursive Merge Sort function
void mergeSort(vector<int> &arr, int left, int right)
{
    if (left < right)
    {
        int mid = left + (right - left) / 2;

        // Sort first and second halves
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        // Merge the sorted halves
        merge(arr, left, mid, right);

        // Visualization: Print the current state of the array after each merge
        cout << "Current state: ";
        for (int i = left; i <= right; i++)
        {
            cout << arr[i] << " ";
        }
        cout << endl;
    }
}

int partition(vector<int> &arr, int low, int high)
{
    int pivot = arr[high]; // Choose the last element as the pivot
    int i = low - 1;       // Index of the smaller element

    for (int j = low; j < high; j++)
    {
        // If the current element is smaller than or equal to the pivot
        if (arr[j] <= pivot)
        {
            i++;                  // Increment index of the smaller element
            swap(arr[i], arr[j]); // Swap the elements at i and j
        }
    }
    swap(arr[i + 1], arr[high]); // Place the pivot at its correct position
    return i + 1;                // Return the index of the pivot
}

// Recursive Quick Sort function
void quickSort(vector<int> &arr, int low, int high)
{
    if (low < high)
    {
        // Perform partitioning and get the pivot index
        int pivotIdx = partition(arr, low, high);

        // Visualization: Print the current state of the array after each partitioning
        cout << "Current state: ";
        for (int i = low; i <= high; i++)
        {
            cout << arr[i] << " ";
        }
        cout << endl;

        // Recursively sort elements before and after the pivot
        quickSort(arr, low, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, high);
    }
}

int main()
{
    int choice;
    cout << endl
         << "====ALGORITHM SELECTION====" << endl
         << endl;
    cout << "1. Sorting algorithms" << endl
         << endl;
    cout << "2. Searching algorithms" << endl
         << endl;
    cout << "3. 2D Array Algorithms" << endl
         << endl;
    cout<<"4. Basic Math Algorithms"<<endl<<endl;
    cout << "Enter your choice" << endl;
    cin >> choice;

    // SORTING ALGORITHMS
    if (choice == 1)
    {

        int choice1;
        cout << "-----------------------------" << endl;
        cout << "SORTING ALGORITHMS" << endl
             << endl;
        cout << "1. Bubble sort" << endl
             << endl;
        cout << "2. Selection sort" << endl
             << endl;
        cout << "3. Insertion sort" << endl
             << endl;
        cout << "4. Merge Sort" << endl
             << endl;
        cout << "5. Quick Sort" << endl
             << endl;
        cout << "Enter your choice" << endl;
        cin >> choice1;

        // BUBBLE SORT
        if (choice1 == 1)
        {
            cout << "-----------------------------" << endl;
            cout << "BUBBLE SORT" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "The outer loop of the Bubble Sort algorithm iterates n - 1 times, as in each iteration, the largest unsorted element is guaranteed to move to its correct position at the end of the array.\nThe inner loop iterates n - i - 1 times, where i is the current iteration of the outer loop. This is because the largest i elements are already in their sorted positions after each iteration." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity of the Bubble Sort algorithm is O(n^2), where n is the number of elements in the array to be sorted" << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter size of array" << endl;
            int n;
            cin >> n;
            cout << "Enter elements of array" << endl;
            int arr[n];
            for (int i = 0; i < n; i++)
            {
                cin >> arr[i];
            }
            BubbleSort(arr, n);
        }
        // SELECTION SORT
        else if (choice1 == 2)
        {
            cout << "-----------------------------" << endl;
            cout << "SELECTION SORT" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "The algorithm repeatedly selects the smallest (or largest) element from the unsorted portion of the list and swaps it with the first element of the unsorted part.\nThis process is repeated for the remaining unsorted portion until the entire list is sorted. " << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity of the Selection Sort algorithm is O(n^2), where n is the number of elements in the array to be sorted" << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter size of array" << endl;
            int n;
            cin >> n;
            cout << "Enter elements of array" << endl;
            int arr[n];
            for (int i = 0; i < n; i++)
            {
                cin >> arr[i];
            }
            SelectionSort(arr, n);
        }
        // INSERTION SORT
        else if(choice1==3)
        {
            cout << "-----------------------------" << endl;
            cout << "INSERTION SORT" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "To sort an array of size N in ascending order iterate over the array and compare the current element (key) to its predecessor, if the key element is smaller than its predecessor, compare it to the elements before.\nMove the greater elements one position up to make space for the swapped element." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity of the Insertion Sort algorithm is O(n^2), where n is the number of elements in the array being sorted." << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter size of array" << endl;
            int n;
            cin >> n;
            cout << "Enter elements of array" << endl;
            int arr[n];
            for (int i = 0; i < n; i++)
            {
                cin >> arr[i];
            }
            InsertionSort(arr, n);
        }
        else if (choice1 == 4)
        {
            cout << "-----------------------------" << endl;
            cout << "MERGE SORT" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "Merge Sort is a popular divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts each half, and then merges the two sorted halves to produce a sorted array." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity of Merge Sort is O(n log n), where n is the number of elements in the array to be sorted.\nThis makes Merge Sort one of the most efficient sorting algorithms, especially for large datasets." << endl;
            cout << "-----------------------------" << endl;

            vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
            int n = arr.size();

            cout << "Original Array: ";
            for (int num : arr)
            {
                cout << num << " ";
            }
            cout << endl;

            mergeSort(arr, 0, n - 1);

            cout << "Sorted Array: ";
            for (int num : arr)
            {
                cout << num << " ";
            }
            cout << endl;
        }
        else if (choice1 == 5)
        {
            cout << "-----------------------------" << endl;
            cout << "QUICK SORT" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "Quick Sort is a popular sorting algorithm that follows the divide-and-conquer strategy.\nIt picks an element as a pivot and partitions the array into two subarrays - elements less than the pivot and elements greater than the pivot. It then recursively sorts the two subarrays." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The average-case time complexity of Quick Sort is O(n log n) because the algorithm employs a divide-and-conquer strategy, similar to Merge Sort. " << endl;
            cout << "-----------------------------" << endl;
            vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
            int n = arr.size();

            cout << "Original Array: ";
            for (int num : arr)
            {
                cout << num << " ";
            }
            cout << endl;

            quickSort(arr, 0, n - 1);

            cout << "Sorted Array: ";
            for (int num : arr)
            {
                cout << num << " ";
            }
            cout << endl;
        }
    }

    // SEARCHING ALGORITHMS
    else if (choice == 2)
    {
        int choice2;
        cout << "-----------------------------" << endl;
        cout << "SEARCHING ALGORITHMS" << endl
             << endl;
        cout << "1. Linear Search" << endl
             << endl;
        cout << "2. Binary Search" << endl
             << endl;
        cout << "Enter your choice" << endl;
        cin >> choice2;

        if (choice2 == 1)
        {
            cout << "-----------------------------" << endl;
            cout << "LINEAR SEARCH" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "In Linear Search Algorithm,Every element is considered as a potential match for the key and checked for the same.\nIf any element is found equal to the key, the search is successful and the index of that element is returned.\nIf no element is found equal to the key, the search yields 'No match found'." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity of the Linear Search algorithm is O(n), where n is the number of elements in the array being searched." << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter size of array" << endl;
            int n, key;
            cin >> n;
            cout << "Enter elements of array" << endl;
            int arr[n];
            for (int i = 0; i < n; i++)
            {
                cin >> arr[i];
            }
            cout << endl;
            cout << "Enter element to be searched in array" << endl;
            cin >> key;
            LinearSearch(arr, n, key);
        }
        else if (choice2 == 2)
        {

            cout << "-----------------------------" << endl;
            cout << "BINARY SEARCH" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "Binary Search is defined as a searching algorithm used in a sorted array by repeatedly dividing the search interval in half. The idea of binary search is to use the information that the array is sorted and reduce the time complexity to O(log N). " << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity of the Binary Search algorithm is O(log(N)), where N is the number of elements in the array being searched." << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter size of array" << endl;
            int n, key;
            cin >> n;
            cout << "Enter elements of array in ascending order" << endl;
            int arr[n];
            for (int i = 0; i < n; i++)
            {
                cin >> arr[i];
            }
            cout << endl;
            cout << "Enter element to be searched in array" << endl;
            cin >> key;
            BinarySearch(arr, n, key);
        }
    }

    // 2D ARRAY ALGORITHMS

    else if (choice == 3)
    {

        int choice1;
        cout << "-----------------------------" << endl;
        cout << "2D ARRAY ALGORITHMS" << endl
             << endl;
        cout << "1. Transpose of Matrix" << endl
             << endl;
        cout << "2. Multiplication of Matrix" << endl
             << endl;
        cout << "3. Spiral Matrix" << endl
             << endl;
        cout << "4. Matrix Rotation" << endl
             << endl;
        cout << "5. Matrix Search - Binary Search" << endl
             << endl;
        cout << "6. Matrix Search - Staircase Search" << endl
             << endl;
        cout << "Enter your choice" << endl;
        cin >> choice1;

        if (choice1 == 1)
        {
            cout << "-----------------------------" << endl;
            cout << "TRANSPOSE OF MATRIX" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "The transpose of a matrix is an operation that involves swapping the rows and columns of a given matrix.\nGiven an m x n matrix, the transpose operation converts it into an n x m matrix, where the rows of the original matrix become the columns of the transposed matrix, and vice versa." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity of the transpose operation is O(m * n), where 'm' is the number of rows and 'n' is the number of columns in the original matrix." << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter number of rows: ";
            int rows;
            cin >> rows;
            cout << endl;
            int col;
            cout << "Enter number of columns: ";
            cin >> col;
            cout << endl;
            cout << "Enter elements of matrix";
            int arr[rows][100];
            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < col; j++)
                {
                    cin >> arr[i][j];
                }
            }
            transpose(arr, rows, col);
        }

        else if (choice1 == 2)
        {
            int r1, c1, c2;
            cout << "-----------------------------" << endl;
            cout << "MULTIPLICATION OF MATRIX" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "Matrix multiplication is an essential mathematical operation that combines two matrices to produce a new matrix.\nGiven two matrices A and B, where A is of size m x p and B is of size p x n, the product of A and B results in a new matrix C of size m x n." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity of matrix multiplication is O(m * p * n), where 'm', 'p', and 'n' are the dimensions of matrices A, B, and C, respectively." << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter rows of matrix A" << endl;
            cin >> r1;
            cout << "Enter columns of matrix A" << endl;
            cin >> c1;
            cout << "Rows of matrix B = Columns of matrix A" << endl;
            cout << "Enter columns of matrix B" << endl;
            cin >> c2;
            int A[r1][100];
            int B[c1][100];
            cout << "Enter elements of matrix A" << endl;
            for (int i = 0; i < r1; i++)
            {
                for (int j = 0; j < c1; j++)
                {
                    cin >> A[i][j];
                }
            }
            cout << "Enter elements of matrix B" << endl;
            for (int i = 0; i < c1; i++)
            {
                for (int j = 0; j < c2; j++)
                {
                    cin >> B[i][j];
                }
            }
            multiplication(A, B, r1, c1, c2);
        }
        else if (choice1 == 3)
        {
            int r, c;
            cout << "-----------------------------" << endl;
            cout << "SPIRAL MATRIX" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "Printing a matrix in a spiral order involves traversing the elements of the matrix in a clockwise spiral manner,\nstarting from the top-left corner and moving towards the center in a spiral path until all elements are visited.\nThe spiral order traversal is visualized as if following the boundary of the matrix." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity for printing a matrix in a spiral order is O(m * n), where 'm' is the number of rows and 'n' is the number of columns in the matrix." << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter the rows of matrix" << endl;
            cin >> r;
            cout << "Enter the columns of matrix" << endl;
            cin >> c;
            int mat[r][100];
            cout << "Enter elements of matrix" << endl;
            for (int i = 0; i < r; i++)
            {
                for (int j = 0; j < c; j++)
                {
                    cin >> mat[i][j];
                }
            }
            Spiral(mat, r, c);
        }

        else if (choice1 == 4)
        {

            int c, r;
            cout << "-----------------------------" << endl;
            cout << "MATRIX ROTATION" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "Matrix rotation is an algorithm that involves rotating the elements of a matrix in-place, either clockwise or counterclockwise, by 90 degrees.\nThis operation changes the orientation of the matrix while preserving its elements.\nThe algorithm modifies the matrix directly without requiring any additional data structures, making it memory-efficient." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The matrix rotation algorithm involves two main operations:\ntransposing and reversing rows/columns,\nboth of which take O(m * n) time, where 'm' is the number of rows and 'n' is the number of columns in the matrix" << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter the rows of matrix" << endl;
            cin >> r;
            cout << "Enter the columns of matrix" << endl;
            cin >> c;
            int mat[r][100];
            cout << "Enter elements of matrix" << endl;
            for (int i = 0; i < r; i++)
            {
                for (int j = 0; j < c; j++)
                {
                    cin >> mat[i][j];
                }
            }
            Rotate(c, r, mat);
        }

        else if (choice1 == 5)
        {

            int c, r, target;
            cout << "-----------------------------" << endl;
            cout << "MATRIX SEARCH" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "The Matrix Search using Binary Search algorithm is an efficient way to search for an element in a sorted matrix.\nThis algorithm is based on the principles of binary search and takes advantage of the sorted rows and columns of the matrix to achieve a time complexity of O(log(m * n)),\nwhere 'm' is the number of rows and 'n' is the number of columns in the matrix." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity of the Matrix Search using Binary Search algorithm is O(log(m * n)), where 'm' is the number of rows and 'n' is the number of columns in the matrix" << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter the rows of matrix" << endl;
            cin >> r;
            cout << "Enter the columns of matrix" << endl;
            cin >> c;
            int mat[r][100];
            cout << "Enter elements of matrix" << endl;
            for (int i = 0; i < r; i++)
            {
                for (int j = 0; j < c; j++)
                {
                    cin >> mat[i][j];
                }
            }
            cout << "Enter the element to be searched" << endl;
            cin >> target;

            BSearch(mat, c, r, target);
        }

        else if (choice1 == 6)
        {
            int c, r, target;
            cout << "-----------------------------" << endl;
            cout << "MATRIX SEARCH" << endl;
            cout << "-----------------------------" << endl;
            cout << "DESCRIPTION" << endl;
            cout << "-----------------------------" << endl;
            cout << "The Staircase Algorithm, also known as the Staircase Traversal or Staircase Search algorithm, is an approach used to efficiently search for a target element in a two-dimensional matrix with a specific pattern of sorted rows and columns.\nThe algorithm is designed to exploit the sorted nature of the matrix and minimize the search space while searching for the target element." << endl;
            cout << "-----------------------------" << endl;
            cout << "TIME COMPLEXITY" << endl;
            cout << "-----------------------------" << endl;
            cout << "The time complexity of the Staircase Algorithm is O(m + n), where 'm' is the number of rows and 'n' is the number of columns in the matrix." << endl;
            cout << "-----------------------------" << endl;
            cout << "Enter the rows of matrix" << endl;
            cin >> r;
            cout << "Enter the columns of matrix" << endl;
            cin >> c;
            int mat[r][100];
            cout << "Enter elements of matrix" << endl;
            for (int i = 0; i < r; i++)
            {
                for (int j = 0; j < c; j++)
                {
                    cin >> mat[i][j];
                }
            }
            cout << "Enter the element to be searched" << endl;
            cin >> target;
            staircase(mat,r,c,target);
        }
    }

    //BASIC MATH 

    else if(choice ==4){
        int choice1;
        cout << "-----------------------------" << endl;
        cout << "BASIC MATH ALGORITHMS" << endl
             << endl;
        cout << "1. Count Prime" << endl
             << endl;
        cout << "2. Find GCD" << endl
             << endl;
        cout << "3. Calculate Factorial" << endl
             << endl;
        cout << "4. Fibonacci Sequence" << endl
             << endl;
        cout << "Enter your choice" << endl;
        cin >> choice1;

        if(choice1 == 1){
            Prime();
        }
        else if(choice1 == 2){
            GCD();
        }
        else if(choice1 == 3){
            fact();
        }
        else if(choice1==4){
            fib();
        }
    }
    return 0;
}
