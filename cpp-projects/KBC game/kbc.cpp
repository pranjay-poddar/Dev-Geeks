//___________WELCOME ALL  OF YOU ON ROHIT TECH STUDY CHANNEL_______________//

//_____________________ C++ PROGRAM TO MAKE KBC GAME ______________________//

//>>>>>>>>>>>>>>>......___ KAUN BANEGA CROREPATI ____.....<<<<<<<<<<<<<<<<<//





#include<graphics.h>

#include<stdlib.h>

#include<stdio.h>

#include<conio.h>

#include<dos.h>

#include<math.h>

#include<fstream.h>

#include<string.h>

union REGS i,o;

int flag;

int ansbox1=0,ansbox2=0;

int life1=0,life2=0,life3=0,f3=0;

int button, x1,y1;





long double size;



char str[8]={'0'};

char total[10]={'0'};

long double p=500;

ifstream fin;

char correctans[2];



void page2();

void page3();

void line();

void questions();

void incorrect1();

void incorrect2();

void incorrect3();

void incorrect4();

void phonefriend();

void fiftyfifty();

void audiencepoll();

void sorry();

void select();

void correct();

void startscreen();

void totalprizemoney();

void music();

void askname();

       int offset=0,num;

	int prev[15],count=0;



initmouse()

{

i.x.ax=0;

int86(0x33,&i,&o);

return(o.x.ax);

}

void showmouseptr()

{

i.x.ax=1;

int86(0x33,&i,&o);

}

void hidemouseptr()

{

i.x.ax=2;

int86(0x33,&i,&o);

}

void getmousepos(int *button,int *x,int *y)

{

i.x.ax=3;

int86(0x33,&i,&o);

*button=o.x.bx;

*x=o.x.cx;

*y=o.x.dx;

}







void main()

{



/* request auto detection */

int gdriver = DETECT, gmode, errorcode;



/* initialize graphics and local variables */

initgraph(&gdriver, &gmode, "c:\\tC\\bgi");



/* read result of initialization */

errorcode = graphresult();

if (errorcode != grOk)  /* an error occurred */

{

      printf("Graphics error: %s\n",grapherrormsg(errorcode));

      printf("Press any key to halt:");

      getch();

      exit(1); /* terminate with an error code */

   }







  if(initmouse()==0)

   {

    closegraph();

    restorecrtmode();



//to go back to normal graphics mode or deleting viewport.

    printf(" mouse driver not loaded");

    exit(1);

   }

   startscreen();



p=500;

ansbox1=0,ansbox2=0;

count=0;

life1=0,life2=0,life3=0;

page2();



hidemouseptr();

page3();

closegraph();

restorecrtmode();

}



void page2()

{

cleardevice();

settextstyle(12,0,5);

setcolor(10);

outtextxy(20,10,"ROHIT TECH STUDY");

setlinestyle(1,0,1);



setcolor(BLUE);

setlinestyle(0,0,3);

rectangle(500,5,625,350);

line(0,350,625,350);

setcolor(LIGHTBLUE);

int poly[]={40,390,60,365,560,365,580,390,560,415,60,415,40,390};

drawpoly(7,poly);

line(0,390,40,390);line(580,390,620,390);

int poly1[]={40,430,50,420,290,420,300,430,290,445,50,445,40,430};

drawpoly(7,poly1);

int poly2[]={300,430,310,420,575,420,585,430,575,445,310,445,300,430};

drawpoly(7,poly2);

int poly3[]={40,465,50,450,290,450,300,465,290,475,50,475,40,465};

drawpoly(7,poly3);

int poly4[]={300,465,310,450,575,450,585,465,575,475,310,475,300,465};

line(0, 430,40,430);line(0,465,40,465);

line(585,430,620,430);line(585,465,620,465);

drawpoly(7,poly4);

setfillstyle(1,RED);

settextstyle(2,0,0);

fillellipse(525,20,20,10);

fillellipse(565,20,20,10);

fillellipse(605,20,20,10);

setcolor(YELLOW);

outtextxy(510,15,"50:50");

outtextxy(550,15,"PHONE");

outtextxy(589,13,"PUBLIC");

outtextxy(593,18,"vote");

settextstyle(12,0,2);

setcolor(YELLOW);

outtextxy(520,50,"  10000000");

setcolor(LIGHTBLUE);

outtextxy(520,70,"  5000000");

outtextxy(520,90,"  2500000");

outtextxy(520,110,"  1250000");

outtextxy(520,130,"  640000");

setcolor(YELLOW);

outtextxy(520,150,"  320000");

setcolor(LIGHTBLUE);

outtextxy(520,170,"  160000");

outtextxy(520,190,"  80000");

outtextxy(520,210,"  40000");

outtextxy(520,230,"  20000");

setcolor(YELLOW);

outtextxy(520,250,"  10000");

setcolor(LIGHTBLUE);

outtextxy(520,270,"  5000");

outtextxy(520,290,"  3000");

outtextxy(520,310,"  2000");

outtextxy(520,330,"  1000");



 count=0;



askname();



questions();







getch();



}

