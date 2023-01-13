import {TasksActionsType, tasksReducer} from './tasks-reducer';
import {TodolistActionsType, todolistsReducer} from './todolists-reducer';
import {combineReducers, createStore, legacy_createStore} from 'redux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionsType = TodolistActionsType | TasksActionsType
export type AppThunkDispatchType<ReturnType = void> = ThunkActions

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;


// export type RootActionType = ActionsType
// export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionType>