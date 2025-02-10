import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Item from "@/components/Item/Item";
import Navbar from "@/components/Navbar/Index";
import "./Drink.css"
import { getDrinks } from "@/api/services/Drinks";
import Drink from "@/modals/Drink/Drink"
import InputSearch from "@/components/InputSearch/InputSearch";
import AddNewDrink from "@/modals/New_drink/AddNewDrink";
import { toast } from "react-toastify";
import CardProduto from "../../../Components/CardProduto/CardProduto";
import drinkImage from '../../../utils/assets/drinkImage.svg';
import ConfirmModal from "../../../Components/Modal/ConfirmModal/ConfirmModal";
import EditModal from "../../../Components/Modal/EditModal/EditModal";
import AddModal from "../../../Components/Modal/AddModal/AddModal";
import ActionButton from "../../../Components/ActionButton/ActionButton";
import { getDrinks, saveDrink, updateDrink, deleteDrink } from "../../../api/services/Drinks";

export const isUserOwner = (roles) => roles.some(role => role.name == "OWNER");

function flavor(isOwner) {
    const [valueSearch, setValueSearch] = useState("");
    const [drink, setDrink] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [confirmModal, setConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState(null);
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
                milimeters: ""
            };

            const data = await getDrinks(token, params);
            setDrink(data);
            console.log(data);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }

    const handleAddClick = () => {
        setAddModal(true);
    };

    const handleAddDrink = async (newDrink) => {
        try {
            console.log(newDrink);
            await saveDrink(token, newDrink);

            handleDrink();
            toast.success("Bebida adicionada com sucesso!");
            setAddModal(false);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const handleEditClick = (drink) => {
        setSelectedProduto(drink);
        setEditModal(true);
    };

    const handleUpdateDrink = async (idDrink, drink) => {
        try {
            console.log('handleUpdateDrink '+ idDrink, drink);
            await updateDrink(token, idDrink, drink);
            handleDrink();
            toast.success(`Bebida ${drink.name} editada com sucesso!`);
            setEditModal(false);
            setSelectedProduto(null);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const handleDeleteClick = (drink) => {
        setSelectedProduto(drink);
        setConfirmModal(true); 
    };  

    const handleDeleteDrink = async (idDrink) => {
        try {
            await deleteDrink(token, idDrink);
            handleDrink();
            toast.success(`Bebida ${selectedProduto.name} excluída com sucesso!`);
            setConfirmModal(false);
            setSelectedProduto(null);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };
    
    const handleConfirmDelete = () => {
        toast.success(`Bebida ${selectedProduto.name} excluída com sucesso!`);
        setConfirmModal(false); 
        setSelectedProduto(null);
    };
    
    useEffect(() => {
        handleDrink();
    }, []);

    return (
        <>
            <Navbar activeButton={"Opções"} subActiveButton={"Bebidas"} />
            <main className={styles["container-flavor"]}>
                <h1>Opções</h1>
                <div className={styles["breadcrumb-search"]}>
                    <Breadcrumb activeButton={"bebidas"} />

                    <div className={styles["search"]}>
                        <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome da bebida"/>
                    </div>
                </div>

                {isOwner &&
                    <div className={styles["btn-add-wrapper"]}>
                        <ActionButton 
                            label="Adicionar bebida" 
                            onClick={() => handleAddClick()}
                            action="add" 
                            width="200px" 
                            height="30px" 
                        />
                    </div>
                }
                
                <section className={styles["flavor-list"]}>
                    {
                            drink.length > 0 && 
                            drink.map(drink => {

                            return <CardProduto 
                                key={drink.id}
                                imagem={drinkImage}
                                titulo={drink.name + " " + drink.milimeters + "ml" }
                                subtitulo={drink.id}
                                preco={drink.price}
                                descricao={drink.description}
                                onEdit={() => handleEditClick(drink)}
                                onDelete={() => handleDeleteClick(drink)}
                            />
                        })
                    }
                </section>

                <ConfirmModal
                    isOpen={confirmModal}
                    onClose={() => setConfirmModal(false)}
                    onConfirm={() => handleDeleteDrink(selectedProduto?.id)}
                    title="Confirmar exclusão"
                    message={`Deseja realmente excluir a bebida: ${selectedProduto?.name}?`}
                >
                    {selectedProduto && (
                    <CardProduto
                        imagem={drinkImage}
                        titulo={selectedProduto.name}
                        subtitulo={selectedProduto.id}
                        descricao={selectedProduto.description}
                        preco={selectedProduto.price}
                    />
                    )}
                </ConfirmModal>

                <EditModal 
                    isOpen={editModal}
                    onClose={() => setEditModal(false)}
                    onConfirm={(updatedDrink) => handleUpdateDrink(selectedProduto.id, updatedDrink)}
                    title={`Editar sabor: ${selectedProduto?.name}`}
                    product={selectedProduto}
                    type={"drink"}
                >
                    {selectedProduto && (
                    <CardProduto
                        imagem={drinkImage}
                        titulo={selectedProduto.name}
                        subtitulo={selectedProduto.id}
                        descricao={selectedProduto.description}
                        preco={selectedProduto.price}
                    />
                    )}
                </EditModal>

                <AddModal 
                    isOpen={addModal}
                    onClose={() => setAddModal(false)}
                    onConfirm={(newDrink) => handleAddDrink(newDrink)}
                    title="Adicionar bebida"
                    type={"drink"}
                >
                    <CardProduto 
                        imagem={drinkImage}
                        titulo="Nome da Bebida"
                        subtitulo="0"
                        descricao="exemplo"
                        preco="0,00"
                    />

                </AddModal>
            </main>
        
        </>
    );
}

export default flavor;
