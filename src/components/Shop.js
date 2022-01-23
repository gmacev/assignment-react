import React, {useEffect, useState} from 'react';
import {trader, effects} from "../misc/Helpers";
import {useDispatch, useSelector} from "react-redux";
import {updatePlayerWeapons, updatePlayerPotions, updatePlayerItems, updateBuyDisabled, updatePlayerGold} from "../features/PlayerData";
import {useAlert} from 'react-alert'

const Shop = () => {
    const alert = useAlert()
    const [getTab, setTab] = useState(0)
    const {character, weapons, potions, items, buyDisabled, gold} = useSelector((state) => state.playerData.value)
    const dispatch = useDispatch()

    const weapon = weapons.find(x => x.equipped === true)
    let extraSlots = weapon ? 1 : 0

    if(weapon) {
        weapon.effects.map(effect => {
            if (effect[0] === "i"){
                extraSlots = effects[effect].effect.inventorySlots+1
            }
        })
    }

    useEffect(() => {
        if(character.inventorySlots+extraSlots-weapons.length-potions.length-items.length > 0)
            dispatch(updateBuyDisabled(false))
    }, [])


    function buyWeapon(weapon)
    {
        if(buyDisabled)
            return

        character.inventorySlots+extraSlots-weapons.length-potions.length-1-items.length <= 0 && dispatch(updateBuyDisabled(true))

        weapon = {...weapon}
        weapon.equipped = false
        dispatch(updatePlayerWeapons([...weapons, weapon]))
        dispatch(updatePlayerGold(gold-weapon.price))

        alert.show("Bought weapon successfully!", {type: 'success', timeout: 2000, position: "bottom right"})
    }

    function buyPotion(potion)
    {
        if(buyDisabled)
            return

        character.inventorySlots+extraSlots-weapons.length-potions.length-1-items.length <= 0 && dispatch(updateBuyDisabled(true))

        dispatch(updatePlayerPotions([...potions, potion]))
        dispatch(updatePlayerGold(gold-potion.price))

        alert.show("Bought potion successfully!", {type: 'success', timeout: 2000, position: "bottom right"})
    }

    return (
            <div className="shop elevation1 border1 flex3">
                <h1 className="whiteText highText text-center mb-3">Trader</h1>
                <div className="d-flex flex-wrap">
                    <div onClick={() => setTab(0)} className={`shopWeapons ${getTab === 0 && "shopTraderActiveTab"} elevation1 border1 flex1`}>
                        <h4 className="textUI whiteText mediumText text-center">Weapons</h4>
                    </div>
                    <div onClick={() => setTab(1)} className={`shopPotions ${getTab === 1 && "shopTraderActiveTab"}  elevation1 border1 flex1`}>
                        <h4 className="textUI whiteText mediumText text-center">Potions</h4>
                    </div>
                </div>
                {getTab === 0 &&
                    <div className="shopTabWeapons mt-3">
                    {
                        trader.weapons.map((weapon, index) => {
                            return <div className={`shopItem elevation1 border1 ${(buyDisabled || weapon.price > gold) && "buyDisabled"} d-flex align-items-center justify-content-between`} key={index}>
                                <img src={weapon.image} alt=""/>
                                <code className="whiteText highText p-0 ms-2">
                                    <div>Max damage: <span className="fw-bold">{weapon.maxDamage}</span></div>
                                    <div>Energy/hit: <span className="fw-bold">{weapon.energyPerHit}</span></div>
                                    {weapon.effects.length > 0 &&
                                        <div>Effects: {weapon.effects.map((x, index) => <li key={index} className="mediumText"><span>{effects[x].title}</span></li>)}</div>
                                    }
                                    <div className="mt-1 redText ">Cost: <span className="fw-bold">{weapon.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span></div>
                                </code>
                                <button onClick={() => buyWeapon(weapon)} className={`btn btn-sm ${buyDisabled || weapon.price > gold ? "disabled btn-outline-secondary" : "btn-success"} ms-3`}>Buy</button>
                            </div>
                        })
                    }
                    </div>
                }
                {getTab === 1 &&
                <div className="shopTabPotions mt-3">
                    {
                        trader.potions.map((potion, index) => {
                            return <div className={`shopItem elevation1 border1 ${(buyDisabled || potion.price > gold) && "buyDisabled"} d-flex align-items-center justify-content-between`} key={index}>
                                <img src={potion.image} alt=""/>
                                <code className="whiteText highText p-0 ms-2">
                                    <div>{potion.title}</div>
                                    <div className="mt-1 redText">Cost: <span className="fw-bold">{potion.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span></div>
                                </code>
                                <button onClick={() => buyPotion(potion)} className={`btn btn-sm ${buyDisabled || potion.price > gold ? "disabled btn-outline-secondary" : "btn-success"} ms-3 `}>Buy</button>
                            </div>
                        })
                    }
                </div>
                }
            </div>
    );
};

export default Shop;