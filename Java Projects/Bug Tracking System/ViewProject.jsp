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
<h3 align=center>View Project</h3>
<%
/*Declaration of variables*/

Connection con;
PreparedStatement pstmt;
ResultSet rs=null;

String pid,pname,description,date,duration,name,address,phone,email,plead,deptname;

try
{	
	      Class.forName("com.mysql.jdbc.Driver");
       	  con=DriverManager.getConnection("jdbc:mysql://localhost:3306/bts", "root", "igen");
       	  pstmt=con.prepareStatement("select * from project_details");
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
        <th align="center">ProjectName</th>
		<th align="center">Submission Date</th>
		<th align="center">Duration</th>
		<th align="center">ClientName</th>
		<th align="center">ClientAddress</th>
		<th align="center">PhoneNo</th>
		<th align="center">EmailId</th>
		<th align="center">ProjectLead</th>
		<th align="center">DeptName</th>
		<th align="center">Delete</th>
		<%
int DisRow=0;
	/*Getting the values from the database*/

	while(rs.next())
	{
	   pid=rs.getString("project_no");
	   pname=rs.getString("project_name");
	   description=rs.getString("project_description");
	   date=rs.getString("sdate");
	   duration=rs.getString("duration");
	   name=rs.getString("clientname");
	   address=rs.getString("clientaddress");
	   phone=rs.getString("clientphone");
	   email=rs.getString("clientemail");
	   plead=rs.getString("projectlead");
	   deptname=rs.getString("deptname");
	   DisRow++;
	%>
	<tr class= <%=(DisRow%2!=0)? "row_even" : "row_odd"%>>
		
		<td align="center"><%=pname%></td>
		<td align="center"><%=date%></td>
		<td align="center"><%=duration%></td>
		<td align="center"><%=name%></td>
		<td align="center"><%=address%></td>
		<td align="center"><%=phone%></td>
		<td align="center"><%=email%></td>
		<td align="center"><%=plead%></td>
		<td align="center"><%=deptname%></td>
		<td align="center"><a href="DelProj?pid=<%=pid%>">Delete</a></td>
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
<br><br><br>
</BODY>
<jsp:include flush="true" page="footer.jsp"></jsp:include>
</HTML>