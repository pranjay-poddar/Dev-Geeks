const IncomeExpense = ({transactions}) => {
  const amount=transactions.map((transaction)=>Number(transaction.amount));
  const positive=amount.reduce((acc, item) => (item>0?acc += item:acc), 0).toFixed(2);
  const negative=amount.reduce((acc, item) => (item<0?acc += item:acc), 0).toFixed(2);
    return(
    <div className="inc-exp-container">
        <div>
            <h4>Income</h4>
          <p id="money-plus" className="money plus">{positive}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className="money minus">{Math.abs(negative)}</p>
        </div>
    </div>
    )

}

export default IncomeExpense;