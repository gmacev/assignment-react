import {createSlice} from "@reduxjs/toolkit";

export const playerDataSlice = createSlice({
    name: "playerData",
    initialState: {
        value:
        {
            character:
            {
                image: "",
                race: "",
                damage: 0,
                health: 0,
                energy: 0,
                stamina: 0,
                strength: 0,
                inventorySlots: 0,
                gold: 0
            },
        }
    },
    reducers: {
        updatePlayerCharacter: (state, action) => {
            state.value.character = action.payload
            console.log(state.value.character)
        }
    }
})

// export methods to update state
export const {updatePlayerCharacter} = playerDataSlice.actions

export default playerDataSlice.reducer