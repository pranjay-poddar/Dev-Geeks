#include <bits/stdc++.h>
#include <windows.h> //used for PlaySound function
#include<stdio.h>
#include <cstdlib>
#include <ctime>
#include <string.h>
#include <unistd.h>
#include <mmsystem.h>
using namespace std;

class Player;

class Pokemon
{
	public:

	string name;
	int max_poke_hp;
	int current_poke_hp;
	string height;
	string type;
	string evolution; // stores its next evolution form
         // sotres the badges won by trainer
	// Parametrized constructor being used
	vector<string> Attacks;

	Pokemon(string name, int max, string high, string ty, string evolut,vector<string> s)
	{
		this->name = name;
		this->max_poke_hp = max;
		this->current_poke_hp = max_poke_hp;
		this->height = high;
		this->type = ty;
		this->evolution = evolut;
		this->Attacks=s;
	}
}Pre[5]={{"Pikachu", 60, "2 ft", "Electric", "Raichu",{"Scratch","Thunderbolt","Thunder attack","Iron Tail"}},{"Squirtel", 60, "2.1 ft", "Water", "Wartotle",{"Water Gun","Bubble Beam","Charm Attack","Tackle Attack"}},{"Bulbasaur", 80, "1.8 ft", "Grass", "Venasaur",{"Wine Wip","Leaf Attak","Solar Beam","Razor Leaf"}},{"Charmander", 70, "2.3 ft", "Fire", "Charizard",{"Ember Attack","Flame Thrower","Scary Face","Quick Attack"}},{"Pidgi", 50, "1.9 ft", "Flying", "Pidgeot",{"Gust Attack","Sand Attack","Peck ","Cut the Nose"}}};

class Player
{
public:
	string name;
	int no_of_pokemon;
	vector<Pokemon> captured_pokemons;
	int no_of_pokeball;
	unsigned int money;
	int potion;
	int healer;
	int great_ball;
	int oran_berries;


	// USE OF CONSTRUCTOR

	// Pokemon &Pi,Pokemon &Sq, Pokemon &Bu, Pokemon &Ch, Pokemon &Pid

	Player()
	{
		this->no_of_pokeball = 5;
		this->money = 100;                       // IN dollars
		this->healer=0;
		this->potion=0;
		this->oran_berries=0;
		this->great_ball=0;
	}


	void Professor_at_starting();
	void menu();
	void pokedex();
	void bag();
	int poke_catch();
	void pokemon_menu(int);
	void poke_mart();
	void poke_gym();
	void about();
	void home();
	void exit();
	int select();
	void throwball(int);
    void pokemon_centre();
    void battle(int , int);
	friend void outside_pokemon_centre_call();
};

// Function declaration of class Player Functions

