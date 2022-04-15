import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            if (!response.ok) {
                throw new Error('Server error')
            }
            return response.json()
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function (id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Cant delete task')
            }

            dispatch(removeTodo({id}))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function (text, {rejectWithValue, dispatch}) {
        const todo = {
            title: text,
            userId: 1,
            completed: false
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })

            if (!response.ok) {
                throw new Error('Cant add task')
            }
            const data = await response.json()
            dispatch(addTodo({data}))
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function (id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todos.todos.find(todo => todo.id === id)

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            })

            dispatch(toggleTodoCompleted({id}))
            if (!response.ok) {
                throw new Error('Cant toggle task')
            }
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)


const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload.data)
        },
        removeTodo(state, action) {
            state.todos =
                state.todos
                    .filter((todo) => todo.id !== action.payload.id)
        },
        toggleTodoCompleted(state, action) {
            const toggledTodo =
                state.todos
                    .find(todo => todo.id === action.payload.id)
            toggledTodo.completed = !toggledTodo.completed
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
    }
})

const {
    addTodo,
    removeTodo,
    toggleTodoCompleted
} = todoSlice.actions

export default todoSlice.reducer
