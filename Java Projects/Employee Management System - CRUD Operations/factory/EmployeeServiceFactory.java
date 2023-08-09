package com.factory;

import com.service.EmployeeService;
import com.service.EmployeeServiceImpl;

public class EmployeeServiceFactory {
	private static EmployeeService empService;
	static{
		empService=new EmployeeServiceImpl();
	}
	public static EmployeeService getEmployeeService(){
		return empService;
	}
}
