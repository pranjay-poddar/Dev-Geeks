import Expense from "./Expense";
const History = ({Transactions,onDelete}) => {
    return(
        <>
        <h3>History</h3>
        <ul id="list" className="list">
            {Transactions.map((expense)=><Expense key={expense.id}data={expense} onDelete={onDelete}/>)}
        </ul>
        </>
    )
}
export default History;