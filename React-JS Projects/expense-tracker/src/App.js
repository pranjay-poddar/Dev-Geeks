import React,{useState,useEffect} from "react";

import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";
import History from "./components/History";
import AddNewTransaction from "./components/AddNewTransaction";


import './App.css';

function App() {
  const [Expenses,setExpenses] = useState([]);

  useEffect(()=>{
    const getdata=async ()=>{
      const data= await fetchdata();
      setExpenses(data);
    }
    getdata();
  },[]);

  const fetchdata=async ()=>{
    const res=await fetch("http://localhost:5000/transactions");
    const data= await res.json();
    return data;
  }

  const addData= async (Expense) =>{
    const res=await fetch("http://localhost:5000/transactions",{
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body :JSON.stringify(Expense)
    })
    const newExpense=await res.json();
    setExpenses([...Expenses,newExpense]);
    
  }

  const deleteItem=async (id)=>{
    await fetch(`http://localhost:5000/transactions/${id}`,{
      method:'DELETE'
    });
    setExpenses(Expenses.filter((expense)=>expense.id!==id));
  }


  return (
    <div className="App">
      <Header/>
      <div className="container">
        <Balance transactions={Expenses}/>
        <IncomeExpense transactions={Expenses}/>
        <History Transactions={Expenses} onDelete={deleteItem}/>
        <AddNewTransaction onAdd={addData}/>
      </div>
    </div>
  );
}

export default App;
