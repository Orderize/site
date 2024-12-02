import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Item from "../../../Components/Item/Item";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Drink.css"
import { getDrinks } from "../../../api/services/Drinks";
import InputSearch from "../../../Components/InputSearch/InputSearch";
import AddNewDrink from "../../../Components/Modal/New_drink/AddNewDrink";
import { toast } from "react-toastify";

export const isUserOwner = (roles) => roles.some(role => role.name == "OWNER");

function flavor(isOwner) {
    const [valueSearch, setValueSearch] = useState("");
    const [drink, setDrink] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDrink = async (event) => {
        try {
            const params = {
                name: "",
                milimeters: ""
            };
            
            const data = await getDrinks(token, params);
            setDrink(data);
        } catch (error) {
            toast.error(error.message)
            console.error(error);
        }
    };

    const handleSearch = async (event) => {
        const value = event.target.value;
        setValueSearch(value);
        try {
            const params = {
                name: value,
                milimeters: null
            };

            const data = await getDrinks(token, params);
            setDrink(data);
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
        handleDrink();
    }, []);

    return (
        <>
            <Navbar activeButton={"Opções"} subActiveButton={"Bebidas"} />
            <main className="container-flavor">
                <h1>Opções</h1>
                <div className="breadcrumb-search">
                    <Breadcrumb activeButton={"bebidas"} />

                    <div className="search">
                        <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome da bebida"/>
                    </div>
                </div>

                {isOwner &&
                    <div className="btn-add-wrapper">
                        <button className="btn-add-promotion" onClick={openModal}>Adicionar bebida +</button>
                    </div>
                }
                
                <section className="flavor-list">
                    {
                            drink.length > 0 && 
                            drink.map(flavor => {
                            return <Item 
                                type={"flavor"}
                                cod={flavor.id}
                                key={flavor.id}
                                name={flavor.name}
                                price={flavor.price}
                                description={flavor.description}
                            />
                        })
                    }
                </section>
            </main>

            {isModalOpen &&
                <AddNewDrink onClose={closeModal}/>
            }
        </>
    );
}

export default flavor;