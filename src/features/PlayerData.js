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
            weapons: [],
            potions: [],
            items: []
        }
    },
    reducers: {
        updatePlayerCharacter: (state, action) => {
            state.value.character = action.payload
        },

        updatePlayerWeapon: (state, action) => {
            state.value.weapons = action.payload
        }
    }
})

// export methods to update state
export const {updatePlayerCharacter, updatePlayerWeapon} = playerDataSlice.actions

export default playerDataSlice.reducer