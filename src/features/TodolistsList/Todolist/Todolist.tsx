import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton, Paper} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolists-api'
import {TodolistDomainType} from '../todolists-reducer'
import {useAction, useAppDispatch} from "../../../app/store";
import {tasksActions, todolistsActions} from "../index";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {

    const {changeTodolistFilterAC, changeTodolistTitleTC, removeTodolistTC} = useAction(todolistsActions)
    const {fetchTasksTC} = useAction(tasksActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        fetchTasksTC(props.todolist.id)
    }, [])

    const addTask = useCallback(async (title: string) => {
        let thunk = tasksActions.addTaskTC({title, todolistId: props.todolist.id})
        const resultAction = await dispatch(thunk)
        if (tasksActions.addTaskTC.rejected.match(resultAction)) {
            if (resultAction.payload?.fieldErrors?.length) {
                const errorMessage = resultAction.payload?.fieldErrors[0]
                throw new Error(errorMessage.error)
            } else {
                throw new Error('')
            }
        }
    }, [tasksActions.addTaskTC, props.todolist.id])

    const removeTodolist = () => {
        removeTodolistTC(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title})
    }, [props.todolist.id])

    const onAllClickHandler = useCallback(() => changeTodolistFilterAC({
        filter: 'all',
        id: props.todolist.id
    }), [props.todolist.id])
    const onActiveClickHandler = useCallback(() => changeTodolistFilterAC({
        filter: 'active',
        id: props.todolist.id
    }), [props.todolist.id])
    const onCompletedClickHandler = useCallback(() => changeTodolistFilterAC({
        filter: 'completed',
        id: props.todolist.id
    }), [props.todolist.id])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    return <Paper style={{padding: '10px', position: 'relative'}}>
        <IconButton style={{position: 'absolute', right: '5px', top: '5px'}} onClick={removeTodolist}
                    disabled={props.todolist.entityStatus === 'loading'}>
            <Delete/>
        </IconButton>
        <h3>
            <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}/>)
            }
            {!tasksForTodolist.length && <div style={{padding: '10px', color: 'gray'}}>Add first task</div>}
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </Paper>
})

