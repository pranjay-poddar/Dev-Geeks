const Expense= ({data,onDelete})=>{
    return(
    <li key={data.id} className={data.amount<0 ? "minus": "plus"}>{data.text}<span>Rs. {Math.abs(data.amount)}</span><button className="delete-btn" onClick={()=> onDelete(data.id)}>x</button>
          </li>
    )
}

export default Expense;