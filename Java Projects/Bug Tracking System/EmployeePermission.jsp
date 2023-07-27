<jsp:include flush="true" page="Header.jsp"></jsp:include>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<%@page import="java.sql.*" %>
<%
System.out.println("Grid");
//String query=request.getParameter("query");
//System.out.println("Query gird:"+query);

//session.setAttribute("list",data1);
%>
<html>
<head>
<LINK href="styles.css" type="text/css" rel="stylesheet">
<script LANGUAGE="Javascript" SRC="Images/validate.js"></script>
<title>Untitled Document</title>







</style>
<script language="javascript">
function SeekersDetails()
{
var a=document.form1.userid.value;

alert(a);
window.location.href="./Permission.jsp?msg="+a;
System.out.println("msg3 "+request.getParameter("msg"));
}
</script>
<script language="javascript">
function check(fname)
{
window.open(fname);
return false;
}
</script>
</head>

<body class="SC">
<form name="form1" method="get" action="employeepermission">
<h3 align=center><center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Employee Details</center></h3>


<%
String ecode,fname,lname,gender,dob,qualification,address,phoneno,mobileno,emailid,doj,role;
try{

			Connection con;
			Statement st;
 			Class.forName("com.mysql.jdbc.Driver");
			String s="jdbc:mysql://localhost:3306/bts";
			con=DriverManager.getConnection(s,"root","igen");
			st=con.createStatement();
			//ResultSet rs=st.executeQuery("select username,firstname,lastname,lastname,fathername,gender,nation,religion from zcs_personal");
             String q="select p.username,p.middlename,p.fathername,r.resumepath from zcs_personal p,resume r,zcs_logins s where s.userid=p.username and p.resumeid=r.rid and s.permission='y'";		
             ResultSet rs=st.executeQuery("select * from employee_details where permission='n'");	
//			ResultSet rs=st.executeQuery("select p.username,p.middlename,p.fathername,r.resumepath from zcs_personal p,resume r,zcs_logins s where s.userid=p.username and p.resumeid=r.rid and s.permission='y' and s.filter='n'" );
%>
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
  int i=0;
  while(rs.next())
  {
 System.out.println("---executed--");
 
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
		
		<td><input type="checkbox" name="list-<%=i%>" value="<%=rs.getString(1)%>"></td></tr>
		<%
		 i++;
	}
	
	rs.close();		
	   




if(DisRow==0)
{
%>
<tr align="center">
<td colspan="9" align="center">
No Records Found
</td>
</tr>
<%
}
if(i!=0)
{ 
%>
<tr align="center">
<td colspan="8">
<input type="hidden" name="size" value="<%=i%>">

<input type="submit" value="submit" ></td>
</tr>
<%}
 %>

 </table>
 </form>
 </body>
 </html>

<%
  }
catch(Exception e)
{
e.printStackTrace();
}

%>





  
  


  