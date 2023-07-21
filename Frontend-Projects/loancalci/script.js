function calculate(){
    // console.log("changed");
    loanamount=document.getElementById('loanamt').value;
    // console.log(loanamount);
    interestrate=document.getElementById('interestrate').value;
    months=document.getElementById('month').value;

    interest= (loanamount* (interestrate*0.01))/months;

    monthlypay= (loanamount/months+interest).toFixed(2);

    document.getElementById('payment').innerHTML=`Monthly Payment : ${monthlypay}`
}