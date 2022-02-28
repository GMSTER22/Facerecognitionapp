import React from "react";
import Tilt from "react-tilt";
import face from "./face.png";
import "./Logo.css"; 

function Logo() {
    return (
        <div className="logo">
            <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img src={face} alt="face" /> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;