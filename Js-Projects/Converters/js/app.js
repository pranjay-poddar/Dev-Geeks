"use strict";

// weight converter
const inputPounds = document.getElementById("inputPounds");
const inputKilograms = document.getElementById("inputKilograms");
const inputGrams = document.getElementById("inputGrams");
const inputOunces = document.getElementById("inputOunces");
const inputStones = document.getElementById("inputStones");

function poundConverter(value) {
  inputKilograms.value = (value / 2.2046).toFixed(2); // kg=lb/2.2046
  inputGrams.value = (value / 0.0022046).toFixed(0); // g=lb/0.0022046
  inputOunces.value = (value * 16).toFixed(2); // oz=lb*16
  inputStones.value = (value * 0.071429).toFixed(3); // st=lb*0.071429
}

function kilogramConverter(value) {
  inputPounds.value = (value * 2.2046).toFixed(2); // lb=kg*2.2046
  inputGrams.value = (value * 1000).toFixed(0); // g=kg*1000
  inputOunces.value = (value * 35.274).toFixed(2); // oz=kg*35.274
  inputStones.value = (value * 0.1574).toFixed(3); // st=kg*0.1574
}

function ounceConverter(value) {
  inputPounds.value = (value * 0.0625).toFixed(4); // lb=oz*0.0625
  inputGrams.value = (value / 0.035274).toFixed(1); // g=oz/0.035274
  inputKilograms.value = (value / 35.274).toFixed(4); // kg=oz/35.274
  inputStones.value = (value * 0.0044643).toFixed(4); // st=oz*0.0044643
}

function gramConverter(value) {
  inputPounds.value = (value * 0.0022046).toFixed(4); // lb=g*0.0022046
  inputOunces.value = (value * 0.035274).toFixed(3); // oz=g*0.035274
  inputKilograms.value = (value / 1000).toFixed(4); // kg=g/1000
  inputStones.value = (value * 0.00015747).toFixed(5); // st=g*0.00015747
}

function stoneConverter(value) {
  inputPounds.value = (value * 14).toFixed(1); // lb=st*14
  inputOunces.value = (value * 224).toFixed(0); // oz=st*224
  inputKilograms.value = (value / 0.15747).toFixed(1); // kg=st/0.15747
  inputGrams.value = (value / 0.00015747).toFixed(0); // g=st/0.00015747
}

// temperature converter
const inputFahrenheit = document.getElementById("inputFahrenheit");
const inputCelsius = document.getElementById("inputCelsius");
const inputKelvin = document.getElementById("inputKelvin");

function fahrenheitConverter(value) {
  inputCelsius.value = ((value - 32) / 1.8).toFixed(2); // ℃=(℉-32)/1.8
  inputKelvin.value = ((value - 32) / 1.8 + 273.15).toFixed(2); // K=((℉-32)/1.8)+273.15
}

function celsiusConverter(value) {
  inputFahrenheit.value = (value * 1.8 + 32).toFixed(2); // ℉=(℃*1.8)+32
  inputKelvin.value = (Number(value) + 273.15).toFixed(2); // K=℃+273.15
}

function kelvinConverter(value) {
  inputFahrenheit.value = ((value - 273.15) * 1.8 + 32).toFixed(2); // ℉=((K-273.15)*1.8)+32
  inputCelsius.value = (value - 273.15).toFixed(2); // ℃=K-273.15
}

// length converter
const inputFeet = document.getElementById("inputFeet");
const inputMeters = document.getElementById("inputMeters");
const inputMillimeters = document.getElementById("inputMillimeters");
const inputInches = document.getElementById("inputInches");
const inputCm = document.getElementById("inputCm");
const inputYards = document.getElementById("inputYards");
const inputKilometers = document.getElementById("inputKilometers");
const inputMiles = document.getElementById("inputMiles");

function millimetersConverter(value) {
  inputMeters.value = (value * 0.001).toFixed(5); // m=mm/0.001
  inputInches.value = (value * 0.0393701).toFixed(5); // in=mm*0393701
  inputCm.value = (value * 0.1).toFixed(5); // cm=mm/0.1
  inputYards.value = (value * 0.00109361).toFixed(5); // yd=ft*0.33333
  inputKilometers.value = (value * 0.000001).toFixed(7); // km=ft/3280.8
  inputMiles.value = (value * 0.00000062137119223733).toFixed(8); // mi=m*00000062137119223733.00018939
  inputFeet.value = (value * 0.00328084).toFixed(7); // ft=m*3.2808
}

function feetConverter(value) {
  inputMillimeters.value = (value * 304.8).toFixed(5) //mm=ft/0.00328084
  inputMeters.value = (value / 3.2808).toFixed(2); // m=ft/3.2808
  inputInches.value = (value * 12).toFixed(2); // in=ft*12
  inputCm.value = (value / 0.032808).toFixed(0); // cm=ft/0.032808
  inputYards.value = (value * 0.00109361).toFixed(2); // yd=ft*0.00109361
  inputKilometers.value = (value / 3280.8).toFixed(5); // km=ft/3280.8
  inputMiles.value = (value * 0.00018939).toFixed(5); // mi=ft*0.00018939
}

