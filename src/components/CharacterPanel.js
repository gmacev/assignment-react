import React from 'react';
import {useSelector} from "react-redux";
import CharacterStats from "./CharacterStats";
import CharacterWeapon from "./CharacterWeapon";
import {useLocation} from "react-router-dom";
import {ProgressBar} from "react-bootstrap";

const CharacterPanel = () => {
    const {character} = useSelector((state) => state.playerData.value)
    const {pathname} = useLocation()

    return (
        <div className={`characterPanel elevation1 border1 d-flex flex-wrap ${pathname ==="/game" ? "justify-content-around flex4" : "flex1 flex-column"}`}>
            <img src={character.image} className="flex1 align-self-center" alt=""/>
            {pathname === "/game" &&
                <div className="characterInfo d-flex flex-column justify-content-around flex1">
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
            }
            {pathname === "/arena" &&
                <div className="w-25 align-self-center">
                    <ProgressBar className="healthBar border1" now={character.health} />
                    <ProgressBar className="energyBar mt-2 " now={character.energy} />
                </div>
            }
        </div>
    );
};

export default CharacterPanel;