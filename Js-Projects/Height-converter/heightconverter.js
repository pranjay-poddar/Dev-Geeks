document.getElementById("clickme").addEventListener("click",()=>{    
	const a=document.querySelector(".feet").value;
	const b=document.querySelector(".inches").value;
	const output=document.querySelector(".output");
	 const d=a*30.48+b*2.54;
	 console.log(d);
	 output.textContent="Converted Height is "+ d+"cm";
	document.querySelector(".output").style.color= "white";
	});
  
	document.getElementById("reset").addEventListener("click",()=>{  
	let a=document.querySelector(".feet");
	let b=document.querySelector(".inches");
	let output=document.querySelector(".output");
	  a.value="";
	  b.value="";
	output.textContent= " ";
  });