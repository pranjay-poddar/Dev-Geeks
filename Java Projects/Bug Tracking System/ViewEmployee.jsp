<jsp:include flush="true" page="Header.jsp"></jsp:include>
<%@ page language="java" %>
<%@ page session="true" %>
<%@ page import="java.sql.*,java.io.*,java.util.Random"%>
<HTML>
<HEAD>

	<LINK href="styles.css" type="text/css" rel="stylesheet">
<script LANGUAGE="Javascript" SRC="Images/validate.js"></script>
<title>Admin Response</title>
<script language="javascript">
function Checkfiles()
{
	
     var fup = document.getElementById('my_file_element').value;
     alert(fup);
	 if(fup=="")
	 {
	 alert("Upload at least one file");
	 document.getElementById('my_file_element').focus();
	 return false;
	 }
	 else if(fup!="")
	 {
	 alert("Not null");
     var fileName = fup;

     var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
	 alert(ext);
     if(ext == "gif" || ext == "GIF" || ext == "JPEG" || ext == "jpeg" || ext == "jpg" || ext == "JPG")

      {
				alert("correct format");
                return true;

      }         

      else

      {

                alert("Upload Gif or Jpg images only");
                document.getElementById('my_file_element').focus();
                return false;

       }
       return false;
	}
}</script>
</HEAD>

<body class="SC">
<form name="get ElementById">
<h3 align=center>Employee Details</h3>
<%
/*Declaration of variables*/

Connection con;
PreparedStatement pstmt;
ResultSet rs=null;

String ecode,fname,lname,gender,dob,qualification,address,phoneno,mobileno,emailid,doj,role;

try
{	
	      Class.forName("com.mysql.jdbc.Driver");
       	  con=DriverManager.getConnection("jdbc:mysql://localhost:3306/bts", "root", "igen");
       	  pstmt=con.prepareStatement("select * from employee_details");
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
        <th align="center">EmployeeName</th>
		<th align="center">Gender</th>
		<th align="center">Date Of Birth</th>
		<th align="center">Qualification</th>
		<th align="center">Address</th>
		<th align="center">PhoneNo</th>
		<th align="center">MobileNo</th>
		<th align="center">EmailId</th>
		<th align="center">Date Of Joining</th>
		<th align="center">Role</th>
		<th align="center">Delete</th>
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
	   
	   DisRow++;
	%>
	<tr class= <%=(DisRow%2!=0)? "row_even" : "row_odd"%>>
		
		<td align="center"><%=fname%><%=lname%></td>
		<td align="center"><%=gender%></td>
		<td align="center"><%=dob%></td>
		<td align="center"><%=qualification%></td>
		<td align="center"><%=address%></td>
		<td align="center"><%=phoneno%></td>
		<td align="center"><%=mobileno%></td>
		<td align="center"><%=emailid%></td>
		<td align="center"><%=doj%></td>
		<td align="center"><%=role%></td>
		<td align="center"><a href="DeleteEmp?ecode=<%=ecode%>">Delete</a></td>
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
</BODY>
<jsp:include flush="true" page="footer.jsp"></jsp:include>
</HTML>