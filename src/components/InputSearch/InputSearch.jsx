import React, { useState } from "react";
import styles from "./InputSearch.module.css";

function InputSearch({ handleSearch, valueSearch, text }) {    
    return (
        <>
            <input 
                id="search" 
                type="text" 
                value={valueSearch}
                onChange={handleSearch}
                onKeyDown={e => { e.key === "Enter" ? enter() : null }}
                className={styles["input-search"]}
                placeholder={text} 
            />
        </>
    )
}

export default InputSearch;