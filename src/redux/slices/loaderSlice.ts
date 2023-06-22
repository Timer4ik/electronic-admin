import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoaderState {
    isLoading: boolean
}

const initialState: LoaderState = {
    isLoading: false,
}

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setLoader: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    },
})

export const { setLoader } = loaderSlice.actions

export default loaderSlice.reducer