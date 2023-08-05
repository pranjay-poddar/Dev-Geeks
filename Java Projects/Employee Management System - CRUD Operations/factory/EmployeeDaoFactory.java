package com.factory;

import com.dao.EmployeeDao;
import com.dao.EmployeeDaoImpl;

public class EmployeeDaoFactory {
	private static EmployeeDao empDao;
	static{
		empDao=new EmployeeDaoImpl();
	}
	
	public static EmployeeDao getEmployeeDao(){
		return empDao;
	}
}
