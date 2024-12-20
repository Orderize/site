import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import "./Search.css"

function Search() {
    return (
        <>
            <div className="container-search">
                <label htmlFor="search">
                    <i className="icon-search">
                        <MagnifyingGlass />
                    </i>
                </label>
                <input id="search" type="text" placeholder="Pesquisar" />
            </div>
        </>
    )
}

export default Search;