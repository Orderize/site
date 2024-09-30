import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Item from "../../components/Item/Item";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Flavor.module.css"


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
            <Navbar activeButton={"Opções"} />
            <main className={styles["container-flavor"]}>
                <h1>Opções</h1>
                <div className={ styles["breadcrumb-search"] }>
                    <Breadcrumb activeButton={"sabores"} />
                    <div className={styles["comp-search"]}>
                        <label htmlFor="search">
                            <button onClick={enter} className={styles["icon-search"]}>
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