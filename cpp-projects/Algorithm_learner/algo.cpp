#include <iostream>
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
            cout << "step " << j+1 << ": ";
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

int main()
{
    int choice;
    cout <<endl<< "====ALGORITHM SELECTION====" << endl<<endl;
    cout << "1. Sorting algorithms" << endl<<endl;
    cout << "2. Searching algorithms" << endl<<endl;
    cout << "Enter your choice" << endl;
    cin >> choice;

    // SORTING ALGORITHMS
    if (choice == 1)
    {

        int choice1;
        cout << "-----------------------------" << endl;
        cout << "SORTING ALGORITHMS" << endl<<endl;
        cout << "1. Bubble sort" << endl<<endl;
        cout << "2. Selection sort" << endl<<endl;
        cout << "3. Insertion sort" << endl<<endl;
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
        else
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
    }

    // SEARCHING ALGORITHMS
    if (choice == 2)
    {
        int choice2;
        cout << "-----------------------------" << endl;
        cout << "SEARCHING ALGORITHMS" << endl<<endl;
        cout << "1. Linear Search" << endl<<endl;
        cout << "2. Binary Search" << endl<<endl;
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
    return 0;
}