void Player::Professor_at_starting()
{
	int a;
	// sound function will be imported (open.wav)
//  PlaySound(TEXT("sounds/open.wav"), NULL, SND_ASYNC);
	// Import Professor oak photos
	//int gmode=DETECT,gm;
	//	initgraph(&gmode,&gm,"c://tc//bgi");
	//cleardevice();

	//readimagefile("oak1.png",300,300,100,200);

	// open_audio();
    const string POKEMON_BANNER = "                                  ,'\\\n"
                              "    _.----.        ____         ,'  _\\   ___    ___     ____\n"
                              "_,-'       `.     |    |  /`.   \\,-'    |   \\  /   |   |    \\  |`.\n"
                              "\\      __    \\    '-.  | /   `.  ___    |    \\/    |   '-.   \\ |  |\n"
                              " \\.    \\ \\   |  __  |  |/    ,','_  `.  |          | __  |    \\|  |\n"
                              "   \\    \\/   /,' _`.|      ,' / / / /   |          ,' _`.|     |  |\n"
                              "    \\     ,-'/  /   \\    ,'   | \\/ / ,`.|         /  /   \\  |     |\n"
                              "     \\    \\ |   \\_/  |   `-.  \\    `'  /|  |    ||   \\_/  | |\\    |\n"
                              "      \\    \\ \\      /       `-.`.___,-' |  |\\  /| \\      /  | |   |\n"
                              "       \\    \\ `.__,'|  |`-._    `|      |__| \\/ |  `.__,'|  | |   |\n"
                              "        \\_.-'       |__|    `-._ |              '-.|     '-.| |   |\n"
                              "                                `'                            '-._|";


    cout << POKEMON_BANNER << endl;


    cout<<"\n\n\n GAME LOADING ";
    cout<<".";
    sleep(1);
    cout<<"..";
    sleep(1);
    cout<<".........";
    sleep(1);
    cout<<"..........";
    sleep(1);
    cout<<"..............";
    sleep(1);
    cout<<"\t\t\n\n PRESS A KEY TO CONTINUE ";
    sleep(1);

    getchar();
    system("cls");
	cout << "Hello there!";
	cout << "\nWelcome to the world of POKEMON";
	getchar();
	system("cls");

	cout << "You can call me Pokemon Professor Dr. Oak "<<endl;
	getchar();
	system("cls");
	cout << "This world is inhabited by creatures called POKEMON's ";
	cout << "\nThey have different powers and abilites ";
	getchar();
	system("cls");

	cout << "I study POKEMON as a profession";
	cout << "\nWait!";
	getchar();
	system("cls");

	cout << "By the way What is your name?"<<endl;
	cin >> this->name;
	cout << "\n"
		 << this->name << " What a cool name!";
	getchar();
	system("cls");
	cout << "I have a surprise for you!";
	// Now shows the photo of Gary
	cout << "\nThis is my grandson. He's been your rival since your birth";
	cout << "\nHis name is Gary!!!";
	getchar();
	system("cls");
	cout << "Gary has alerady taken Charmander as his pokemon";
	cout << "What about you?";
	getchar();
	system("cls");
	cout << "Choose from below";
	cout << "\n1. Charmander - A fire type pokemon";
	cout << "\n2. Bulbasaur  - A Grass type pokemon ";
	cout << "\n3. Squirtel   - A water type pokemon ";
	cout << "\n4. Pickachu   - A Electric type pokemon";
	cout << "\n\nEnter your choice number:";
	cin >> a;
	cin.ignore();
	cin.sync();
	switch (a)
	{
	case 1: // show the pictures
		//add charmander sound Char Char char
		cout << "\nYou chose Charmander!";
		getchar();
		cin.sync();

		//    PlaySound(TEXT("cahrmander.wav"), NULL, SND_ASYNC);

		cout << "\n It has great power";
		cout << "\n he have a fire on its tail";
		getchar();
		no_of_pokemon = no_of_pokemon + 1;

		this->captured_pokemons.push_back(Pre[3]); // Adding Pokemon in the captured pokemon list

		break;

	case 2:

		cout << "You chose Bulbasaur!";
		cout << "\nIt has a bulb on his back which will evolve into a flower later on";
		getchar();
		no_of_pokemon = no_of_pokemon + 1;
		this->captured_pokemons.push_back(Pre[2]);

		break;

	case 3:

		cin.sync();
		//    PlaySound(TEXT("squirtel.wav"), NULL, SND_ASYNC);
		cout << "You chose Squirtel!";

		cin.sync();
		// Sleep(1000);
		cout << "\nHe can throw water on anyone!";
		this->no_of_pokemon = this->no_of_pokemon + 1;
		this->captured_pokemons.push_back(Pre[1]);

		break;

	case 4:
		cout << "Congratulations! You got Pickachu!";
		cout << "It is an electric type pokemon";
		this->no_of_pokemon = this->no_of_pokemon + 1;
		getchar();
		this->captured_pokemons.push_back(Pre[0]);
		break;
	}

	cout << this->name << "!";
	cout << "\n A new chapter of your life is going to be unfold";
	cout << "\n A world of dreams and adventures with POKEMON";
	getchar();
	cout << "I am giving you 5 pokeballs and 100$ to spend";

	getchar();

	cout << "\nLet's Go!";
	menu();
}


