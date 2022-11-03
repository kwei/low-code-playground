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
            if (!elementStructure.current[e.target.id]) elementStructure.current[e.target.id] = [];
            newNode.id = e.target.id + "." + id + "-" + (elementStructure.current[e.target.id].length+1);
            newNode.className = "container-container-copied";
            newNode.innerHTML = "container";
            newNode.style.height = "auto";
            newNode.style.marginTop = "30px";
            newNode.onDrop = handleDrop;
            newNode.onDragOver = handleDragOver;
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

    return(
        <div id={"container-canvas"} className="container-canvas" onDrop={handleDrop} onDragOver={handleDragOver}>

        </div>
    );
};

export default Canvas;