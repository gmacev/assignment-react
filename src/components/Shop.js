import React, {useRef} from 'react';

const Shop = () => {
    const weaponsRef = useRef()
    const potionsRef = useRef()

    function WeaponsTab(){

    }

    function PotionsTab(){

    }


    return (
            <div className="shop elevation1 border1 flex3">
                <h1 className="whiteText highText text-center mb-3">Trader</h1>
                <div className="d-flex flex-wrap">
                    <div onClick={WeaponsTab} className="shopWeapons elevation1 border1 flex1">
                        <h4 className="textUI whiteText mediumText text-center">Weapons</h4>
                        <div ref={weaponsRef}  className="d-flex flex-wrap">
                        {

                        }
                        </div>
                    </div>
                    <div onClick={PotionsTab} className="shopPotions elevation1 border1 flex1">
                        <h4 className="textUI whiteText mediumText text-center">Potions</h4>
                        <div ref={potionsRef} className="d-flex flex-wrap">
                        {

                        }
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Shop;