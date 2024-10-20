import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Item from "../../../Components/Item/Item";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Flavor.css"


function flavor() {
    const [valueSearch, setValueSearch] = useState("");

    const enter = () => {
        console.log(valueSearch);
    }

    const sabores = [
        {type: "flavor", cod: 123, flavor: "Calabresa", price: "12.30", description: "dasdçlasmd"},
        {type: "flavor", cod: 123, flavor: "Calabresa", price: "12.30"},
        {type: "flavor", cod: 123, flavor: "Calabresa", price: "12.30", description: "dasdçlasmd"},
        {type: "flavor", cod: 123, flavor: "Calabresa", price: "12.30"},
        {type: "flavor", cod: 123, flavor: "Calabresa", price: "12.30", description: "dasdçlasmd"},
        {type: "flavor", cod: 123, flavor: "Calabresa", price: "12.30"},
        {type: "flavor", cod: 123, flavor: "Calabresa", price: "12.30", description: "dasdçlasmd"},
        {type: "flavor", cod: 123, flavor: "Calabresa", price: "12.30"},
        {type: "flavor", cod: 123, flavor: "Calabresa", price: "12.30", description: "dasdçlasmd"},
        {type: "flavor", cod: 123, flavor: "Calabresa", price: "12.30"},
    ]
    
    return (
        <>
            <Navbar role={"attendant"} activeButton={"Opções"} />
            <main className="container-flavor">
                <h1>Opções</h1>
                <div className="breadcrumb-search">
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
                </div>
                <section className="flavor-list">
                    {
                            sabores.map(sabor => {
                            return <Item 
                                type={sabor.type}
                                cod={sabor.cod}
                                key={sabor.cod}
                                flavor={sabor.flavor}
                                price={sabor.price}
                                description={"dsaoidsahoidhsaoihdas"}
                            />
                        })
                    }
                </section>
            </main>
        </>
    );
}

export default flavor;