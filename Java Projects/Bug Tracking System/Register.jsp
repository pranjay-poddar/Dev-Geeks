<HTML>

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

</head>
<body bgcolor="white">
<form  name="editform" action="./Reg">
	<table width="100%">
	<tr>
	<td align=""><img src="./Images/header.jpeg" height="120"></img></td>
	<td align=""><font face="arial narrow" size="5px" color="orange"><b>Defect Tracking System</b></font></td>
	</tr>
	<tr>
	<td align=right colspan=2><b>[ <a href="./Home.jsp"><font color="#FBC61" size="3px">Home</font></a> ]</b>
	</td>
	</tr>
	</table>
	<hr>
<center><tr><td><h4>REGISTRATION FORM</h4></td></tr></center>
<center>
<table>
<tr><td><b>UserID*</td><td><input type="text" name="userid" value=""></tc></td></tr>
<tr><td><b>Fname*</td><td><input type="text" name="fname" value=""></td></tr>
<tr><td><b>Lname*</td><td><input type="text" name="lname" value=""></td></tr>
<tr>
<td><b>Gender:</td>
<td><select name="gender">
<option value="select">-----select----</option>
<option>Male</option>
<option>FeMale</option></td>
</tr>
<tr>
<td><b>DOB</td>
<td><input type="text" name="dob" value="">
<a href="javascript:show_calendar('document.editform.dob', document.editform.dob.value);">date</a>
</tr>

<tr>
<td><b>Qualification</td>
<td><input type="text" name="qualification" value=""></td>
</tr>

<tr>
<td><b>Address</td>
<td><input type="text" name="address" value=""></td>
</tr>

<tr>
<td><b>PhoneNo</td>
<td><input type="text" name="phoneno" value=""></td>
</tr>

<tr>
<td><b>MobileNo</td>
<td><input type="text" name="mobileno" value=""></td>
</tr>

<tr>
<td><b>EmailID</td>
<td><input type="text" name="mailid" value=""></td>
</tr>

<tr>
<td><b>DOJ</td>
<td><input type="text" name="doj" value="">
<a href="javascript:show_calendar('document.editform.doj', document.editform.doj.value);">date</a>
</tr>
<tr>
<td><b>Designation</td>
<td>
<select name="designation">
<option value="select">-----select----</option>
<option>Developer</option>
<option>Tester</option>
<option>Manager</option></td>
</tr>

<tr>
<td><b>MaritalStatus</td>
<td>
<select name="maritalstatus">
<option value="select">-----select----</option>
<option>Married</option>
<option>Unmarried<option></td>
</tr>

<tr>
<td><b>Password</td>
<td><input type="password" name="password" value=""></td>
</tr>
<tr>
           <td class="text1"><div align="right" class="style2"><b>Hint Question</div></td>
           <td><div align="left">
             <select name="HintQuestion" class="borderBlue">
		       <OPTION value="select">[Select One]
               <OPTION value="What is the name of your first school?">What is the name of your first school?
               <OPTION value="What is your favourite pass-time?">What is your favourite pass-time?
               <OPTION value="What is your mother maiden name?">What is your mother's maiden name?
               <OPTION value="What is your favourite food?">What is your favourite food?
             </select>
           </div></td>
         </tr>
        

<tr>
<td><b>HintAnswer</td>
<td><input type="text" name="hintanswer" value=""></td>
</tr>


</table><br><br>
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
&nbsp&nbsp&nbsp&nbsp&nbsp
<tr><td><b><input type="submit" name="sub" value="Register" onclick="return validate()">
<b><input type="Reset" name="reset" value="Reset"></td></tr>
</center>
</form>
</body>
<jsp:include flush="true" page="footer.jsp"></jsp:include>
</html>