void page3()

{

cleardevice();

settextstyle(12,0,1);

for(int i=490;i>=200;i--)

{

setcolor(10);



}

setcolor(10);

setcolor(WHITE);

outtextxy(10,460,"PRESS ANY KEY TO CONTINUE ");

getch();



exit(0);

}

char proc[]={"PROCESSING........"};

void line()

{

setlinestyle(0,0,1);

	for(int x=0;x<=485;x++)

	{ 	setcolor(LIGHTGRAY);

	line(x+10,20,x+10,340);



	setcolor(0);

	rectangle(0,20,x,340);

	line(x+10,20,x+10,340);



	}

	setlinestyle(0,0,3);

	sleep(1);



}

	void questions()

	{

	     char question[200];

	     char ans1[150];

	     char ans2[150];

	     char ans3[150];

	     char ans4[150];



    int temp=0;







		char ch,ch1;

		int num=0,ct=0,i=0,t=0;

		int randnum[15];

		char str[4],co[4],numc[2];



	    randomize();



	fin.open("KBC.txt",ios::binary);

	   while(!fin.eof())

	   {

		fin.get(ch);

		if(ch=='\n')

		t++;

	   }

	   fin.close();

	   t=t/6;



		fin.open("KBC.txt",ios::binary);

	settextstyle(COMPLEX_FONT,0,3);

	setcolor(RED);

	 outtextxy(150,310,"LET's PLAY !!!");

	 sleep(3);

		setcolor(BLACK);

	 outtextxy(150,310,"LET's PLAY !!!");



       while(ct<15)

	{



	count=0;

	num=random(t);



	  for(i=0;i<temp;i++)

	   {

	  if(randnum[i]==num)

	  {

	  num=random(t);

	      i=0;

	  }

	   }

	  randnum[temp]=num;



	  temp++;



	fin.seekg(0,ios::beg);

	   while(!fin.eof())

	   {

		fin.get(ch);

		if(ch=='\n')

		count++;

	     if(count==(6*num))

	     {



	     break;

	     }

	   }          if(ct>0)

	   {

			setcolor(RED);

	 outtextxy(150,310,"NEXT question !!!");

	 sleep(3);

		setcolor(BLACK);

	 outtextxy(150,310,"NEXT question !!!");

	   }



		fin.getline(question,200,'\n');

		fin.getline(ans1,150,'\n');

		fin.getline(ans2,150,'\n');

		fin.getline(ans3,150,'\n');

		fin.getline(ans4,150,'\n');

		fin.getline(correctans,2,'\n');



if(strlen(question)>=40||strlen(ans1)>=25||strlen(ans2)>=25||strlen(ans3)>=25||strlen(ans4)>=25)

	settextstyle(COMPLEX_FONT,0,1);

	else

	settextstyle(COMPLEX_FONT,0,2);



	setcolor(RED);

	setcolor(15);





	outtextxy(60,375,question);

	outtextxy(60,415,ans1);

	outtextxy(320,415,ans2);

	outtextxy(60,445,ans3);

	outtextxy(320,445,ans4);

		showmouseptr();

	if(correctans[0]=='a')

	{

	incorrect1();

	}

       else	if(correctans[0]=='b')

	{

	incorrect2();

	}

	else if(correctans[0]=='c')

	{

	incorrect3();

	}

	else if(correctans[0]=='d')

	{

	incorrect4();

	 }





      ct++;

}

if(ct==15)

totalprizemoney();

  fin.close();



}





	void incorrect1()





