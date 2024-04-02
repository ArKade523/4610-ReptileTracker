import { authReducer } from './slices/authSlice'
import { Reducer, configureStore } from '@reduxjs/toolkit'
import { reptilesReducer } from './slices/reptilesSlice'

interface State {
    auth: {
        user: User | null
        token: string | null
    }
    reptiles: {
        reptiles: Reptile[]
    }
}

const initialState: State = {
    auth: {
        user: window.localStorage.getItem('user') as User | null,
        token: window.localStorage.getItem('jwt') as string | null
    },
    reptiles: {
        reptiles: []
    }
}

const reducer: Reducer<State> = (state = initialState, action) => {
    return {
        auth: authReducer(state.auth, action),
        reptiles: reptilesReducer(state.reptiles, action)
    }
}

export const store = configureStore({
    reducer,
    preloadedState: initialState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
