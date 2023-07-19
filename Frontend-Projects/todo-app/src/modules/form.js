import {createTodo, addTodoToLocalStorage} from "./todolist";

function formInitializer() {
    const form = document.querySelector('form')

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        
        const todo = e.target[0].value

        if (todo === "") return

        e.target[0].value = ""

        createTodo(todo, false)
        addTodoToLocalStorage({title: todo, isFinished: false})
    })
}

export {formInitializer};