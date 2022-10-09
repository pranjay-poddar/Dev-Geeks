
let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("tab-btn")

const leadFromlocalStorage=JSON.parse(localStorage.getItem("myLeads"))
//console.log(leadFromlocalStorage)

if(leadFromlocalStorage){
    myLeads=leadFromlocalStorage
    render(myLeads)
}

// const tabs=[
//     {url:"https://www.linkedin.com/in/per-harald-borgen/"}
// ]
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true,currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads){
    let listItems=""
    
    for(let i=0;i<leads.length;i++){
    listItems+= `
                    <li>
                        <a href='${leads[i]}' target='_blank' >
                            ${leads[i]}
                        </a>
                    </li>
                `
    }
    ulEl.innerHTML=listItems
}


deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
   // console.log( localStorage.getItem("myLeads") )
    
    
})
