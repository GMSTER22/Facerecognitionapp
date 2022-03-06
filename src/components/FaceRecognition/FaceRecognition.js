import React from "react";
import "./FaceRecognition.css";

function FaceRecognition({imgSource, facesLocation}) {

    return (
        <div className="facerecognition">
            <img
            id="inputImage" 
            src={imgSource} 
            alt="submitted face" 
            />
            {facesLocation.map(faceLocation => {
                const faceBoxStyling = {
                    top: `${faceLocation.top}px`,
                    left: `${faceLocation.left}px`,
                    right: `${faceLocation.right}px`,
                    bottom: `${faceLocation.bottom}px`
                }
                return (
                    <div className="box" 
                    style={faceBoxStyling}>
                        
                    </div>
                )
            } )}
        </div>
    )
}

export default FaceRecognition;