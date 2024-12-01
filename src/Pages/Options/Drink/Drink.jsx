import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Item from "../../../Components/Item/Item";
import Navbar from "../../../Components/Navbar/Navbar";
import "./Drink.css"
import { getDrinks } from "../../../api/services/Drinks";
import Drink from "../../../Components/Modal/Drink/Drink"
import InputSearch from "../../../Components/InputSearch/InputSearch";
import { toast } from "react-toastify";


function flavor() {
    const [valueSearch, setValueSearch] = useState("");
    const [drink, setDrink] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [user] = useState(JSON.parse(localStorage.getItem('user')))

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
                    <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} />
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