import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Item from "../../../Components/Item/Item";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Drink.css"
import { getDrinksPop } from "../../../api/services/Drinks";


function flavor() {
    const [valueSearch, setValueSearch] = useState("");
    const [drink, setDrink] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    const enter = () => {
        console.log(valueSearch);
    }


    const handleDrink = async (event) => {
        try {
            const data = await getDrinksPop(token);
            setDrink(data);
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
            const data = await getDrinksPop(token, value);
            setDrink(data);
            console.log(data);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }
    
    useEffect(() => {
        handleDrink();
    }, []);

    return (
        <>
            <Navbar role={"attendant"} activeButton={"Opções"} subActiveButton={"Bebidas"} />
            <main className="container-flavor">
                <h1>Opções</h1>
                <div className="breadcrumb-search">
                    <Breadcrumb activeButton={"bebidas"} />
                    <div className="comp-search">
                        <input 
                            id="search" 
                            type="text" 
                            value={valueSearch}
                            onChange={handleSearch}
                            onKeyDown={e => { e.key === "Enter" ? enter() : null}}
                            className="input-search"
                            placeholder="Pesquisar"
                        />
                    </div>
                </div>
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
        </>
    );
}

export default flavor;