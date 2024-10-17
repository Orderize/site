import React from "react";
import "./Kpi.css";

function Kpi({ background, color, title, value }) {
    
    const style = {
        background: background,
        color: color
    }

    return (
        <>
            <div style={style} className="container-kpi">
                <p>{title}</p>
                <p className="value">{value}</p>
            </div>
        </>
    )
}

export default Kpi;