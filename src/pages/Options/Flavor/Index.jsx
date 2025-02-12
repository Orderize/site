// pages/options/Flavor/Index.js

import "./Index.css"
import React, { useEffect, useState } from "react";
import { getFlavorsPop } from "@/api/services/Flavors";
import ListItens from "@/components/ListItens/Index";
import Navbar from "@/components/Navbar/Index";
import WrapBreadcrumbInput from "@/components/WrapBreadcrumbInput/Index";
import AddNewFlavor from "@/modals/New_flavor/Add_new_flavor.jsx";
import { isOwner } from "@/utils/user/userRoles";

function flavor() {
    const [flavors, setFlavors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFlavors = async () => {
        const data = await getFlavorsPop();
        setFlavors(data);
    };

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        handleFlavors();
    }, []);

    return (
        <>
            <Navbar activeButton={"Opções"} subActiveButton={"Sabores"} />
            <main className="container-flavor">
                <h1>Opções</h1>

                <WrapBreadcrumbInput 
                    activeBreadcrumb="sabores" 
                    inputText="Pesquise pelo nome do sabor"
                    getDataByInput={getFlavorsPop}
                    setData={setFlavors}
                />

                {isOwner() &&
                    <div className="btn-add-wrapper">
                        <button className="btn-add-promotion" onClick={openModal}>Adicionar sabor +</button>
                    </div>
                }

                <ListItens itens={flavors}/>
            </main>

            {isModalOpen &&
                <AddNewFlavor onClose={closeModal}/>
            }
        </>
    );
}

export default flavor;