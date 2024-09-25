import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Navbar from "../../components/navbar/Navbar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import "./Flavor.css"


function flavor() {
    const [valueSearch, setValueSearch] = useState("");

    const enter = () => {
        console.log(valueSearch);
    }

    return (
        <>
            <Navbar activeButton={"Opções"} />
            <main className="container-flavor">
                <h1>Opções</h1>
                <Breadcrumb activeButton={"sabores"} />
                <div className="comp-search">
                    <label htmlFor="search">
                        <button onClick={enter} className="icon-search">
                            <MagnifyingGlass size={25} weight="bold" />
                        </button>
                    </label>
                    <input 
                        id="search" 
                        type="text" 
                        value={valueSearch}
                        onChange={e => {setValueSearch(e.target.value)}}
                        onKeyDown={e => { e.key === "Enter" ? enter() : null}}
                        className="input-search"
                        placeholder="Pesquisar"
                    />
                </div>
                <section className="client-modal">
                    <h2>Selecione o cliente:</h2>
                    <div className="client-modal-card">
                        <h2>Cliente</h2>
                    </div>
                    <button>Proximo</button>
                </section>
            </main>
        </>
    );
}

export default flavor;