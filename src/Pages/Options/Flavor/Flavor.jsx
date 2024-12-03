import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Item from "../../../Components/Item/Item";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Flavor.css"
import { getFlavorsPop } from "/src/api/services/Flavors";
import AddNewFlavor from "/src/Components/Modal/New_flavor/Add_new_flavor.jsx";
import InputSearch from "../../../Components/InputSearch/InputSearch";

export const isUserOwner = (roles) => roles.some(role => role.name == "OWNER");


function flavor(isOwner) {
    const [valueSearch, setValueSearch] = useState("");
    const [flavors, setFlavors] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleFlavors = async () => {
        try {
            const data = await getFlavorsPop(token);
            setFlavors(data);
        } catch (error) {
            // FAZER UM MODAL AQUI PARA FALAR SOBRE O ERRO
            alert(error.message)
            console.log(error);
        }
    };

    const handleSearch = async (event) => {
        const value = event.target.value;
        setValueSearch(value);
        try {
            const data = await getFlavorsPop(token, value);
            setFlavors(data);
            console.log(data);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

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

                <div className="breadcrumb-search">
                    <Breadcrumb activeButton={"sabores"} />
                    <div className="search">
                        <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome do sabor"/>
                    </div>
                </div>

                {/* {isOwner &&
                    <div className="btn-add-wrapper">
                        <button className="btn-add-promotion" onClick={openModal}>Adicionar sabor +</button>
                    </div>
                } */}

                <section className="flavor-list">
                    {
                            flavors.length > 0 && 
                            flavors.map((flavor, idx) => {
                            return <Item 
                                index={idx+1}
                                type={"flavor"}
                                cod={flavor.id}
                                key={idx}
                                name={flavor.name}
                                price={flavor.price}
                                description={flavor.description}
                            />
                        })
                    }
                </section>
            </main>

            {isModalOpen &&
                <AddNewFlavor onClose={closeModal}/>
            }
        </>
    );
}

export default flavor;