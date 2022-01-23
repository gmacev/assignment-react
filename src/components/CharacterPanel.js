import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CharacterStats from "./CharacterStats";
import CharacterWeapon from "./CharacterWeapon";
import {useLocation} from "react-router-dom";
import {ProgressBar} from "react-bootstrap";
import {effects} from "../misc/Helpers";
import ReactHover, {Hover, Trigger} from "react-hover";
import {updateFreeSlots, updatePlayerPotions} from "../features/PlayerData";

const CharacterPanel = ({damage, setGameStatus, getRn, enemy, setAttackDisabled, getRn3}) => {
    const {character, weapons, potions, freeSlots, items} = useSelector((state) => state.playerData.value)
    const {pathname} = useLocation()
    const dispatch = useDispatch()

    const weapon = weapons.find(x => x.equipped === true)
    const maxHealth = () =>
    {
        if(weapon)
        {
            let extraHp = 0

            weapon.effects.map(effect => {
                if (effect[0] === "h")
                    extraHp = effects[effect].effect.health
            })

            return character.health + extraHp
        }

        return character.health
    }

    const maxEnergy = () =>
    {
        if(weapon)
        {
            let extraEnergy = 0

            weapon.effects.map(effect => {
                if (effect[0] === "e")
                    extraEnergy = effects[effect].effect.energy
            })

            return character.energy + extraEnergy
        }

        return character.energy
    }

    const [getCurrentHealth, setCurrentHealth] = useState(maxHealth())
    const [getCurrentEnergy, setCurrentEnergy] = useState(maxEnergy())

    useEffect(() =>{
        if(weapon && enemy !== null && enemy)
        {
            console.log("weapon.energyPerHit ", weapon.energyPerHit)
            const energyLeft = getCurrentEnergy-weapon.energyPerHit

            setCurrentEnergy(energyLeft < 0 ? 0 : energyLeft)

            if(energyLeft <= 0)
                setAttackDisabled(true)

            else
                setAttackDisabled(false)
        }
    }, [getRn3])

    useEffect(() => {
        setCurrentHealth(getCurrentHealth-damage)

        if(getCurrentHealth > 0)
        {
            if(weapon && enemy !== null && enemy){
                let energyToRestore = character.stamina
                weapon.effects.map(effect => {
                    if (effect[0] === "s" && effect[1] === "t" && effect[2] === "a")
                        energyToRestore += effects[effect].effect.stamina
                })
                console.log("character.energy+energyToRestore " + (character.energy+energyToRestore))

                setCurrentEnergy(getCurrentEnergy + energyToRestore > maxEnergy() ? maxEnergy() : getCurrentEnergy + energyToRestore)
            }
        }
    }, [getRn])

    useEffect(() => {
        if(getCurrentHealth <= 0) {
            if(enemy !== null && enemy)
                setGameStatus(2)
            console.log(enemy)
        }

    }, [getCurrentHealth])

    function potionUse(potion, index){

        if('energy' in potion.effect){
            if(getCurrentEnergy < maxEnergy())
            {
                const energyToRestore = getCurrentEnergy + potion.effect.energy

                setCurrentEnergy(energyToRestore > maxEnergy() ? maxEnergy() : energyToRestore)

                if(energyToRestore > weapon.energyPerHit)
                    setAttackDisabled(false)
            }
        }

        else if(getCurrentHealth < maxHealth())
            setCurrentHealth(getCurrentHealth + potion.effect.health > maxHealth() ? maxHealth() : getCurrentHealth + potion.effect.health)


        dispatch(updatePlayerPotions(potions.filter((x, i) => i !== index)))
        dispatch(updateFreeSlots(freeSlots+1))
        console.log(freeSlots)
    }

    let emptySlots = []

    for (let i = 0; i < freeSlots; i++) {
        emptySlots.push(<div className="inventorySlot elevation2 border1" style={{margin: "5px"}} key={i}/>);
    }

    return (
        <div className={`${pathname === "/game" && "flex1"} `}>
            {pathname === "/game" &&
                <div className="characterPanel elevation1 border1 d-flex flex-wrap justify-content-around flex4">
                    <img src={character.image} className="flex1 align-self-center" alt=""/>
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
                </div>
            }
            {pathname === "/arena" &&
                <div>
                    <div className="characterPanel elevation2 border1 d-flex flex-column">
                        <img src={character.image} className="flex1 align-self-center" alt=""/>
                        <h1 className={`${character.race.toLowerCase()+"Color"} highText text-center`}>{character.race}</h1>
                        <div className="mt-2 mb-3">
                            <div style={{position: 'relative'}}>
                                <ProgressBar className="healthBar border1" now={getCurrentHealth < 0 ? 0 : getCurrentHealth} max={maxHealth()}/>
                                <h6 className="whiteText mediumText text-center" style={{position: 'absolute', top: "5px", left: "100px"}}>HP: {getCurrentHealth < 0 ? 0 : getCurrentHealth}/{maxHealth()}</h6>
                            </div>
                            <div className="mt-3" style={{position: 'relative'}}>
                                <ProgressBar className="energyBar mt-2" now={getCurrentEnergy < 0 ? 0 : getCurrentEnergy} max={maxEnergy()}/>
                                <h6 className="whiteText mediumText text-center mt-3" style={{position: 'absolute', top: "-12px", left: "100px"}}>Energy: {getCurrentEnergy < 0 ? 0 : getCurrentEnergy}/{maxEnergy()}</h6>
                            </div>
                        </div>
                        <div className="arenaUtils">
                            {weapon &&
                            <ReactHover options={{followCursor: false}}>
                                <Trigger type="trigger">
                                    <img className="inventoryItem" src={weapon.image} alt=""/>
                                </Trigger>
                                <Hover type="hover">
                                    <div className="d-flex flex-column toolTip glass border1">
                                        <code className="whiteText d-flex justify-content-evenly">
                                            <div>
                                                <div className="whiteText highText">Max damage: </div>
                                                <div className="whiteText highText">Energy/hit: </div>
                                                {weapon.effects.length > 0 &&
                                                <div className="highText">Effects: {weapon.effects.map((x, index) => <li key={index} className="mediumText"><span>{effects[x].title}</span></li>)}</div>
                                                }
                                            </div>
                                            <div className="d-flex flex-column align-items-end">
                                                <div className="whiteText highText fw-bold">{weapon.maxDamage}</div>
                                                <div className="whiteText highText fw-bold">{weapon.energyPerHit}</div>
                                            </div>
                                        </code>
                                    </div>
                                </Hover>
                            </ReactHover>
                            }
                            {potions.length > 0 &&
                                potions.map((x, i) => {
                                    return <div key={i} onClick={() => potionUse(x, i)}>
                                        <img className="inventoryItem" src={x.image} alt=""/>
                                        <h6 className="whiteText ">{x.title}</h6>
                                    </div>
                                })
                            }
                            {items.map((item, index) => {
                                    return <img key={index} className="inventoryItem" src={item.image} alt=""/>
                                })
                            }
                            {emptySlots.map((slot, index) => slot)}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default CharacterPanel;