import React from 'react';
import CharacterPanel from "../components/CharacterPanel";

import {useHistory, useLocation, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

const Arena = ({ navigation }) => {


    return (
        <div>
            <CharacterPanel/>
        </div>
    );
};

export default Arena;