// pages/options/Flavor/Index.js

import "./Index.css"
import React, { useEffect, useState } from "react";
import { getFlavorsPop } from "@/api/services/Flavors";

import ActionButton from '@/components/ActionButton/ActionButton';
import CardProduto from "@/components/CardProduto/CardProduto" 
import ListItens from "@/components/ListItens/Index";
import Navbar from "@/components/Navbar/Index";
import WrapBreadcrumbInput from "@/components/WrapBreadcrumbInput/Index";

import AddModal from "@/modals/AddModal/AddModal";
import ConfirmModal from "@/modals/ConfirmModal/ConfirmModal";
import EditModal from "@/modals/EditModal/EditModal";
import AddNewFlavor from "@/modals/New_flavor/Add_new_flavor.jsx";

import PizzaImage from "@/utils/assets/pizzas/pizza-1-sabor.svg";
import { isOwner } from "@/utils/user/userRoles";
import { toast } from "react-toastify";
import { saveFlavor } from "../../../api/services/Flavors";

function flavor() {
    const [flavors, setFlavors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState(null);

    const handleSetFlavor = (data) => {
        const flavors = data.map(flavor => ({
            ...flavor,
            image: PizzaImage
        }));
        setFlavors(flavors);        
    }

    const handleFlavors = async () => {
        const data = await getFlavorsPop();
        handleSetFlavor(data);
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

    const handleAddFlavor = async (newFlavor) => {
        try {
            await saveFlavor(newFlavor);

            handleFlavors();
            toast.success("Sabor adicionado com sucesso!");
            setAddModal(false);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const handleEditClick = (flavor) => {
        setSelectedProduto(flavor);
        setEditModal(true);
    };

    const handleUpdateFlavor = async (idFlavor, flavor) => {
        try {
            await updateFlavor(idFlavor, flavor);
            handleFlavors();

            toast.success(`Sabor ${flavor.name} atualizado com sucesso!`);
            setEditModal(false);
            setSelectedProduto(null);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };
    
    const handleDeleteClick = (flavor) => {
        setSelectedProduto(flavor);
        setConfirmModal(true); 
    };    

    const handleDeleteFlavor = async (idFlavor) => {
        try {
            await deleteFlavor(token, idFlavor);
            handleFlavors();
            toast.success(`Sabor ${selectedProduto.name} excluído com sucesso!`);
            setConfirmModal(false);
            setSelectedProduto(null);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        handleFlavors();
    }, []);

    return (
        <>
            <Navbar activeButton={"Opções"} subActiveButton={"Sabores"} />
            <main className="container-flavor">
                <h1>Opções</h1>

                <WrapBreadcrumbInput 
                    activeBreadcrumb="sabores" 
                    inputText="Pesquise pelo nome do sabor"
                    getDataByInput={getFlavorsPop}
                    setData={handleSetFlavor}
                />

                {isOwner() &&
                    <div className="btn-add-wrapper">
                    <ActionButton 
                        label="Adicionar sabor" 
                        onClick={() => handleAddClick()}
                        action="add" 
                        width="200px" 
                        height="30px" 
                    />
                </div>
                }

                <ListItens 
                    itens={flavors}
                    image={PizzaImage}
                    functions={{
                        handleEditClick,
                        handleDeleteClick
                    }}

                />

                <ConfirmModal
                    isOpen={confirmModal}
                    onClose={() => setConfirmModal(false)}
                    onConfirm={() => handleDeleteFlavor(selectedProduto?.id)}
                    title="Confirmar exclusão"
                    message={`Deseja realmente excluir o sabor: ${selectedProduto?.name}?`}
                >
                    {selectedProduto && (
                    <CardProduto
                        imagem={PizzaImage}
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
                    onConfirm={(updateFlavor) => handleUpdateFlavor(selectedProduto?.id, updateFlavor)}
                    title={`Editar sabor:`}
                    product={selectedProduto}
                    type={"flavor"}
                >
                    {selectedProduto && (
                    <CardProduto
                        imagem={PizzaImage}
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
                    onConfirm={(newFlavor) => handleAddFlavor(newFlavor)}
                    title="Adicionar Sabor"
                    type={"flavor"}
                >
                    <CardProduto 
                        imagem={PizzaImage}
                        titulo="Nome do Sabor"
                        subtitulo="0"
                        descricao="exemplo"
                        preco="0,00"
                    />

                </AddModal>
            </main>

            {isModalOpen &&
                <AddNewFlavor onClose={closeModal}/>
            }
        </>
    );
}

export default flavor;