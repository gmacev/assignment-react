import React from 'react';
import {useSelector} from "react-redux";
import {Popover, OverlayTrigger, Button} from "react-bootstrap";

const CharacterWeapon = () => {
    const {weapons} = useSelector((state) => state.playerData.value)
    const weapon = weapons.find(x => x.equipped === true)

    let popoverRight

    if(weapon) {
        popoverRight = (
            <Popover id="popover-trigger-click-root-close" className="popover" title="Weapon stats">
                <div className="d-flex justify-content-around">
                    <div>
                        <div className="whiteText highText">Max damage:</div>
                        <div className="whiteText highText">Energy per hit:</div>
                        <div className="whiteText highText">Effects:</div>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <div className="whiteText highText fw-bold">{weapon.maxDamage}</div>
                        <div className="whiteText highText fw-bold">{weapon.energyPerHit}</div>
                    </div>
                </div>
            </Popover>
        )
    }

    return (
        <div>
            {
                !weapon || !weapon.equipped ?
                    <div className="inventorySlot elevation2 border1"/>
                    :
                    <div className="d-flex align-items-center justify-content-center">
                        <div className="inventoryItem elevation2 border1 d-flex me-3">
                            <img src="https://wow.gamepressure.com/gfx/icons/INV_Sword_04.gif" alt=""/>
                        </div>
                        <OverlayTrigger trigger="click" rootClose placement="right"  overlay={popoverRight}>
                            <button className="btn btn-primary">Weapon stats</button>
                        </OverlayTrigger>
                    </div>
            }

        </div>
    );
};

export default CharacterWeapon;