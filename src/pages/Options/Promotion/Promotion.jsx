import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Promotion.css";

function Promotion() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const enter = () => {
        console.log(valueSearch);
    }

    const pizzas = [
        { name: "Promoção de Pizza 1", dates: "01/10/2024 - 31/10/2024", status: "Ativa", icons: "🍕🍷", available: "Sim" },
        { name: "Promoção de Pizza 2", dates: "05/10/2024 - 15/10/2024", status: "Inativa", icons: "🍕", available: "Não" },
        { name: "Promoção de Pizza 3", dates: "10/10/2024 - 20/10/2024", status: "Ativa", icons: "🍕🍺", available: "Sim" },
        { name: "Promoção de Pizza 4", dates: "15/10/2024 - 25/10/2024", status: "Ativa", icons: "🍕", available: "Sim" },
        { name: "Promoção de Pizza 5", dates: "20/10/2024 - 30/10/2024", status: "Inativa", icons: "🍕🍷", available: "Não" },
        { name: "Promoção de Pizza 6", dates: "25/10/2024 - 05/11/2024", status: "Ativa", icons: "🍕", available: "Sim" },
        { name: "Promoção de Pizza 7", dates: "30/10/2024 - 10/11/2024", status: "Inativa", icons: "🍕🍺", available: "Não" },
        { name: "Promoção de Pizza 8", dates: "05/11/2024 - 15/11/2024", status: "Ativa", icons: "🍕", available: "Sim" },
        { name: "Promoção de Pizza 9", dates: "10/11/2024 - 20/11/2024", status: "Inativa", icons: "🍕", available: "Não" },
        { name: "Promoção de Pizza 10", dates: "15/11/2024 - 25/11/2024", status: "Ativa", icons: "🍕🍷", available: "Sim" },
        { name: "Promoção de Pizza 11", dates: "20/11/2024 - 30/11/2024", status: "Ativa", icons: "🍕", available: "Sim" },
        { name: "Promoção de Pizza 12", dates: "25/11/2024 - 05/12/2024", status: "Inativa", icons: "🍕🍺", available: "Não" },
    ];

    return (
        <>
            <Navbar activeButton={"Opções"} />
            <main className="container-promotion">
                <h1>Gerenciamento</h1>
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
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={e => { e.key === "Enter" ? enter() : null}}
                            className="input-search"
                            placeholder="Pesquisar"
                        />
                    </div>
                </div>
                <div className="btn-add-wrapper">
                    <button className="btn-add-promotion">Adicionar promoção +</button>
                </div>
                <div className="promotion-wrapper">
                    <div className="promotion-header">
                        <span>Nome da Promoção</span>
                        <span>Data Inicial e Final</span>
                        <span>Status</span>
                        <span>Itens Incluídos</span>
                        <span>Possui Alguma Condição?</span>
                    </div>
                    <div className="promotion-list" style={{ overflowY: 'scroll', maxHeight: '500px' }}>
                        {pizzas.map((pizza, index) => (
                            <div className="promotion-item" key={index}>
                                <span>{pizza.name}</span>
                                <span>{pizza.dates}</span>
                                <span className={`status ${pizza.status === "Ativa" ? "active" : "inactive"}`}>{pizza.status}</span>
                                <span>{pizza.icons}</span>
                                <span>{pizza.available}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Promotion;
