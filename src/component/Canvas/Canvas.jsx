import '../../css/canvas.scss';
import React, {useCallback, useEffect, useRef, useState} from "react";
import Resizer from "../Resizer/Resizer.jsx";

// import { Logger } from "../../module/logger";
// const logger = Logger({className: "Canvas"});

const Canvas = () => {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [currentTarget, setCurrentTarget] = useState("default-container");

    const elementStructure = useRef({
        "container-canvas": []
    });

    document.body.addEventListener("click", (e) => {
        const contextMenu = document.getElementById("context-menu");
        if (e.target.offsetParent !== contextMenu) {
            contextMenu.classList.remove("show");
        }
    });

    const handleDrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text");
        if (id === "container") {
            const newNode = document.getElementById(id).cloneNode(true);
            const resizer = document.getElementById("resizer").cloneNode(true);
            if (!elementStructure.current[e.target.id]) elementStructure.current[e.target.id] = [];
            newNode.id = e.target.id + "." + id + "-" + (elementStructure.current[e.target.id].length+1);
            newNode.className = "container-container-copied";
            newNode.style.height = "auto";
            newNode.draggable = false;
            newNode.onDrop = handleDrop;
            newNode.onDragOver = handleDragOver;
            resizer.style.display = "block";
            resizer.addEventListener("mousedown", handleResizeStart);
            newNode.appendChild(resizer);
            newNode.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                const contextMenu = document.getElementById("context-menu");
                contextMenu.style.top = e.clientY + "px";
                contextMenu.style.left = e.clientX + "px";
                contextMenu.classList.add("show");
            });
            e.target.appendChild(newNode);
            elementStructure.current[e.target.id].push(newNode.id);
        }
    };

    const handleDragOver = (e) => {
        e.currentTarget.style.borderColor = "green";
        e.preventDefault();
    };

    const resize = useCallback((e) => {
        const dx = position.x - e.x;
        const dy = position.y - e.y;
        const parentNode = document.getElementById(currentTarget);
        console.log(currentTarget)
        const currentH = parentNode.clientHeight;
        const currentW = parentNode.clientWidth;
        parentNode.style.width = currentW + dx + " px";
        parentNode.style.height = currentH + dy + " px";
        setPosition({x: currentW+dx, y: currentH+dy});
    }, [currentTarget]);

    const handleResizeStart = (ev) => {
        setCurrentTarget(ev.target.parentNode.id);
        setPosition({x: ev.x, y: ev.y});
        ev.preventDefault();
        document.addEventListener("mousemove", resize, false);
        document.addEventListener("mouseup", handleResizeEnd, false);
    };

    const handleResizeEnd = (ev) => {
        console.log("End resize");
        ev.preventDefault();
        document.removeEventListener("mousemove", resize, false);
    };

    return(
        <div id={"container-canvas"} className="container-canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
            <div id={"default-container"} className={"default-container"}></div>
            <Resizer/>
        </div>
    );
};

export default Canvas;