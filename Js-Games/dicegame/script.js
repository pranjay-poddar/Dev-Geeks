document.querySelector('button').addEventListener('click',()=>{
    function randomNumbers() {
        num = Math.random();
        num2=(num*6) +1;
        return Math.floor(num2);
    }
    
    winner = ( user1,user2,first,second) =>{
        if (user1>user2) {
            document.querySelector('h2').innerHTML=first+" has won this game 😍!";
            document.querySelector('p').innerHTML=">"
        }if (user1==user2) {
            document.querySelector('h2').innerHTML=" Its a drew 😮";
            
        } else {
            document.querySelector('h2').innerHTML=second+" has won this game 😍!";
            document.querySelector('p').innerHTML="<"    ;      
        }
    }
    
    first=prompt("enter ur name");
    second = prompt("enter ur name");
    
    user1 =randomNumbers()
    user2 =randomNumbers()
    document.getElementById('bx').innerHTML=user1;
    document.getElementById('bx2').innerHTML=user2
    
    winner(user1,user2,first,second);
})

document.querySelector('.btn2').addEventListener('click',()=>{
    document.getElementById('bx').innerHTML='';
    document.getElementById('bx2').innerHTML='';
    document.querySelector('h2').innerHTML='';
})