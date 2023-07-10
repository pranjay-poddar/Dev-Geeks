import React, { useState } from 'react'



export default function AddToDo({addTodo}) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const submit=(e)=>{
        e.preventDefault();
        if(!title || !desc){
            alert("Name a task and define it");

        }
        else{
       addTodo(title,desc);
       setTitle("");
       setDesc("");
        }
    }
  return (
    <div className='container bg-gray-700 rounded-3xl my-6 w-[25%] h-52 p-6 relative' >
        
        <form onSubmit={submit} className="w-full max-w-sm">
  <div className="md:flex md:items-center mb-6">
    <div className="md:w-1/3">
      <label htmlFor="title" className="text-black  md:text-right mb-1 md:mb-0">
      </label>
    </div>
    <div className="md:w-2/3 mr-20">
      <input id="title" type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white  placeholder:text-gray-500 rounded-lg font-mono text-sm"   placeholder='Task Title'/>
    </div>
  </div>
  <div className="md:flex md:items-center mb-6 ">
    <div className="md:w-1/3">
      <label htmlFor="desc" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 " >
       
      </label>
    </div>
    <div className="md:w-2/3 mr-20">
      <input id="desc" type="text" value={desc} onChange={(e)=>{setDesc(e.target.value)}} className="bg-gray-200 appearance-none border-2 border-gray-200  w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white  placeholder:text-gray-500 rounded-lg font-mono text-sm" placeholder='Task Description' />
    </div>
  </div>
  
  <div className="md:flex md:items-center">
    <div className="md:w-1/3"></div>
    <div className="md:w-2/3 mr-20">
      <button className="shadow bg-pink-600 hover:bg-pink-800 text-sm  text-white font-mono p-2 rounded-xl" type="submit">
        Add Task
      </button>
    </div>
  </div>
</form>
    </div>
  )
}
