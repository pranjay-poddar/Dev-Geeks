import {useState,useEffect} from 'react';
import Header from './components/header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks,setTasks] = useState( [] );
  
  useEffect(()=>{
    const gettask=async ()=>{
      const taskdata= await fetchdata()
      setTasks(taskdata)
    }
    gettask()
  }, []);


  const fetchdata= async () =>{
    const res=await fetch("http://localhost:5000/Tasks");
    const Data=await res.json();

    return Data;
  }

  const fetchtask= async (id) =>{
    const res=await fetch(`http://localhost:5000/Tasks/${id}`);
    const Data=await res.json();

    return Data;
  }

  const deleteTask = (id)=>{
    const Deletereq=fetch(`http://localhost:5000/Tasks/${id}`,{
      method: "DELETE"
    })
    setTasks(tasks.filter( (task) =>task.id !== id))
  }

  const addTask = async (task)=>{
    const res=await fetch("http://localhost:5000/Tasks",{
      method: 'POST',
      headers :{
        'content-type': 'application/json'
      },
      body : JSON.stringify(task)
    });
    const newTask= await res.json();
    setTasks([...tasks,newTask]);

  }

  const toggleReminder= async (id)=>{
    const tasktotoggle = await fetchtask(id); 
    const Task = {...tasktotoggle , reminder: !tasktotoggle.reminder }

    const res=await fetch(`http://localhost:5000/Tasks/${id}`,{
      method: 'PUT',
      headers :{
        'content-type': 'application/json'
      },
      body : JSON.stringify(Task)
    });
    const data=await res.json();
    setTasks(tasks.map((task) =>
      task.id === id ?{...task,reminder:data.reminder}:task
      ))
  }

  const ontoggleAdd = ()=>{
    setShowAddTask(!showAddTask);
  }

  return (
    <div className="container">
      <Header ontoggle={ontoggleAdd} showAdd={showAddTask}/>
      {showAddTask?<AddTask onAdd={addTask}/>:''}
      {tasks.length>0?<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:<h3>NO TASKS TO SHOW</h3>}
    </div>
  );
}

export default App;
