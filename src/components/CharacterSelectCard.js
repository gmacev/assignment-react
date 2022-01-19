import React from 'react';

const CharacterSelectCard = ({char, index}) => {
    console.log( index)

    return (
        <div className="characterSelectCard border1 elevation1" index={index}>
            <img src={char.image} alt=""/>
            <h1 className="highText text-center mt-2">{char.race}</h1>

            <h4 className="text-center mediumText">Stats</h4>
            <div className="d-flex flex-column">
                <code className="lowText">Damage: <span className="fw-bold">{char.damage}</span></code>
                <code className="lowText">Health: <span className="fw-bold">{char.health}</span></code>
                <code className="lowText">Energy: <span className="fw-bold">{char.energy}</span></code>
                <code className="lowText">Stamina: <span className="fw-bold">{char.stamina}</span></code>
                <code className="lowText">Strength: <span className="fw-bold">{char.strength}</span></code>
                <code className="lowText">Slots: <span className="fw-bold">{char.inventorySlots}</span></code>
                <code className="lowText">Gold: <span className="fw-bold">{char.gold}</span></code>
            </div>
        </div>
    );
};

export default CharacterSelectCard;