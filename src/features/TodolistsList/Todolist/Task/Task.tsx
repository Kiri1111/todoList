import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'
import {useAction} from "../../../../app/store";
import {tasksActions} from "../../index";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const {removeTaskTC, updateTaskTC} = useAction(tasksActions)

    const onClickHandler = useCallback(() => removeTaskTC({
        taskId: props.task.id,
        todolistId: props.todolistId
    }), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        updateTaskTC({
            taskId: props.task.id,
            domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todolistId
        })
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        updateTaskTC({taskId: props.task.id, domainModel: {title: newValue}, todolistId: props.todolistId})
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
