import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "@/components/Breadcrumb/Index";
import Item from "@/components/Item/Item";
import Navbar from "@/components/Navbar/Index";
import "./Index.css"
import { getDrinksPop, getDrinks } from "@/api/services/Drinks";
import Drink from "@/modals/Drink/Drink"
import InputSearch from "@/components/InputSearch/InputSearch";
import AddNewDrink from "@/modals/New_drink/AddNewDrink";
import { toast } from "react-toastify";
import ListItens from "../../../components/ListItens/Index";
import WrapBreadcrumbInput from "../../../components/WrapBreadcrumbInput/Index";
import { useAuth } from "../../../hooks/useAuth";
import { isOwner } from "../../../utils/user/userRoles";

function drink() {
    const { token, user } = useAuth();
    const [drink, setDrink] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDrink = async () => {
        const data = await getDrinksPop();
        setDrink(data);
    };

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    
    useEffect(() => {
        if (token) {
            handleDrink();
        }
    }, [token]);

    return (
        <>
            <Navbar activeButton={"Opções"} subActiveButton={"Bebidas"} />
            <main className="container-drink">
                <h1>Opções</h1>
                <WrapBreadcrumbInput 
                    activeBreadcrumb="bebidas" 
                    inputText="Pesquise pelo nome do bebida"
                    getDataByInput={getDrinks}
                    setData={setDrink}
                />
                {isOwner(user) &&
                    <div className="btn-add-wrapper">
                        <button className="btn-add-promotion" onClick={openModal}>Adicionar bebida +</button>
                    </div>
                }
                
                <ListItens itens={drink}/>
            </main>

            {isModalOpen &&
                <AddNewDrink onClose={closeModal}/>
            }
        </>
    );
}

export default drink;