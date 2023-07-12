const array=['Sunrisers Hyderabad', 'Mumbai Indians', 'Gujarat Lions',
       'Rising Pune Supergiant', 'Royal Challengers Bangalore',
       'Kolkata Knight Riders', 'Delhi Daredevils', 'Kings XI Punjab',
       'Chennai Super Kings', 'Rajasthan Royals', 'Deccan Chargers',
       'Kochi Tuskers Kerala', 'Pune Warriors', 'Delhi Capitals'];
const array2=[47.61904761904761,57.42574257425742,7.142857142857142,33.33333333333333,41.17647058823529,
        40.963855421686745,34.72222222222222,41.75824175824176,57.30337078651685,43.28358208955223,34.72222222222222,
        28.57142857142857,30.0,50.0];
const team1=document.getElementById("team1");
const team2=document.getElementById("team2");
const submit=document.getElementById("submit");
const answer=document.getElementById("answer")
submit.addEventListener("click",function(){

    if(team1.value!="" && team2.value!=""){
        // console.log("entered")
        // console.log(team1.value)
      for(let i=0;i<14;i++){
        if(team1.value==array[i]){
        //    answer.innerText=`The above team has ${Math.floor(array2[i])}% probability of winning against any team`;
        var team1_1=Math.floor(array2[i]);

    }
}
    for(let i=0;i<14;i++){
        if(team2.value==array[i]){
        //    answer.innerText=`The above team has ${Math.floor(array2[i])}% probability of winning against any team`;
        var team2_1=Math.floor(array2[i]);
        
    }
      }
      let diff=Math.floor(team1_1-team2_1)%100;
      if(diff<0){
          answer.innerText=`The ${team1.value} team has nearly ${10-diff}% probability of lossing against ${team2.value}.`; 
      }if(diff==0){
        answer.innerText=`Its going to be tough match between both the teams .Hence anyone can with the match.By the way Cricket is unpredictable.`; 
    }if(diff>0){
        answer.innerText=`The ${team1.value} team has nearly ${10-diff}% probability of winning against ${team2.value}.`; 
    }
    }
    else{
        answer.innerText=`Please re-check the team's name`; 
    }
})
   








        