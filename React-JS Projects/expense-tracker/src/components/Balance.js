import React from 'react';
const Balance = ({transactions}) => {
    const amount=transactions.map((transaction)=>Number(transaction.amount));
    const balance=amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
    return(
        <React.Fragment>
            <h4>Your Balance</h4>
            <h1 id="balance">{balance}</h1>
        </React.Fragment>
    )
}

export default Balance;