{

		 count++;

	 showmouseptr();

	flag=0;

	select();

	while(flag==0)

	{

	getmousepos(&button,&x1,&y1);

	if((button & 1)==1)

	{

	if((x1>=0&&x1<=300)&&(y1>=420&&y1<=445))

	correct();

else if((x1>=300&&x1<=585&&y1>=420&&y1<=445)||(x1>=0&&x1<=300&&y1>=450&&y1<=475)||(x1>=300&&x1<=585&&y1>=450&&y1<=475))

	sorry();

	}

	}

}





	void incorrect2()



{        	 count++;

	showmouseptr();

	flag=0;

	 select();

		while(flag==0)

		{



		getmousepos(&button,&x1,&y1);

		if((button & 1)==1)

		{



	if((x1>=300&&x1<=585)&&(y1>=420&&y1<=445))

	correct();

else if ((x1>=0&&x1<=300&&y1>=420&&y1<=445)||(x1>=0&&x1<=300&&y1>=450&&y1<=475)||(x1>=300&&x1<=585&&y1>=450&&y1<=475))

	sorry();

	}

}



}

	void incorrect3()

{            	 count++;

	    showmouseptr();

	    flag=0;

		   select();

	while(flag==0)

	{

	getmousepos(&button,&x1,&y1);

		if((button & 1)==1)

		{

		if((x1>=0&&x1<=300)&&(y1>=450&&y1<=475))

	correct();

else  if((x1>=0&&x1<=300&&y1>=420&&y1<=445)||(x1>=300&&x1<=585&&y1>=420&&y1<=445)||(x1>=300&&x1<=585&&y1>=450&&y1<=475))

	sorry();

	}

	 }



}

	void incorrect4()

{            	 count++;

		showmouseptr();

		flag=0;

		select();

		while(flag==0)

		{

		getmousepos(&button,&x1,&y1);

		if((button & 1)==1)

		{

		if((x1>=300&&x1<=585)&&(y1>=450&&y1<=475))

		correct();

else if((x1>=0&&x1<=300)&&(y1>=420&&y1<=445)||(x1>=300&&x1<=585&&y1>=420&&y1<=445)||(x1>=0&&x1<=300&&y1>=450&&y1<=475))

		sorry();

		}

		}







}



	char prevstr[10]={"1000"};

       void correct()

       {



	    hidemouseptr();

	   flag=1;



	p=p*2;

	if(p==4000)

	p=3000;

	if(p==6000)

	p=5000;

	if(p==1280000)

	p=1250000;





	ltoa(p,str,10);



	sleep(2);

	   setcolor(BLUE);

	   setfillstyle(1,YELLOW);

	   line(0,250,40,250);line(460,250,500,250);



int pol[]={40,250,60,235,460,235,480,250,460,265,60,265,40,250};

fillpoly(7,pol);



	setcolor(BLUE);

	settextstyle(0,0,3);

	outtextxy(200,240,str);

	settextstyle(0,0,1);

		setcolor(WHITE);





	setcolor(BLACK);

		   setfillstyle(1,BLACK);

		settextstyle(0,0,1);



		if(ansbox2==1)

		{

	 bar(503,345+ansbox1,622,360+ansbox1);

		setcolor(WHITE);

		outtextxy(520,350+ansbox1,"");

		outtextxy(540,350+ansbox1,prevstr);

		}

	setcolor(RED);

	ansbox2=1;

	   setfillstyle(1,RED);

	    setcolor(WHITE);

	settextstyle(0,0,1);

	ansbox1=ansbox1-20;

	 bar(503,345+ansbox1,622,360+ansbox1);

	 outtextxy(520,350+ansbox1,"");

	outtextxy(540,350+ansbox1,str);



	ltoa(p,prevstr,10);

	if(p==10000||p==320000||p==10000000)

	music();



	   sleep(1);

	    setcolor(BLACK);

	   setfillstyle(1,BLACK);

	bar3d(0,230,495,270,0,1);





	settextstyle(COMPLEX_FONT,0,2);

	setcolor(RED);



		sleep(1);

	   setcolor(LIGHTBLUE);

	   setfillstyle(1,BLACK);



int poly[]={40,390,60,365,560,365,580,390,560,415,60,415,40,390};

fillpoly(7,poly);

line(0,390,40,390);line(580,390,620,390);

int poly1[]={40,430,50,420,290,420,300,430,290,445,50,445,40,430};

fillpoly(7,poly1);

int poly2[]={300,430,310,420,575,420,585,430,575,445,310,445,300,430};

fillpoly(7,poly2);

int poly3[]={40,465,50,450,290,450,300,465,290,475,50,475,40,465};

fillpoly(7,poly3);

int poly4[]={300,465,310,450,575,450,585,465,575,475,310,475,300,465};

line(0, 430,40,430);line(0,465,40,465);

line(585,430,620,430);line(585,465,620,465);

fillpoly(7,poly4);





}





   void sorry()

	{

	     hidemouseptr();



	     sleep(1);

	     setcolor(BLUE);

		settextstyle(0,0,3);

		outtextxy(50,200,"SORRY ! INCORRECT");

		sleep(2);

		fin.close();



		 clearviewport();

  setcolor(BLUE);



  totalprizemoney();



}

