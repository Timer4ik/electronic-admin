import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface LoginResponseData {
    message: string,
    token: string,
    user: {
        user_id: number,
        name: string,
        email: string
    }
}

export interface LoaderState {
    isAuth: boolean
}

const initialState: LoaderState = {
    isAuth: false,
}

export const login = createAsyncThunk<LoginResponseData, { email: string, password: string }>(
    'api/login',
    async ({ email, password }, { rejectWithValue }) => {
        const response = await fetch(`http://26.13.70.202:5000/api/auth/login`, {
            body: JSON.stringify({
                email, password
            }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
        const data: LoginResponseData = await response.json()
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(data)
        }

        return data
    }
)
export const checkIsLogin = createAsyncThunk<LoginResponseData, string>(
    'api/login',
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem("token")
        if (!token) {
            return rejectWithValue(null)
        }
        const response = await fetch(`http://26.13.70.202:5000/api/auth/me`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        const data: { data: Omit<LoginResponseData, "token"> } = await response.json()
        if (response.status < 200 || response.status >= 300) {
            return rejectWithValue(null)
        }

        return {
            ...data.data,
            message: data.data.message,
            token: token,
        }
    }
)

export const authSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {

    },
    extraReducers: {
        [checkIsLogin.rejected.type]: (state, action: PayloadAction<LoginResponseData>) => {
            localStorage.removeItem("token")
            state.isAuth = false
        },
        [checkIsLogin.fulfilled.type]: (state, action: PayloadAction<LoginResponseData>) => {
            localStorage.setItem("token", JSON.stringify(action.payload.token))
            state.isAuth = true
        },
        [login.fulfilled.type]: (state, action: PayloadAction<LoginResponseData>) => {
            localStorage.setItem("token", JSON.stringify(action.payload.token))
            state.isAuth = true
        },
        [login.rejected.type]: (state) => {
            localStorage.removeItem("token")
            state.isAuth = false
        },
        // [login.pending.type]: (state, action: PayloadAction<LoginResponseData>){
        //     state.isAuth = true
        // },
    }
})

// export const { } = authSlice.actions

export default authSlice.reducer
