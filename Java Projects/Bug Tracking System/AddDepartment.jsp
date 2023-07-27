<html>
<jsp:include page="./Header.jsp" /> 
<head>
    <script LANGUAGE="Javascript" >
		function ChkMandatoryField(F,T){
			var val= F.value;
			if(val==""){alert(T+" is mandatory");return false;}
		}
		
		function validate()
		{
			
			
            if(ChkMandatoryField(login.dname,'DepartmentName')==false) return false;
            if(ChkMandatoryField(login.location,'Location')==false) return false;
            
            
		}
		
	</script>

<body bgcolor="silver">
<form  name="login" action="./AddDept" name="frm">
<br><br><center>
<h3>ADD DEPARTMENT</h3></center>
<center><table>
<tr><td>&nbsp;Department Name:</td><td><input type="text" name="dname" value=""></td></tr>
<tr><td>Department Location:</td><td><input type="text" name="location" value=""></td></tr>
</table><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<tr><td><input type="submit" name="login" value="Add" onClick="return validate()"></td></tr>
</center>
</body>
<jsp:include page="./footer.jsp" /> 
</html>