void Player::menu()
{
    int a;  // Will be used for battling
	//  PlaySound(TEXT("oak.wav"), NULL, SND_ASYNC);
	system("cls");
	int x;
	cout << "#######################################################################################";
	cout << "\n|||********************************************************************************|||";
	cout << "\n|||                                  POKEMON GAME                                  |||";
	cout << "\n|||                               -------------------                              |||";
	cout << "\n|||                            Choose your option to play                          |||";
	cout << "\n|||                                                                                |||";
	cout << "\n|||1.) PokeDex                                                                     |||";
	cout << "\n|||2.) Bag                                                                         |||";
	cout << "\n|||3.) Catch A Poke'mon                                                            |||";
	cout << "\n|||4.) PokeMart                                                                    |||";
	cout << "\n|||5.) Pokemon Centre                                                              |||";
	cout << "\n|||6.) Pokemon Gym                                                                 |||";
	cout << "\n|||7.) About Game                                                                  |||";
	cout << "\n|||8.) Exit                                                                        |||";
	cout << "\n|||9.) Home                                                                        |||";
	cout << "\n|||                                                                                |||";
	cout << "\n|||                                                                                |||";
	cout << "\n|||                                                                                |||";
	cout << "\n|||********************************************************************************|||";
	cout << "\n######################################################################################";
	cin >> x;
	switch (x)
	{
	case 1:
		pokedex();
		break;
	case 2:
		bag();
		break;

	case 3:
		a= poke_catch();
		 pokemon_menu(a);
		bag();
		break;

	case 4:
		poke_mart();
		break;

	case 5:
		  pokemon_centre();
		break;

	case 6:
		poke_gym();
		break;

	case 7:
		about();
		break;

	case 8:
		char choice;

		// PlaySound(TEXT("song.wav"),NULL,SND_ASYNC);

		cout << "Do you want to exit";
		cout << "\n Press y to exit";
		cin >> choice;
		if (choice == 'y')
		{

			system("pause");
		}

		// I will play thmee song to end the game
		/*  cout<<"Do you want to play a song before exiting?";
          cout<<"\nPress y/n to play...";
          cin>>char;
          if(char=='y')
          {
             PlaySound(TEXT"song.wav",NULL,SND_ASYNC)  ;
          }
          system("close");
          break;

          */
		break;
	case 9:

		home();

	}
	system("cls");
}

void Player::about()
{
    // PlaySound(TEXT("sounds/song.wav"), NULL, SND_ASYNC);
	int x;
	system("cls");
	// PlaySound(TEXT("song.wav"),NULL,SND_ASYNC);

	cout << "This is a Pokemon Fan based Game";
	cout << "\n We, Vaibhav and Shubham Kumar, currently studying in DELHI TECHNOLOGICAL UNIVERSITY";
	cout << "\n            |-------------------------------------|";
	cout << "\n            |Name - Vaibhav and Shubham Kumar     |";
	cout << "\n            |Roll - 2K20/IT/157 and 2K20/IT/142   |";
	cout << "\n            |Sem  -  3rd                          |";
	cout << "\n            |-------------------------------------|";
	cout << "\n\nHow to Play the game?";
	cout << "\nCatch as many as pokemon you can catch and train them";
	cout << "\nDefeat the Pokemon Gym trainer ";
	cout << "\nWin the Thunder Badge to win";
	cout << "\nHappy Gaming";
	cout << "\n\n Enter 1 to return to main menu";
	cin >> x;

	if (x == 1)
	{
		menu();
	}
	else
	{
		int y;
		cout << "Do you want to end the Game";
		cout << "Enter 0 to exit";
		if (y == 0)
		{
			// exit(0);
		}
	}
}

