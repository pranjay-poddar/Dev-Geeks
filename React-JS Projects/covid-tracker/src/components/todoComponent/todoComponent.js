import React from 'react'
import AddTodoForm from '../todoComponent/AddTodoForm';
import TodoList from '../todoComponent//TodoList';
import TotalCompleteItems from '../todoComponent/TotalCompleteItems';

function TodoComponent() {
    return (
        <div className='container bg-white p-4 mt-5'>
        <h1>My Todo List</h1>
        <AddTodoForm />
        <TodoList />
        <TotalCompleteItems />
    </div>
    )
}

export default TodoComponent;
