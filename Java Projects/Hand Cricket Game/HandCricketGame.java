import java.util.*;
class ChucksCric//for ten wickets and upto 20 overs
{
 void main()
 {
 Scanner sc= new Scanner(System.in);
 Random rand = new Random();
 System.out.println("Enter the number of overs per innings");
 int ov = sc.nextInt();
 System.out.println("Enter 1 for batting first and 2 for batting second");
 int m = sc.nextInt();
 switch(m)
 {
 //first innings batting by user
 case 1:
 int c=0;
 int s=0;
 int k=0;
 while(k!=ov*6)
 {
 if(k==0)
 System.out.println("First Ball");
 if(k==0.3*ov*6)
 System.out.println("End of powerplay");
 System.out.println("Enter your score from 0 to 10");
 int x1= sc.nextInt();
 if(x1>10)
 {
 System.out.println("Dead Ball");
 continue;
 }
 int x2= rand.nextInt(11);
 if(x1==x2)
 {
 c++;
 System.out.println("OUT");
 System.out.println(s + "/" + c);
 }
 if(x1!=x2)
 {
 s=s+x1;
 System.out.println(s+"/"+c);
 }
 if(c==10)
 break;
 k++;
 }
 System.out.println("Final score=" + s + "/" + c);
 //second innings bowling by user
 c=0;
 int s1=0;
 k=0;
 while(k!=ov*6)
 {
 if(k==0)
 System.out.println("First Ball");
 if(k==0.3*ov*6)
 System.out.println("End of powerplay");
 System.out.println("Bowl from 0 to 10");
 int x1= sc.nextInt();
 if(x1>10)
 {
 System.out.println("Dead Ball");
 continue;
 }
 int x2= rand.nextInt(11);
 if(x1==x2)
 {
 c++;
 System.out.println("OUT");
 System.out.println(s1 + "/" + c);
 }
 if(x1!=x2)
 {
 s1=s1+x2;
 System.out.println(s1+"/"+c);
 if(s1>s)
 {
 System.out.println("You lost by" + " " + (10-c) + " " + "wickets");
 break;
 }
 }
 if(c==10)
 break;
 k++;
 }
 if(s1<s)
 System.out.println("You won by" + " " + (s-s1) +" " + "runs");
 System.out.println("Final score=" + s1 +"/" + c);
 break;
 case 2:
 //first innings bowling by user
 c=0;
 s=0;
 k=0;
 while(k!=ov*6)
 {
 if(k==0)
 System.out.println("First Ball");
 if(k==0.3*ov*6)
 System.out.println("End of powerplay");
 System.out.println("Bowl from 0 to 10");
 int x1= sc.nextInt();
 if(x1>10)
 {
 System.out.println("Dead Ball");
 continue;
 }
 int x2= rand.nextInt(11);
 if(x1==x2)
 {
 c++;
 System.out.println("OUT");
 System.out.println(s + "/" + c);
 }
 if(x1!=x2)
 {
 s=s+x2;
 System.out.println(s+"/"+c);
 }
 if(c==10)
 break;
 k++;
 }
 System.out.println("Final score=" + s + "/" + c);
 //second innings batting by user
 c=0;
 s1=0;
 k=0;
 while(k!=ov*6)
 {
 if(k==0)
 System.out.println("First Ball");
 if(k==0.3*ov*6)
 System.out.println("End of powerplay");
 System.out.println("Enter your score from 0 to 10");
 int x1= sc.nextInt();
 if(x1>10)
 {
 System.out.println("Dead Ball");
 continue;
 }
 int x2= rand.nextInt(11);
 if(x1==x2)
 {
 c++;
 System.out.println("OUT");
 System.out.println(s1 + "/" + c);
 }
 if(x1!=x2)
 {
 s1=s1+x1;
 System.out.println(s1+"/"+c);
 if(s1>s)
 {
 System.out.println("You won by" + " " + (10-c) + " " + "wickets");
 break;
 }
 }
 if(c==10)
 break;
 k++;
 }
 if(s1<s)
 System.out.println("You lost by" + " " + (s-s1) +" " + "runs");
 System.out.println("Final score=" + s1 +"/" + c);
 break;
 }
 }
}
