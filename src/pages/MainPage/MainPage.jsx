import '../../css/main.scss';
import React from "react";

import { Logger } from "../../module/logger";
import ToolBar from "../../component/ToolBar/ToolBar.jsx";
import Canvas from "../../component/Canvas/Canvas.jsx";

const logger = Logger({className: "MainPage"});

const MainPage = () => {

    return(
        <div className="container-main">
            <Canvas/>
            <ToolBar/>
        </div>
    );
};

export default MainPage;