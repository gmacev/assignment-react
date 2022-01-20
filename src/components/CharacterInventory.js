import React from 'react';
import {useSelector} from "react-redux";

const CharacterInventory = () => {
    const {weapons, potions, items, character} = useSelector((state) => state.playerData.value)

    console.log(character)

    let slots = []

    console.log(weapons)

    if(weapons.length > 0) {
        for (let i = 0; i < weapons.length; i++) {
            slots.push(<img key={i+100} src={weapons[i].image} alt=""/>);
        }
    }

    if(potions.length > 0) {
        for (let i = 0; i < potions.length; i++) {
            slots.push(<img key={i+200} src={potions[i].image} alt=""/>);
        }
    }

    if(items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            slots.push(<img key={i+300} src={items[i].image} alt=""/>);
        }
    }

    for (let i = 0; i < character.inventorySlots-potions.length-weapons.length-items.length; i++) {
        slots.push(<div className="inventorySlot elevation2 border1" key={i}/>);
    }

    return (
        <div className="inventory elevation1 border1 flex2">
            <h1 className="whiteText highText text-center mb-3">Inventory</h1>

            <div className="inventorySlots">
            {
                slots.map(slot => slot)
            }
            </div>
        </div>
    );
};

export default CharacterInventory;