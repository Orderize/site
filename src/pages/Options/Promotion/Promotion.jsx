import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "@/components/Breadcrumb/Index";
import Navbar from "@/components/Navbar/Index";
import SelectPizzaPromo from "@/modals/select_pizza_promo/selectPizzaPromo.jsx"; 
import "./Promotion.css";
import { getPromotions } from "@/api/services/Promotion.js";
import InputSearch from "@/components/InputSearch/InputSearch";
import WrapBreadcrumbInput from "@/components/WrapBreadcrumbInput/Index";
import { useAuth } from "../../../hooks/useAuth";

function Promotion() {
    const { token } = useAuth();
    const [promotions, setPromotions] = useState([]);
    const [isSelectPizzaModalOpen, setIsSelectPizzaModalOpen] = useState(false);

    const handlePromotions = async () => {
        const data = await getPromotions();
        setPromotions(data);
    };

    const openSelectPizzaModal = () => {
        setIsSelectPizzaModalOpen(true);
    };
    
    const closeSelectPizzaModal = () => {
        if (isSelectPizzaModalOpen) {  
            setIsSelectPizzaModalOpen(false);
        } else {
            alert("Por favor, selecione pelo menos uma opção antes de continuar.");
        }
    };

    useEffect(() => {
        if (token) {
            handlePromotions();
        }
    }, [token]);

    return (
        <>
            <Navbar activeButton={"Opções"} subActiveButton={"Promo"} />
            <main className="container-promotion">
                <h1>Gerenciamento</h1>
                <WrapBreadcrumbInput 
                    activeBreadcrumb="brindes" 
                    inputText="Pesquise pelo nome da promoção"
                    getDataByInput={getPromotions}
                    setData={setPromotions}
                />
                <div className="btn-add-wrapper">
                    <button className="btn-add-promotion" onClick={openSelectPizzaModal}>Adicionar promoção +</button>
                </div>
                <div className="promotion-wrapper">
                    <div className="promotion-header">
                        <span>Nome da Promoção</span>
                        <span>Data Final</span>
                        <span>Descrição</span>
                        <span>Possui Alguma Condição?</span>
                    </div>
                    <div className="promotion-list" style={{ overflowY: 'scroll', maxHeight: '500px' }}>
                        {
                            promotions.length > 0 &&
                            promotions.map(promotion => (
                            <div className="promotion-item" key={promotion.id}>
                                <span>{promotion.name}</span>
                                <span>{promotion.endDate}</span>
                                <span>{promotion.description}</span>
                                <span>{promotion.conditions ? "sim" : "não"}</span>
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
