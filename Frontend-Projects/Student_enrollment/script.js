let submit=document.querySelector(".submit");

submit.addEventListener('click',()=>{

    var output=document.querySelector(".output");
    console.log(output);
    let imageurl=document.querySelector("#img").value;
    var generatedurl=`https://drive.google.com/uc?export=view&id=${imageurl}`;
    //console.log(generatedurl);
   


   //storing the data in objects getting from form
    const data={
        name: document.getElementById("name").value,
        img: generatedurl,
        email: document.getElementById("email").value,
        websitelink: document.getElementById("websitelink").value,
        skills: document.getElementById("skills").value
    };
    console.log(data);

    //Card Template
    let newlist=document.createElement('div');
    newlist.classList.add('addData');
    newlist.innerHTML=`
      <img src="${generatedurl}" alt="image">
      <div class="NameContainer">${data.name}</div>
      <a href="mailto:anushaviswanathan55610@ieee.org">${data.email}</a><br>
      <a href="www.anushaviswanathan.com">${data.websitelink}</a>
      <div class="SkillContainer">${data.skills}</div>
    `
    console.log(newlist);
    //adding the card one after the other
    output.appendChild(newlist);
   
    //clearing the input fields after submission
    let input=document.querySelectorAll('input');
    input.forEach(input => {
        input.value = '';
      });

})

