import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerNetworkError} from "../../utils/error-utils";

export const fetchTodolistsTC = createAsyncThunk('todoList/fetchTodo', async (_, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (e) {
        handleServerNetworkError(e as any, dispatch);
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})
export const removeTodolistTC = createAsyncThunk('todoList/removeTodo', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTodolist(todolistId)
        return {id: todolistId}
    } catch (e) {
        handleServerNetworkError(e as any, dispatch);
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})
export const addTodolistTC = createAsyncThunk('todoList/addTodo', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        return {todolist: res.data.data.item}
    } catch (e) {
        handleServerNetworkError(e as any, dispatch);
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})
export const changeTodolistTitleTC = createAsyncThunk('todoList/changeTitle', async (param: { id: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    try {
        const res = await todolistsAPI.updateTodolist(param.id, param.title)
        return {id: param.id, title: param.title}
    } catch (e) {
        handleServerNetworkError(e as any, dispatch);
        return rejectWithValue(null)
    }
})

export const asyncActions = {
    fetchTodolistsTC,
    removeTodolistTC,
    addTodolistTC,
    changeTodolistTitleTC

}

export const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            return state.filter(tl => tl.id != action.payload.id)
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer

export let {changeTodolistFilterAC, changeTodolistEntityStatusAC,} = slice.actions

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
