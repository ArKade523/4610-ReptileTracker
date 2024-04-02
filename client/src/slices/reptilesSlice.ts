import { createSlice } from '@reduxjs/toolkit'

export const reptilesSlice = createSlice({
    name: 'reptiles',
    initialState: {
        reptiles: [] as Reptile[]
    },
    reducers: {
        setReptilesSlice: (state, { payload }) => {
            state.reptiles = payload
        },
        updateReptilesSlice: (state, { payload }) => {
            const reptile = state.reptiles.find((reptile) => reptile.id === payload.id)
            if (reptile) {
                Object.assign(reptile, payload)
            }
        }
    }
})

export const { setReptilesSlice, updateReptilesSlice } = reptilesSlice.actions
export const reptilesReducer = reptilesSlice.reducer
