import React from 'react'
import{ useState } from 'react'


export default function ToDoItem({todo, onDelete}) {
  return (
    <div className=' bg-gray-700 text-center  w-[20%] py-4 h-32 rounded-3xl mb-3 absolute'>
      <h4 className="text-xl font-semibold mb-1 fony-mono text-white">{todo.title}</h4>
      <p className='text-sm mb-1 font-mono text-white opacity-70'>{todo.desc}</p>
      <button className="bg-red-600 hover:bg-red-800 text-white text-sm font-mono p-1 rounded-lg" key={todo.sno} onClick={ ()=>(onDelete(todo))}>Done</button>
    </div>
  )
}