void totalprizemoney()

{



	     hidemouseptr();

		 clearviewport();

	  setcolor(BLUE);

	  setfillstyle(1,YELLOW);

 line(0,390,40,390);line(580,390,620,390);

 int pol[]={40,390,60,365,560,365,580,390,560,415,60,415,40,390};

 fillpoly(7,pol);

  setcolor(RED);

 settextstyle(0,0,2);

 outtextxy(70,380,"Total prize money:");

    setcolor(BLUE);

 outtextxy(360,380,str);

  settextstyle(0,0,1);

     setcolor(GREEN);

    outtextxy(100,430,"USE THE KEYBOARD ARROW KEYS TO SELECT");

     setfillstyle(1,YELLOW);

     bar(80,445,150,460);

 char a=0,x='E';int flg=0;

  do

 {

  outtextxy(100,450,"REPLAY        EXIT");

  a=getch();

  switch(a)

  {

  case 13 :



	       if((flg%2)==0)

	      x='R';

	    else

	      x='E';

	    break;





  case 77:

  case 75:

		    if((flg%2)==0)

	      {

	       setfillstyle(1,0);

		 bar(80,445,150,460);

		 setfillstyle(1,YELLOW);

		bar(200,445,270,460);

	      }

	    else

	       {

		setfillstyle(1,0);

			bar(200,445,270,460);

		setfillstyle(1,YELLOW);

		      bar(80,445,150,460);

	       }

	    break;

   }

   if(a==75||a==77)

     flg++;

  }while(a!=13);



  if(x=='R')

  {

   clearviewport();

   closegraph();

   main();

   }



    else   if(x=='E')

    {

    page3();

closegraph();

exit(0);

}

	 }







void pass(int poly[14])

{

setfillstyle(1,LIGHTBLUE);

setcolor(LIGHTBLUE);

drawpoly(7,poly);

ellipse(605,20,0,360,20,10);

ellipse(525,20,0,360,20,10);

ellipse(565,20,0,360,20,10);



setfillstyle(1,YELLOW);

setcolor(YELLOW);



}



void select()

