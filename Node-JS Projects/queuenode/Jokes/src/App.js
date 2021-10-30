import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
//import mystore from './index.js'
import {Increment,Decrement} from './actions/actions';

const App = () => {
  const counter = useSelector((state) => state.counter);
  const isLogged = useSelector((state) => state.isLog);
  const dispatch=useDispatch();
  let vari=1;
  function onChange(e){
//vari= e.target.value;
console.log(vari);

  };
  
const variable=vari;

  console.log(counter);
  return (
    <div>
      <h1>Hello</h1>
      <div>
        <button onClick={()=>dispatch(Decrement(variable))}>-</button>
        <h2>Counter:{counter}</h2>
        <button onClick={()=>dispatch(Increment(variable))}>+</button>
      </div>
      <div>
      <input type="number" placeholder="Enter the number to increment with" style={{height:'20px'}} onChange={(e)=>{onChange(e)}}></input>
      </div>
      {isLogged ? <h2>Value</h2> : ""}
    </div>
  )
}

export default App;