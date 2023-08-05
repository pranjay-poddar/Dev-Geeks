#include <iostream>
#include <cstring>

using namespace std;

inline void WelcomeMessage1() 

{
	cout<<"**********Welcome to XYZ Hospital**********"<<endl<<endl;
}

inline void WelcomeMessage2() 

{
	cout<<"**********Welcome to the Pharmacy**********"<<endl<<endl;
}

inline void WelcomeMessage3() 

{
	cout<<"**********Welcome to Billing**********"<<endl<<endl;
}

inline void WelcomeMessage4() 

{
	cout<<"**********Welcome to the Cafeteria**********"<<endl<<endl;
}

class hospital

{
	char address[100];
	
	public:
	
	static int capacity; // static variable
	
	hospital()
	
	{
		strcpy(address,"4 Park Lane");
	}
};

int hospital::capacity=500;

class info: public hospital

{
    char name[50];
    int age;
    
    public:
    
    info() // use of constructor
    
    {
        strcpy(name,"N/A");
        age=0;
    }
    
    void get()
    
    {
        cout<<"Enter Name: ";
        cin>>name;
        
        cout<<"Enter Age: ";
        cin>>age;
        
        cout<<endl;
    }
    
    void show()
    
    {
        cout<<"Name: "<<name<<endl;
        cout<<"Age: "<<age;
        
        cout<<endl<<endl;
    }
};

class patient: public info

{
    int id;
    
    public:
    
    patient()
    
    {
        id=0;
    }
    
    void get()
    
    {
        cout<<"Patient Details...\n\n";
        
        info::get();
        
        cout<<"Enter Patient ID: ";
        cin>>id;
        
		cout<<"\nNew Patient Capacity: "<<--capacity;
		
        cout<<endl;
    }
    
    void show()
    
    {
        cout<<"Patient Details...\n\n";
        
        info::show();
        
        cout<<"Patient ID: "<<id;
        
        cout<<endl<<endl;
    }
	
	int retid()
	
	{
		return id;
	}
};

class employee: public info

{
    int id;
    int type;
    float sal;
    
    public:
    
    employee()
    
    {
        id=0;
        sal=0;
        type=0;
    }
    
    void get()
    
    {
        cout<<"Employee Details...\n\n";
        
        info::get();
        
        cout<<"Enter Employee ID: ";
        cin>>id;
        
        cout<<"\n[1] Doctor\n[2] Admin\n[3] Housekeeping\n[4] Maintanence\n\n";
        cout<<"Enter Employee Type (1/2/3/4): ";
		
		cin>>type;
        
        cout<<endl;
    }
    
    void show()
    
    {
        cout<<"\nEmployee Details...\n\n";
        
        info::show();
        
        cout<<"Employee ID: "<<id<<endl;
		cout<<"Employee Type: "<<type<<endl;
		cout<<"Calculated Monthly Salary: "<<sal;
        
        cout<<endl<<endl;
    }
    
    friend void calcsal(employee &);
};

void calcsal(employee &e) 

{
    int hours;
	
	cout<<"Enter the Hours Clocked for the Month: ";
    cin>>hours;
    
    switch (e.type)
    
    {
        case 1: 
		e.sal=5000*hours;
		break;
        
        case 2: 
		e.sal=2000*hours;
		break;
        
        case 3: 
		e.sal=1000*hours;
		break;
		
		case 4:
		e.sal=500*hours;
		break;
        
        default: cout<<"Unexpected Type";
    }
}

void add(int a, int b) 

{
	cout<<"\nSum of Selected Tablets: "<<a+b<<endl<<endl;
}

void add(float a, float b) 

{
	cout<<"\nSum of Selected Vials: "<<a+b<<endl<<endl;
}

class typesalone

{
	public:
	
	void display()
	
	{
		cout<<"Hourly Salary for Type 1 Employee: Rs. 5000"<<endl;
	}
};

class typesaltwo: public typesalone 

{
	public: 
	
	void display()
	
	{
		cout<<"Hourly Salary for Type 2 Employee: Rs. 2000"<<endl;
	}
};

class typesalthree

{
	public:
	
	virtual void display()
	
	{
		cout<<"Hourly Salary for Type 3 Employee: Rs. 1000"<<endl;
	}
	
	void show()
	
	{
		cout<<"Hourly Salary for Type 3 Employee: Rs. 1000"<<endl;
	}
};

class typesalfour: public typesalthree

{
	public: 
	
	void display()
	
	{
		cout<<"Hourly Salary for Type 4 Employee: Rs. 500"<<endl;
	}
	
	void show()
	
	{
		cout<<"Hourly Salary for Type 4 Employee: Rs. 500"<<endl;
	}
};

class bill

{
	int fixed;
	int variable;
	int days;
	
	public:
	
	bill()
	
	{
		fixed=0;
		variable=0;
		days=0;
	}
	
	bill(int fixed, int variable, int days)
	
	{
		this->fixed=fixed;
		this->variable=variable;
		this->days=days;
	}
	
	void get()
	
