package com.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import com.bean.Employee;
import com.factory.ConnectionFactory;

public class EmployeeDaoImpl implements EmployeeDao {

	@Override
	public String add(Employee emp) {
		// TODO Auto-generated method stub
		Statement st=null;
		Connection con=null;
		ResultSet rs=null;
		String status="";
		try {
			con=ConnectionFactory.getConnection();
			if(con!=null) {
				st=con.createStatement();
			}
			if(st!=null) {
				rs=st.executeQuery("SELECT * FROM TEMP_EMP WHERE ENO="+emp.getEno());
			}
				boolean b=rs.next();
				if(b==true)
					status="Exsisted";
				else
				{
					int rowCount=st.executeUpdate("INSERT INTO TEMP_EMP VALUES ( "+emp.getEno()+" , '" +emp.getEname()+"' ,"+emp.getEsal()+" , "+"'"+emp.getEaddr() + "' )");
					if(rowCount==1)
						status="Success";
					else
						status="failure";
				}
		}catch(Exception e) {
			status="failure";
			e.printStackTrace();
		}
		return status;
	}

	@Override
	public Employee search(int eno) {
		// TODO Auto-generated method stub
		Employee emp=null;
		Statement st=null;
		Connection con=null;
		ResultSet rs=null;
		try {
			con=ConnectionFactory.getConnection();
			if(con!=null)
				st=con.createStatement();
			if(st!=null)
				rs=st.executeQuery("SELECT * FROM TEMP_EMP WHERE ENO="+eno);
			if(rs!=null) {
				boolean b=rs.next();
				if(b==true)
				{
					emp=new Employee();
					emp.setEno(rs.getInt("ENO"));
					emp.setEname(rs.getString("ENAME"));
					emp.setEsal(rs.getFloat("ESAL"));
					emp.setEaddr(rs.getString("EADDR"));
					
				}
				else {
					emp=null;
				}
			}
			
		}
		catch(Exception e) {
				e.printStackTrace();
		}
		return emp;
	}

	@Override
	public String update(Employee emp) {
		// TODO Auto-generated method stub
		String status="";
		Connection con=null;
		Statement st=null;
		try {
			con=ConnectionFactory.getConnection();
			if(con!=null) {
				st=con.createStatement();
			}
			int rowCount=0;
			if(st!=null) {
				rowCount=st.executeUpdate("UPDATE TEMP_EMP SET ENAME= '"+emp.getEname()+"',ESAL = "+emp.getEsal()+", EADDR ='"+emp.getEaddr()+"'WHERE ENO="+emp.getEno());
			}
			if(rowCount==1)
				status="success";
			else
				status="failure";
		}
		catch(Exception e) {
			status="failure";
			e.printStackTrace();
		}
		return status;
	}

	@Override
	public String delete(int eno) {
		// TODO Auto-generated method stub\
		String status="";
		Connection con=null;
		Statement st=null;
		try {
			con=ConnectionFactory.getConnection();
			if(con!=null) {
				st=con.createStatement();
			}
			Employee emp=search(eno);
			if(emp==null)
				status="not exsisted";
			else
			{
				int rowCount=0;
				if(st!=null) {
					rowCount=st.executeUpdate("DELETE FROM TEMP_EMP WHERE ENO="+emp.getEno());
				}
				if(rowCount==1)
					status="success";
				else
					status="failure";
			}
		}catch(Exception e) {
			status="failure";
			e.printStackTrace();
		}
		return status;
	}

}
