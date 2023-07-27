<%@ page language="java" %>
<%@ page session="true" %>
<%@ page import="java.sql.*,java.io.*,java.util.Random"%>
<HTML>
<HEAD>

	<LINK href="styles.css" type="text/css" rel="stylesheet">
<script LANGUAGE="Javascript" SRC="Images/validate.js"></script>
<title>Employee Request</title>

</HEAD>

<body class="SC">
<a href="Administration.jsp"><img border=0 src="Images2/CalLeft.gif"></a>
<form action="Login.html">
<h3 align=center>Employee Request</h3>
<%
/*Declaration of variables*/

Connection con;
PreparedStatement pstmt;
ResultSet rs=null;

String f1,to,from,subject,message,tested;

try
{	
	      Class.forName("com.mysql.jdbc.Driver");
       	  con=DriverManager.getConnection("jdbc:mysql://localhost:3306/test", "root", "igen");
       	  pstmt=con.prepareStatement("select * from employeerequest");
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
		<th align="center">to</th>
		<th align="center">from</th>
		<th align="center">subject</th>
		<th align="center">message</th>
		<th align="center">tested</th>
		
		<%
int DisRow=0;
	/*Getting the values from the database*/

	while(rs.next())
	{
	   f1=rs.getString(1);
	   to=rs.getString(2);
	   from=rs.getString(3);
	   subject=rs.getString(4);
	   message=rs.getString(5);
	   tested=rs.getString(6);
	  	   DisRow++;
	%>
	<tr class= <%=(DisRow%2!=0)? "row_even" : "row_odd"%>>
		<td><a href=""><%=f1%></a></td>		
		<td align="center"><%=to%></td>
		<td align="center"><%=from%></td>
		<td align="center"><%=subject%></td>
		<td align="center"><%=message%></td>
		<td align="center"><%=tested%></td>
				
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
</table>
<table align="right"><tr><td><input type="submit" name="logout" value="Logout"></td></tr>
</form>
</BODY>
</HTML>