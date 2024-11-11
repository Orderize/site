import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Item from "../../../Components/Item/Item";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Flavor.css"
import { getFlavorsPop } from "../../../api/services/Flavors";
import InputSearch from "../../../Components/InputSearch/InputSearch";


function flavor() {
    const [valueSearch, setValueSearch] = useState("");
    const [flavors, setFlavors] = useState([]);
    const [token] = useState(localStorage.getItem('token'));


    const handleFlavors = async (event) => {
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
    
    useEffect(() => {
        handleFlavors();
    }, []);

    return (
        <>
            <Navbar roles={"attendant"} activeButton={"Opções"} subActiveButton={"Sabores"} />
            <main className="container-flavor">
                <h1>Opções</h1>
                <div className="breadcrumb-search">
                    <Breadcrumb activeButton={"sabores"} />
                    <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome do sabor"/>
                </div>
                <section className="flavor-list">
                    {
                            flavors.length > 0 && 
                            flavors.map(flavor => {
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
        </>
    );
}

export default flavor;