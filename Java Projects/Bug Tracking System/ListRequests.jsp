<%@ page language="java" %>
<%@ page session="true" %>
<%@ page import="java.sql.*,java.io.*,java.util.Random"%>
<HTML>
<HEAD>

	<LINK href="styles.css" type="text/css" rel="stylesheet">
<script LANGUAGE="Javascript" SRC="Images/validate.js"></script>
<title>List Requests</title>

</HEAD>
<a href="Administration.jsp"><img border=0 src="Images2/CalLeft.gif"></a>
<body class="SC">
<form action="Login.html">
<h3 align=center>Employee List</h3>
<%
/*Declaration of variables*/

Connection con;
PreparedStatement pstmt;
ResultSet rs=null;

String username,userid,email,address,phno,status;

try
{	
	      Class.forName("com.mysql.jdbc.Driver");
       	  con=DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "igen");
       	  pstmt=con.prepareStatement("select * from employee");
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
        <th align="center">username</th>
		<th align="center">userid</th>
		<th align="center">email</th>
		<th align="center">address</th>
		<th align="center">phno</th>
		<th align="center">status</th>				
<%
int DisRow=0;
	/*Getting the values from the database*/

	while(rs.next())
	{
	   username=rs.getString(1);
	   userid=rs.getString(2);
	   email=rs.getString(3);
	   address=rs.getString(4);
	   phno=rs.getString(5);
	   status=rs.getString(6);
	   DisRow++;
	%>
	<tr class= <%=(DisRow%2!=0)? "row_even" : "row_odd"%>>
		<td><a href=""><%=username%></a></td>		
		<td align="center"><%=userid%></td>
		<td align="center"><%=email%></td>
		<td align="center"><%=address%></td>
		<td align="center"><%=phno%></td>
		<td align="center"><%=status%></td>				
	<%
	}
	rs.close();		
if(DisRow==0)
{	
	%>		
			<tr><th colspan=6>No Records found</th></tr>
	<%
}
}
%>
</table><table align="right">
 <tr><td><input type="submit" name="logout" value="Logout"></td></tr></table>
</form>
</BODY>
</HTML>