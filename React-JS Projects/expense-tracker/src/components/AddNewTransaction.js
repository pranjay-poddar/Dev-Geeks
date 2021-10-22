import { useState } from "react";

const AddNewTransaction =({onAdd}) =>{
    const [text,setText] =useState('');
    const [amount,setAmount ]=useState(0);

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

    const onSubmit= (e) =>{
        e.preventDefault();

        if(!text || amount===0)
        {
            alertbox("Please add in TEXT and AMOUNT","warning");
            return;
        }
        onAdd({text,amount});
        alertbox("Entry added successfully","success");
        setText('');
        setAmount(0);
    }
    
    return(
        <>
        <h3>Add new transaction</h3>
        <form id="form" onSubmit={onSubmit}>
            <div id="alert"></div>
            <div className="form-control" style={{marginBottom:10}}>
                <label htmlFor="text">Text</label>
                <input type="text" id="text" placeholder="Enter text..." value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="form-control">
                <label htmlFor="amount">Amount <br />(negative - expense, positive - income)</label>
                <input type="number" id="amount" placeholder="Enter amount..." value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <button className="btn">Add transaction</button>
        </form>
        </>
    )
}

export default AddNewTransaction;