void Player::poke_mart()
{

	system("cls");
	cout << "   Cash Available: " << money;
	int choice, n;
	char x;
	cout << "\n\n   |============================================|";
	cout << "\n   |                  POKE MART                 |";
	cout << "\n   |============================================|";
	cout << "\n   | You can select from the following items:	|";
	cout << "\n   |                                            |";
	cout << "\n   |        ITEMS                 PRICE         |";
	cout << "\n   |      ---------            -----------      |";
	cout << "\n   | 1.) POKe Ball              20$             |";
	cout << "\n   |                                            |";
	cout << "\n   | 2.) Potion                 50$             |";
	cout << "\n   |                                            |";
	cout << "\n   | 3.) Healer                 40$             |";
	cout << "\n   |                                            |";
	cout << "\n   | 4.) Great ball             90$             |";
	cout << "\n   |                                            |";
	cout << "\n   | 5.) Oran Berries           20&             |";
	cout << "\n   |                                            |";
	cout << "\n   | 6.) Exit                                   |";
	cout << "\n   |============================================|";
	cout << "\n";
	cin >> choice;

	switch (choice)
	{
	case 1:
		cout << "You have chosen POKe Ball ";
		cout << "\n How much do you want:";
		cin >> n;
		cout << "\nThank you!";
		money = money - (20 * n);

		this->no_of_pokeball = no_of_pokeball + n;

		cout << "Available Cash :" << money;
		cout << "\nAnything else?";
		cout << "\nPress (y/n) for choosing again";
		cin >> x;
		system("cls");

		if (x == 'y')
		{

			this->poke_mart();
		}
		else
		{
			menu();
		}

	case 2:
		cout << "You have chosen Potion";
		cout << "\n How much do you want:";
		cin >> n;
		cout << "Thank you!";
		money = money - n * 50;
		potion += n;
		cout << "Available Cash :" << money;
		cout << "\nAnything else?";
		cout << "\nPress (y/n) for choosing again";
		cin >> x;
		system("cls");
		if (x == 'y')
		{

			poke_mart();
		}
		else
		{
			menu();
		}
	case 3:
		cout << "You have chosen Healer";
		cout << "\n How much do you want:";
		cin >> n;
		cout << "Thank you!";
		money = money - n * 40;
		healer = healer + n;
		cout << "Available Cash:" << money;
		cout << "\nAnything else?";
		cout << "\nPress (y/n) for choosing again";
		cin >> x;
		system("cls");
		if (x == 'y')
		{

			poke_mart();
		}
		else
		{
			menu();
		}
	case 4:
		cout << "You have chosen Great Ball";
		cout << "\n How much do you want:";
		cin >> n;
		cout << "Thank you!";

		great_ball = great_ball + n;
		money = money - n * 90;
		cout << "Available Cash:" << money;
		cout << "\nAnything else?";
		cout << "\nPress (y/n) for choosing again";
		cin >> x;
		system("cls");
		if (x == 'y')
		{

			poke_mart();
		}
		else
		{
			menu();
		}
	case 5:
		cout << "You have chosen Oran berries";
		cout << "\n How much do you want:";
		cin >> n;
		cout << "Thank you!";
		oran_berries += n;
		money = money - n * 20;
		cout << "Available Cash:" << money;
		cout << "\nPress (y/n) for choosing again";
		cin >> x;
		system("cls");
		if (x == 'y')
		{

			poke_mart();
		}
		else
		{
			menu();
		}
	case 6:
		// exit functiion wiil be exit here and then again menu funciton wiil be exected
		{
			menu();
		}
	}
	system("cls");
}

void Player::pokedex()
{
	system("cls");
	cout << "\n         Your Captured Pokemon will be shown here";
	cout << "\n\n|===========================================================|";
	cout << "\n|                         (OAK LABS)                        |";
	cout << "\n|-----------------------------------------------------------|";
	cout << "\n|                        ++POKEDEX++                        |";
	cout << "\n|===========================================================|";
	cout << "\n|          NAME           QUANTITY        TYPE              |";
	cout << "\n|                                                           |"<<endl;
	cin.ignore();

	if (no_of_pokemon <= 0)
	{
		cout << "You haven't cactched even a single Pokemon :";
		cout << "\n Go and catch some in the Field ";

	}

	else
	{
		for (int i = 0; i <captured_pokemons.size(); ++i)
		{
			cout <<"|" <<captured_pokemons[i].name << "         " <<1<<"           " <<captured_pokemons[i].type<<""<<endl;
		}
	}

	cout << "|                                                           |";
	cout << "\n|                                                           |";
	cout << "\n|===========================================================|";
	getchar();
	system("cls");
	menu();
}

