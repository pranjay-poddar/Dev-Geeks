// Swastika pattern

/*

*     * * * * 
*     *       
*     *       
* * * * * * *
      *     * 
      *     * 
* * * *     *

*/

#include <iostream>
using namespace std;

void createOddSwastika(int& n) {
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= n; j++) {
            if(i == 1) {
                if(j > (n/2) || j == 1)
                    cout << "* ";
                else
                    cout << "  ";
            }
            else if(i == n) {
                if(j <= (n/2+1) || j == n)
                    cout << "* ";
                else
                    cout << "  ";
            }
            else if(i == (n+1)/2)
                cout << "* ";
            else if(i <= n/2 && i != 1) {
                if(j == 1 || j == (n+1)/2)
                    cout << "* ";
                else
                    cout << "  ";
            }
            else {
            if(j == n || j == (n+1)/2)
                cout << "* ";
            else
                cout << "  ";
            }
        }
        cout << endl;
    }
}

void createEvenSwastika(int& n) {
    for(int i = 1; i <= n; i++) {
        for(int j = 1; j <= n; j++) {
            if(i == 1) {
                if(j >= (n/2) || j == 1)
                    cout << "* ";
                else
                    cout << "  ";
            }
            else if(i == n) {
                if(j <= (n/2) || j == n)
                    cout << "* ";
                else
                    cout << "  ";
            }
            else if(i == (n+1)/2)
                cout << "* ";
            else if(i <= n/2 && i != 1) {
                if(j == 1 || j == (n+1)/2)
                    cout << "* ";
                else
                    cout << "  ";
            }
            else {
            if(j == n || j == (n+1)/2)
                cout << "* ";
            else
                cout << "  ";
            }
        }
        cout << endl;
    }
}

int main() {
    int n;
    cout << "Enter the size of the Swastika: ";
    cin >> n;
    cout << endl;
    if(n%2 == 1) {
        createOddSwastika(n);
    } else {
        createEvenSwastika(n);
    }
    cout << endl;
    return 0;
}
