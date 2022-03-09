import React from "react";
import "./Navigation.css"

function Navigation({onRouteChange, isSignedIn}) {
    if (isSignedIn) {
        return (
            <nav>
                <p onClick={() => onRouteChange("signout")}>Sign Out</p>
            </nav>
        )
    }
    return (
        <nav>
            <p onClick={() => onRouteChange("signin")} style={{marginRight: "15px"}}>Sign In</p>
            <p onClick={() => onRouteChange("register")}>Register</p>
        </nav>
    )
}

export default Navigation;