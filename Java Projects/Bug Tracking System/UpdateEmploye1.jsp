<jsp:include flush="true" page="Header.jsp"></jsp:include>
<%@ page language="java" %>
<%@ page session="true" %>
<%@ page import="java.sql.*,java.io.*,java.util.Random"%>
<HTML>

<title>Edit Requests</title>
<head>
<script LANGUAGE="Javascript" >
		function ChkMandatoryField(F,T){
			var val= F.value;
			if(val==""){alert(T+" is mandatory");return false;}
		}
		
		function validate()
		{
			
			
            if(ChkMandatoryField(frm.bsalary,'BasicSalary')==false) return false;
            
            
            
		}
		
	</script>


</head>
<form action="./UpdateEmp" method="post" name="frm">
<h3 align=center>UPDATE EMPLOYEE</h3>
<%
/*Declaration of variables*/

Connection con;
PreparedStatement pstmt,pstmt1;
ResultSet rs=null,rs1=null;

String ecode,fname,lname,gender,dob,qualification,address,phoneno,mobileno,emailid,doj,role,salary,dno;
ecode=request.getParameter("ecode");

try
{	
	      Class.forName("com.mysql.jdbc.Driver");
       	  con=DriverManager.getConnection("jdbc:mysql://localhost:3306/bts", "root", "igen");
       	  pstmt=con.prepareStatement("select * from employee_details where e_code=?");
       	  pstmt.setString(1,ecode);
    	   rs=pstmt.executeQuery();


if(rs!=null)
{
%>
	<br>
	<table align=center>
				
<%
int DisRow=0;
	/*Getting the values from the database*/

	while(rs.next())
	{
	   ecode=rs.getString("e_code");
	   fname=rs.getString("fname");
	   lname=rs.getString("lname");
	   gender=rs.getString("gender");
	   dob=rs.getString("dob");
	   qualification=rs.getString("qualification");
	   address=rs.getString("address");
	   phoneno=rs.getString("phoneno");
	   mobileno=rs.getString("mobileno");
	   emailid=rs.getString("emailid");
	   doj=rs.getString("doj");
	   role=rs.getString("role");
	   salary=rs.getString("basicsalary");
	   dno=rs.getString("dno");
	   
	   DisRow++;
	%>
	<tr class= <%=(DisRow%2!=0)? "row_even" : "row_odd"%>>
	    <tr><td align="center"></td><td><input type="hidden" value=<%=ecode%> name="ecode"  ></td></tr>
		<tr><td align="center">Employee Name:</td><td><input type="text"value=<%=fname%><%=lname %> name="empname" disabled="true"></td></tr>
		<tr><td align="center">Gender:</td><td><input type="text"value=<%=gender%> name="gender" disabled="true"></td></tr>
		<tr><td align="center">Date of Birth</td><td><input type="text"value=<%=dob%> name="dob" disabled="true"></td></tr>
		<tr><td align="center">Qualification:</td><td><input type="text"value=<%=qualification%> name="qualification" disabled="true"></td></tr>
		<tr><td align="center">Address:</td><td><input type="text"value=<%=address%> name="address" disabled="true"></td></tr>
		<tr><td align="center">PhoneNo</td><td><input type="text"value=<%=phoneno%> name="phoneno" disabled="true"></td></tr>
		<tr><td align="center">MobileNo:</td><td><input type="text"value=<%=mobileno%> name="mobileno" disabled="true"></td></tr>
		<tr><td align="center">EmailId:</td><td><input type="text"value=<%=emailid%> name="emailid" disabled="true"></td></tr>
		<tr><td align="center">Date Of Joining:</td><td><input type="text"value=<%=doj%> name="doj" disabled="true"></td></tr>
		<tr><td align="center">Role:</td><td><input type="text"value=<%=role%> name="role" disabled="true"></td></tr>
		<tr><td align="center">Basic Salary:</td><td><input type="text" name="bsalary" value=<%=salary %>></td></tr>
		<tr>
		<td align="center">Department Name</td>
		<td><select name="deptname">
		  <%pstmt=con.prepareStatement("select * from department_details");
       	  rs=pstmt.executeQuery();
       	  while(rs.next())
       	  {
       	  %>
       	  <option><%=rs.getString("dept_name") %></option>
       	  <% 
       	      	  }
       	  %>
   
       	 
		
		</select>
		
	<%
	}
	rs.close();		
if(DisRow==0)
{	
	%>		
	  <tr><th colspan=6>No Jobs found</th></tr>
	<%
}
}

}
catch(Exception e)
{
	e.printStackTrace();
}

%>
</table>
<br>
<br>
<center><input type="submit"value="Update" onClick="return validate()"></center>
</form>
</BODY>
<jsp:include flush="true" page="footer.jsp"></jsp:include>
</HTML>













