
import './App.css';
import { useState } from "react"

function App() {
  const [todoList,setToDoList] = useState([]);
  const [newTask,setNewTask] = useState("");

  const handleChange = (event) =>{
    setNewTask(event.target.value);
    
  }

  const addTask = () =>{

    const task ={
      id : todoList.length === 0 ? 1 : todoList[todoList.length-1].id +1,
      taskName: newTask,
      completed: false,
    }
    setToDoList([...todoList, task]);
    setNewTask(" ")
  }

  const deleteTask = (id) =>{
    const newToDoList = todoList.filter((task) =>{
      if(task.id === id)
        return false;
      else
        return true;
    })

    setToDoList(newToDoList);
  }

  const completeTask = (id) =>{
    setToDoList(
      todoList.map((task) =>{
        if(task.id === id){
          return { ...task,completed:true};
        }
        else{
          return task;
        }
      })
    );
  };

  return (
    <div className="App">
      
      <div className="addTask">
        <input onChange={handleChange} value={newTask}/> 
        <button onClick={addTask}>Add task</button>
      </div>
      <div className="list">
        {todoList.map((task) =>{  //used .map , it will iterate through each element in the todoList list or array
        return (
          <div className="card">
            <h1 style={{backgroundColor: task.completed? "green" : "transparent"}}>{task.taskName}</h1>
            <div>
            <button className="donebtn" onClick={() => completeTask(task.id)} > ✓ </button>
            <button className="crossbtn" onClick={() => deleteTask(task.id)} > ✕ </button>
            </div>
            
          </div>
        )
        })}
      </div>
    </div>
  );
}

export default App;

// style={{border:"1.5px solid  green", backgroundColor:"transparent", borderRadius:"5px", margin:"5px",width:"35px",height:"35px", color:"green"}}
