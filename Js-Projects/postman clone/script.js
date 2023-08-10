let parameterbox = document.getElementById('paramBox');
parameterbox.style.display="none";

let numOfParams=1;
//if user selects custom paramater then hide the json box

//utility function to get DOM element from string
function createDomElement(string){

    const placeholder = document.createElement("div");
    placeholder.innerHTML = string;
    return placeholder.firstElementChild;
}

let paramsRadio = document.getElementById("parameters");
paramsRadio.addEventListener('click',()=>{

    let requestJsonbox = document.getElementById("requestJsonBox");
    requestJsonbox.style.display = "none";

    //json box was hidden and showing parameter box

    let parambox = document.getElementById("paramBox");
    let parambtn = document.getElementById("addParam");
    parambtn.style.display="block";
    parambox.style.display="block";
});
//if the user selects json then hide custom parameters

let jsonRadio = document.getElementById("json");
jsonRadio.addEventListener('click',()=>{

    let paramsrequestBox = document.getElementById("paramBox");
    paramsrequestBox.style.display="none";
    /*let addParamBox = document.getElementById("addParam");
    addParamBox.style.display = "none";*/

    //parameter box was hidden and showing json box
    document.getElementById("addParam").style.display = "none";
    let jsonbox = document.getElementById('requestJsonBox');
    jsonbox.style.display="block";
});

//clicking in + buton should add more elements to DOM

let paramAdd = document.getElementById("addParam");

paramAdd.addEventListener('click',()=>{

    numOfParams++;
    //console.log(numOfParams);
    //DOM TO DISPLAY ADDED PARAMETERS
    let params = document.getElementById("parameter");
    let str = `<div id="paramBox" class="form-row my-1">
                 <form class="row g-3">
                   <label for="url" class="col-sm-2 col-form-label">
                       <h5>Parameter ${numOfParams}</h5>
                    </label>
                   <div class="col-md-4">
                      <input type="text" class="form-control" id="keyParam${numOfParams}" placeholder="Enter parameter ${numOfParams} key">
                    </div>
                    <div class="col-md-4">
                      <input type="text" class="form-control" id="valueParam${numOfParams}" placeholder="Enter parameter ${numOfParams} value">
                    </div>
                 </form>
                 <button id="addParam" class="btn btn-primary deleteParam">-</button>
                </div>`

     // adding the DOM element

    let paramElement = createDomElement(str);
    //console.log(paramElement);
    params.appendChild(paramElement);

    //deleteing a parameter

    let deleteParam = document.getElementsByClassName('deleteParam');

    for (i of deleteParam) {
        
        i.addEventListener('click',(e)=>{

            
            e.target.parentElement.remove();

        });
    }

});

//submit button

let submit = document.getElementById("submit");
submit.addEventListener('click',()=>{

    document.getElementById("responsetext").value="Please wait ....Fetching Response !!!";

    let url = document.getElementById('inputurl').value;
    let requestType = document.querySelector("input[name='request']:checked").value;
    let contentType = document.querySelector("input[name='content']:checked").value;


    console.log("url is : ",url);
    console.log("requesttype is : ",requestType);
    console.log("contentType is : ",contentType);
    console.log(numOfParams);
    if(contentType == 'customparam'){

        data = {};
        for (i=1;i<=numOfParams;i++){

            //console.log(document.getElementById('keyParam '+i));
            if(document.getElementById('keyParam'+i) != undefined){

            let key = document.getElementById('keyParam'+i).value;
            console.log(key);
            let value = document.getElementById('valueParam'+i).value;
            console.log(value);
            data[key] = value;

            }
           
        }
        data=JSON.stringify(data);
        //console.log(data);
    }
    else{

        data = document.getElementById('requestJsonText').value;
    }
    //console.log("data is: ",data);

    if(requestType == 'GET'){

        fetch(url,{method: 'GET',
       })
       .then(response => response.text())
       .then((text)=>{

        document.getElementById('responsetext').value = text;
       });
    }
    else{

        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsetext').value = text;
            //Prism.highlightAll();
        });
    }
});


/*
{
    "title": "foo",
    "body": "bar44",
    "userId": 1
  }

*/