function metersConverter(value) {
  inputMillimeters.value = (value / 1000).toFixed(5) //mm=meters/1000
  inputFeet.value = (value * 3.2808).toFixed(2); // ft=m*3.2808
  inputInches.value = (value * 39.37).toFixed(2); // in=m*39.370
  inputCm.value = (value / 0.01).toFixed(0); // cm=m/0.01
  inputYards.value = (value * 1.0936).toFixed(2); // yd=m*1.0936
  inputKilometers.value = (value / 1000).toFixed(5); // km=m/1000
  inputMiles.value = (value * 0.00062137).toFixed(5); // mi=m*0.00062137
}

function inchesConverter(value) {
  inputMillimeters.value = (value * 25.4).toFixed(2) //mm = in*25.4
  inputFeet.value = (value * 0.083333).toFixed(3); // ft=in*0.083333
  inputMeters.value = (value / 39.37).toFixed(3); // m=in/39.370
  inputCm.value = (value / 0.3937).toFixed(2); // cm=in/0.39370
  inputYards.value = (value * 0.027778).toFixed(3); // yd=in*0.027778
  inputKilometers.value = (value / 39370).toFixed(6); // km=in/39370
  inputMiles.value = (value * 0.000015783).toFixed(6); // mi=m*0.000015783
}

function cmConverter(value) {
  inputMillimeters.value = (value * 10).toFixed(2) //mm = in*10
  inputFeet.value = (value * 0.032808).toFixed(3); // ft=cm*0.032808
  inputMeters.value = (value / 100).toFixed(3); // m=cm/100
  inputInches.value = (value * 0.3937).toFixed(2); // in=cm*0.3937
  inputYards.value = (value * 0.010936).toFixed(3); // yd=cm*0.010936
  inputKilometers.value = (value / 100000).toFixed(6); // km=cm/100000
  inputMiles.value = (value * 0.0000062137).toFixed(6); // mi=cm*0.0000062137
}

function yardsConverter(value) {
  inputMillimeters.value = (value * 914.4).toFixed(2) //mm = yd*914.4
  inputFeet.value = (value * 3).toFixed(0); // ft=yd*3
  inputMeters.value = (value / 1.0936).toFixed(2); // m=yd/1.0936
  inputInches.value = (value * 36).toFixed(0); // in=yd*36
  inputCm.value = (value / 0.010936).toFixed(0); // cm=yd/0.010936
  inputKilometers.value = (value / 1093.6).toFixed(5); // km=yd/1093.6
  inputMiles.value = (value * 0.00056818).toFixed(5); // mi=yd*0.00056818
}

function kilometersConverter(value) {
  inputMillimeters.value = (value / 0.000001).toFixed(0) //mm = km*914.4
  inputFeet.value = (value * 3280.8).toFixed(0); // ft=km*3280.8
  inputMeters.value = (value * 1000).toFixed(0); // m=km*1000
  inputInches.value = (value * 39370).toFixed(0); // in=km*39370
  inputCm.value = (value * 100000).toFixed(0); // cm=km*100000
  inputYards.value = (value * 1093.6).toFixed(0); // yd=km*1093.6
  inputMiles.value = (value * 0.62137).toFixed(2); // mi=km*0.62137
}

function milesConverter(value) {
  inputFeet.value = (value * 5280).toFixed(0); // ft=mi*5280
  inputMeters.value = (value / 0.00062137).toFixed(0); // m=mi/0.00062137
  inputInches.value = (value * 63360).toFixed(0); // in=mi*63360
  inputCm.value = (value / 0.0000062137).toFixed(0); // cm=mi/0.0000062137
  inputYards.value = (value * 1760).toFixed(0); // yd=mi*1760
  inputKilometers.value = (value / 0.62137).toFixed(2); // km=mi/0.62137
  inputMillimeters.value = (value / 0.00000062137119223733).toFixed(2); // 
}

// speed converter
const inputMPH = document.getElementById("inputMPH");
const inputKPH = document.getElementById("inputKPH");
const inputKnots = document.getElementById("inputKnots");
const inputMach = document.getElementById("inputMach");

function MPHConverter(value) {
  inputKPH.value = (value * 1.609344).toFixed(2); // KPH=MPH*1.609344
  inputKnots.value = (value / 1.150779).toFixed(2); // knots=MPH/1.150779
  inputMach.value = (value / 761.207).toFixed(4); // Mach=MPH/761.207
}

function KPHConverter(value) {
  inputMPH.value = (value / 1.609344).toFixed(2); // MPH=KPH/1.609344
  inputKnots.value = (value / 1.852).toFixed(2); // knots=KPH/1.852
  inputMach.value = (value / 1225.044).toFixed(5); // Mach=KPH/1225.044
}

function knotsConverter(value) {
  inputMPH.value = (value * 1.150779).toFixed(2); // MPH=knots*1.150779
  inputKPH.value = (value * 1.852).toFixed(2); // KPH=knots*1.852
  inputMach.value = (value / 661.4708).toFixed(4); // Mach=knots/661.4708
}

function machConverter(value) {
  inputMPH.value = (value * 761.207).toFixed(0); // MPH=Mach*761.207
  inputKPH.value = (value * 1225.044).toFixed(0); // KPH=Mach*1225.044
  inputKnots.value = (value * 661.4708).toFixed(0); // knots=Mach*661.4708
}

// loader
$(window).on("load", () => {
  $("body").css(
    "overflow",
    "hidden",
    setTimeout(() => {
      $("body").css("overflow-y", "visible");
    }, 1800)
  );
  setTimeout(removeLoader, 1700);
});

function removeLoader() {
  $("#loadingDiv").fadeOut(500, () => {
    $("#loadingDiv").remove();
  });
}
