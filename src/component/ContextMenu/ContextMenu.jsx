import './self.scss';
import React from "react";

// import { Logger } from "../../module/logger";
// const logger = Logger({className: "ContextMenu"});

const ContextMenu = () => {

    return(
        <div id={"context-menu"} className={"context-menu"}>
            <div className={"item"}>Edit</div>
            <div className={"item"}>Copy</div>
            <div className={"item"}>Remove</div>
        </div>
    );
};

export default ContextMenu;