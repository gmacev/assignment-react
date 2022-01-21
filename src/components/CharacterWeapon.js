import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {effects} from "../misc/Helpers";

const CharacterWeapon = () => {
    const {weapons} = useSelector((state) => state.playerData.value)
    const weapon = weapons.find(x => x.equipped === true)

    //let [getPopOverContent, setPopOverContent] = useState(null)

    //console.log(weapon)

   /* useEffect(() => {
        if(weapon)
        {
            setPopOverContent(<div className="d-flex justify-content-around">
                <div>
                    <div className="whiteText highText">Max damage:</div>
                    <div className="whiteText highText">Energy per hit:</div>
                    <div className="whiteText highText">Effects:</div>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <div className="whiteText highText fw-bold">{weapon.maxDamage}</div>
                    <div className="whiteText highText fw-bold">{weapon.energyPerHit}</div>
                </div>
            </div>)
        }
    }, [weapon])*/



    return (
        <div>
            {
                !weapon || !weapon.equipped ?
                    <div className="inventorySlot elevation2 border1"/>
                    :
                    <div className="d-flex flex-wrap align-items-center justify-content-center stats elevation2 border1" style={{gap: "10px", padding: "10px"}}>
                        <div className="inventoryItem">
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

                        {/*<PopOver content={getPopOverContent} title={"Weapon stats"}/>*/}
                    </div>
            }

        </div>
    );
};

export default CharacterWeapon;