	{
		cout<<"Enter Fixed Charges: ";
		cin>>fixed;
		
		cout<<"Enter Variable Charges: ";
		cin>>variable;
		
		cout<<"Enter Number of Days: ";
		cin>>days;
		
		fixed*=days;
		variable*=days;
		
		cout<<endl;
	}
	
	void show()
	
	{
		cout<<"Fixed: Rs. "<<fixed<<endl<<"Variable: Rs. "<<variable<<endl<<endl;
	}
	
	bill operator + (bill b) const
	
	{
		bill temp;
		
		temp.fixed = fixed + b.fixed;
		temp.variable = variable + b.variable;
		
		return temp;
	}
};

class scan

{
	public:
	
	void display()
	
	{
		cout<<"Imaging Solutions Available...\n\n[1] X-Ray\n[2] MRI\n[3] CT-Scan\n\n";
	}
	
};

class ptime

{	
	public:
	
	void display()
	
	{
		cout<<"Time Taken...\n\n[1] X-Ray (10 Minutes) \n[2] MRI (30 Minutes) \n[3] CT-Scan (25 Minutes)\n\n";
	}
};

class scantime: public scan, public ptime

{
	int type;
	
	public:
	
	void get()
	
	{
		cout<<"Enter Type of Scan: ";
		cin>>type;
		
		cout<<endl;
	}
	
	void show()
	
	{
		cout<<"Selected Type: Type "<<type<<endl<<endl;
	}
};

class cafe

{
	int type;
	float amount;
	
	public: 
	
	cafe()
	
	{
		type=0;
		amount=0.0;
	}
	
	void get()
	
	{
		do
		
		{
			cout<<"Choose...\n\n[1] Tea \n[2] Coffee\n[3] Sandwich \n[4] Cookie\n[0] Exit\n\n";
		
			cin>>type;
			
			cout<<endl;
		
			switch (type)
		
			{
				case 1:
			
				amount+=450;
				break;
			
				case 2:
			
				amount+=550;
				break;
			
				case 3:
			
				amount+=600;
				break;
			
				case 4:
			
				amount+=400;
				break;
				
				case 0:
				break;
			
				default: cout<<"Wrong Choice...";
			}
		
		} 
		
		while(type!=0);	
	}
	
	void show()
	
	{
		cout<<"Final Amount: "<<amount<<endl;
		cout<<"Please Pay with Card or Cash. Thank You."<<endl<<endl;
	}
};

int main()

{
    
	WelcomeMessage1();
	
	int k;
	patient p[500];
	
	int i=0;
	
	do
	
	{
	    cout<<"[1] Admission\n[2] View Patient Details\n[0] Exit\n\nYour Choice: ";
	
	    cin>>k;
	
	    cout<<endl<<endl;
	
	    switch (k)
	
	    {
		    case 0:
		    break;
		
		    case 1:
		
		    if (i==500)
			
		    {
			    cout<<"Hospital Full\n\n";
		    }
		
		    else
		
		    {
			    p[i].get();
			    i++;
		    }
		
		    break;
		
		    case 2:
		
		    int id,j;
		    
		    j=0;
		
		    cout<<"Enter ID: ";
		    cin>>id;
		
		    while(j!=i+1)
			
		    {
			    if(id==p[j].retid())

			    {
				    p[j].show();
				    break;
			    }
			
			    j++;
		    }
			
		    break;
		
		    default: cout<<"Wrong Choice...\n\n";
	    }
	    
	}
	
	while(k!=0);
	
	employee e;
	
	e.get();
	
	
	calcsal(e);
	
	e.show();
	
	
	WelcomeMessage2();
	
	int a,b;
	float x,y;
	
	cout<<"Enter Supplier Price of 15 Crocin: ";
	cin>>a;
	cout<<"Enter Supplier Price of 15 Azithromycin: ";
	cin>>b;
	
	add(a,b);
	
	cout<<"Enter Supplier Price of 10 Vial Cyclophosphamide: ";
	cin>>x;
	
	cout<<"Enter Supplier Price of 10 Vial Methotrexate: ";
	cin>>y;
	
	add(x,y); 
	
	
	typesalone t1; // base class' display() called (no overriding)
	t1.display();
	
	typesaltwo t2; // derived class' display() called and base class' display() overridden
	t2.display();
	
	t2.typesalone::display(); // using scope resolution operator to call base class' display() using an object of derived class
	
	
	typesalthree *ptr; // base class pointer
	typesalfour t4;
	
	ptr=&t4; // base class pointer referencing object of derived class
	
	ptr->display(); // display() is a virtual function in the base class hence display() of derived class is called
	ptr->show(); // show() is not a virtual function hence display() of base class is called
	
	
	WelcomeMessage3();
	
	bill b1,b2,b3;
	
	cout<<"Charges for Stay in General Ward...\n\n";
	b1.get();
	
	cout<<"Charges for Stay in ICU Ward...\n\n";
	b2.get();
	
	cout<<"Total Charges for Stay...\n\n";
	b3=b1+b2;
	
	b3.show();
	
	
	scantime s;
	
	s.scan::display();
	s.ptime::display();
	
	s.get();
	s.show();
		
	WelcomeMessage4();
	
	cafe *c;
	c=new cafe;
	
	c->get();
	c->show();
	
	delete c;
	
	return 0;
}