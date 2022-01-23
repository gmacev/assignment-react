import React from 'react';
import CharacterPanel from "../components/CharacterPanel";
import ArenaActions from "../components/ArenaActions";
import EnemyPanel from "../components/EnemyPanel";


import {useHistory, useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

const Arena = () => {

    const [getPlayerReceivedDamage, setPlayerReceivedDamage] = useState(0)
    const [getEnemyReceivedDamage, setEnemyReceivedDamage] = useState(0)
    const [getGameStatus, setGameStatus] = useState(0) // 0 battle, 1 = player won, 2 = enemy won
    const [getEnemy, setEnemy] = useState(null)
    const [getRn1, setRn1] = useState(0)
    const [getRn2, setRn2] = useState(0)
    const [getRn3, setRn3] = useState(0)
    const [getAttackDisabled, setAttackDisabled] = useState(false)

    return (
        <div className="mainWrapper w-100" style={{marginTop: "60px"}}>
            <img src="https://i.imgur.com/1n2GNcM.jpeg" alt="" className="image-bg"/>
            <div className="image-overlay"/>
            <div className="d-flex justify-content-center">
                <CharacterPanel damage={getPlayerReceivedDamage} setGameStatus={setGameStatus} getRn={getRn2} enemy={getEnemy} setAttackDisabled={setAttackDisabled} getRn3={getRn3}/>
                <ArenaActions enemy={getEnemy} setEnemy={setEnemy} getEnemyDamage={getEnemyReceivedDamage} setEnemyDamage={setEnemyReceivedDamage} getPlayerDamage={getPlayerReceivedDamage} setPlayerDamage={setPlayerReceivedDamage} setRn1={setRn1} setRn2={setRn2} getGameStatus={getGameStatus} setGameStatus={setGameStatus} getAttackDisabled={getAttackDisabled} setRn3={setRn3}/>
                <EnemyPanel enemy={getEnemy} damage={getEnemyReceivedDamage} setPlayerDamage={setPlayerReceivedDamage} setGameStatus={setGameStatus} getGameStatus={getGameStatus} getRn={getRn1}/>
            </div>
        </div>
    );
};

export default Arena;