let form=document.getElementById('addForm');
let  itemList=document.getElementById("items");
let filterItem=document.getElementById('filter');

form.addEventListener('submit',addEvent);
itemList.addEventListener('click',removeItem);
filterItem.addEventListener('keyup',filterData);

function alertbox(data,classes)
{
  let parent=document.getElementById("alert");
  let alert=document.createElement('div');
  alert.className=`alert alert-${classes}`;
  alert.textContent=data;
  parent.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);
}

function addEvent(e)
{
    e.preventDefault();
    let item=document.getElementById('item').value.toUpperCase();

    if(item==='')
    {
      alertbox("fill in the field first",'danger');
    }
    else
    {
      document.getElementById('item').value="";
      let li=document.createElement("li");
      li.className="list-group-item";
      li.appendChild(document.createTextNode(item));


      let button=document.createElement("button");
      button.className="btn btn-danger btn-sm float-right delete";
      button.appendChild(document.createTextNode("X"));
      
      li.appendChild(button);
      itemList.append(li);

      alertbox("Data Submitted Successfully","success");

    }
}

function removeItem(e){
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        itemList.removeChild(li);
        alertbox("Data Deleted Successfully","success");
      }
    }
  }

function filterData(e)
{
    let data = e.target.value.toLowerCase();
    let alllist=itemList.getElementsByTagName('li');
    Array.from(alllist).forEach(element => {
        var itemName = element.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(data)!=-1)
        {
            element.style.display='block';
        }
        else{
            element.style.display='none';
        }
        
    });

}