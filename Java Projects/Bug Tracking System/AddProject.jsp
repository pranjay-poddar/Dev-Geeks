<jsp:include flush="true" page="Header.jsp"></jsp:include>
<%@ page language="java" %>
<%@ page session="true" %>
<%@ page import="java.sql.*,java.io.*,java.util.Random"%>
<html>
<head>
<script LANGUAGE="Javascript" >
		function ChkMandatoryField(F,T){
			var val= F.value;
			if(val==""){alert(T+" is mandatory");return false;}
		}
		
		function validate()
		{
			
			if(ChkMandatoryField(proj.pname,'ProjectName')==false) return false;
            if(ChkMandatoryField(proj.description,'Description')==false) return false;
             if(ChkMandatoryField(proj.sdate,'date')==false) return false;
            if(ChkMandatoryField(proj.duration,'Duration')==false) return false;
            if(ChkMandatoryField(proj.cname,'Name')==false) return false;
            if(ChkMandatoryField(proj.caddress,'Address')==false) return false;
            if(ChkMandatoryField(proj.phone,'Phone')==false) return false;
             if(ChkMandatoryField(proj.mailid,'Mailid')==false) return false;
             
              
            
            
            
            
		}
		
	</script>
<script LANGUAGE="Javascript" src="dateget.js">
	</script>



</head>

<body bgcolor="silver">
<form  name="proj" action="./AddProj">
<center>
<h3>Add Project</h3></center>
<center><table>
<tr>
  <td>&nbsp;Project Name:</td>
  <td><input type="text" name="pname" value=""></td>
</tr>
<tr>
  <td>Project Description</td>
  <td><textarea name="description" cols="20" rows="3" name="description"></textarea></td>
  </tr>
   
<tr>
  <td>&nbsp;Submission Date</td>
  <td><input type="text" name="sdate" value="" readonly>
<a href="javascript:show_calendar('document.proj.sdate', document.proj.sdate.value);">date</a>
</tr>


<tr>
  <td>&nbsp;Duration:</td>
  <td><input type="text" name="duration" value=""></td>
</tr>

<tr>
  <td>&nbsp;Client Name:</td>
  <td><input type="text" name="cname" value=""></td>
</tr>


<tr>
  <td>Client Address</td>
  <td><textarea name="caddress" name="caddress" cols="20" rows="3"></textarea></td>
  </tr>
   
<tr>
  <td>&nbsp;Phone No:</td>
  <td><input type="text" name="phoneno" value=""></td>
</tr>

<tr>
  <td>&nbsp;EmailId:</td>
  <td><input type="text" name="mailid" value=""></td>
</tr>


<tr><td>Department Name:</td>
<td><select name="deptname">
<%
Connection con;
PreparedStatement pstmt,pstmt1;
ResultSet rs=null,rs1=null;




try

{	
	      Class.forName("com.mysql.jdbc.Driver");
       	  con=DriverManager.getConnection("jdbc:mysql://localhost:3306/bts", "root", "igen");
       	  pstmt=con.prepareStatement("select * from department_details");
         
    	   rs=pstmt.executeQuery();
    	   while(rs.next())
    	   {
    	   %>
    	   <option><%=rs.getString("dept_name") %></option>
    	   <%
    	   }
    	    %>
    	    </select>
    	    </td></tr>
    	   <tr><td>Project Lead:</td>
    	   <td><select name="plead">
    	   <%
    	   pstmt=con.prepareStatement("select * from employee_details");
    	   rs=pstmt.executeQuery();
    	   while(rs.next())
    	   {
    	   %>
    	   <option><%=rs.getString("loginid")%></option>
    	   <%
    	   }
    	    %>
    	    
    	    </select>
    	    </td>
    	    </tr>
    	  

  <%  	   
}
catch(Exception e)
{
e.printStackTrace();

}

%>
</table><br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<tr><td><input type="submit" name="login" value="login" onClick="return validate()"></td></tr>
</center>
</body>
<jsp:include flush="true" page="footer.jsp"></jsp:include>
</html>