{



int polygon1[]={40,430,50,420,290,420,300,430,290,445,50,445,40,430};

int polygon2[]={300,430,310,420,575,420,585,430,575,445,310,445,300,430};


int polygon3[]={40,465,50,450,290,450,300,465,290,475,50,475,40,465};


int polygon4[]={300,465,310,450,575,450,585,465,575,475,310,475,300,465};

setcolor(RED);

setfillstyle(1,RED);

setlinestyle(1,0,15);









do

{

settextstyle(3,0,2);

setcolor(BLACK);

outtextxy(30,270,"LIFELINE TAKEN ALREADY");

x:

getmousepos(&button,&x1,&y1);



if(x1>=0&&x1<=300&&y1>=420&&y1<=445)

{



pass(polygon2);

pass(polygon3);

pass(polygon4);

drawpoly(7,polygon1);

}





else if(x1>=300&&x1<=585&&y1>=420&&y1<=445)

{



pass(polygon1);

pass(polygon3);

pass(polygon4);

drawpoly(7,polygon2);









}



else if(x1>=0&&x1<=300&&y1>=450&&y1<=475)

{



pass(polygon1);

pass(polygon2);

pass(polygon4);

drawpoly(7,polygon3);



}





else if(x1>=300&&x1<=585&&y1>=450&&y1<=475)

{



pass(polygon1);

pass(polygon3);

pass(polygon2);

drawpoly(7,polygon4);

}





//...............select lifeline............//

//50:50

else if(x1>=505&&x1<=545&&y1>=10&&y1<=30)

{



if(life1==1&&(button &1)==1)

{

settextstyle(3,0,2);

setcolor(YELLOW);

outtextxy(30,270,"LIFELINE TAKEN ALREADY");





goto x;

}



setcolor(YELLOW);

ellipse(525,20,0,360,20,10);

setcolor(LIGHTBLUE);

ellipse(605,20,0,360,20,10);

ellipse(565,20,0,360,20,10);

fiftyfifty();

goto x;



}



//___________Phone a friend___________//

else if(x1>=545&&x1<=585&&y1>=10&&y1<=30)

{



if(life2==1&&(button &1)==1)

{

settextstyle(3,0,2);

setcolor(YELLOW);

outtextxy(30,270,"LIFELINE TAKEN ALREADY");

goto x;

}



setcolor(YELLOW);

ellipse(565,20,0,360,20,10);



setcolor(LIGHTBLUE);

ellipse(605,20,0,360,20,10);

ellipse(525,20,0,360,20,10);

phonefriend();

goto x;

}



//...........audience poll..............//

else if(x1>=585&&x1<=625&&y1>=10&&y1<=30)

{

if(life3==1&&(button &1)==1)

{

settextstyle(3,0,2);

setcolor(YELLOW);

outtextxy(30,270,"LIFELINE TAKEN ALREADY");



goto x;

}



setcolor(YELLOW);

ellipse(605,20,0,360,20,10);



setcolor(LIGHTBLUE);

ellipse(565,20,0,360,20,10);

ellipse(525,20,0,360,20,10);

audiencepoll();

goto x;

}



}

while((button & 1)!=1);





}







void startscreen()

{



setlinestyle(0,0,3);

setcolor(BLUE);

setfillstyle(1,BLUE);

circle(300,225,225);

floodfill(300,200,BLUE);

setcolor(LIGHTBLUE);

setfillstyle(1,LIGHTBLUE);

circle(300,225,185);

floodfill(300,200,LIGHTBLUE);

setcolor(0);

setfillstyle(SLASH_FILL,0);

setlinestyle(1,0,0);

   for(int p=0;p<=185;p++)

   {

   circle(300,225,p);

   delay(10);

   }



setlinestyle(1,0,3);

setcolor(BLUE);

setfillstyle(7,BLUE);

fillellipse(300,225,30,185);

fillellipse(300,225,185,30);

 setcolor(BLUE);

setcolor(15);

setfillstyle(1,15);



setcolor(15);

settextstyle(8,0,5);



settextstyle(0,0,3);



outtextxy(100,125,"K");

outtextxy(125,85,"A");

outtextxy(155,55,"U");

outtextxy(195,25,"N");

outtextxy(300,10,"B");

outtextxy(350,20,"A");

outtextxy(395,35,"N");

outtextxy(435,65,"E");

outtextxy(465,105,"G");

outtextxy(485,140,"A");

setcolor(YELLOW);

outtextxy(495,180,"");

outtextxy(85,180,"");

outtextxy(495,250,"");

outtextxy(85,250,"");

setcolor(15);

outtextxy(100,305,"K");

outtextxy(125,345,"A");

outtextxy(155,375,"U");

outtextxy(195,405,"N");

outtextxy(300,420,"B");

outtextxy(350,415,"A");

outtextxy(395,395,"N");

outtextxy(435,365,"E");

outtextxy(465,335,"G");

outtextxy(485,290,"A");

setlinestyle(1,0,3);

setcolor(5);

setfillstyle(0,5);

circle(300,225,185);

settextstyle(12,0,5);

setcolor(10);

outtextxy(510,470,"ROHIT PROGRAMMING");

setlinestyle(1,0,1);





setcolor(15);

settextstyle(8,0,5);

outtextxy(265,195," E  ");

sound(1000);

delay(600);

outtextxy(215,195," R ");

outtextxy(315,195," P ");



	sound(1100);

	delay(600);

sound(1200);

delay(500);



outtextxy(170,195," O ");

outtextxy(365,195," A ");

	sound(1000);

	delay(500);

sound(1100);

delay(550);



outtextxy(115,195," R  ");

outtextxy(400,195,"  T  ");

	sound(1200);

	delay(450);

sound(1350);

delay(450);



outtextxy(85,195,"C ");

outtextxy(500,195,"I");

	sound(1500);

	delay(1000);



nosound();

settextstyle(0,0,1);

outtextxy(10,460,"PRESS ANY KEY TO CONTINUE ");

getch();



 }



