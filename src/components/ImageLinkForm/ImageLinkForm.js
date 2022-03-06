import React from "react";
import "./ImageLinkForm.css"

function ImageLinkForm(props) {
    return (
        <div>
            <p className="f2">
                {"This Magic App will detect faces in your pictures. Give it a try."}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" onChange={props.onInputChange} />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-blue" onClick={props.onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;