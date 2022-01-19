import React from 'react';
import {useLocation} from "react-router-dom";

const TopBar = () => {
    const {pathname} = useLocation()

    return (
        <div>
            {pathname !== "/" &&
                <div className="topBar elevation1 d-flex align-items-center justify-content-evenly">
                    <h1 className="highText">Lorem ipsum</h1>
                </div>
            }
        </div>

    );
};

export default TopBar;