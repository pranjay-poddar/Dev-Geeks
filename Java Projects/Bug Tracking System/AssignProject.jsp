<%@page import="java.sql.*" %>
<jsp:include page="./ManagerHeader.jsp" />
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
			
    		if(Assignproject.pname.value=="select")
    		{
    			window.alert("Select Project Name!");
    			return false;
    		}       	
    		    	
    		if(Assignproject.e_code.value=="select")
    		{
    			window.alert("Select Employee Code!");
    			return false;
    		}    
    		if(Assignproject.role.value=='')
    		{
    			window.alert("role is Empty !");
    			return false;
    		}
    		
    		
    		   	
    		    	
    		
}
    </script>
  </head>
  <%
  String s=request.getParameter("msg");
  if (s==null)
   s="";
   %>
  <body bgcolor="">
  <form name="Assignproject" action="AssignProject" onsubmit="return check()" method="post">
   <p><font color="red"><%=s %></font></p>
  	<center>
  	<h3><font color="#FBB117">&nbsp;&nbsp;&nbsp;&nbsp;Assign Project</font></h3>
  	<table border="0" cellpadding="2">
  	<tr><td align="right"><font><b>Project Name</b></font></td><td> 
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
			<option value="select">---select---</option>
<%
	while(rs1.next())
	{			
%>
  			<option><%=rs1.getString(1)%></option>
<%
}//while
%>
  		</select>
  		<tr><td align="right"><font><b>Employee code</b></font></td><td> 
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
		</select>	
  		<tr><td align="right"><font><b>Role</b></font></td><td> <input type="text" name="role"></td></tr>
   		
  		<tr><td align="center" colspan="2"><input type="submit" value="submit"></td></tr>  		  		  		
  	</table>
  	</center>
   </form>
   </body>
<jsp:include page="./footer.jsp" />   
</html>
