import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {effects} from "../misc/Helpers";
import {updatePlayerWeapons} from "../features/PlayerData";
import {useDispatch} from "react-redux";
import {useAlert} from 'react-alert'

const CharacterWeapon = () => {
    const {character, weapons, potions, items} = useSelector((state) => state.playerData.value)
    const dispatch = useDispatch()
    const alert = useAlert()
    const weapon = weapons.find(x => x.equipped === true)
    const index = weapons.findIndex(x => x.equipped === true)

    function unEquipWeapon()
    {
        let extraSlots = 0

        weapon.effects.map(effect => {
            if (effect[0] === "i")
                extraSlots = effects[effect].effect.inventorySlots
        })

        if(character.inventorySlots+extraSlots-1-potions.length-weapons.length-items.length <= 0){
            return alert.show("You can't unequip your weapon, because you won't have enough free inventory slots for your items!", {type: 'error'})
        }
        const weap = {...weapon}
        const weaps = [...weapons]

        weap.equipped = false
        weaps[index] = weap
        dispatch(updatePlayerWeapons(weaps))

        console.log(weaps, index)
    }

    return (
        <div>
            {
                !weapon || !weapon.equipped ?
                    <div className="inventorySlot elevation2 border1"/>
                    :
                    <div className="d-flex flex-wrap align-items-center justify-content-center stats elevation2 border1" style={{gap: "10px", padding: "10px"}}>
                        <div onClick={unEquipWeapon} className="inventoryItem">
                            <img src={weapon.image} alt=""/>
                        </div>
                        <code className="d-flex justify-content-evenly whiteText">
                            <div>
                                <div className="whiteText mediumText">Max damage: </div>
                                <div className="whiteText mediumText">Energy/hit: </div>
                                {weapon.effects.length > 0 &&
                                <div className="mediumText">Effects: {weapon.effects.map((x, index) => <li key={index} className="mediumText"><span>{effects[x].title}</span></li>)}</div>
                                }
                            </div>
                            <div className="d-flex flex-column align-items-end">
                                <div className="whiteText mediumText fw-bold">{weapon.maxDamage}</div>
                                <div className="whiteText mediumText fw-bold">{weapon.energyPerHit}</div>
                            </div>
                        </code>
                    </div>
            }

        </div>
    );
};

export default CharacterWeapon;