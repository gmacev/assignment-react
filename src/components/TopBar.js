import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const TopBar = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const {gold} = useSelector((state) => state.playerData.value)

    return (
        <div>
            {pathname === "/game" &&
                <div className="topBar d-flex flex-wrap align-items-center">
                    <h2 onClick={() => navigate("/shop")} className="whiteText highText textUI">Shop</h2>
                    <h2 onClick={() => navigate("/arena")} className="whiteText highText textUI">Arena</h2>
                    <div className="gold w-100 d-flex align-items-center justify-content-end flex1">
                        <img src="https://findicons.com/files/icons/192/finance/256/coins.png" className="" style={{maxWidth: "50px"}} alt="gold"/>
                        <span className="whiteText highText">{gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
                    </div>
                </div>
            }
            {pathname === "/shop" &&
            <div className="topBar elevation1 d-flex flex-wrap align-items-center">
                <h2 onClick={() => navigate("/game")} className="whiteText highText textUI">Main</h2>
                <h2 onClick={() => navigate("/arena")} className="whiteText highText textUI">Arena</h2>
                <div className="gold w-100 d-flex align-items-center justify-content-end flex1">
                    <img src="https://findicons.com/files/icons/192/finance/256/coins.png" className="" style={{maxWidth: "50px"}} alt="gold"/>
                    <span className="whiteText highText">{gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</span>
                </div>
            </div>
            }
        </div>

    );
};

export default TopBar;