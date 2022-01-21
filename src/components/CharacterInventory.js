import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {
    updatePlayerWeapons,
    updatePlayerPotions,
    updatePlayerItems,
    updateBuyDisabled,
    updatePlayerGold
} from "../features/PlayerData";
import ReactHover, { Trigger, Hover } from "react-hover";
import {effects} from "../misc/Helpers";


const CharacterInventory = () => {
    const {weapons, potions, items, character, gold} = useSelector((state) => state.playerData.value)
    const dispatch = useDispatch()
    const {pathname} = useLocation()

    const hoverOptions = {
        followCursor: false
    }

    let slots = []

    function equipWeapon(weapon, index){

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

    function sellItem(item, index, category){
        console.log(item.price)

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



       // dispatch(updatePlayerGold(gold-weapon.price))
    }


    if(weapons.length > 0) {
        for (let i = 0; i < weapons.length; i++) {
            slots.push(
                <div key={i+100}>
                    <ReactHover options={hoverOptions}>
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
                                {pathname === "/shop" && <button onClick={() => sellItem(weapons[i], i, 0)} className="btn btn-sm btn-danger" style={{zIndex: "5554"}} >Sell for {(weapons[i].price / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</button>}
                            </div>
                        </Hover>
                    </ReactHover>

                </div>
            )
        }
    }

    if(potions.length > 0) {
        for (let i = 0; i < potions.length; i++) {
            slots.push(
                <div key={i+200}>
                    <ReactHover options={hoverOptions}>
                        <Trigger type="trigger">
                            <img src={potions[i].image} alt=""/>
                        </Trigger>
                        <Hover type="hover">
                            <div className="d-flex flex-column toolTip glass border1">
                                <code className="whiteText d-flex justify-content-evenly flex-column">
                                    <div className="whiteText highText">{potions[i].title}</div>
                                </code>
                                {pathname === "/shop" && <button onClick={() => sellItem(potions[i], i, 1)} className="btn btn-sm btn-danger">Sell for {(potions[i].price / 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</button>}
                            </div>
                        </Hover>
                    </ReactHover>
                </div>
            )
        }
    }

    if(items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            slots.push(<img key={i+300} src={items[i].image} alt=""/>);
        }
    }

    for (let i = 0; i < character.inventorySlots-potions.length-weapons.length-items.length; i++) {
        slots.push(<div className="inventorySlot elevation2 border1" key={i}/>);
    }

    return (
        <div className="inventory elevation1 border1 flex2">
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