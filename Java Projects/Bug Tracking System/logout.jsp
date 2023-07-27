
<html>
<table width="100%" border=0>
	<tr>
	<td align=""><img src="./Images/header.jpeg" height="120"></img></td>
	<td align=""><font face="arial narrow" size="5px" color="orange"><b> Bug Tracking System</b></font></td>
	</tr>
	<tr>
	</tr>
	</table>
<%
HttpSession hs=request.getSession();
hs.invalidate();
 %>
 <hr>
<br><br><br><br><br><br>
<center><font face="arial narrow"><b> You have been logged out. Click <a href="./Home.jsp"><font color="red">here</font></a> to go Home</b></font></center>
<br><br><br><br><br><br>
<jsp:include  page="footer.jsp"></jsp:include>
</html>