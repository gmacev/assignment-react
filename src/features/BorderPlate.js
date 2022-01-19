import {createSlice} from "@reduxjs/toolkit";

export const materialsReducer = createSlice({
    name: "materials",
    initialState: {
        value:
            {
                stone: 5000,
                wood: 5000,
                gold: 5000
            }
    },
    reducers: {
        updateMaterials: (state, action) => {
            state.value = action.payload
        }
    }
})

// export methods to update state
export const {updateMaterials} = materialsReducer.actions

export default materialsReducer.reducer