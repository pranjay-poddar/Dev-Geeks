document.getElementById("submit").addEventListener("click",function(){
    const a=document.getElementById("Mat")
    const  b=document.getElementById("Inns")
    const c =document.getElementById("NO")
    const d =document.getElementById("HS")
    const e =document.getElementById("Avg")
    const f =document.getElementById("Balls_Faced")
    const g=document.getElementById("SR")
    const h=document.getElementById("H100")
    const i=document.getElementById("F50")
    const j=document.getElementById("F4s")
    const k=document.getElementById("S6s")
    var l=(a.value* (-1.85328618) )+ (b.value* (3.96675054))+(c.value* 2.81386104)+(d.value* (-0.61162735) ) +(e.value*(2.19487664) )+ (f.value* (  0.84962196))+(g.value*4.65911941)+(h.value*25.4377588 )+(i.value*10.39142587 )+ (j.value* ( 1.09232225))+(k.value*2.58998957)+(-643.5976572053671);
    console.log(l);
    const final=document.getElementById("final")
final.value=` ${l} `
})
// array([-1.85328618,  3.96675054,  2.81386104, -0.61162735,  2.19487664,
//     0.84962196,  4.65911941, 25.4377588 , 10.39142587,  1.09232225,
//     2.58998957]


//     Mat	Inns	NO	HS	Avg	Balls_Faced	SR	100	50	4s	6s









