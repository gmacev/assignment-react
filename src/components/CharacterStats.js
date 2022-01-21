import React from 'react';

const CharacterStats = ({char}) => {
    return (
        <div className="d-flex flex-column justify-content-between align-items-center mb-3">
            <h4 className="text-center whiteText highText">Stats</h4>
            <code className="stats d-flex justify-content-evenly elevation2 border1">
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
    );
};

export default CharacterStats;