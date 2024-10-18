import React, { useEffect, useState } from "react";
import { Log, MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Item from "../../../Components/Item/Item";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Flavor.css"
import api from "../../../services/api";


function flavor() {
    const [valueSearch, setValueSearch] = useState("");
    const [pizzas, setPizzas] = useState([]);
    const [token] = useState(localStorage.getItem('token'));

    const enter = () => {
        console.log(valueSearch);
    }


    const handleFlavors = async (event) => {
        try {
            const response = await api.get('/pizzas', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                const status = response.status;
                const data = response.data;
                
                return {data, status};                
            })
            .catch(error => {
                console.log(error);
            });
            
            if (response.status == 200) {
                console.log(response.data);
                setPizzas(response.data);
            }

        } catch (error) {
            // FAZER UM MODAL AQUI PARA FALAR SOBRE O ERRO
            const message = "Erro ao fazer requisição. Aguarde um momento e recarregue a página.";
            alert(message)
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
                            pizzas.map(pizza => {
                            return <Item 
                                type={"flavor"}
                                cod={pizza.idPizza}
                                key={pizza.idPizza}
                                name={pizza.name}
                                price={pizza.price}
                                description={pizza.observations}
                            />
                        })
                    }
                </section>
            </main>
        </>
    );
}

export default flavor;