import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () =>{
        const response = await fetch('http://localhost:7000/todos');
        if(response.ok) {
            const todos = await response.json();
            return {todos}
        }
    }
);


const todoSlice = createSlice({
    name:"todos",
    initialState : [
        {id:1, title: "todo1", completed: false},
        {id:2, title: "todo1", completed: false},
        {id:3, title: "todo1", completed: true}
    ],
    reducers: {
        addTodo:(state, action) =>{
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            };
            state.push(newTodo);
        },
        markAscompleted:(state, action) =>{
            const index = state.findIndex((todo) => todo.id === action.payload.id);
                state[index].completed = action.payload.completed;
        },
        deleteTodo:(state, action) =>{
            const index = state.findIndex((todo) => todo.id === action.payload.id);
                state.splice(index, 1);
                // console.log("index", index)
        },
    },
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            return action.payload.todos;
        },
        [getTodosAsync.pending]: (state, action)=>{
                return action.payload.message;
              console.log("pending")
        }
    }
});

export const {addTodo, markAscompleted,deleteTodo} =  todoSlice.actions;
export default todoSlice.reducer;
