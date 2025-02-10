import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "@/components/Breadcrumb/Index";
import Item from "@/components/Item/Item";
import Navbar from "@/components/Navbar/Index";
import { getFlavorsPop } from "/src/api/services/Flavors";
import AddNewFlavor from "@/modals/New_flavor/Add_new_flavor.jsx";
import InputSearch from "@/components/InputSearch/InputSearch";
import "./Index.css"
import ListItens from "../../../components/ListItens/Index";
import WrapBreadcrumbInput from "../../../components/WrapBreadcrumbInput/Index";
import { useAuth } from "../../../hooks/useAuth";
import { isOwner } from "../../../utils/user/userRoles";

export const isUserOwner = (roles) => roles.some(role => role.name == "OWNER");

function flavor() {
    const { token, user } = useAuth()
    
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
        if (token) {
            handleFlavors();
        }
    }, [token]);

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

                {isOwner(user) &&
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