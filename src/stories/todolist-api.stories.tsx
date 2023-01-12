import React, {useEffect, useState} from 'react'
import {tasksForTodolistAPI, todolistAPI} from '../api/todolist-api'

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodoLists()
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('KIR9 THE BEST')
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist('827169b5-f3f9-40c8-aa49-3c36f63a2bdb')
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodoTitle('6d599a41-cb1e-4f28-83c2-58e221aa699e', 'HHHHYYY999KKK')
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const getTasksForTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksForTodolistAPI.getTasks('fcc8e152-14e0-4b54-ab67-692dbdb48493')
            .then(res => setState(res.items))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const createTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksForTodolistAPI.createTasks('fcc8e152-14e0-4b54-ab67-692dbdb48493', '---------=-==-=-=-=-=0=09-0')
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const updateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksForTodolistAPI.updateTask('fcc8e152-14e0-4b54-ab67-692dbdb48493', "b1fe19b4-4bcd-4e85-a771-ea7365ba7080", 'SeCOND HAHAHAHAH')
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const deleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksForTodolistAPI.deleteTask('fcc8e152-14e0-4b54-ab67-692dbdb48493', "de59ebaa-9962-484f-a799-526f797125e9",)
            .then(res => setState(res))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}