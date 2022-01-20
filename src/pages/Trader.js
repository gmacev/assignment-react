import React from 'react';
import CharacterInventory from "../components/CharacterInventory";
import Shop from "../components/Shop";

const Trader = () => {
    return (
        <div className="mainWrapper">
            <img src="https://wow.zamimg.com/uploads/screenshots/normal/980482.jpg" alt="" className="image-bg"/>
            <div className="image-overlay"/>
            <div className="trader d-flex flex-wrap">
                <Shop/>
                <CharacterInventory/>
            </div>
        </div>
    );
};

export default Trader;