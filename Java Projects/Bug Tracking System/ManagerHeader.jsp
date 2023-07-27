<html>
<%
HttpSession hs=request.getSession();

 %>
<body bgcolor="white">
<form>
	<table width="100%">
	<tr>
	<td align=""><img src="./Images/header.jpeg" height="120"></img></td>
	<td align=""><font face="arial narrow" size="5px" color="orange"><b> Bug Tracking System</b></font></td>
	</tr>
	<tr>
	<%
	String uname=(String)hs.getAttribute("userid");
	String role=(String)hs.getAttribute("role");
	 %>
	   <td align="right" valign="bottom" colspan=2>
                <b>  <%if(role.equals("admin")){%>Welcome,&nbsp;&nbsp; Admin<%} else {%>Welcome,&nbsp;&nbsp;<%=uname%> <%} %> </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
                <b>[ <%if(role.equals("admin")){%><a href="./AdminHome.jsp"><%} else if(role.equals("Tester")){%><a href="./TesterHome.jsp?cat=Tester"><%} else if(role.equals("Developer")){%><a href="./DeveloperHome.jsp?cat=Developer"><%}else if(role.equals("Manager")){%><a href="./ManagerHome.jsp?cat=HrManager"><%} %><font color="#FBC61">home</font></a> ]</b>&nbsp;
                <%if(role!="user"){%><b>[ <a href="./logout.jsp"><font color="#FBC61" size="3px">logout</font></a> ]</b><%} %>
            </td>
	

	</tr>
	</table>
	
	<script type="text/javascript">
sfHover = function() {
   var sfEls = document.getElementById("nav").getElementsByTagName("LI");
   for (var i=0; i<sfEls.length; i++) {
      sfEls[i].onmouseover=function() {
         this.className+=" over";
      }
      sfEls[i].onmouseout=function() {
         this.className=this.className.replace(new RegExp(" over\\b"), "");
      }
   }
}
if (window.attachEvent) window.attachEvent("onload", sfHover);

</script>


<style type="text/css">

ul#nav, ul#nav ul {
   margin: 0;
   padding: 0px;
   list-style: none;
   
   }

ul#nav  li {
   position: relative;
   float: left;
   width:140px;
   font-size: 12px;
  
   
  
}
   
#nav li ul {
   position: absolute;
   margin-left: -999em; /* hide menu from view */
   top: 20;
   left:0;
}

/* Styles for Menu Items */
ul#nav  li a {
   display: block;
   text-decoration: none;
   color:"black";
   padding: 2px;
   border: 1px solid #ccc;
   
   min-height:0;
   }
/* commented backslash mac hiding hack \*/
* html ul#nav  li a {height:1%;   position:relative;}
/* end hack */

/* this sets all hovered lists to black */
#nav li:hover a,#nav  li.over a,
#nav li:hover li a:hover,#nav li.over li a:hover {
   color: #fff;
   background-color: black;}
    
/* set dropdown to default */
#nav li:hover li a,#nav li.over li a {
   color: black;
   background-color:silver; */
}
#nav li ul li a { padding: 2px 2px; } /* Sub Menu Styles */
#nav li:hover ul,#nav li.over ul {margin-left:0; } /* show menu*/

</style>

<body bgcolor="white">
<form>
<hr>

<table border=0 align=right>
        <tr><td>
<font size="3px">
  <ul id="nav">
  <li><a href="#">Open</a>
  <ul id="nav">
       
       <li><a href="./AssignProject.jsp">Assign Project</a></li>
       <li><a href="./EditProfile.jsp?cat=HrManager"">Edit Profile</a></li> 
       <li><a href="./Recchange_pass.jsp?cat=HrManager&userid=<%=(String)hs.getAttribute("userid")%>">Change Password</a></li>        
    </ul>
  </li>
  </ul>
  </font>
        
        </td></tr>
        
    </table>
 <br>

	
	

</form>
</body>
</html>