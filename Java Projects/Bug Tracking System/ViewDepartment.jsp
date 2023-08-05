<%@ page language="java" %>
<%@ page session="true" %>
<%@ page import="java.sql.*,java.io.*,java.util.Random"%>
<HTML>
<jsp:include page="./Header.jsp" /> 
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
<h3 align=center>View Deparments</h3>
<%
/*Declaration of variables*/

Connection con;
PreparedStatement pstmt;
ResultSet rs=null;

String dno,dname,location;

try
{	
	      Class.forName("com.mysql.jdbc.Driver");
       	  con=DriverManager.getConnection("jdbc:mysql://localhost:3306/bts", "root", "igen");
       	  pstmt=con.prepareStatement("select * from department_details");
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
	<table class=notebook align=center >
	<tr class=row_title>
        <th align="center">DepartmentName</th>
		<th align="center">Location</th>
		<th align="center">Delete</th>
		<%
int DisRow=0;
	/*Getting the values from the database*/

	while(rs.next())
	{
	   dno=rs.getString(1);
	   dname=rs.getString(2);
	   location=rs.getString(3);
	   DisRow++;
	%>
	<tr class= <%=(DisRow%2!=0)? "row_even" : "row_odd"%>>
		
		<td align="center"><%=dname%></td>
		<td align="center"><%=location%></td>
		<td align="center"><a href="DeleteDept?deptno=<%=dno%>">Delete</a></td>
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
	<br>	<br>	<br>	<br>	<br>	<br>	<br>
</BODY>
<jsp:include page="./footer.jsp" /> 
</HTML>