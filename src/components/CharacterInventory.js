import React from 'react';
import {useSelector} from "react-redux";

const CharacterInventory = () => {
    const {weapon, character} = useSelector((state) => state.playerData.value)

    console.log(character)

    let slots = []

    for (let i = 0; i < character.inventorySlots; i++) {
        slots.push(<div className="inventorySlot elevation2 border1 m-2" key={i}/>);
    }

    return (
        <div className="inventory elevation1 border1 flex2">
            <h1 className="whiteText highText text-center mb-3">Inventory</h1>

            <div className="d-flex flex-wrap">
            {
                slots.map(slot => slot)
            }
            </div>
        </div>
    );
};

export default CharacterInventory;