void Player::poke_gym()
{
    // PlaySound(TEXT("sounds/Pikachu.wav"), NULL, SND_ASYNC);
	int sum_of_pokemon;
	// i have to fight the gym leader

	cout << "System is working on the construction of the gym";
	Sleep(2000);
	getchar();
	system("cls");
	cin.sync();
	cout << "Hey " << name;
	cout << "\n I am jason, Gym leader of Pallet town";
	cout << "\nDo you want to fight with men,Hm ummmm";
	getchar();
	cout << "Let's check how many pokemon do you have";
	cout << "..............";
	Sleep(1000);
	cout << "\n..........|.....";
	if (captured_pokemons.size()>= 8 && money >= 100)
	{
		char choice;
		cout << " You have required number of pokemons to fight";
		cout << "Do you want to fight with me";
		cout << "\n Press y/n to fight";
		cin >> choice;
		if (choice == 'y')
		{

			cout << "Let the battle begin";

		}
	}

	else
	{
		cout << "\n Ergh .... You don't fulfill the gym criteria";
		getchar();
		cout << "\n You can't fight with me";
		getchar();
		Sleep(1000);
		cout << "\n Go and Capture some more pokemons ";
		Sleep(1000);
		menu();
	}
}

void Player::bag()
{

	system("cls");
	cin.ignore();

	cout << "\nCASH         :" << money;


		cout << "\nPOKEBALLS     :" << no_of_pokeball;




		cout << "\nPOTION    :" << potion;





		cout << "\nHEALER    :" << healer;




		cout << "\nGREAT BALL :" << great_ball;




		cout << "\nORAN BERRIES :" << oran_berries;


	if(healer==0 && great_ball==0 && oran_berries==0 && no_of_pokeball==0)
	{
		cout<<"..............";
		Sleep(1000);
		cout<<"You don't have any items in the Bag ";


	}


	getchar();
   system("cls");
   menu();
}

void Player::home() // Shubham have to Complete the function
{
    system("cls");
    // PlaySound(TEXT("sounds/song.wav"), NULL, SND_ASYNC);
	int x;
	cout << "Hello " << name << " This is your home!";
	cout << "\nYou can talk here with your family";
	cout << "\nPress 1 to talk with your Mother";
	cout << "\nPress 2 to talk with your Father";
	cout << "\nPress 3 to talk with your Uncle";
	cout << "\nPress 4 to talk with your brother";
	cout << "\nPress 5 to talk with your Sister";
	cout << "\nPress 6 to talk with your Professor Oak";
	cout << "\n Press 7 to exit";
	cin >> x;

	switch (x)
	{
	case 1:
		cout << "\nHey son! This is your Mom here";
		getchar();
		cout << "\nI have gone to market and yes";
		getchar();
		cout << "\nI bless you to be successful";
		getchar();
		break;
	case 2:
	    cout<<"\nHey son!, Glad to see you again";
		getchar();
		cout<<"\nI am so happy for your upcoming journey";
		getchar();
		cout<<"\nI am so proud of you";
		getchar();
		cout<<"\nHave a safe journey";
		getchar();
		break;
	case 3:
	    cout<<"\nHey "<<name<<" come here";
		getchar();
		cout<<"\nLook at you are grown up now";
		getchar();
		cout<<"\nI hope your journey is going amazing";
		getchar();
		cout<<"\nWe had a lot fun in our time now it is the turn of your generation";
		getchar();
		cout<<"\nNow you guys take the lead";
		getchar();
		break;
	case 4:
	    cout<<"\nHey brother, long time no see!";
		getchar();
		cout<<"\nDad told me about your journey";
		getchar();
		cout<<"\nI guess you are having fun";
		getchar();
		cout<<"\nI can't wait for mine";
		getchar();
		break;
	case 5:
	    cout<<"\nHey "<<name<<", I kinda missed you";
		getchar();
		cout<<"\nI am happy for your journey";
		getchar();
		cout<<"\nTake care of your self";
		getchar();
		break;
	case 6:
	    cout<<"\nOh hi "<<name<<" hope you and your pokemons are doing well";
		getchar();
		cout<<"\nEvenm noew I remember the first day you got your pokemon";
		getchar();
		cout<<"\nNow I can see you have devoloped the bond with your pokemons";
		getchar();
		cout<<"\nRemeber my words a mutual connection between trainer and pokemon is necessary";
		getchar();
		cout<<"\nAnyways have a great journey ahead";
		getchar();
		break;

	default:
		cout<<"aji popla";
	}

}

