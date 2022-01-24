import React, {useEffect, useState} from 'react';
import {effects, monsters, randomNum} from "../misc/Helpers";
import {useSelector} from "react-redux";
import {useAlert} from 'react-alert'
import {useNavigate} from "react-router-dom";

const ArenaActions = ({enemy, setEnemy, getEnemyDamage, setEnemyDamage, getPlayerDamage, getGameStatus, setGameStatus, setPlayerDamage, setRn1, setRn2, getAttackDisabled, setRn3}) => {
    const {character, weapons} = useSelector((state) => state.playerData.value)
    const alert = useAlert()
    const [getDamageIndicator1, setDamageIndicator1] = useState(0)
    const [getDamageIndicator2, setDamageIndicator2] = useState(0)
    const navigate = useNavigate()

    const weapon = weapons.find(x => x.equipped === true)

    function findEnemy(){
        setEnemy(monsters[randomNum(0, monsters.length)])
        setGameStatus(0)
    }

    function attack(){
        setRn3(randomNum(0, 9999999999))

        if(!getAttackDisabled)
        {
            let criticalChance = character.strength

            if(weapon)
            {
                weapon.effects.map(effect => {
                    if (effect[0] === "s" && effect.length === 2)
                        criticalChance += effects[effect].effect.strength
                })
            }

            const extraDamage = randomNum(1, 100) <= criticalChance

            setEnemyDamage((character.damage + (weapon ? randomNum(0, weapon.maxDamage) : 0) * (extraDamage ? 3 : 1)))
        }
        else {
            setEnemyDamage(0)
            alert.show("You don't have enough energy to do any damage", {type: 'error'})
        }

        const plDamage = randomNum(0, enemy.maxDamage)
        setPlayerDamage(plDamage)

        setDamageIndicator2(1)
        setTimeout(() => {setDamageIndicator2(0)}, 650)

        setRn1(randomNum(0, 9999999999))

        setTimeout(() => {
            setDamageIndicator1(1)
            setRn2(randomNum(0, 9999999999))

            setTimeout(() => {setDamageIndicator1(0)}, 650)
        }, 650)
    }

    return (
        <div className="d-flex arenaActions flex-wrap justify-content-start align-items-center flex-column">
            {enemy === null && <button onClick={() => findEnemy()} className="btn btn-danger mt-5">Find enemy</button>}
            {(enemy !== null && getGameStatus === 0) &&
                <div className="w-100 d-flex justify-content-center position-relative">
                    <div className={`damageToPlayer redText fade-in ${getDamageIndicator1 === 1 ? "d-block" : "d-none"} position-absolute`}>-{getPlayerDamage} HP</div>
                    <div className={`damageToEnemy redText fade-in ${getDamageIndicator2 === 1 ? "d-block" : "d-none"} position-absolute`}>-{getEnemyDamage} HP</div>
                    <button onClick={() => attack()} className={`btn align-self-center ${(getDamageIndicator1 !== 0 || getDamageIndicator2 !== 0) ? "btn-secondary disabled" : "btn-danger"}`}>Attack</button>
                </div>
            }

            {getGameStatus === 1 &&
                <div className="d-flex flex-column">
                    <h1 className="greenText highText mb-5">You won!</h1>
                    <button onClick={() => navigate('/game')} className="btn btn-primary btn-sm mb-3">Go home</button>
                    <button onClick={() => findEnemy()} className="btn btn-primary btn-sm">Find new enemy</button>
                </div>
            }

            {getGameStatus === 2 &&
            <div className="d-flex flex-column">
                <h1 className="redText highText mb-5">You lost!</h1>
                <button onClick={() => navigate('/game')} className="btn btn-primary btn-sm mb-3">Go home</button>
            </div>
            }
        </div>
    );
};

export default ArenaActions;