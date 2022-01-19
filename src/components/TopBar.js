import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";

const TopBar = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()

    return (
        <div>
            {pathname === "/game" &&
                <div className="topBar elevation1 d-flex align-items-center">
                    <h2 onClick={() => navigate("/shop")} className="whiteText highText textUI">Shop</h2>
                    <h2 onClick={() => navigate("/arena")} className="whiteText highText textUI">Arena</h2>
                </div>
            }
            {pathname === "/shop" &&
            <div className="topBar elevation1 d-flex align-items-center">
                <h2 onClick={() => navigate("/game")} className="whiteText highText textUI">Main</h2>
                <h2 onClick={() => navigate("/arena")} className="whiteText highText textUI">Arena</h2>
            </div>
            }
        </div>

    );
};

export default TopBar;