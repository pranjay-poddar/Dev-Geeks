// import {Sortable} from 'sortablejs'

function getLastTodoIndex() {
    const items = document.querySelectorAll('label')

    if (items.length === 0) return 1
    
    const itemsCount = [...items].map(item => {
                                    const count = item.attributes[0].nodeValue  
                                    return parseInt(count.replace('item', ''));

                                })
    itemsCount.sort(function(a, b) {
                  return a - b;
               });
    
    return itemsCount.pop()+1
}

function insertTodo(todo) {
    const todoList = document.querySelector('.main__todo-list')
    const todoActionItems = todoList.querySelector('[class$=action]')

    todoList.insertBefore(todo, todoActionItems)
};

// localStorage.setItem('todo.todo-items', JSON.stringify(getDefaultTodos()));

function getTodosFromLocalStorage() {
    const storedTodoes = localStorage.getItem('todo.todo-items');

    if (storedTodoes === null) {
        return getDefaultTodos()
    } else if (storedTodoes === "[]") {
        return []
    } else {
        return JSON.parse(storedTodoes)
    }
};

function setTodosToLocalStorage(todoItems) {
    localStorage.setItem('todo.todo-items', JSON.stringify(todoItems));
}

function addTodoToLocalStorage(todo) {
    const todoItems = getTodosFromLocalStorage();
    todoItems.push(todo)

    setTodosToLocalStorage(todoItems);
};

function updateTodoStateOnLocalStorage(todoTitle, isCompleted) {
    const todoItems = getTodosFromLocalStorage();
    todoItems.forEach((todo) => {todo.title === todoTitle ? todo.isFinished = isCompleted : null})

    setTodosToLocalStorage(todoItems);
}

function removeTodoFromLocalStorage(todoTitle) {
    const todoItems = getTodosFromLocalStorage();
    todoItems.forEach((todo, index) => {todo.title === todoTitle ? todoItems.splice(index, 1) : todoItems})
    
    setTodosToLocalStorage(todoItems);
}

function getDefaultTodos() {
    
    return [
        {
            title: 'Complete online JavaScript course',
            isFinished: true
        },
        {
            title: 'Jog around the park 2x',
            isFinished: false
        },
        {
            title: '10 minutes meditation',
            isFinished: false
        },
        {
            title: 'Read for 1 hour',
            isFinished: false
        },
        {
            title: 'Pick up groceries',
            isFinished: false
        },
        {
            title: 'Complete Todo App on Frontend Mentor',
            isFinished: false
        },
    ]
}

function createTodo(todoItem, isCompleted) {

    const todoListItem = document.createElement('li')
    todoListItem.classList.add('todo-list__item')

    const todoItemIndex = getLastTodoIndex();

    todoListItem.innerHTML = `
                <input id="item${todoItemIndex}" type="checkbox" class="item__checker">
                <label for="item${todoItemIndex}">${todoItem}</label>
                <button class="item__remove"></button>
                `
    // todoListItem.draggable = 'true'
    
    isCompleted === true ? todoListItem.querySelector('input').checked = "True" : null
    
    insertTodo(todoListItem)
    removeTodoInitializer(todoListItem)
    updateTodoState(todoListItem)
}

function removeTodoInitializer(todo) {
    todo.querySelector('.item__remove').addEventListener('click', (e)=> {
        const todoItem = e.target.parentNode;
        e.target.classList.add('item__remove--active');

        todoRemover(todoItem);
    })
}

function todoRemover(todoItem) {
    setTimeout(() => {
        todoItem.classList.add('todo-list__item--hidden');
        const todoTitle = todoItem.children[1].textContent

        removeTodoFromLocalStorage(todoTitle);

        setTimeout(() => { 
            todoItem.remove();
            updateCountDisplayer();
        }, "700");

    }, "550");
}

function clearCompletedTodo() {
    const clearCompletedBtn = document.querySelector('.clear-completed-todo__btn');

    clearCompletedBtn.addEventListener('click', (e)=> {
        document.querySelectorAll('.todo-list__item--completed').forEach(todo => todoRemover(todo));
    });
}

function getTodoCheckers() {
    return document.querySelectorAll('[type=checkbox');
};

function todoStateModifier(todo, parentElement) {
    todo.checked ? parentElement.classList.add('todo-list__item--completed') : parentElement.classList.remove('todo-list__item--completed')
};

function updateTodoState(todo) {
    todo.querySelector('input').addEventListener('click', (e)=> {
        todoStateModifier(e.target, e.target.parentElement);

        updateTodoStateOnLocalStorage(e.target.nextElementSibling.textContent, e.target.checked)
        setTimeout(() => {
            filters(getCurrentFilter())
        }, "750");
    });
}

function todoStateInitializer() {
    getTodosFromLocalStorage().forEach(todo => createTodo(todo.title, todo.isFinished))    

    getTodoCheckers().forEach(checker => {
        todoStateModifier(checker, checker.parentElement)
    })
    filterInitializer();
};

// (function dragAndDropInitializer() {
//     const todoList = document.querySelector('.main__todo-list')

//     new Sortable(todoList, {
//         animation: 100,
//         draggable: ".todo-list__item",
//         ghostClass: 'todo-list__item--is-dragging',
//         onEnd: null
//     });
// })();

function filterInitializer() {
    const filterBtns = document.querySelectorAll('.filter__btn')
    
    filterBtns.forEach(el => el.addEventListener('click', (e)=> {
        const filter = e.target.outerText;
        filterBtns.forEach(btn => btn.classList.remove('filter__btn--active'));

        e.target.classList.add('filter__btn--active')
        filters(filter);
    }));

    updateCountDisplayer();
    clearCompletedTodo();
};

function getCurrentFilter() {
    return document.querySelector('.filter__btn--active').outerText;
}

function filters(filter) {
    const activeTodos = document.querySelectorAll('.todo-list__item:not(.todo-list__item--completed)'),
         completedTodos = document.querySelectorAll('.todo-list__item--completed'),
         allTodos = document.querySelectorAll('.todo-list__item');

    allTodos.forEach(todo => {
        todo.classList.add('todo-list__item--hidden')
    })  

    if (filter === "All") {
        hideTodos(allTodos)
    } else if (filter === "Active") {
        hideTodos(activeTodos)
    } else {
        hideTodos(completedTodos)
    }

    updateCountDisplayer();
}

function updateCountDisplayer() {
    document.querySelector('.count__displayer').textContent = document.querySelectorAll('.todo-list__item:not(.todo-list__item--completed)').length;
}

function hideTodos(elements) {
    elements.forEach(todo => {
        todo.classList.remove('todo-list__item--hidden')
    })
}

export {createTodo, insertTodo, addTodoToLocalStorage, todoStateInitializer};