let userArr = [
    { id: 1, name: "john", age: "18", profession: "developer" },
    { id: 2, name: "jack", age: "20", profession: "developer" },
    { id: 3, name: "karen", age: "19", profession: "admin" },
];
let userId = 4;

// we will add this html code using function 
{/* <div class="cards">
<span>1.</span>
<span>Name: John</span>
<span>Profession: Developer</span>
<span>Age:18</span>
</div> */}

function cards(elm) {
    return `<div class="cards">
<span>${elm.id}</span>
<span>Name: ${elm.name}</span>
<span>Profession: ${elm.profession}</span>
<span>Age:${elm.age}</span>
</div>`;
}

let filterDiv = document.getElementsByClassName('filter-ui');
window.addEventListener('load', () => {
    for (let elm of userArr) {
        filterDiv[0].innerHTML += cards(elm);

    }
    // console.log(filterDiv);
})


// filter method----------------->
function filter() {

    let professionIndex = document.getElementById('profession').selectedIndex;
    let byname=document.getElementById('byname');
  
    if (professionIndex == 0) {
        alert('Please Select the Profession')
    }
    else {
        let option = document.getElementsByTagName('option');
        let optionValue = option[professionIndex].value;
        let bynameValue=byname.value;
        console.log(optionValue);
        console.log(bynameValue.length);
        filterDiv[0].innerHTML = "";
        
        // if name filter is empty so use option for filtering-----
        if(bynameValue===undefined || bynameValue==0){
            for (let elm of userArr) {
                if (elm.profession === optionValue) {
                    filterDiv[0].innerHTML += cards(elm);
                }
            }
        }
        // if name and options are both present ------------>
        else{
            for(let elm of userArr){
                if(elm.profession===optionValue && elm.name===bynameValue){
                    filterDiv[0].innerHTML+=cards(elm);
                }
            }
        }

       
    }
    // console.log(profession);

}

// add user method-------------------->

function addUser() {
    let input = document.querySelectorAll('.inputs input');
    let option=parseInt(document.getElementById('profession-input').selectedIndex);
    // console.log(input);
    // console.log(option);
    let optionValue=document.getElementsByTagName('option')[option].value;
    // console.log(optionValue);
    // we will also check that  we dont have to push object of empty  input values in array --
    // like newUser={id:4 , name="",age:"",profession=""}; 

    if (input[0].value.length && option!==0 && input[1].value.length) {

        let newUser = { id: userId++, name: "", age: "", profession: "" };
        newUser.name = input[0].value;
        newUser.profession = optionValue;
        newUser.age = input[1].value;

        console.log(newUser);
        userArr.push(newUser);
        filterDiv[0].innerHTML = "";
        for (let elm of userArr) {
            filterDiv[0].innerHTML += cards(elm);
        }

    }

    input[0].value = "";
    input[1].value = "";
    input[2].value = "";
}