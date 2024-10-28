import React, { useState } from "react";

function InputSearch({ handleSearch, valueSearch }) {    
    return (
        <>
            <input 
                id="search" 
                type="text" 
                value={valueSearch}
                onChange={handleSearch}
                onKeyDown={e => { e.key === "Enter" ? enter() : null }}
                className="input-search"
                placeholder="Pesquisar" 
            />
        </>
    )
}

export default InputSearch;