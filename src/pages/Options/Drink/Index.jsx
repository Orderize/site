import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb/Index";
import Navbar from "@/components/Navbar/Index";
import "./Index.css"
import InputSearch from "@/components/InputSearch/InputSearch";
import { toast } from "react-toastify";
import CardProduto from "@/components/CardProduto/CardProduto";
import drinkImage from '../../../utils/assets/drinkImage.svg';
import ConfirmModal from "@/modals/ConfirmModal/ConfirmModal";
import ListItens from "../../../components/ListItens/Index";
import EditModal from "@/modals/EditModal/EditModal";
import AddModal from "@/modals/AddModal/AddModal";
import ActionButton from "@/components/ActionButton/ActionButton";
import { isOwner } from "@/utils/user/userRoles";

import { getDrinks, getDrinksPop, saveDrink, updateDrink, deleteDrink } from "../../../api/services/Drinks";

function Drink() {
    const [valueSearch, setValueSearch] = useState("");
    const [drink, setDrink] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [confirmModal, setConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState(null);

    const handleDrink = async () => {
        const data = await getDrinksPop();
        setDrink(data);
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
            <main className="container-flavor">
                <h1>Opções</h1>
                <div className="breadcrumb-search">
                    <Breadcrumb activeButton={"bebidas"} />

                    <div className="search">
                        <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome da bebida"/>
                    </div>
                </div>

                {isOwner() &&
                    <div className="btn-add-wrapper">
                        <ActionButton 
                            label="Adicionar bebida" 
                            onClick={() => handleAddClick()}
                            action="add" 
                            width="200px" 
                            height="30px" 
                        />
                    </div>
                }
                
                <ListItens 
                    itens={drink}
                    image={drinkImage}
                    functions={{
                        handleEditClick,
                        handleDeleteClick
                    }}
                />

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
                        preco={0}
                    />

                </AddModal>
            </main>
        
        </>
    );
}

export default Drink;