void music()

{



sound(1000);

delay(600);



	sound(1100);

	delay(600);

sound(1200);

delay(500);



	sound(1000);

	delay(500);

sound(1100);

delay(550);



	sound(1200);

	delay(450);

sound(1350);

delay(450);



	sound(1500);

	delay(1000);

	nosound();



}





void askname()

{

settextstyle(0,0,1);

setcolor(7);

outtextxy(0,90,"WELCOME TO THE COMPUTER VERSION OF KAUN BANEGA CROREPATI");

outtextxy(0,115,"please enter your name   :  ");

char name[40];

gotoxy(30,8);

cin.getline(name,40);

outtextxy(0,150,"please enter your city   :  ");

char city[40];

gotoxy(30,10);

cin.getline(city,40);

sleep(1);



line();

sleep(1);

setcolor(7);

outtextxy(10,90,"LET'S WELCOME  ");

outtextxy(270,110," FROM ");

setcolor(RED);

outtextxy(150,90,name);

outtextxy(320,110,city);

setcolor(LIGHTGREEN);

outtextxy(0,150,"IMPORTANT INSTRUCTIONS  ");

sleep(2);

setcolor(LIGHTGRAY);

outtextxy(0,170,"USE THE MOUSE TO PLAY THE GAME.  ");

sleep(2);

setcolor(LIGHTGREEN);

outtextxy(0,190,"PLEASE CLICK AND HOLD THE LEFT MOUSE BUTTON TO SELECT.");

sleep(2);

setcolor(LIGHTGRAY);

outtextxy(0,210,"YOU HAVE 3 LIFELINES (AS INDICATED ON THE UPPER RIGHT CORNER).");

outtextxy(0,230,"CLICK ON THE LIFELINES TO SELECT THEM.");

sleep(2);

outtextxy(0,250,"THE FILE KBC.TXT IS AN EVER EXPANDABLE QUESTION BANK..");

outtextxy(0,260,"PLEASE STICK ON TO THE FORMAT USED IN THE FILE WHILE.. ");

outtextxy(100,270,"EXPANDING THE QUESTION BANK" );

setcolor(WHITE);

sleep(2);

settextstyle(0,0,1);

outtextxy(0,320,"PRESS ANY KEY TO CONTINUE ");





getch();



line();

settextstyle(BOLD_FONT,0,1);

}





void phonefriend()

{



settextstyle(3,0,2);

setcolor(BLACK);

outtextxy(30,270,"LIFELINE TAKEN ALREADY");



if(((button &1)==1)&&life2==0)

{

hidemouseptr();

setcolor(LIGHTBLUE);

settextstyle(0,HORIZ_DIR,2);

outtextxy(30,250,"PHONE A FRIEND ....... ");

sleep(1);

outtextxy(30,270,"YOUR TIME STARTS.....NOW ");

sleep(1);

line();

setcolor(LIGHTGRAY);

setfillstyle(2,RED);

circle(300,200,100);

char arc[10];



settextstyle(0,HORIZ_DIR,5);

int x=0;

setfillstyle(1,DARKGRAY);

for(int i=0;i<=30;i++)

{

setcolor(BLACK);

pieslice(300,200,0,i*12,97);

itoa(i,arc,10);

setcolor(BLUE);

if(i>=10)

x=25;

outtextxy(280-x,180,arc);

sleep(1);

setcolor(BLACK);

outtextxy(280-x,180,arc);

}

life2=1;

setcolor(YELLOW);

settextstyle(3,HORIZ_DIR,3);

outtextxy(0,315,"YOUR TIME ENDS HERE. CLICK AN ANSWER");

sleep(3);

line();



showmouseptr();

}



}

void fiftyfifty()

