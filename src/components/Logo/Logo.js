import React from "react";
import Tilt from "react-tilt";
import face from "./face.png";
import "./Logo.css"; 

function Logo() {
    return (
        <div className="logo">
            <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150, borderRadius: 15 }} >
                <div className="Tilt-inner">
                    <img src={face} alt="face" /> 
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;