import React from 'react';
import CharacterSelectCard from "../components/CharacterSelectCard";
import {characters} from "../misc/Helpers";

const StartGame = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-wrap">
                {
                    characters.map((char, index) => <CharacterSelectCard char={char} index={index}/>)
                }
            </div>
        </div>
    );
};

export default StartGame;