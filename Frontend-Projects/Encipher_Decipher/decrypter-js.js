let button1 = document.getElementById("btn1");
button1.addEventListener("click", (event)=>{
    event.preventDefault();
    let input_data = document.getElementById("cipher-text1").value;
    function ceaser_deciphering(input_data){
        let text = '';
        let key1 = document.getElementById("key1").value;
        let letter, code, lc;
        for(let l=0; l<input_data.length; l++){
            if(input_data[l] === " "){
                text+=" ";
                continue;
            }
            code = input_data[l].charCodeAt(0);
            lc = code - parseInt(key1 ,10);
            if(lc<91){
                if(lc<65){
                    letter = String.fromCharCode(91-(65-lc));
                }
                else{
                    letter = String.fromCharCode(lc);
                }
            }
            else{
                if(lc<97){
                    letter = String.fromCharCode(123-(97-lc));
                }
                else{
                    letter = String.fromCharCode(lc);
                }
            }
            text+=letter;

        }
        return(text);
    }

    document.getElementById("result1").innerHTML = ceaser_deciphering(input_data);

});

let button2 = document.getElementById("btn2");
button2.addEventListener("click", (event)=>{
    event.preventDefault();
    const input_data1 = document.getElementById("cipher-text2").value;
    function rail_fence(input_data1){
        let text = "";
        let matrix = [];
        let key2 = parseInt(document.getElementById("key2").value, 10);
        if (input_data1.length <= key2){
            alert('Key value should be less than the length of cipher text !');
        }
        else{
        for(let i=0; i<key2; i++){
            let sub = [];
            for(let j=0; j<input_data1.length; j++){
                sub.push('nothing')
            }
            matrix.push(sub);
        }
        
        let row = 0;
        let flag = 0;
        
        for(let k=0; k<input_data1.length; k++){
            matrix[row][k] = "*";
            if(row===0){
                flag = 0;
            }
            else if(row===(key2 - 1)){
                flag = 1;
            }
            if(flag===1){
                row-=1;
            }
            else{
                row+=1;
            }
        }
        let index = 0;
        for(let o=0; o<key2; o++){
            for(let u=0; u<input_data1.length; u++){
                if(matrix[o][u]==="*"){
                    matrix[o][u] = input_data1[index];
                    index+=1;
                }
            }
        }
        row = 0;
        flag = 0;
        for(let k=0; k<input_data1.length; k++){
            text+=matrix[row][k];
            if(row===0){
                flag = 0;
            }
            else if(row===(key2 - 1)){
                flag = 1;
            }
            if(flag===1){
                row-=1;
            }
            else{
                row+=1;
            }
        }
        console.log(matrix);

        return(text);
        }
    }
    document.getElementById("result2").innerHTML = rail_fence(input_data1);
});

let button3 = document.getElementById("btn3");
button3.addEventListener("click", (event)=>{
    event.preventDefault();
    const input_data2 = document.getElementById("cipher-text3").value.toUpperCase();
    let key3 = document.getElementById("key3").value.toUpperCase();
    if (input_data2.length != key3.length){
        alert("Length of the key must be equal to the cipher text's length");
    }
    else{
    let cipher = "";
    let dict_num = {
        0:"A", 1:"B", 2:"C", 3:"D", 4:"E", 5:"F", 6:"G", 7:"H", 8:"I",
        9:"J", 10:"K", 11:"L", 12:"M", 13:"N", 14:"O", 15:"P", 16:"Q", 17:"R", 18:"S", 19:"T",
        20:"U", 21:"V", 22:"W", 23:"X", 24:"Y", 25:"Z"
    };
    let dict_alpha = {
        A:"0", B:"1", C:"2", D:"3", E:"4", F:"5", G:"6", H:"7", I:"8",
        J:"9", K:"10", L:"11", M:"12", N:"13", O:"14", P:"15", Q:"16", R:"17", S:"18", T:"19",
        U:"20", V:"21", W:"22", X:"23", Y:"24", Z:"25"
    };
    for(let s=0; s<input_data2.length; s++){
        let res = parseInt(dict_alpha[input_data2[s]], 10) - parseInt(dict_alpha[key3[s]], 10);
        let xored = dict_num[Math.abs(res)];
        cipher+=xored;
    }
    document.getElementById("result3").innerHTML = cipher;
    }
});




