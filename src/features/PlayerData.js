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
            items: [],
            freeSlots: 0,
            gold: 1000000000,
            buyDisabled: false,
            gameState: 0
        }
    },
    reducers: {
        updatePlayerCharacter: (state, action) => {
            state.value.character = action.payload
        },

        updatePlayerWeapons: (state, action) => {
            state.value.weapons = action.payload
        },

        updatePlayerPotions: (state, action) => {
            state.value.potions = action.payload
        },

        updatePlayerItems: (state, action) => {
            state.value.items = action.payload
        },

        updateFreeSlots: (state, action) => {
            state.value.freeSlots = action.payload
        },

        updatePlayerGold: (state, action) => {
            state.value.gold = action.payload
        },

        updateBuyDisabled: (state, action) => {
            state.value.buyDisabled = action.payload
        },

        updateGameState: (state, action) => {
            state.value.gameState = action.payload
        }
    }
})

// export methods to update state
export const {updatePlayerCharacter, updatePlayerWeapons, updatePlayerPotions, updatePlayerItems, updateBuyDisabled, updatePlayerGold, updateFreeSlots, updateGameState} = playerDataSlice.actions

export default playerDataSlice.reducer