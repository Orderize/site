import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Index";
import "./Index.css"
import AddNewDrink from "@/modals/New_drink/AddNewDrink";
import { toast } from "react-toastify";
import ListItens from "../../../components/ListItens/Index";
import WrapBreadcrumbInput from "../../../components/WrapBreadcrumbInput/Index";
import { useAuth } from "../../../hooks/useAuth";
import { isOwner } from "../../../utils/user/userRoles";


import CardProduto from "@/components/CardProduto/CardProduto";
import DrinkImage from '@/utils/assets/drinkImage.svg';
import ConfirmModal from "@/modals/ConfirmModal/ConfirmModal";
import EditModal from "@/modals/EditModal/EditModal";
import AddModal from "@/modals/AddModal/AddModal";
import ActionButton from "@/components/ActionButton/ActionButton";
import { getDrinks, getDrinksPop, saveDrink, updateDrink, deleteDrink } from "@/api/services/Drinks";


function drink() {
    const { user } = useAuth();
    const [drink, setDrink] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [confirmModal, setConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState(null);

    const handleDrink = async () => {
        const data = await getDrinks();
        setDrink(data);
    };

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }
    

    const handleAddClick = () => {
        setAddModal(true);
    };

    const handleAddDrink = async (newDrink) => {
        try {
            console.log(newDrink);
            await saveDrink(newDrink);

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
            await updateDrink(idDrink, drink);
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
            await deleteDrink(idDrink);
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
            <main className="container-drink">
                <h1>Opções</h1>
                <WrapBreadcrumbInput 
                    activeBreadcrumb="bebidas" 
                    inputText="Pesquise pelo nome do bebida"
                    getDataByInput={getDrinks}
                    setData={setDrink}
                />
                {isOwner(user) &&
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
                    image={DrinkImage}
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
                        imagem={DrinkImage}
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
                        imagem={DrinkImage}
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
                        imagem={DrinkImage}
                        titulo="Nome da Bebida"
                        subtitulo="0"
                        descricao="exemplo"
                        preco={0}
                    />

                </AddModal>
            </main>

            {isModalOpen &&
                <AddNewDrink onClose={closeModal}/>
            }
        </>
    );
}

export default drink;