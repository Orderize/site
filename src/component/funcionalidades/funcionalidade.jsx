import React from "react";
import "./funcionalidade.css";
import { CiCirclePlus } from 'react-icons/ci';

function funcionalidade({ icon, title, style}) {
    return (
        <div className="funcionalidade" style={style}>
            <img src={icon}/>
            <div className="titlePlus">
                <h3>{title}</h3>
                <CiCirclePlus className='iconPlus'/>
            </div>
        </div>
    );
}

export default funcionalidade;