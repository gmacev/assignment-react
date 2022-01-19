import React from 'react';
import {playerDataSlice} from "../features/PlayerData";
import {useSelector} from "react-redux";
import CharacterStats from "./CharacterStats";

const CharacterPanel = () => {
    const {character} = useSelector((state) => state.playerData.value)
    console.log(character.race)

    console.log(character)

    return (
        <div className="characterPanel elevation1 border1 d-inline-flex flex-wrap justify-content-around">
            <img src={character.image} alt=""/>
            <div className="characterInfo elevation2 border1">
                <h1 className={`${character.race.toLowerCase()+"Color"} highText text-center`}>{character.race}</h1>
                <CharacterStats char={character}/>
            </div>
        </div>
    );
};

export default CharacterPanel;