void Player::pokemon_centre( )
{
	char x;
	// i will use this funciton to heal my pokemons in money
	system("cls");
	cout<<"################@@@@ Pokemon Centre Service @@@@##################";
	cout<<"\nCash available: "<<money;
	cout<<"\nFee charges: 45$";

	cout<<"\n This is the List of your captured pokemons ";
	for(int i=0;i<this->captured_pokemons.size();i++)
	{
		cout<<"\n"<<this->captured_pokemons[i].name<<"   "<<this->captured_pokemons[i].current_poke_hp<<endl;
	}

	cout<<"\nDo you want to heal your pokemon?";
	cout<<"\nPress (y/n) to continue or exit:";
	cin>>x;
	if (x=='y')
	{
	    money=money-45;

		for(int i=0;i<this->captured_pokemons.size();i++)
	{
		this->captured_pokemons[i].current_poke_hp=this->captured_pokemons[i].max_poke_hp;

	}


        cout<<"........";
        Sleep(1000);
        char p;
        cout<<"\n Pokemon's health has been restored";
        cout<<"\nThank you for using Pokemon Centre services";
        cout<<"\nPress y/n to return to main menu";
        cin>>p;
        if(p=='y')
        {
            menu();

        }

	}


}

int Player::poke_catch()
{

// PlaySound(TEXT("battle.wav"), NULL, SND_ASYNC);
    int a;
   srand(time(NULL));
   cout<<"Hey Trainer! let's seek into the Bushes to find pokemon";
   getchar();
   Sleep(1000);

   a=rand()%5;
   cin.sync();
   cout<<"\nA wild pokemon has appeared!!";
   cout<<"\nDo you wanna catch it?";
   getchar();
   cin.sync();
   cout<<"\nA wild "<<Pre[a].name<<" has appeared ";
   return a;
}

void Player::pokemon_menu(int a)
{
    int poke;
	system("cls");
	int l=0;
	cout<<"                   CATCH THE POKEMON";
	cout<<"\n\n 1.) Attack         2.) Catch";
	cout<<"\n 3.) Bag            4.) Run";
	cin>>l;

	switch(l)
	{

		case 1:
		    int my_xp,enemy_xp;
			// here a pokemon's attak function will be called
			// pokemon selection should also take place
			cin.sync();
			cout<<"\nOnce entered you can not escape";
			getchar();
			Sleep(1000);
			poke=select();     //Gets pokemon index I selected

		    battle(poke,a);
		//	break;
		      break;

		case 2:
		 cout<<"I choose you, Go pokemon!";
		 Sleep(1000);
		 throwball(a);
		    break;

		case 3:
			// open bag function
			bag();
			break;

		case 4:
			cout<<"Trainer ran away!!!!!";
			Sleep(2000);
			menu();
			break;


	}

}

int Player:: select()
   {
       system("cls");
   	int my_pokemon;

   	 cout<<"\n||||||||  Choose Your Pokemon  ||||||";
   		if(captured_pokemons.size()<1){
		   cout<<"\nCapture some pokemon First";
		   getchar();
		   menu();
		}
		else{
			for(int i=0;i<captured_pokemons.size();i++){
				cout<<"\n"<<i+1<<" "<<captured_pokemons[i].name;
			}
		}
     cout<<"\n Choose Your Pokemon:";
     cin>>my_pokemon;
        return (my_pokemon-1);
}


