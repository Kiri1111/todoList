import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, FieldErrorType, LoginParamsType} from '../../api/todolists-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const loginTC = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldErrors?: Array<FieldErrorType> }
}>('auth/login', async (data: LoginParamsType, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            return
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({errors: res.data.messages, fieldErrors: res.data.fieldErrors})
        }
        // } catch (e: any) {
        //     handleServerNetworkError(e, dispatch)
        //     return {isLoggedIn: false}
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (_, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, dispatch)
            // return thunkAPI.rejectWithValue({})
        }
        // } catch (error: any) {
        //     handleServerNetworkError(error, dispatch)

    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(stateDraft, action: PayloadAction<{ value: boolean }>) {
            stateDraft.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

export const {setIsLoggedInAC} = slice.actions
export const authReducer = slice.reducer




