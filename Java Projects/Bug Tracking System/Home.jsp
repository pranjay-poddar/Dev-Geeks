<html>
<%
String msg=null;

msg=request.getParameter("msg");

 %>
<head>
<script type="text/javascript">
function check()
{
<%
if(request.getParameter("msg")!=null)
{
%>
var msg='Please Check your userID and password';
alert(msg);
<%
}


if(request.getParameter("msg1")!=null)
{
%>
var msg1='Permission not granted';
alert(msg1);
<%
}

%>
}

//}
</script>
</head>
<body onload="return check()"><center>
<table width="100%">
	<tr>
	<td align=""><img src="./Images/header.jpeg" height="120"></img></td>
	<td align=""><font face="arial narrow" size="5px" color="orange"><b> BUG Tracking System</b></font></td>
	</tr>
</table>
<hr>
<br><br>
<table width="80%" border=0 cellpadding=12>
<tr><td>
<p align="justify"> <font face="arial narrow"><b>
	The Project entitled BUG TRACKING SYSTEM is a web based and intranet application aimed for the tracking 
and resolution of bugs. 
</font></b></p>
<td><jsp:include page="./Login.html" /></td>
</tr>
</table>
<br><br><br>
</center>
</body>
<jsp:include page="./footer.jsp" />   

</html>