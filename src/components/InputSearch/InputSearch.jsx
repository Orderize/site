import React, { useState } from "react";
import styles from "./InputSearch.module.css";
import { MagnifyingGlass } from "@phosphor-icons/react";

function InputSearch({ handleSearch, valueSearch, text }) {    
    return (
        <>
        <div className={styles["input-search-container"]}>
            <MagnifyingGlass size={25} weight="duotone" />

            <input 
                id="search" 
                type="text" 
                value={valueSearch}
                onChange={handleSearch}
                onKeyDown={e => { e.key === "Enter" ? enter() : null }}
                className={styles["input-search"]}
                placeholder={text} 
            />
        </div>
        </>
    )
}

export default InputSearch;