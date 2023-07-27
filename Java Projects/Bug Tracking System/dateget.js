  function show_calendar(str_target, str_datetime) {
	var arr_months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	var week_days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
	var n_weekstart = 1; // day week starts from (normally 0 or 1)
     if(str_datetime!="")
     {
         //alert(str_datetime); 
         str_datetime=str_datetime+" 00:00:00";
     }
	var dt_datetime = (str_datetime == null || str_datetime =="" ?  new Date() : str2dt(str_datetime));
	var dt_prev_month = new Date(dt_datetime);
	dt_prev_month.setMonth(dt_datetime.getMonth()-1);
	var dt_next_month = new Date(dt_datetime);
	dt_next_month.setMonth(dt_datetime.getMonth()+1);
	var dt_firstday = new Date(dt_datetime);
	dt_firstday.setDate(1);
	dt_firstday.setDate(1-(7+dt_firstday.getDay()-n_weekstart)%7);
	var dt_lastday = new Date(dt_next_month);
	dt_lastday.setDate(0);
	
	// html generation (feel free to tune it for your particular application)
	// print calendar header
	var str_buffer = new String (
		"<html>\n"+
		"<head>\n"+
		"	<title>Calendar</title>\n"+
		"</head>\n"+
		"<body bgcolor=\"White\">\n"+
		"<table class=\"clsOTable\" cellspacing=\"0\" border=\"0\" width=\"100%\">\n"+
		"<tr><td bgcolor=\"#5C743D\">\n"+
		"<table cellspacing=\"1\" cellpadding=\"3\" border=\"0\" width=\"100%\">\n"+
		"<tr>\n	<td bgcolor=\"#5C743D\"><a href=\"javascript:window.opener.show_calendar('"+
		str_target+"', '"+ dt2dtstr(dt_prev_month)+"');\">"+
		"<img src=\"images/prev.gif\" width=\"16\" height=\"16\" border=\"0\""+
		" alt=\"previous month\"></a></td>\n"+
		"	<td bgcolor=\"#5C743D\" colspan=\"5\">"+
		"<font color=\"white\" face=\"tahoma, verdana\" size=\"2\">"
		+arr_months[dt_datetime.getMonth()]+" "+dt_datetime.getFullYear()+"</font></td>\n"+
		"	<td bgcolor=\"#5C743D\" align=\"right\"><a href=\"javascript:window.opener.show_calendar('"
		+str_target+"', '"+dt2dtstr(dt_next_month)+"');\">"+
		"<img src=\"images/next.gif\" width=\"16\" height=\"16\" border=\"0\""+
		" alt=\"next month\"></a></td>\n</tr>\n"
	);

	var dt_current_day = new Date(dt_firstday);
	// print weekdays titles
	str_buffer += "<tr>\n";
	for (var n=0; n<7; n++)
		str_buffer += "	<td bgcolor=\"#99CC66\">"+
		"<font color=\"white\" face=\"tahoma, verdana\" size=\"2\">"+
		week_days[(n_weekstart+n)%7]+"</font></td>\n";
	// print calendar table
	str_buffer += "</tr>\n";
	while (dt_current_day.getMonth() == dt_datetime.getMonth() ||
		dt_current_day.getMonth() == dt_firstday.getMonth()) {
		// print row heder
		str_buffer += "<tr>\n";
		for (var n_current_wday=0; n_current_wday<7; n_current_wday++) {
				if (dt_current_day.getDate() == dt_datetime.getDate() &&
					dt_current_day.getMonth() == dt_datetime.getMonth())
					// print current date
					str_buffer += "	<td bgcolor=\"#FFB6C1\" align=\"right\">";
				else if (dt_current_day.getDay() == 0 || dt_current_day.getDay() == 6)
					// weekend days
					str_buffer += "	<td bgcolor=\"#D9ECC6\" align=\"right\">";
				else
					// print working days of current month
					str_buffer += "	<td bgcolor=\"white\" align=\"right\">";

				if (dt_current_day.getMonth() == dt_datetime.getMonth())
					// print days of current month
					str_buffer += "<a href=\"javascript:window.opener."+str_target+
					".value='"+dt2dtstr(dt_current_day)+"'; window.close();\">"+
					"<font color=\"black\" face=\"tahoma, verdana\" size=\"2\">";
				else 
					// print days of other months
					str_buffer += ""+
					"<font color=\"white\" face=\"tahoma, verdana\" size=\"-100\">";
				str_buffer += dt_current_day.getDate()+"</font></a></td>\n";
				dt_current_day.setDate(dt_current_day.getDate()+1);
		}
		// print row footer
		str_buffer += "</tr>\n";
	}
	// print calendar footer
	str_buffer +=
		"<form name=\"cal\">\n<tr><td colspan=\"7\" bgcolor=\"#87CEFA\">"+
		"<font color=\"White\" face=\"tahoma, verdana\" size=\"2\">"+
		"Enter Year:<input type=\"text\" name=\"time\" value=\"1980"+
		"\" size=\"8\" maxlength=\"8\"></font><input type=\"button\" value=\"Get\" onClick=\"javascript:window.opener.show_calendar('"+
		str_target+"', '1-1-'+document.cal.time.value);\"/>"+
		"</td></tr>\n</form>\n" +
		"</table>\n" +
		"</tr>\n</td>\n</table>\n" +
		"</body>\n" +
		"</html>\n";

	var vWinCal = window.open("", "Calendar", 
		"width=300,height=250,status=no,resizable=no,top=330,left=660");
	vWinCal.opener = self;
	var calc_doc = vWinCal.document;
	calc_doc.write (str_buffer);
	calc_doc.close();
}
// datetime parsing and formatting routimes. modify them if you wish other datetime format
function str2dt (str_datetime) {
	var re_date = /^(\d+)\-(\d+)\-(\d+)\s+(\d+)\:(\d+)\:(\d+)$/;
	if (!re_date.exec(str_datetime))
		return alert("Invalid Datetime format: "+ str_datetime);
	return (new Date (RegExp.$3, RegExp.$2-1, RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6));
}
function dt2dtstr (dt_datetime) {
	return (new String (
			dt_datetime.getDate()+"-"+(dt_datetime.getMonth()+1)+"-"+dt_datetime.getFullYear()+" "));
}
function dt2tmstr (dt_datetime) {
	return (new String (
			dt_datetime.getHours()+":"+dt_datetime.getMinutes()+":"+dt_datetime.getSeconds()));
}
