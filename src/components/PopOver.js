import React from 'react';
import {Popover, OverlayTrigger, Button} from "react-bootstrap";

const PopOver = ({content, title}) => {

    console.log(content, title)
    console.log("asfasfasfs")

    const popoverRight = (
        <Popover id="popover-trigger-click-root-close" className="popover" title={title}>
            {content}
        </Popover>
    )

    return (
        <OverlayTrigger trigger="click" rootClose placement="right" overlay={popoverRight}>
            <button className="btn btn-primary">{title}</button>
        </OverlayTrigger>
    );
};

export default PopOver;