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
	
	<h3><font color="#FBB117" face="arial narrow">&nbsp;&nbsp;&nbsp;&nbsp;View Solution</font></h3>
  		
<table border="1" cellpadding="2" cellspacing="0" bordercolor="orange">
  		<tr>
  			
  			<th>Employee Code</th>
  			<th>Solution</th>
  			<th>Date</th>
  			  		</tr>
<%
		ServletContext sc=getServletContext();
		String driver=sc.getInitParameter("drivername");
		String url=sc.getInitParameter("url");
		String uname=sc.getInitParameter("username");
		String pwd=sc.getInitParameter("password");
		HttpSession hs=request.getSession();
		String s=request.getParameter("bugid");
try{
			Class.forName(driver);
			Connection  con=DriverManager.getConnection(url,uname,pwd);
			System.out.println(".......11........");
			ResultSet rs;
			PreparedStatement pstmt=con.prepareStatement("select * from bug_solution where bugno=?");
			pstmt.setString(1,s);
			rs=pstmt.executeQuery();
			int i=0;
	while(rs.next())
	{			
%>

  		<tr>
  			<td><%=rs.getString(2)%></td>
  			<td><%=rs.getString(3)%></td>
  			<td><%=rs.getString(4)%></td>
  			
		</tr>
  
<%
i=i+1;
}//while
if(i==0)
{
%>
<td colspan="3" align="center">No Records Found</td>  			
	</table>
 		
<%
}
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
