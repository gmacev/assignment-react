import React from 'react';

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
        <div onClick={characterSelected} className={`characterSelectCard ${getSelected[index] ? "characterSelected" : "border1"} elevation1`}>
            <div className="characterImageWrapper">
                <img src={char.image} alt=""/>
            </div>

            <h1 className={`${char.race.toLowerCase()+"Color"} highText text-center mt-4`}>{char.race}</h1>

            <h4 className="text-center whiteText highText">Stats</h4>
            <div className="d-flex flex-column">
                <code className="d-flex justify-content-evenly">
                    <div>
                        <div className="whiteText mediumText">Damage: </div>
                        <div className="whiteText mediumText">Health: </div>
                        <div className="whiteText mediumText">Energy: </div>
                        <div className="whiteText mediumText">Stamina: </div>
                        <div className="whiteText mediumText">Strength: </div>
                        <div className="whiteText mediumText">Slots: </div>
                        <div className="whiteText mediumText">Gold: </div>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <div className="whiteText mediumText fw-bold">{char.damage}</div>
                        <div className="whiteText mediumText fw-bold">{char.health}</div>
                        <div className="whiteText mediumText fw-bold">{char.energy}</div>
                        <div className="whiteText mediumText fw-bold">{char.stamina}</div>
                        <div className="whiteText mediumText fw-bold">{char.strength}</div>
                        <div className="whiteText mediumText fw-bold">{char.inventorySlots}</div>
                        <div className="whiteText mediumText fw-bold">{char.gold}</div>
                    </div>
                </code>
            </div>
        </div>
    );
};

export default CharacterSelectCard;