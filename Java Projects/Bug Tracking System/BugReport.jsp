<jsp:include page="./TesterHeader.jsp" />
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
			if(employeeForm.bug_type.value=='')
    		{
    			window.alert("Bug Type is Empty !");
    			return false;
    		}
    		if(employeeForm.bug_level.value=='')
    		{
    			window.alert("Bug Level is Empty !");
    			return false;
    		}
    		if(employeeForm.priority.value=='')
    		{
    			window.alert("Bug Priority is Empty !");
    			return false;
    		}
    		if(employeeForm.pname.value=='')
    		{
    			window.alert("Project name is Empty !");
    			return false;
    		}
    		if(employeeForm.tester_code.value=='')
    		{
    			window.alert("Tester code is Empty !");
    			return false;
    		}
    		if(employeeForm.bug_date.value=='')
    		{
    			window.alert("Bug Date is Empty !");
    			return false;
    		}
    		if(employeeForm.e_code.value=='')
    		{
    			window.alert("Employee Code is Empty !");
    			return false;
    		}       	
    		if(employeeForm.bug_rectified.value=='')
    		{
    			window.alert("BugRectified is Empty !");
    			return false;
    		}       	
    		if(employeeForm.status1.value=='')
    		{
    			window.alert("Employee Status is Empty !");
    			return false;
    		}       	
    		
}
    </script>
  </head>
  <body bgcolor="">
  <form name="employeeForm" action="buginfo" onsubmit="return check()" method="post">

  	<center>
  	<h3><font color="#FBB117">&nbsp;&nbsp;&nbsp;&nbsp;Bug Information</font></h3>
  	<table border="0" cellpadding="2">
  		<tr><td align="right"><font ><b>Bug_type</b></font></td><td> <input type="text" name="bug_type"></td></tr>
  		<tr><td align="right"><font ><b>Bug_level</b></font></td><td> <input type="text" name="bug_level"></td></tr>
		<tr><td align="right"><font><b>Priority</b></font></td><td> <input type="text" name="priority"></td></tr>
  		<tr><td align="right"><font ><b>Pname</b></font> </td><td><input type="text" name="pname"></td></tr>
  		<tr><td align="right"><font ><b>Tester Code</b></font></td><td> <input type="text" name="tester_code"></td></tr>  		
  		<tr><td align="right"><font ><b>Bug Date</b></font> </td><td><input type="text" name="bug_date"></td></tr>
  		<tr><td align="right"><font ><b>Employee code</b></font> </td><td><input type="text" name="e_code"></td></tr>
  		<tr><td align="right"><font ><b>Status</b></font></td>
  		<td>
  		<select name="status">
  			<option value="select">---select---</option>
  			<option>open</option>
  			<option>close</option>
  			<option>resolve</option>
  			<option>completed</option>
  		</select>
  		</td></tr>  		
  		<tr><td align="right"><font><b>Bug Rectified date</b></font></td><td> <input type="text" name="bug_rectifed"></td></tr>  		
  		<tr><td align="right"><font><b>status1</b></font> </td><td><input type="text" name="status1"></td></tr>  		
  		<tr><td align="center" colspan="2"><input type="submit" value="submit"></td></tr>  		  		  		
  	</table>
  	</center>
   </form>
   </body>
<jsp:include page="./footer.jsp" />   
</html>
