<HTML>

<%
if(request.getParameter("cat")!=null)
{
if(request.getParameter("cat").equals("Tester"))
{
%>
<jsp:include page="./TesterHeader.jsp" />   
<%} %>
<%if(request.getParameter("cat").equals("Developer"))
{
%>
<jsp:include page="./DeveloperHeader.jsp" />   
<%}
if(request.getParameter("cat").equals("HrManager"))
{%>
<jsp:include page="./ManagerHeader.jsp" />   
<%}
}//top if %>

<%@page import="java.sql.*" %>
<br>
<script LANGUAGE="Javascript" >
		function ChkMandatoryField(F,T){
			var val= F.value;
			if(val==""){alert(T+" is mandatory");return false;}
		}
		
		function validate()
		{
			alert("hai");
			
            if(ChkMandatoryField(editform.fname,'FirstName')==false) return false;
            alert("hai")
            if(ChkMandatoryField(editform.lname,'LastName')==false) return false;
            if(editform.gender.value=="select")
    		{
    			window.alert("Select Gender !");
    			return false;
    		}
    		alert("hai1")
            if(ChkMandatoryField(editform.dob,'Date of Birth')==false) return false;
            if(ChkMandatoryField(editform.qualification,'Qualification')==false) return false;
            if(ChkMandatoryField(editform.address,'Address')==false) return false;
            if(ChkMandatoryField(editform.phoneno,'PhoneNo')==false) return false;
             if(ChkMandatoryField(editform.mobileno,'MobileNo')==false) return false;
             if(ChkMandatoryField(editform.emailid,'EmailID')==false) return false;
             if(ChkMandatoryField(editform.doj,'Date Of Joining')==false) return false;
             
             if(editform.role.value=="select")
    		{
    			window.alert("Select Designation !");
    			return false;
    		}
    		
    		if(editform.maritalstatus.value=="select")
    		{
    			window.alert("Select MaritalStatus !");
    			return false;
    		}
    		if(editform.HintQuestion.value=="select")
    		{
    			window.alert("Select HintQuestion !");
    			return false;
    		}
             
             if(ChkMandatoryField(editform.hintanswer,'HintAnswer')==false) return false;
             
		   
	

}



</script>
<script LANGUAGE="Javascript" src="dateget.js">
	</script>


<body bgcolor="silver">
<form  name="editform" action="UpdateProfile?cat=<%=request.getParameter("cat")%>" method="post" >
<h4 align="center"><font color="red">
<%if(request.getParameter("msg")!=null)
{ %>
<%=request.getParameter("msg")%>
<%} %>
	</font></h4>
<center><h3><font face="arial narrow" >Edit Profile</font></h3></center>
<center>
<table>
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
			ResultSet rs;
			HttpSession hs=request.getSession();
			String userid=(String)hs.getAttribute("userid");
			System.out.println("userid"+userid);
			PreparedStatement pstmt=con.prepareStatement("select * from employee_details where loginid=?");
			pstmt.setString(1,userid);
			rs=pstmt.executeQuery();
	while(rs.next())
	{			
	
%>

<tr><td><b>UserID*</td><td><input type="text" name="userid" value="<%=rs.getString("loginid")%>" readonly></tc></td></tr>
<tr><td><b>Fname*</td><td><input type="text" name="fname" value="<%=rs.getString("fname")%>"></td></tr>
<tr><td><b>Lname*</td><td><input type="text" name="lname" value="<%=rs.getString("lname")%>"></td></tr>
<tr>
<td><b>Gender:</td>
<td><select name="gender">
<option value="select">----select----</option>
<option>Male</option>
<option>FeMale</option>
</td>
</tr>
<tr>
<td><B>DOB</td>
<td><input type="text" name="dob" value="<%=rs.getString("dob")%>" readonly>
<a href="javascript:show_calendar('document.editform.dob', document.editform.dob.value);">date</a>
</td>
</tr>

<tr>
<td><b>Qualification</b></td>
<td><input type="text" name="qualification" value="<%=rs.getString("qualification")%>"></td>
</tr>

<tr>
<td><b>Address</b></td>
<td><input type="text" name="address" value="<%=rs.getString("address")%>"></td>
</tr>

<tr>
<td><b>PhoneNo</b></td>
<td><input type="text" name="phoneno" value="<%=rs.getString("phoneno")%>"></td>
</tr>

<tr>
<td><b>MobileNo</b></td>
<td><input type="text" name="mobileno" value="<%=rs.getString("mobileno")%>"></td>
</tr>

<tr>
<td><b>EmailID</b></td>
<td><input type="text" name="mailid" value="<%=rs.getString("emailid")%>"></td>
</tr>

<tr>
<td><b>DOJ</b></td>
<td><input type="text" name="doj" value="<%=rs.getString("doj")%>" readonly>
<a href="javascript:show_calendar('document.editform.doj', document.editform.doj.value);">date</a>
</td>
</tr>
<tr>
<td><b>Designation</b></td>
<td>
<select name="role"><option>Developer
<option><%=rs.getString("role")%></option>
<option value="select">----select----</option>
<option>Tester</option>
<option>Manager</option>
</td>
</tr>

<tr>
<td><b>MaritalStatus</b></td>
<td>
<select name="maritalstatus">
<option><%=rs.getString("maritalstatus") %></option>
<option value="select">----select----</option>
<option>Married</option>
<option>Unmarried<option></td>
</tr>


<tr>
           <td class="text1"><div align="right" class="style2"><b>Hint Question<b></div></td>
           <td><div align="left">
             <select name="HintQuestion" class="borderBlue">
		       <OPTION value="select">[Select One]
               <OPTION value="What is the name of your first school?">What is the name of your first school?
               <OPTION value="What is your favourite pass-time?">What is your favourite pass-time?
               <OPTION value="What is your mother maiden name?">What is your favourite book?
               <OPTION value="What is your favourite food?">What is your favourite food?
             </select>
           </div></td>
         </tr>
        

<tr>
<td><b>HintAnswer</b></td>
<td><input type="text" name="hintanswer" value="<%=rs.getString("hintanswer")%>"></td>
</tr>
<% 
}
}
catch(Exception e)
{
e.printStackTrace();
}

%>
</table><br><br>
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
&nbsp&nbsp&nbsp&nbsp&nbsp
<tr><td><b><input type="submit" name="sub" value="Edit" onclick="return validate()">
<b><input type="Reset" name="reset" value="Reset"></td></tr>
</center>
</form>
</body>
</html>
