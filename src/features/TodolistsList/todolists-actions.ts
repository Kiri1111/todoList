import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {todolistsAPI} from "../../api/todolists-api";
import {handleServerNetworkError} from "../../utils/error-utils";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";

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