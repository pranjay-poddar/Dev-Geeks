#include<iostream>
#include<stdlib.h>
#include<unistd.h>

using namespace std;
int main(){
int h,m,s,h1,m1,s1;
cout<<"Enter Current Time In HH:MM:SS ";
cin>>h;
cin>>m;
cin>>s;
if(h<24 || m<60 ||s<60){
cout<<"Set Alarm : "; cin>>h1>>m1>>s1;
system("clear");
start: ;
for(h;h<24;h++){
 for(m;m<60;m++){
  for(s;s<60;s++){
    system("clear");
  cout<<" ";
    
   cout<<h<<" : "<<m<<" : "<<s;
    if(h<12){
        cout<<" AM \n";
        cout<<" Good Morning \n";
    }
    else
    {
        cout<<" PM \n";
        cout<<" Good Afternoon \n";
    }
    
    if(h==h1 && m==m1 && s==s1){
       while (s!=(s1+10)){
       cout<<"\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a\a";}
    
    }
    system("clear");
  sleep(1);
  }s=0;
 }m=0;
}h=0;
goto start;
}
else{
  cout<<"Invalid Time Set By You !";
}
return 0;
}