function encrypt(){
    plain = document.forms["enc"]["plain"].value
    key = document.forms["enc"]["key"].value
    cipher = '';
    for(var i=0,j=0;i<plain.length;i++){
    var subt1=97,subt2=97;
    var ch=plain.charCodeAt(i);
    var k=key.charCodeAt(j%key.length);
    if(ch>=65 && ch<=90) subt1=65;
    if(k>=65 && k<=90) subt2=65; 
    var c=(ch-subt1+k-subt2)%26+subt1;
    if (ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122) {cipher = cipher + String.fromCharCode(c);j++;}
    else cipher += plain[i];
    }
    console.log(cipher)
    document.getElementById('output-box').innerHTML = cipher
    document.getElementById('output-box').style.visibility = "visible"
}

function decrypt(){
    cipher = document.forms["dec"]["cipher"].value
    key = document.forms["dec"]["key"].value
    plain = '';
    for(var i=0,j=0;i<cipher.length;i++){
    var subt1=97,subt2=97;
    var ch=cipher.charCodeAt(i);
    var k=key.charCodeAt(j%key.length);
    if(ch>=65 && ch<=90) subt1=65;
    if(k>=65 && k<=90) subt2=65; 
    var c=(ch-subt1+26-(k-subt2))%26+subt1;
    if (ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122) {plain = plain + String.fromCharCode(c);j++}
    else plain += cipher[i];
    }
    console.log(plain)
    document.getElementById('output-box').innerHTML = plain
    document.getElementById('output-box').style.visibility = "visible"
}

function showEnc(){
    console.log("E")
    location.reload()
    document.getElementById("decrypt").style.visibility = "hidden"; 
    document.getElementById("encrypt").style.visibility = "visible";
    document.getElementById('output-box').style.visibility = "hidden"
    return false;
}

function showDec(){
    console.log("D")
    document.getElementById("encrypt").style.visibility = "hidden"; 
    document.getElementById("decrypt").style.visibility = "visible";
    document.getElementById('output-box').style.visibility = "hidden"
    return false;  
}