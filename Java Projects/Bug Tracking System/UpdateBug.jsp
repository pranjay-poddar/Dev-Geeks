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
    		if(testerForm.bug_type.value=='')
    		{
    			window.alert("Bug Type is empty !");
    			return false;
    		}
    		if(testerForm.bug_level.value=='')
    		{
    			window.alert("Bug Level is empty !");
    			return false;
    		}
    		if(testerForm.priority.value=='')
    		{
    			window.alert("Bug Priority is empty !");
    			return false;
    		}
    		if(testerForm.pname.value=='')
    		{
    			window.alert("Project name is empty !");
    			return false;
    		}
    		if(testerForm.tester_code.value=='')
    		{
    			window.alert("Tester code is empty !");
    			return false;
    		}
    		if(testerForm.bug_date.value=='')
    		{
    			window.alert("Bug Date is empty !");
    			return false;
    		}
    		if(testerForm.e_code.value=="select")
    		{
    			window.alert("Employee Code is empty !");
    			return false;
    		}
    		if(testerForm.status.value=="select")
    		{
    			window.alert("Select Status !");
    			return false;
    		}
    		
       	}
    </script>
  </head>
  <body bgcolor="">
  <form name="testerForm" action="UpdateBugReport" onsubmit="return check()" method="post">
  	<center>

<h3><font color="#FBB117" face="arial narrow">&nbsp;&nbsp;&nbsp;&nbsp;Update Bug</font></h3>
  	<table border="0" cellpadding="2" >
<%

		ServletContext sc=getServletContext();
		String driver=sc.getInitParameter("drivername");
		String url=sc.getInitParameter("url");
		String uname=sc.getInitParameter("username");
		String pwd=sc.getInitParameter("password");
		int bugid;
		bugid=Integer.parseInt(request.getParameter("bugid"));
try{
			Class.forName(driver);
			Connection  con=DriverManager.getConnection(url,uname,pwd);
			System.out.println(".......11........");
			ResultSet rs;
			
			PreparedStatement pstmt1=con.prepareStatement("select * from bug_report where bugno=?");
			pstmt1.setInt(1,bugid);
			rs=pstmt1.executeQuery();	
			while(rs.next())
			{			
%>
  		<tr><td align="right"><font>Bug_type</font></td><td><input type="text" name="bug_name" value="<%=rs.getString(2)%>"></td></tr>
  		<tr><td align="right"><font>Bug_type</font></td><td><input type="text" name="bug_type" value="<%=rs.getString(3)%>"></td></tr>
  		<tr><td align="right"><font>Bug_level</font></td><td><input type="text" name="bug_level" value="<%=rs.getString(4)%>"></td></tr>
		<tr><td align="right"><font>Priority</font></td><td><input type="text" name="priority" value="<%=rs.getString(5)%>"></td></tr>
  		<tr><td align="right"><font>Project Name</font></td><td><input type="text" name="pname" value="<%=rs.getString(6)%>"></td></tr>
  		<tr><td align="right"><font>Tester Code</font></td><td> <input type="text" name="tester_code" value="<%=rs.getString(7)%>"></td></tr>  		
  		<tr><td align="right"><font>Bug Date</font></td><td> <input type="text" name="bug_date" value="<%=rs.getString(8)%>"></td></tr>
  		<tr><td align="right"><font>Employee code</font></td><td> <input type="text" name="e_code" value="<%=rs.getString(9)%>"></td></tr>
  		<tr><td align="right"><font>Tester Status</font></td><td> <input type="text" name="e_code" value="<%=rs.getString(10)%>"></td></tr>
  		<tr><td align="right"><font>Rectified Date</font></td><td> <input type="text" name="bug_rectified" ></input></td></tr>  		
<%
}
}
catch(Exception e)
{
	e.printStackTrace();
}
 %>  	
  		<tr><td align="right"><font>Status</font></td><td> 
  		<select name="status">
  			<option value="select">---select---</option>
    			
  	    		<option>resolve</option>
  		    	<option>completed</option>
  		</select>
  		</td></tr>  		
  		<tr><td align="center" colspan="2"><input type="hidden" name="bugid" value="<%=bugid%>"></td></tr>  		  		  		
  		<tr><td align="center" colspan="2"><input type="submit" value="submit"></td></tr>  		  		  		
  	</table>
  	</center>
   </form>
   </body>
<jsp:include page="./footer.jsp" />   
</html>
