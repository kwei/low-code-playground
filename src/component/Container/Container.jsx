import './self.scss';
import React, { useRef } from "react";

// import { Logger } from "../../module/logger";
// const logger = Logger({className: "Container"});

const Container = () => {

    const containerRef = useRef(null);

    const handleDragStart = (e) => {
        e.dataTransfer.setData("text", e.target.id);
        e.effectAllowed = "copyMove";
    };

    const handleDragEnd = (e) => {
        e.dataTransfer.clearData();
    };

    return(
        <div id="container" ref={containerRef} draggable="true" className="container-container" onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <p>Container</p>
        </div>
    );
};

export default Container;