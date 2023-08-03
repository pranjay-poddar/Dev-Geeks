<%@ page language="java" %>
<%@ page session="true" %>
<%@ page import="java.sql.*,java.io.*,java.util.Random"%>
<HTML>
<HEAD>

	<LINK href="styles.css" type="text/css" rel="stylesheet">
<script LANGUAGE="Javascript" SRC="Images/validate.js"></script>
<title>Admin Response</title>

</HEAD>
<a href="Employee.jsp"><img border=0 src="Images2/CalLeft.gif"></a>
<body class="SC">
<form action="Login.html">
<h3 align=center>Admin Response</h3>
<%
/*Declaration of variables*/

Connection con;
PreparedStatement pstmt;
ResultSet rs=null;

String f1,message,reassignto,newstatus,tested;

try
{	
	      Class.forName("com.mysql.jdbc.Driver");
       	  con=DriverManager.getConnection("jdbc:mysql://localhost:3306/bts", "root", "igen");
       	  pstmt=con.prepareStatement("select * from adminresponse");
    	   rs=pstmt.executeQuery();
}
catch(Exception e)
{
	e.printStackTrace();
}
if(rs!=null)
{
%>
	<br>
	<table class=notebook align=center>
	<tr class=row_title>
        <th align="center">f1</th>
		<th align="center">message</th>
		<th align="center">re-assignto</th>
		<th align="center">new status</th>
		<th align="center">tested</th>
		<%
int DisRow=0;
	/*Getting the values from the database*/

	while(rs.next())
	{
	   f1=rs.getString(1);
	   message=rs.getString(2);
	   reassignto=rs.getString(3);
	   newstatus=rs.getString(4);
	   tested=rs.getString(5);
	   DisRow++;
	%>
	<tr class= <%=(DisRow%2!=0)? "row_even" : "row_odd"%>>
		<td><a href=""><%=f1%></a></td>		
		<td align="center"><%=message%></td>
		<td align="center"><%=reassignto%></td>
		<td align="center"><%=newstatus%></td>
		<td align="center"><%=tested%></td>
		<%
	}
	rs.close();		
if(DisRow==0)
{	
	%>		
			<tr><th colspan=5>No Records found</th></tr>
	<%
}
}
%>
</table>
<table align="right"><tr><td><input type="submit" name="logout" value="Logout"></td></tr>
</form>
</body>
</HTML>