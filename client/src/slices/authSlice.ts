import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null as User | null,
        token: window.localStorage.getItem('jwt') as string | null
        // id: null as number | null
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.token = payload
        },
        setToken: (state, { payload }) => {
            if (payload) {
                window.localStorage.setItem('jwt', payload)
            } else {
                window.localStorage.removeItem('jwt')
            }
            state.token = payload
        }
    }
})

export const { setUser, setToken } = authSlice.actions
export const authReducer = authSlice.reducer
