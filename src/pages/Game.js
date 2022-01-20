import React from 'react';
import TopBar from "../components/TopBar";
import CharacterPanel from "../components/CharacterPanel";
import CharacterInventory from "../components/CharacterInventory";

const Game = () => {
    return (
        <div className="mainWrapper w-100 d-flex justify-content-center">
            <img src="https://wow.zamimg.com/uploads/screenshots/normal/980479.jpg" alt="" className="image-bg"/>
            <div className="image-overlay"/>
            <div className="d-flex flex-wrap justify-content-center w-75">
                <CharacterPanel/>
                <CharacterInventory/>
            </div>
        </div>
    );
};

export default Game;