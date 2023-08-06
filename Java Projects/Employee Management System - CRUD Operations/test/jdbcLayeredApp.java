package com.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import com.bean.Employee;
import com.factory.ConnectionFactory;
import com.factory.EmployeeServiceFactory;
import com.service.EmployeeService;

public class jdbcLayeredApp {
	
	static {
		ConnectionFactory.getConnection();
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		BufferedReader br=null;
		Employee emp=null;
		while(true) {
			System.out.println("\n1. ADD Employee");
			System.out.println("2. SEARCH Employee");
			System.out.println("3. UPDATE Employee");
			System.out.println("4. DELETE Employee");
			System.out.println("5. EXIT");
			System.out.println("Enter Your Option[1,2,3,4,5]");
			int option;
			try {
				int eno=0;
				String ename="";
				br=new BufferedReader(new InputStreamReader(System.in));
				option=Integer.parseInt(br.readLine());
				float esal=0.0f;
				String eaddr="";
				String status="";
				
				EmployeeService empService=EmployeeServiceFactory.getEmployeeService();
				
				switch(option) {
				case 1:
					System.out.println("==============Employee ADD Module=================");
					System.out.print("Employee Number: ");
					eno=Integer.parseInt(br.readLine());
					
					System.out.print("Employee Name: ");
					ename=br.readLine();
					
					System.out.print("Employee Salary: ");
					esal=Float.parseFloat(br.readLine());
					
					System.out.print("Employee Address: ");
					eaddr=br.readLine();
					
					emp=new Employee();
					emp.setEno(eno);
					emp.setEname(ename);
					emp.setEsal(esal);
					emp.setEaddr(eaddr);
					
					status=empService.addEmployee(emp);
					if(status.equalsIgnoreCase("success"))
						System.out.println("\nStatus: Employee Inserted Sucessfully\n");
					else if(status.equalsIgnoreCase("failue"))
						System.out.println("\nStatus: Employee Insertion Failed\n");
					else if( status.equalsIgnoreCase("exsisted"))
						System.out.println("\nStatus: Employee already exsisted\n");
					
					break;
					
				case 2:
					System.out.println("==============Employee SEARCH Module=================");
					System.out.print("Employee Number: ");
					eno=Integer.parseInt(br.readLine());
					emp=empService.searchEmployee(eno);
					
					if(emp==null)
						System.out.println("\nStatus: Employee Not Exsisted\n");
					else {
						System.out.println("Status: Employee Exsisted\n");
						System.out.print("Employee Number:  "+emp.getEno()+"\n");
						System.out.print("Employee Name: "+emp.getEname()+"\n");
						System.out.print("Employee Salary: "+emp.getEsal()+"\n");
						System.out.print("Employee Address: "+emp.getEaddr()+"\n");
					}
					break;
				case 3:
					System.out.println("==============Employee UPDATE Module=================");
					System.out.print("Employee Number: ");
					eno=Integer.parseInt(br.readLine());
					emp=empService.searchEmployee(eno);
					if(emp==null)
						System.out.println("\nStatus: Employee Not Exsisted \n");
					else {
						Employee emp1=new Employee();
						emp1.setEno(eno);
						
						System.out.print("Employee Name[Old: " + emp.getEname() + "] New: ");
						String val1=br.readLine();
						if(val1==null||val1.equals(""))
							emp1.setEname(emp.getEname());
						else {
							emp1.setEname(val1);
						}
						
						System.out.print("Employee Salary[Old: " + emp.getEsal() + "] New: ");
						String val2=br.readLine();
						if(val2==null||val2.equals(""))
							emp1.setEsal(emp.getEsal());
						else {
							emp1.setEsal(Float.parseFloat(val2));
						}
						
						System.out.print("Employee Address[Old: " + emp.getEaddr() + "] New: ");
						String val3=br.readLine();
						if(val3==null||val3.equals(""))
							emp1.setEaddr(emp.getEaddr());
						else
						{
							emp1.setEaddr(val3);
						}
						
						status=empService.updateEmployee(emp1);
						if(status.equalsIgnoreCase("success"))
							System.out.println("\nStatus: Employee Updated Sucessfully \n");
						else if(status.equalsIgnoreCase("failure"))
							System.out.println("\nStatus: Employee Updation Failed \n");
						
					}
					break;
				case 4:
					System.out.println("==============Employee DELETE Module=================");
					System.out.print("Employee Number: ");
					eno=Integer.parseInt(br.readLine());
					status=empService.deleteEmployee(eno);
					if(status.equalsIgnoreCase("success"))
						System.out.println("\nStatus: Employee Deleted Sucessfully \n");
					else if(status.equalsIgnoreCase("failure"))
						System.out.println("\nStatus: Employee Deletion Failed \n");
					else if(status.equalsIgnoreCase("not exsisted"))
						System.out.println("\nStatus: Employee Not Exsisted \n");
					break;
				case 5: 
					System.out.println("******************Thank You for using Employee Application*******************");
					System.exit(0);
					break;
				default:
					System.out.println("Invalid Choice! Please try again");
					
				}
			}catch(IOException e) {
				e.printStackTrace();
			}
		}
	}
}
