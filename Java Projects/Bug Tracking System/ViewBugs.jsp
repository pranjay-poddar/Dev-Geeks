<jsp:include page="./DeveloperHeader.jsp" />
<%@page import="java.sql.*" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>Login.html</title>
	
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="this is my page">
    <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
    
    <!--<link rel="stylesheet" type="text/css" href="./styles.css">-->
	<script type="text/javascript" language="javascrpt">
    	function check()
    	{
    		
    	
       	}
    </script>
  </head>
  <body bgcolor="">
<form name="testerForm" action="ViewBugs" onsubmit="return check()" method="post">
<br>
<center>
<h4 align="center"><font color="red">
<%if(request.getParameter("msg")!=null)
{ %>
<%=request.getParameter("msg")%>
<%} %>
	</font></h4>
	
	<h3><font color="#FBB117" face="arial narrow">&nbsp;&nbsp;&nbsp;&nbsp;View All Bugs</font></h3>
  		
<table border="1" cellpadding="2" cellspacing="0" bordercolor="orange">
  		<tr>
  			<th>Bug Name</th>
  			<th>Bug Type</th>
  			<th>Bug Level</th>  			
  			<th>Priority</th>
  			<th>Project Name</th>
  			<th>Tester Code</th>
  			<th>Bug Date</th>
  			<th>Employee Code</th>
  			<th>Status</th>
  			<th>Update</th>
  			<th>View Solution</th>
  		</tr>
<%
		ServletContext sc=getServletContext();
		String driver=sc.getInitParameter("drivername");
		String url=sc.getInitParameter("url");
		String uname=sc.getInitParameter("username");
		String pwd=sc.getInitParameter("password");
		HttpSession hs=request.getSession();
		String s=(String)hs.getAttribute("userid");
try{
			Class.forName(driver);
			Connection  con=DriverManager.getConnection(url,uname,pwd);
			System.out.println(".......11........");
			ResultSet rs;
			PreparedStatement pstmt=con.prepareStatement("select * from bug_report where e_code=? and status1=''");
			pstmt.setString(1,s);
			rs=pstmt.executeQuery();
	while(rs.next())
	{			
%>

  		<tr>
  			<td><%=rs.getString(2)%></td>
  			<td><%=rs.getString(3)%></td>
  			<td><%=rs.getString(4)%></td>
  			<td><%=rs.getString(5)%></td>
  			<td><%=rs.getString(6)%></td>
  			<td><%=rs.getString(7)%></td>
  			<td><%=rs.getString(8)%></td>
  			<td><%=rs.getString(9)%></td>
  			<td><%=rs.getString(10)%></td>
  			<td><a href="./UpdateBug.jsp?bugid=<%=rs.getInt(1)%>">Update</a></td>
  			<td><a href="./ViewSolution.jsp?bugid=<%=rs.getInt(1)%>">View</a></td>
		</tr>
  
<%
}//while

%>  			
	</table>
 		
<%
}
catch(Exception e)
{
	e.printStackTrace();
}
 %>  			
  	</center>
   </form>
   </body>
<jsp:include page="./footer.jsp" />   
</html>
