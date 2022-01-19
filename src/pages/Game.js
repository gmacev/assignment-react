import React from 'react';
import TopBar from "../components/TopBar";
import CharacterPanel from "../components/CharacterPanel";

const Game = () => {
    return (
        <div className="mainWrapper">
            <img src="https://wow.zamimg.com/uploads/screenshots/normal/980479.jpg" alt="" className="image-bg"/>
            <div className="image-overlay"/>
            <div className="d-flex flex-wrap">
                <CharacterPanel/>

            </div>
        </div>
    );
};

export default Game;