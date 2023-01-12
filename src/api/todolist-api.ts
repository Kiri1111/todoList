import axios from "axios";
import {DeleteTodolist} from "../stories/todolist-api.stories";
import {useEffect, useState} from "react";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '794181ab-6d62-4cfb-bc9f-d539dfac55f1',
    },
})

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


type TaskType = {
    id: string,
    title: string,
    description: null,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: null,
    deadline: null,
    addedDate: string
}
type ResponseTaskType = {
    items: TaskType[],
    totalCount: number,
    error: null
}

export const todolistAPI = {
    getTodoLists() {
        return instance.get<TodolistType[]>('todo-lists')
            .then((res) => res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType[] }>>('todo-lists', {title})
            .then((res) => res.data)
    },
    updateTodoTitle(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
            .then((res) => res.data)
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
            .then((res) => res.data)
    }
}

export const tasksForTodolistAPI = {
    getTasks(todoId: string) {
        return instance.get<ResponseTaskType>(`todo-lists/${todoId}/tasks`)
            .then((res) => res.data)
    },
    createTasks(todoId: string, title: string) {
        return instance.post(`todo-lists/${todoId}/tasks`, {title})
            .then((res) => res.data)
    },
    updateTask(todoId: string, taskId: string, title: string) {

        return instance.put(`todo-lists/${todoId}/tasks/${taskId}`, {title})
            .then((res) => res.data)
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete(`todo-lists/${todoId}/tasks/${taskId}`)
            .then((res) => res.data)
    }
}

