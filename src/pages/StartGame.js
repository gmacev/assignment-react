import React, {useState} from 'react';
import CharacterSelectCard from "../components/CharacterSelectCard";
import {characters} from "../misc/Helpers";

const StartGame = () => {
    const [getSelected, setSelected] = useState([false, false, false, false, false, false, false, false])
    const [getCharacter, setCharacter] = useState(null)

    function startGame()
    {
        console.log(getCharacter)
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <img src="https://wow.zamimg.com/uploads/screenshots/normal/980482.jpg" alt="" className="image-bg"/>
            <div className="image-overlay"/>
            <div className="exclusiveText whiteText mediumText text-center mb-3">Select your hero</div>
            <div className="d-flex flex-wrap justify-content-center">
                {
                    characters.map((char, index) => <CharacterSelectCard char={char} key={index} index={index} getSelected={getSelected} setSelected={setSelected} setCharacter={setCharacter}/>)
                }
            </div>
            <div>
                {
                    getSelected.find(x => x === true) &&
                    <button onClick={startGame} className="btn btn-dark highText whiteText textUI btnBig mt-4">Start game</button>
                }
            </div>
        </div>
    );
};

export default StartGame;