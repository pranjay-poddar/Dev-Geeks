const a=document.getElementsByClassName("div_2_1");
const b=document.getElementsByClassName("div_12");
const c=document.getElementsByClassName("boxes");

for( i=0;i<c.length;i++){
   console.log();
}

var p=0,q=0,r=0,s=0,s1=0,s2=0,s3=0,s4=0;

   a[0].addEventListener("click", function () {
       
       if (p % 2 == 0) {
           c[0].children[1].style.display = "block";

           let d=document.getElementById("arrow1");
        d.innerText = d.innerText.replace("▼","▲");
        console.log(d.innerText);
           p++;
       } else {
          c[0].children[1].style.display = "none";
             p++;
             let d=document.getElementById("arrow1");
        d.innerText = d.innerText.replace("▲","▼");
       }
});
a[1].addEventListener("click", function () {
       if (q % 2 == 0) {
           c[1].children[1].style.display = "block";
           q++;
           let d=document.getElementById("arrow2");
        d.innerText = d.innerText.replace("▼","▲");
       } else {
          c[1].children[1].style.display = "none";
           q++;
           let d=document.getElementById("arrow2");
        d.innerText = d.innerText.replace("▲","▼");
       }
});
a[2].addEventListener("click", function () {
       if (r % 2 == 0) {
           c[2].children[1].style.display = "block";
           r++;
           let d=document.getElementById("arrow3");
        d.innerText = d.innerText.replace("▼","▲");
       } else {
          c[2].children[1].style.display = "none";
           r++;
           let d=document.getElementById("arrow3");
        d.innerText = d.innerText.replace("▲","▼");
       }
});
a[3].addEventListener("click", function () {
       if (s % 2 == 0) {
           c[3].children[1].style.display = "block";
           s++;
           let d=document.getElementById("arrow4");
        d.innerText = d.innerText.replace("▼","▲");
       } else {
          c[3].children[1].style.display = "none";
           s++;
           let d=document.getElementById("arrow4");
        d.innerText = d.innerText.replace("▲","▼");
       }
});



a[4].addEventListener("click", function () {
       if (s1 % 2 == 0) {
           c[4].children[1].style.display = "block";
           s1++;
           let d=document.getElementById("arrow5");
        d.innerText = d.innerText.replace("▼","▲");
       } else {
          c[4].children[1].style.display = "none";
           s1++;
           let d=document.getElementById("arrow5");
        d.innerText = d.innerText.replace("▲","▼");
       }
});



a[5].addEventListener("click", function () {
       if (s2 % 2 == 0) {
           c[5].children[1].style.display = "block";
           s2++;
           let d=document.getElementById("arrow6");
        d.innerText = d.innerText.replace("▼","▲");
       } else {
          c[5].children[1].style.display = "none";
           s2++;
           let d=document.getElementById("arrow6");
        d.innerText = d.innerText.replace("▲","▼");
       }
});



a[6].addEventListener("click", function () {
       if (s3 % 2 == 0) {
           c[6].children[1].style.display = "block";
           s3++;
           let d=document.getElementById("arrow7");
        d.innerText = d.innerText.replace("▼","▲");
       } else {
          c[6].children[1].style.display = "none";
           s3++;
           let d=document.getElementById("arrow7");
        d.innerText = d.innerText.replace("▲","▼");
       }
});



a[7].addEventListener("click", function () {
       if (s4 % 2 == 0) {
           c[7].children[1].style.display = "block";
           s4++;
           let d=document.getElementById("arrow8");
        d.innerText = d.innerText.replace("▼","▲");
       } else {
          c[7].children[1].style.display = "none";
           s4++;
           let d=document.getElementById("arrow8");
        d.innerText = d.innerText.replace("▲","▼");
       }
});