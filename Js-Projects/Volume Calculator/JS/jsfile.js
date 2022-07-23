window.onload = function() {
	document.getElementById('calc-diameter').style.display = "none";
	document.getElementById('calc-side1').style.display = "none";
	document.getElementById('calc-side2').style.display = "none";
	document.getElementById('calc-side3').style.display = "none";
	document.getElementById('calculate-circle').style.display = "none";
	document.getElementById('calculate-triangle').style.display = "none";
}

function rectangle() {
	w = Number(document.calculator.width.value);
	l = Number(document.calculator.length.value);
	d = Number(document.calculator.depth.value);
	w = w * (1 / 3);
	l = l * (1 / 3);
	d = d * (1 / 36);
	z = w * l * d;
	z = Math.round(z * 100) / 100;
	document.calculator.total.value = z;
}

function circle() {
	dia = Number(document.calculator.diameter.value);
	d = Number(document.calculator.depth.value);
	p = Math.PI;
	d = d * (1 / 36);
	dia = dia * (1 / 3);
	dia = dia * dia;
	z = (p * dia * d) / 4;
	z = Math.round(z * 100) / 100;
	document.calculator.total.value = z;
}

function triangle() {
	s1 = Number(document.calculator.side1.value);
	s2 = Number(document.calculator.side2.value);
	s3 = Number(document.calculator.side3.value);
	d = Number(document.calculator.depth.value);
	s1 = s1 * (1 / 3);
	s2 = s2 * (1 / 3);
	s3 = s3 * (1 / 3);
	d = d * (1 / 36);
	parim = (s1 + s2 + s3) / 2;
	sq = parim * (parim - s1) * (parim - s2) * (parim - s3);
	sq = Math.sqrt(sq);
	z = sq * d;
	z = Math.round(z * 100) / 100;
	document.calculator.total.value = z;
}

function rectangleSelect() {
	document.getElementById('calc-diameter').style.display = "none";
	document.getElementById('calc-width').style.display = "block";
	document.getElementById('calc-length').style.display = "block";
	document.getElementById('calc-side1').style.display = "none";
	document.getElementById('calc-side2').style.display = "none";
	document.getElementById('calc-side3').style.display = "none";
	document.getElementById('calculate-rectangle').style.display = "block";
	document.getElementById('calculate-circle').style.display = "none";
	document.getElementById('calculate-triangle').style.display = "none";
	document.getElementById('calculate-triangle').style.display = "none";
	document.getElementById("rectangleButton").className += "calculatorSelected";
	document.getElementById("circleButton").className = "";
	document.getElementById("triangleButton").className = "";
}

function circleSelect() {
	document.getElementById('calc-diameter').style.display = "block";
	document.getElementById('calc-width').style.display = "none";
	document.getElementById('calc-length').style.display = "none";
	document.getElementById('calc-side1').style.display = "none";
	document.getElementById('calc-side2').style.display = "none";
	document.getElementById('calc-side3').style.display = "none";
	document.getElementById('calculate-rectangle').style.display = "none";
	document.getElementById('calculate-circle').style.display = "block";
	document.getElementById('calculate-triangle').style.display = "none";
	document.getElementById("rectangleButton").className = "";
	document.getElementById("circleButton").className += "calculatorSelected";
	document.getElementById("triangleButton").className = "";
}

function triangleSelect() {
	document.getElementById('calc-diameter').style.display = "none";
	document.getElementById('calc-width').style.display = "none";
	document.getElementById('calc-length').style.display = "none";
	document.getElementById('calc-side1').style.display = "block";
	document.getElementById('calc-side2').style.display = "block";
	document.getElementById('calc-side3').style.display = "block";
	document.getElementById('calculate-rectangle').style.display = "none";
	document.getElementById('calculate-circle').style.display = "none";
	document.getElementById('calculate-triangle').style.display = "block";
	document.getElementById("rectangleButton").className = "";
	document.getElementById("circleButton").className = "";
	document.getElementById("triangleButton").className += "calculatorSelected";
}

function getEventX(event) {
	var posx = 0;
	if (event.pageX || event.pageY) {
		posx =  event.pageX;
	}
	else if (event.clientX || event.clientY) 	{
		posx = event.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
	}
	return posx;
}
function getOffset(elem) {
  var box = (typeof elem.getBoundingClientRect !== 'undefined') ?
    elem.getBoundingClientRect() : {top: 0, left: 0};
  var w = window, d = elem.ownerDocument.documentElement;
  return {
    top: box.top + (w.pageYOffset || d.scrollTop) - (d.clientTop || 0),
    left: box.left + (w.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
  };
}
function getElementX(obj) {
  return Math.round(getOffset(obj).left);
}
function zeroPad(str,len) {
	var i;
	var pad = "";
	var s = str.toString();
	for(i=s.length; i < len; i++) {
		pad = "0".toString() + pad.toString();
	}
	return pad.toString() + s.toString();
}

function dateToTimestamp(date) {
	return date.getFullYear() +
		zeroPad(date.getMonth()+1,2) +
		zeroPad(date.getDay()+1,2) +
		zeroPad(date.getHours(),2) +
		zeroPad(date.getMinutes(),2) +
		zeroPad(date.getSeconds(),2);
}

function calcTimestamp(event,element,firstMS,lastMS) {
	  var eventX = getEventX(event);
	  var elementX = getElementX(element);
	  var elementWidth = element.width;
	  var msWidth = lastMS - firstMS;
	  var x = eventX - elementX;
	  var pct = x / elementWidth;
	  var pctDate = pct * msWidth;
	  var date = pctDate + firstMS;
	  return dateToTimestamp(new Date(date));
}
