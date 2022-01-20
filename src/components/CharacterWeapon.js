import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import PopOver from "./PopOver";

const CharacterWeapon = () => {
    const {weapons} = useSelector((state) => state.playerData.value)
    const weapon = weapons.find(x => x.equipped === true)

    let [getPopOverContent, setPopOverContent] = useState(null)

    useEffect(() => {
        if(!weapon)
        {
            setPopOverContent(<div className="d-flex justify-content-around">
                <div>
                    <div className="whiteText highText">Max damage:</div>
                    <div className="whiteText highText">Energy per hit:</div>
                    <div className="whiteText highText">Effects:</div>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <div className="whiteText highText fw-bold">80</div>
                    <div className="whiteText highText fw-bold">9</div>
                </div>
            </div>)
        }
    }, [])

    return (
        <div>
            {
                !weapon || !weapon.equipped ?
                    <div className="inventorySlot elevation2 border1"/>
                    :
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="inventoryItem elevation2 border1 d-flex me-3">
                            <img src="https://wow.gamepressure.com/gfx/icons/INV_Sword_04.gif" alt=""/>
                        </div>
                        <PopOver content={getPopOverContent} title={"Weapon stats"}/>
                    </div>
            }

        </div>
    );
};

export default CharacterWeapon;