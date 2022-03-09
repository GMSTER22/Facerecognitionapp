import React from "react";
import "./Rank.css"

function Rank(props) {
    return (
        <div className="rank">
            <div className="white f2">
                {`${props.name}, your current rank is ...`}
            </div>
            <div className="white f1">
                {props.entries}
            </div>
        </div>
    )
}

export default Rank;