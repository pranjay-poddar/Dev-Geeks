<html>
<head>
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
</head>
<%
HttpSession hs=request.getSession();
String uname="User";
if((String)hs.getAttribute("uname")!=null)
{
uname=(String)hs.getAttribute("uname");
}

int uid1=0;
if((Integer)hs.getAttribute("uid")!=null)
{
uid1=((Integer)hs.getAttribute("uid")).intValue();
}


 %>
<body bgcolor="#559ED9" alink="white" vlink="white" link="white">

<div style="position:absolute; left:130px ;top:30px "><br><font face="verdana" color="black"  size="5px"><b>&nbsp;&nbsp;&nbsp;WFBComplaintManagementSystem</b></font></div>
    <table width="100%" border=0 cellpadding="3">
        <tr>
            <td align="left">
                
                <img src="./images/banner2.jpg" >
                </td>
            <td>


            <td align="right" valign="bottom">

                <b>  <%if(uname.equals("admin")){%>Welcome,&nbsp;&nbsp; Admin<%} else{%>Welcome,&nbsp;&nbsp;<%=uname%> <%} %> </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
                <b>[ <%if(uname.equals("admin")){%><a href="./AdminHome.jsp"><%} else if(uname.equals("User")){%><a href="./Home.jsp"><%} else{%><a href="./UserHome.jsp?uid=<%=uid1%>&uname=<%=uname%>"><%} %><font color="#FBC61">home</font></a> ]</b>&nbsp;
                <%if(uname!="User"){%><b>[ <a href="./logout.jsp"><font color="#FBC61" size="3px">logout</font></a> ]</b><%} %>
            </td>
            
        </tr>
</table>
<hr>
<table border=0 align=right>
        <tr><td>
<font size="3px">
  <ul id="nav">
  <li><a href="#">Products </a>
  <ul id="nav">
       <li><a href="./FixedDeposite.jsp">Fixed&nbsp;Deposits&nbsp;</a></li>
       <li><a href="./Facility.jsp">Facility&nbsp;Deposit</a></li>
       <li><a href="./Reinvestment.jsp">Reinvestment&nbsp;Plan</a></li>
       <li><a href="./Cash.jsp">Cash&nbsp;Certificates</a></li>
       <li><a href="./Recurring.jsp">Recurring&nbsp;Deposit</a></li>
       <li><a href="./Variable.jsp">Variable&nbsp;Recurring&nbsp;Deposit</a></li>
       <li><a href="./Special.jsp">Special&nbsp;Recurring&nbsp;Deposit</a></li>
    </ul>
  </li>
  <li><a href="#">Services </a>
    <ul>
    
    <li><a href="./VidhyaNidhi.jsp">Vidhya&nbsp;Nidhi&nbsp;Services</a></li>
    <li><a href="./Automatic.jsp">Automatic Renewal of Domestic Term Deposits</a></li>   
    <li><a href="./Saving.jsp">Savings Bank</a></li>
    <li><a href="./CurrentAcc.jsp">Current Account</a></li>
    <li><a href="./AdvAcc.jsp">Advantage Account</a></li>
    </ul>    
  </li>
  <li><a href="#">Schemes    </a>
    <ul>
      <li><a href="./SplDeposite.jsp">Special Deposit Scheme for Senior Citizens </a></li>
      <li><a href="./IbTax.jsp">IB Tax Saver Scheme</a></li>
      <li><a href="./HealthPlus.jsp">HealthPlus&nbsp;Saving</a></li>
      </ul>  
  </ul>
  </font>
        
        </td></tr>
        
    </table>
    <br>




</html>