import React from 'react'
import ToDoItem from '../Components/ToDoItem'

export default function ToDos(props) {
  return (
    <div className='container  text-white font-mono'>
        
        {props.todos.length===0?"No Tasks Remaining, Good Job!":
        
        props.todos.map((todo)=>{
         return(
         <>
          <ToDoItem todo={todo} key={todo.sno} onDelete={props.onDelete}/>
        </>
        )
    })
}
    </div>
  )
}
 