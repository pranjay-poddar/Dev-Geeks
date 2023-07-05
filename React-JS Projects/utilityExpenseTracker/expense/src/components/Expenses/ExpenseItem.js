import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";
import Card from "./Chart/NewExpense/UI/Card";
import React from "react";

//import data about the item credentials

const ExpenseItem = (props) => {
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">${props.amount}</div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
