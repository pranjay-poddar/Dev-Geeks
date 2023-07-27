import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import ToDos from './Components/ToDos'
import AddToDo from './Components/AddToDo'
import PomodoroTimer from './Components/Pomodoro'
import Spotify from './Components/Spotify'




function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo =[];
  }
  else{
    initTodo= JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo)=>{
    console.log("im on delete", todo);

    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

const addTodo= (title, desc)=>{
  console.log("task added", title, desc)
let sno;
if(todos.length==0){
  sno=0;
}
else{
  sno=todos[todos.length-1].sno + 1;
}

 
  const myTodo={
    sno:sno,
    title:title,
    desc:desc

  }
  setTodos([...todos,myTodo]);
  console.log(myTodo)
  
   
}

  const [todos, setTodos] = useState(initTodo);
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  
    
  }, [todos])
  return (
    <>

      
      <Navbar title="PomTasker." searchBar={false}/>
      <div className='grid grid-cols-3 gap-4'>
      <AddToDo addTodo={addTodo}/>
      <PomodoroTimer/>
      
      <ToDos todos={todos} onDelete={onDelete}/>
      </div>
      <Spotify/>
      
      <Footer/>
      
  
      
    </>
  )
}

export default App
