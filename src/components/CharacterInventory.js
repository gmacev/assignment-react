import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {
    updatePlayerWeapons,
    updatePlayerPotions,
    updatePlayerItems,
    updateBuyDisabled,
    updatePlayerGold,
    updateFreeSlots
} from "../features/PlayerData";
import ReactHover, { Trigger, Hover } from "react-hover";
import {effects} from "../misc/Helpers";
import {useAlert} from 'react-alert'


const CharacterInventory = () => {
    const {weapons, potions, items, character, gold, buyDisabled, freeSlots} = useSelector((state) => state.playerData.value)
    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const alert = useAlert()

    let slots = []

    useEffect(() => {
        dispatch(updateFreeSlots(getFreeSlots(equippedWeapon(), false)))
    }, [weapons, potions, items])

    function equipWeapon(weapon, index)
    {
        if(equippedWeapon() && getFreeSlots(weapon, true) <= 0) {
            return alert.show("You can't change your weapon, because you won't have enough free inventory slots for your items!", {type: 'error'})
        }

        const weap = {...weapon}
        const weaps = [...weapons]

        weaps.map((x, i) => {
            const dummy = {...x}
            dummy.equipped = false
            weaps[i] = dummy
        })
        weap.equipped = true
        weaps[index] = weap
        dispatch(updatePlayerWeapons(weaps))
    }

    function sellItem(item, index)
    {
        item = {...item}

        if('equipped' in item)
        {
            item.equipped = false

            dispatch(updatePlayerWeapons(weapons.filter((x, i) => i !== index)))
            dispatch(updatePlayerGold(gold+item.price/2))
        }

        else if('effect' in item)
        {
            dispatch(updatePlayerPotions(potions.filter((x, i) => i !== index)))
            dispatch(updatePlayerGold(gold+item.price/2))
        }

        else if('price' in item)
        {
            console.log(item)
            dispatch(updatePlayerItems(items.filter((x, i) => i !== index)))
            dispatch(updatePlayerGold(gold+item.price))
        }

        dispatch(updateBuyDisabled(false))

        alert.show("Sold item successfully!", {type: 'success', timeout: 2000, position: "bottom right"})
    }


    if(weapons.length > 0)
    {
        for (let i = 0; i < weapons.length; i++)
        {
            if(weapons[i].equipped)
                continue

            slots.push(
                <div key={i+100}>
                    <ReactHover options={{followCursor: false}}>
                        <Trigger type="trigger">
                            <img src={weapons[i].image} onClick={() => pathname === "/game" ? equipWeapon(weapons[i], i) : () => {}} alt=""/>
                        </Trigger>
                        <Hover type="hover">
                            <div className="d-flex flex-column toolTip glass border1">
                                <code className="whiteText d-flex justify-content-evenly">
                                    <div>
                                        <div className="whiteText highText">Max damage: </div>
                                        <div className="whiteText highText">Energy/hit: </div>
                                        {weapons[i].effects.length > 0 &&
                                        <div className="highText">Effects: {weapons[i].effects.map((x, index) => <li key={index} className="mediumText"><span>{effects[x].title}</span></li>)}</div>
                                        }
                                    </div>
                                    <div className="d-flex flex-column align-items-end">
                                        <div className="whiteText highText fw-bold">{weapons[i].maxDamage}</div>
                                        <div className="whiteText highText fw-bold">{weapons[i].energyPerHit}</div>
                                    </div>
                                </code>
                                {pathname === "/shop" && <button onClick={() => sellItem(weapons[i], i)} className="btn btn-sm btn-danger" style={{zIndex: "5554"}} >Sell for {(weapons[i].price / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</button>}
                            </div>
                        </Hover>
                    </ReactHover>
                </div>
            )
        }
    }

    if(potions.length > 0) {
        for (let i = 0; i < potions.length; i++)
        {
            slots.push(
                <div key={i+200}>
                    <ReactHover options={{followCursor: false}}>
                        <Trigger type="trigger">
                            <img src={potions[i].image} alt=""/>
                        </Trigger>
                        <Hover type="hover">
                            <div className="d-flex flex-column toolTip glass border1">
                                <code className="whiteText d-flex justify-content-evenly flex-column">
                                    <div className="whiteText highText">{potions[i].title}</div>
                                </code>
                                {pathname === "/shop" && <button onClick={() => sellItem(potions[i], i)} className="btn btn-sm btn-danger">Sell for {(potions[i].price / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</button>}
                            </div>
                        </Hover>
                    </ReactHover>
                </div>
            )
        }
    }

    if(items.length > 0) {
        for (let i = 0; i < items.length; i++)
        {
            slots.push(
                <div key={i+300}>
                    <ReactHover options={{followCursor: false}}>
                        <Trigger type="trigger">
                            <img key={i+300} src={items[i].image} alt=""/>
                        </Trigger>

                        <Hover type="hover">
                            {pathname === "/shop" &&
                            <div className="d-flex flex-column toolTip glass border1">
                                <button onClick={() => sellItem(items[i], i)} className="btn btn-sm btn-danger">Sell for {items[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</button>
                            </div>
                            }
                        </Hover>

                    </ReactHover>
                </div>
            )
        }
    }

    for (let i = 0; i < getFreeSlots(equippedWeapon(), false); i++) {
        slots.push(<div className="inventorySlot elevation2 border1" key={i}/>);
    }

    function getExtraSlots(gun)
    {
        if(gun) {
            let extraSlots = 0
            gun.effects.map(effect => {
                if (effect[0] === "i")
                    extraSlots = effects[effect].effect.inventorySlots
            })

            return extraSlots+1
        }

        return 0
    }

    function getAllSlots(){
        return character.inventorySlots+getExtraSlots(equippedWeapon())
    }

    function getFreeSlots(gun, onEquip){
        const freeSlots = character.inventorySlots+getExtraSlots(gun)+(onEquip? 1 : 0)-potions.length-weapons.length-items.length

        //dispatch(updateFreeSlots(freeSlots))

        return freeSlots
    }

    function equippedWeapon() {return weapons.find(x => x.equipped === true)}

    return (
        <div className="inventory elevation1 border1 flex1">
            <h1 className="whiteText highText text-center mb-3">Inventory</h1>

            <div className="inventorySlots">
            {
                slots.map(slot => slot)
            }
            </div>
        </div>
    );
};

export default CharacterInventory;