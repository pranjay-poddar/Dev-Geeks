<jsp:include page="./TesterHeader.jsp" />
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
    	
    	   if(testerForm.bug_name.value=='')
    		{
    			window.alert("Bug Name is empty !");
    			return false;
    		}
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
<script LANGUAGE="Javascript" src="dateget.js">
	</script>

  </head>
  <body bgcolor="">
  <form name="testerForm" action="AssignBug" onsubmit="return check()" method="post">
<br>
  	<center>
  	<h5 align="center"><font color="red">
<%
HttpSession hs=request.getSession();
String s1=(String)hs.getAttribute("userid");
if(request.getParameter("msg")!=null)
{ %>
<%=request.getParameter("msg")%>
<%}
 
%>
	</font></h5>
<br>  	<h3><font color="#FBB117">&nbsp;&nbsp;&nbsp;&nbsp;Assign Bug</font></h3>
  	<table border="0" cellpadding="2" >
  	    <tr><td align="right"><font>Bug_Name</font></td><td><input type="text" name="bug_name"></td></tr>
  		<tr><td align="right"><font>Bug_type</font></td><td><input type="text" name="bug_type"></td></tr>
  		<tr><td align="right"><font>Bug_level</font></td><td><input type="text" name="bug_level"></td></tr>
		<tr><td align="right"><font>Priority</font></td><td><input type="text" name="priority"></td></tr>
  		<tr><td align="right"><font>Project Name</font></td><td> 
<%

		ServletContext sc=getServletContext();
		String driver=sc.getInitParameter("drivername");
		String url=sc.getInitParameter("url");
		String uname=sc.getInitParameter("username");
		String pwd=sc.getInitParameter("password");
try{
			Class.forName(driver);
			Connection  con=DriverManager.getConnection(url,uname,pwd);
			System.out.println(".......11........");
			ResultSet rs,rs1;
			PreparedStatement pstmt=con.prepareStatement("select loginid from employee_details");
			rs=pstmt.executeQuery();
			
			PreparedStatement pstmt1=con.prepareStatement("select project_name from project_details");
			rs1=pstmt1.executeQuery();
%>
<select name="pname">
<%
	while(rs1.next())
	{			
%>
  			<option><%=rs1.getString(1)%></option>
<%
}//while
%>
  		</select>
  		<tr><td align="right"><font>Tester Code</font></td><td> <input type="text" name="tester_code" value=<%=s1%> readonly></td></tr>  		
  		<tr><td align="right"><font>Bug Date</font></td><td> <input type="text" name="bug_date"><a href="javascript:show_calendar('document.testerForm.bug_date', document.testerForm.bug_date.value);">date</a>
</td></tr>
  		<tr><td align="right"><font>Employee code</font></td><td> 
  		<select name="e_code">
  			<option value="select">---select---</option>
<%
			while(rs.next())
			{			
%>
  			<option><%=rs.getString(1)%></option>
<%
}//while
}
catch(Exception e)
{
	e.printStackTrace();
}
 %>  			

  		</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  		
  		</td></tr>
  		<tr><td align="right"><font>Status</font></td><td> 
  		
  		<select name="status">
  			<option value="select">---select---</option>
  			<option>open</option>
  			<option>close</option>
  	</select>
  		</td></tr>  		
  		<tr><td align="center" colspan="2"><input type="submit" value="submit"></td></tr>  		  		  		
  	</table>
  	</center>
   </form>
   </body>
<jsp:include page="./footer.jsp" />   
</html>
