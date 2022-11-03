import '../../css/main.scss';
import React from "react";

import ToolBar from "../../component/ToolBar/ToolBar.jsx";
import Canvas from "../../component/Canvas/Canvas.jsx";
import ContextMenu from "../../component/ContextMenu/ContextMenu.jsx";
// import { Logger } from "../../module/logger";
// const logger = Logger({className: "MainPage"});

const MainPage = () => {

    return(
        <div className="container-main">
            <Canvas/>
            <ToolBar/>
            <ContextMenu/>
        </div>
    );
};

export default MainPage;