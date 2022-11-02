import './self.scss';
import React, {useRef, useState} from "react";

import { Logger } from "../../module/logger";

const logger = Logger({className: "Container"});

const Container = () => {

    const containerRef = useRef(null);

    const handleMouseDown = () => {
    };

    const handleMouseUp = () => {
    }

    return(
        <div ref={containerRef} className="container-container" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            <p>Container</p>
        </div>
    );
};

export default Container;