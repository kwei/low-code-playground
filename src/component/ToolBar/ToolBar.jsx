import '../../css/toolBar.scss';
import React from "react";

import { Logger } from "../../module/logger";
import Container from "../Container/Container.jsx";

const logger = Logger({className: "ToolBar"});

const ToolBar = () => {

    return(
        <div className="container-toolBar">
            <Container/>
        </div>
    );
};

export default ToolBar;