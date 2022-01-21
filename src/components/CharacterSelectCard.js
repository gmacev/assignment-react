import React from 'react';
import CharacterStats from "./CharacterStats";

const CharacterSelectCard = ({char, index, getSelected, setSelected, setCharacter}) =>
{
    function characterSelected() {
        getSelected.map((x, i) => getSelected[i] = false)
        getSelected = [...getSelected]
        getSelected[index] = true
        setSelected(getSelected)
        setCharacter(char)
    }

    return (
        <div onClick={characterSelected} className={`characterSelectCard ${getSelected[index] ? "characterSelected" : "border1"} glass elevation1`}>
            <div className="characterImageWrapper">
                <img src={char.image} alt=""/>
            </div>

            <h1 className={`${char.race.toLowerCase()+"Color"} highText text-center mt-4`}>{char.race}</h1>

            <CharacterStats char={char}/>
        </div>
    );
};

export default CharacterSelectCard;