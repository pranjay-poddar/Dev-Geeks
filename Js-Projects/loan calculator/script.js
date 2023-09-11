function computeLoan(){
   var amount=document.getElementById("amount").value;
   var rate=document.getElementById("rate").value;
   var months=document.getElementById("months").value;
   var result=(amount*(rate*0.01))/months;
   var payment=((amount/months) + result).toFixed(4);
   document.getElementById("payment").innerHTML="Monthly payment = $" +payment;





}