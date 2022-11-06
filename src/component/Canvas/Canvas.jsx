import '../../css/canvas.scss';
import React, {useRef} from "react";

// import { Logger } from "../../module/logger";
// const logger = Logger({className: "Canvas"});

const Canvas = () => {

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
            newNode.innerHTML = "container";
            newNode.style.height = "auto";
            newNode.draggable = false;
            newNode.onDrop = handleDrop;
            newNode.onDragOver = handleDragOver;
            resizer.style.display = "block";
            resizer.onMouseDown = handleResizeStart;
            resizer.onMouseUp = handleResizeEnd;
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
            console.log(JSON.parse(JSON.stringify(elementStructure.current)));
        }
    };

    const handleDragOver = (e) => {
        e.currentTarget.style.borderColor = "green";
        e.preventDefault();
    };

    const resize = (e, ev = null) => {
        const dx = ev.x - e.x;
        const dy = ev.y - e.y;
        console.log(dx, dy);
        const parentNode = document.getElementById(ev.target.parentNode.id);
        const currentH = parentNode.clientHeight;
        const currentW = parentNode.clientWidth;
        console.log(currentH, currentW);
        parentNode.style.width = currentW + dx + "px";
        parentNode.style.height = currentH + dy + "px";
    };

    const handleResizeStart = (ev) => {
        console.log("Start resize");
        ev.preventDefault();
        document.addEventListener("mousemove", (e) => resize(e, ev), false);
    };

    const handleResizeEnd = (ev) => {
        console.log("End resize");
        ev.preventDefault();
        document.removeEventListener("mousemove", resize, false);
    };

    return(
        <div id={"container-canvas"} className="container-canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
            <div id={"default-container"} className={"default-container"}></div>
            <div id={"resizer"} className={"resizer"} onMouseDown={handleResizeStart} onMouseUp={handleResizeEnd}></div>
        </div>
    );
};

export default Canvas;