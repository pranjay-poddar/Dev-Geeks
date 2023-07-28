<jsp:include flush="true" page="Header.jsp"></jsp:include>
<%@ page language="java" %>
<%@ page session="true" %>
<%@ page import="java.sql.*,java.io.*,java.util.Random"%>
<HTML>
<head>
<script language="javascript">
function ChkMandatoryField(F,T){
			var val= F.value;
			if(val==""){alert(T+" is mandatory");return false;}
		}
		
		function validate()
		{
			
			if(ChkMandatoryField(proj.pname,'ProjectName')==false) return false;
            if(ChkMandatoryField(proj.description,'Description')==false) return false;
             if(ChkMandatoryField(proj.date,'date')==false) return false;
            if(ChkMandatoryField(proj.duration,'Duration')==false) return false;
            if(ChkMandatoryField(proj.name,'Name')==false) return false;
            if(ChkMandatoryField(proj.address,'Address')==false) return false;
            if(ChkMandatoryField(proj.phone,'Phone')==false) return false;
             if(ChkMandatoryField(proj.mailid,'Mailid')==false) return false;
             
              
            
            
            
            
		}
		
	</script>



</head>

<title>Edir Requests</title>



<form action="./UpdProj" method="post" name="frm">
<h3 align=center>Update Project</h3>
<%
/*Declaration of variables*/

Connection con;
PreparedStatement pstmt,pstmt1;
ResultSet rs=null,rs1=null;

String pname,description,date,duration,name,address,phone,email,plead,deptname;
 String pid=request.getParameter("pid");

try
{	
	      Class.forName("com.mysql.jdbc.Driver");
       	  con=DriverManager.getConnection("jdbc:mysql://localhost:3306/bts", "root", "igen");
       	  pstmt=con.prepareStatement("select * from project_details where project_no=?");
       	  pstmt.setString(1,pid);
    	   rs=pstmt.executeQuery();


if(rs!=null)
{
%>
	<br>
	<table align=center>
				
<%
int DisRow=0;
	/*Getting the values from the database*/

	while(rs.next())
	{
	   pid=rs.getString("project_no");
	   pname=rs.getString("project_name");
	   description=rs.getString("project_description");
	   date=rs.getString("sdate");
	   duration=rs.getString("duration");
	   name=rs.getString("clientname");
	   address=rs.getString("clientaddress");
	   phone=rs.getString("clientphone");
	   email=rs.getString("clientemail");
	   plead=rs.getString("projectlead");
	   deptname=rs.getString("deptname");
	   DisRow++;
	   
	  
	%>
	
	    <tr><td align="center"></td><td><input type="hidden" value=<%=pid%> name="pid"></td></tr>
		<tr><td align="center">ProjectName:</td><td><input type="text" value=<%=pname%> name="pname"></td></tr>
		<tr><td align="center">Description:</td><td><textarea cols="30" rows="3" name=description><%=description%> </textarea></td></tr>
		<tr><td align="center">Submission Date</td><td><input type="text"value=<%=date%> name="date" ></td></tr>
		<tr><td align="center">Duration:</td><td><input type="text"value=<%=duration%> name="duration" ></td></tr>
		<tr><td align="center">Client Name:</td><td><input type="text"value=<%=name%> name="name" ></td></tr>
		<tr><td align="center">Address</td><td><input type="text"value=<%=address%> name="address" ></td></tr>
		<tr><td align="center">phoneNo:</td><td><input type="text"value=<%=phone%> name="phoneno" ></td></tr>
		<tr><td align="center">EmailId:</td><td><input type="text"value=<%=email%> name="emailid" ></td></tr>
		<tr><td>Department Name:</td>
<td><select name="deptname">
<option>deptname</option>
<%
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
    	   <option>plead</option>
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
	rs.close();		
if(DisRow==0)
{	
	%>		
	  <tr><th colspan=6>No Jobs found</th></tr>
	<%
}
}

}
catch(Exception e)
{
	e.printStackTrace();
}

%>
</table>
<br>
<br>
<center><input type="submit"value="Update"></center>
</form>
<br><br>
</BODY>
<jsp:include flush="true" page="footer.jsp"></jsp:include>
</HTML>
