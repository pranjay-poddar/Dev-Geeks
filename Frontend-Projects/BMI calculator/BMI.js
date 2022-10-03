var calculate=document.querySelector('.calculate_btn');
var reset=document.querySelector('.reset_btn');

function BodyMassIndex(){
    var weight=document.querySelector('#text-weight').value;
    var height=document.querySelector('#text-height').value; 
    var converted_height=height/100;
    var new_height=converted_height*converted_height;
    var bmi_value=(weight/new_height);
    return bmi_value=bmi_value.toFixed(3);
}
calculate.addEventListener("click",()=>{
    var bmi=document.querySelector('.Result');
    var bmi_value=document.querySelector('.Value');
    var result=BodyMassIndex();
    bmi_value.style.display='block';
    bmi.style.display='block';
    bmi_value.innerText="BMI Value is:"+result;
     if(result<18.5){
         bmi.innerText="You are Underweight";
      }
      else if(result>=18.5 && result<=24.9){
        bmi.innerText="You are under Normal range";
      }
      else if(result>25.0 && result<=29.9){
        bmi.innerText="You are Overweight";
      }  
      else if(result>=30 && result<=34.9){
        bmi.innerText="You are under Obese(class I) range";
      }
      else if(result>=35 && result<=39.9){
        bmi.innerText="You are under Obese(Class II) range";
      }
      else if(result>=40){
        bmi.innerText="You are under Obese(CLass III) range";
      }
});
reset.addEventListener("click",()=>{
  var bmi=document.querySelector('.Result');
  var bmi_value=document.querySelector('.Value');
  document.querySelector('.weight').value='';
  document.querySelector('.height').value='';
  bmi_value.style.display='none';
  bmi.style.display='none';
});
