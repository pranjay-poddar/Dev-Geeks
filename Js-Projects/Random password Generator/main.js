let genbtn = document.getElementById('genbtn');
let copy = document.getElementById('copybtn');
let text = document.getElementById('value');
let num = document.getElementById('number');

genbtn.addEventListener('click',()=>{

    let chars = '0123456789@$!()&^%abcdefghijklmnopqrstuvwxyzAbCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(document.getElementById('show').style.display=='block'){
        document.getElementById('show').style.display=='none';
    }
    const passwordLength = chars.length;
    let Length = num.value;
    let flag=0;
    if(Length==''){
        window.alert('Please Enter the length');
        flag=1;
    }
    if(Length<=4 && flag==0){
        window.alert('Password length cannot be less than 4 characters');
    }
    let res='';
    for(let i=0;i<Length;i++){

        res += chars.charAt(Math.floor(Math.random() * passwordLength)); 
    }
        if(Length>4){
            text.value = res;
        }   
        num.value='';
});

copy.addEventListener('click',function(){

    // console.log('copied');
    let copyText = document.getElementById('value');
    copyText.select();
    copyText.setSelectionRange(0,9999); // for mobile devices
    navigator.clipboard.writeText(copyText.value);
    
     document.getElementById('show').style.display= 'block';
    
});