{

settextstyle(3,0,2);

setcolor(BLACK);

outtextxy(30,270,"LIFELINE TAKEN ALREADY");



randomize();

int r1=0,r2=0;

if(((button &1)==1)&&life1==0)

{



setcolor(LIGHTBLUE);

settextstyle(0,HORIZ_DIR,2);

outtextxy(30,250,"50:50 LIFELINE ");

sleep(1);

outtextxy(0,270,"TWO WRONG CHOICES WILL");

outtextxy(280,290,"BE ELIMINATED");

sleep(1);

line();



if(correctans[0]=='a')

{

while(r1==0||r2==0||r1==r2)

{

r1=random(4);

r2=random(4);

}

}

if(correctans[0]=='b')

{

while(r1==1||r2==1||r1==r2)

{

r1=random(4);

r2=random(4);

}

}

if(correctans[0]=='c')

{

while(r1==2||r2==2||r1==r2)

{

r1=random(4);

r2=random(4);

}

}

if(correctans[0]=='d')

{

while(r1==3||r2==3||r1==r2)

{

r1=random(4);

r2=random(4);

}

}

setcolor(BLACK);

setfillstyle(1,BLACK);

int poly1[]={40,430,50,420,290,420,300,430,290,445,50,445,40,430};

int poly2[]={300,430,310,420,575,420,585,430,575,445,310,445,300,430};


int poly3[]={40,465,50,450,290,450,300,465,290,475,50,475,40,465};


int poly4[]={300,465,310,450,575,450,585,465,575,475,310,475,300,465};



if(r1==0)

fillpoly(7,poly1);



else if(r1==1)

fillpoly(7,poly2);



else if(r1==2)

fillpoly(7,poly3);



else if(r1==3)

fillpoly(7,poly4);



if(r2==0)

fillpoly(7,poly1);



else if(r2==1)

fillpoly(7,poly2);



else if(r2==2)

fillpoly(7,poly3);



else if(r2==3)

fillpoly(7,poly4);





life1=1;



}





}







void audiencepoll()

{

settextstyle(3,0,2);

setcolor(BLACK);

outtextxy(30,270,"LIFELINE TAKEN ALREADY");





randomize();

int r1=0,r2=0,r3=0,r4=0;

if(((button &1)==1)&&life3==0)

{

hidemouseptr();

setcolor(LIGHTBLUE);

settextstyle(0,HORIZ_DIR,2);

outtextxy(30,250,"AUDIENCE POLL ");

sleep(2);

line();

if(correctans[0]=='a')

{

while(r1<r2||r1<r3||r1<r4||r1+r2+r3+r4!=100)

{

r1=random(100);

r2=random(100);

r3=random(100);

r4=random(100);

}

}

else if(correctans[0]=='b')

{

while(r2<r1||r2<r3||r2<r4||r1+r2+r3+r4!=100)

{

r1=random(100);

r2=random(100);

r3=random(100);

r4=random(100);

}



}

else if(correctans[0]=='c')

{

while(r3<r1||r3<r2||r3<r4||r1+r2+r3+r4!=100)

{

r1=random(100);

r2=random(100);

r3=random(100);

r4=random(100);

}

}

else if(correctans[0]=='d')

{

while(r4<r1||r4<r2||r4<r3||r1+r2+r3+r4!=100)

{

r1=random(100);

r2=random(100);

r3=random(100);

r4=random(100);

}

}



char r11[20];

char r22[20];char r33[20];char r44[20];

itoa(r1,r11,10);

itoa(r2,r22,10);

itoa(r3,r33,10);

itoa(r4,r44,10);

setcolor(YELLOW);

bar(240,150-r1,260,150);

bar(265,150-r2,280,150);

bar(285,150-r3,300,150);

bar(305,150-r4,320,150);

settextstyle(0,0,1);

setcolor(GREEN);

outtextxy(240,152,"A  B  C  D");

outtextxy(240,140-r1,r11);

outtextxy(265,140-r2,r22);

outtextxy(285,140-r3,r33);

outtextxy(305,140-r4,r44);

setcolor(RED);

rectangle(230,30,330,175);

life3=1;

f3=1;

setcolor(YELLOW);

settextstyle(1,0,2);

outtextxy(0,250,"Press any key on the keyboard to continue..");

showmouseptr();

getch();

line();

}

}
