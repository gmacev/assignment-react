import React, {useEffect, useState} from 'react';
import {ProgressBar} from "react-bootstrap";
import {dropItems, sample} from "../misc/Helpers";
import {useDispatch, useSelector} from "react-redux";
import {updateFreeSlots, updatePlayerItems, updatePlayerWeapons} from "../features/PlayerData";
import {useAlert} from 'react-alert'
import {randomNum} from "../misc/Helpers";

const EnemyPanel = ({enemy, damage, setPlayerDamage, setGameStatus, getGameStatus, getRn}) => {
    let [getCurrentHealth, setCurrentHealth] = useState(enemy ? enemy.health : 0)
    const {character, freeSlots, items} = useSelector((state) => state.playerData.value)
    const dispatch = useDispatch()
    const [getDropItems, setDropItems] = useState([])
    const alert = useAlert()

    useEffect(() => {

        if(enemy !== null && enemy){
            setCurrentHealth(getCurrentHealth-damage)
            console.log(getCurrentHealth)
        }
    }, [getRn])

    useEffect(() => {
        if(enemy !== null && enemy) {
            setCurrentHealth(enemy.health)

            console.log(enemy.maxItemsDrop)
            const itemCount = randomNum(0, enemy.maxItemsDrop)

            console.log("itemCount: " + itemCount)

            if(itemCount > 0) {
                sample(dropItems, itemCount)

                console.log(sample(dropItems, itemCount))
                setDropItems(sample(dropItems, itemCount))
            }

            else
                setDropItems([])
        }
    }, [enemy])

    useEffect(() =>{
        if(enemy !== null && enemy){
            if(getCurrentHealth <= 0) {
                setGameStatus(1)
            }
        }

    }, [damage, getCurrentHealth])

    function grabItem(item, index){
        if(freeSlots > 0) {
            //const dummyItems = [...items, item]
            dispatch(updatePlayerItems([...items, item]))
            dispatch(updateFreeSlots(freeSlots - 1))

            const dummyItems = [...getDropItems]

            setDropItems(dummyItems.filter((x, i) => i !== index))
        }

        else
            alert.show("You don't have free space in your inventory!", {type: 'error'})
    }

    return (enemy &&
        <div className="elevation1 border1 enemyPanel d-flex flex-column">
            <div className="align-self-center mb-3">
                <img src={enemy.image} alt=""/>
                <h1 className="redText highText text-center">{enemy.name}</h1>
                <h6 className="yellowText mediumText text-center">Max damage: {enemy.maxDamage}</h6>
            </div>
            <div>
                <div style={{position: 'relative'}}>
                    <ProgressBar className="healthBar border1" now={getCurrentHealth <= 0 ? 0 : getCurrentHealth} max={enemy.health}/>
                    <h6 className="whiteText mediumText text-center" style={{position: 'absolute', top: "5px", left: "110px"}}>HP: {getCurrentHealth <= 0 ? 0 : getCurrentHealth}/{enemy.health}</h6>
                </div>
            </div>
            {getGameStatus === 1 &&
                <div className="mt-3">
                    {getDropItems.length > 0 ?
                        <div>
                            <h4 className="yellowText mediumText text-center">Dropped items</h4>
                            <div className="d-flex flex-wrap">
                                {getDropItems.map((item, index) => {
                                    return <img onClick={() => grabItem(item, index)} key={index} className="inventoryItem" src={item.image} alt=""/>
                                })}
                            </div>
                        </div>
                        :
                        <h4 className="yellowText mediumText text-center">No items</h4>
                    }
                </div>
            }
        </div>
    );
};

export default EnemyPanel;