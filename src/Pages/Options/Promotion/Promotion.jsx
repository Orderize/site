import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Navbar from "../../../Components/Navbar/Navbar";
import SelectPizzaPromo from "/src/Components/Modal/select_pizza_promo/selectPizzaPromo.jsx"; 
import "./Promotion.css";
import { getPromotions } from "/src/api/services/Promotion.js";
import InputSearch from "../../../Components/InputSearch/InputSearch";

function Promotion() {
    const [valueSearch, setValueSearch] = useState("");
    const [promotions, setPromotions] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [isSelectPizzaModalOpen, setIsSelectPizzaModalOpen] = useState(false);

    const handleSearchChange = (e) => {
        setValueSearch(e.target.value);
    };

    const handlePromotions = async () => {
        try {
            const data = await getPromotions(token);
            setPromotions(data);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    const handleSearch = async (event) => {
        const value = event.target.value;
        setValueSearch(value);
        try {
            const data = await getPromotions(token, value);
            setPromotions(data);
            console.log(data);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    const openSelectPizzaModal = () => {
        setIsSelectPizzaModalOpen(true);
    };
    
    const closeSelectPizzaModal = () => {
        if (isOptionSelected) {  
            setIsSelectPizzaModalOpen(false);
        } else {
            alert("Por favor, selecione pelo menos uma opção antes de continuar.");
        }
    };

    useEffect(() => {
        handlePromotions();
    }, []);

    return (
        <>
            <Navbar activeButton={"Opções"} subActiveButton={"Promo"} />
            <main className="container-promotion">
                <h1>Gerenciamento</h1>
                <div className="breadcrumb-search">
                    <Breadcrumb activeButton={"brindes"} />
                    <InputSearch valueSearch={valueSearch} handleSearch={handleSearch}/>
                </div>
                <div className="btn-add-wrapper">
                    <button className="btn-add-promotion" onClick={openSelectPizzaModal}>Adicionar promoção +</button>
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
                        {
                            promotions.length > 0 &&
                            promotions.map(promotion => (
                            <div className="promotion-item" key={promotion.id}>
                                <span>{promotion.name}</span>
                                <span>{promotion.dates}</span>
                                <span className={`status ${promotion.status === "Ativa" ? "active" : "inactive"}`}>{promotion.status}</span>
                                <span>{promotion.icons}</span>
                                <span>{promotion.available}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            {isSelectPizzaModalOpen && <SelectPizzaPromo onClose={closeSelectPizzaModal} />}
        </>
    );
}

export default Promotion;
