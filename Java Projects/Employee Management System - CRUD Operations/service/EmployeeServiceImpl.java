package com.service;

import com.bean.Employee;
import com.dao.EmployeeDao;
import com.factory.EmployeeDaoFactory;

public class EmployeeServiceImpl implements EmployeeService {

	@Override
	public String addEmployee(Employee emp) {
		// TODO Auto-generated method stub
		EmployeeDao empDao=EmployeeDaoFactory.getEmployeeDao();
		String status=empDao.add(emp);
		return status;
	}

	@Override
	public Employee searchEmployee(int eno) {
		// TODO Auto-generated method stub
		EmployeeDao empDao=EmployeeDaoFactory.getEmployeeDao();
		Employee emp=empDao.search(eno);
		return emp;
	}

	@Override
	public String updateEmployee(Employee emp) {
		// TODO Auto-generated method stub
		EmployeeDao empDao=EmployeeDaoFactory.getEmployeeDao();
		String status=empDao.update(emp);
		
		return status;
	}

	@Override
	public String deleteEmployee(int eno) {
		// TODO Auto-generated method stub
		EmployeeDao empDao=EmployeeDaoFactory.getEmployeeDao();
		String status=empDao.delete(eno);
		return status;
	}

}
