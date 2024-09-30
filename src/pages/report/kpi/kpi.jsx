import React from "react";
import "./kpi.css";

function kpi({ background, color, title, value }) {
    
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

export default kpi;