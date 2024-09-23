import React from "react";
import "./beneficio.css"

function Beneficio({ icon, title }) {
    return (
        <div className="beneficio">
            <img src={icon}/>
            <h3>{title}</h3>
        </div>
    );
}

export default Beneficio;