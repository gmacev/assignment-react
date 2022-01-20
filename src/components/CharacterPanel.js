import React from 'react';
import {useSelector} from "react-redux";
import CharacterStats from "./CharacterStats";
import CharacterWeapon from "./CharacterWeapon";

const CharacterPanel = () => {
    const {character} = useSelector((state) => state.playerData.value)

    return (
        <div className="characterPanel elevation1 border1 d-flex flex-wrap justify-content-around flex4">
            <img src={character.image} className="flex1" alt=""/>
            <div className="characterInfo elevation2 border1 d-flex flex-column justify-content-around flex1">
                <h1 className={`${character.race.toLowerCase()+"Color"} highText text-center`}>{character.race}</h1>
                <div className="d-flex flex-wrap justify-content-between" style={{gap: "15px"}}>
                    <div className="flex1">
                        <CharacterStats char={character}/>
                    </div>
                    <div className="flex1">
                        <h4 className="text-center whiteText highText">Weapon</h4>
                        <CharacterWeapon/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterPanel;