import React, { useState } from "react";
import "./Index.css";

import Breadcrumb from "@/components/Breadcrumb/Index";
import InputSearch from "@/components/InputSearch/InputSearch";

const WrapBreadcrumbInput = ({ activeBreadcrumb, inputText, getDataByInput, setData }) => {
    const [valueSearch, setValueSearch] = useState("");

    async function handleSearch(event) {
        const value = event.target.value;
        setValueSearch(value);
        const data = await getDataByInput(value);
        setData(data);
    };

    return (
        <div className="container-wrapBreadcrumbInput">
            <Breadcrumb activeButton={activeBreadcrumb} />
            <div className="search">
                <InputSearch 
                    valueSearch={valueSearch} 
                    handleSearch={handleSearch} 
                    text={inputText}
                />
            </div>
        </div>
    )
}

export default WrapBreadcrumbInput;