void Player:: throwball(int a)
{



	 int x;
     cout<<"\nChoose  from following pokeballs to cat'ch th pokemon";
     cout<<"\n1. Poke Balls ";
     cout<<"\n2. Great Balls";
     cin>>x;
     if(x==1)
     {
     	int d;
     	cin.sync();
     	cout<<"Player threw the Pokeball";
     	cout<<"\n-----";
     	Sleep(1000);
     	cout<<"--------";
     	Sleep(1000);
     	cout<<"------0-----------";
     	Sleep(1000);

     	cout<<"\n-----------------";
     	Sleep(2000);
     	srand(time(0));
     	d=(1+rand()%4);
     	cin.sync();
     	cin.ignore();
     	if(d==1 || d==2)
     	{
     	    cin.sync();
     		cout<<"\nGotcha! You caught the Pokemon";
     		// PlaySound(TEXT("victory.wav"),NULL,SND_ASYNC);
     		cout<<"\n Pokemon is yours";
     		no_of_pokeball= no_of_pokeball-1;
			captured_pokemons.push_back(Pre[a]);
			cout<<"\nCheck in the pokedex to see your new pokemon !!";

   	    char x;
        cout<<"Press y to return to main menu";
        cin>>x;
        if(x=='y')
        {

            menu();
        }
		 }
     	else
     	{
     		cout<<"Better luck next Time!!";
     		Sleep(1000);
     		no_of_pokeball-=1;
     		menu();
		 }

	 }

	else
	{
		if(great_ball==0)
     		{
     			char ch;
     		   cout<<"You don't own Great Balls";
				cout<<"\nDo you want to Buy from Poke Mart";
				cout<<"Enter (y/n) for buying from Poke Mart";
				cin>>ch;
				if(ch=='y')
				{
					poke_mart();

				}
				else
				{
					throwball(a);
				}
			 }
      else

            {
		cout<<"----------o------";
     	cout<<"\n-----------------";
     	Sleep(2);


		 cout<<"Gotcha! You caught the pokemon";
		//  PlaySound(TEXT("victory.wav"),NULL,SND_ASYNC);
		 cout<<"Pokemon is yours";
		 great_ball-=1;

		}

	system("cls");

}}

void Player::battle(int poke,int a)
{
    bool win=false;

    while(!win)
    {
        cout<<"\n\n";
        cout<<"My Pokemon XP :"<<captured_pokemons[poke].current_poke_hp<<endl;
        cout<<"Enemy XP:"<<Pre[a].current_poke_hp<<endl;

        cout<<captured_pokemons[poke].Attacks[0]<<"\t\t"<<captured_pokemons[poke].Attacks[1]<<endl;
        cout<<captured_pokemons[poke].Attacks[2]<<"\t\t"<<captured_pokemons[poke].Attacks[3]<<endl;

        cout<<"Enter your Attack :";
        cin.sync();
        getchar();
        srand(time(0));
        int my_attack=rand()%20;
        int enemy_attack=rand()%25;
        captured_pokemons[poke].current_poke_hp=captured_pokemons[poke].current_poke_hp-enemy_attack;
        Pre[a].current_poke_hp-=my_attack;

        if(captured_pokemons[poke].current_poke_hp<=0)
        {

            cout<<"Oh You LOst!!!!!"<<endl;
            cout<<"Better Luck Next Time";
            money=money+rand()%15;              // At least he tried so we are rewarding them
            win=true;
        }

        if(Pre[a].current_poke_hp<=0)
        {
            cout<<"GOTCHA !1!!!11!!!!\n";
            getchar();
            cout<<"You Succesfully captured the Pokemon";
            captured_pokemons.push_back(Pre[a]);
            win=true;

        }
	 menu();       // going back to main menu   
    }


}

int main()
{

// Game Loop starts from here

	Player p;
	p.Professor_at_starting();


}
