import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Item from "../../../Components/Item/Item";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Flavor.css"
import { getPops } from "../../../api/services/Flavors";


function flavor() {
    const [valueSearch, setValueSearch] = useState("");
    const [flavors, setFlavors] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    const enter = () => {
        console.log(valueSearch);
    }


    const handleFlavors = async (event) => {
        try {
            const data = await getPops(token);
            setFlavors(data);
        } catch (error) {
            // FAZER UM MODAL AQUI PARA FALAR SOBRE O ERRO
            alert(error.message)
            console.log(error);
        }
    };
    
    useEffect(() => {
        handleFlavors();
    }, []);

    return (
        <>
            <Navbar role={"attendant"} activeButton={"Opções"} />
            <main className="container-flavor">
                <h1>Opções</h1>
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