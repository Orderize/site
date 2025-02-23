// pages/options/Flavor/Index.js

import "./Index.css"
import React, { useEffect, useState } from "react";
import { getFlavorsPop, saveFlavor } from "@/api/services/Flavors";
import Breadcrumb from "@/components/Breadcrumb/Index";
import InputSearch from "@/components/InputSearch/InputSearch";
import ActionButton from "@/components/ActionButton/ActionButton";
import ConfirmModal from "@/modals/ConfirmModal/ConfirmModal";
import EditModal from "@/modals/EditModal/EditModal";
import AddModal from "@/modals/AddModal/AddModal";
import CardProduto from "@/components/CardProduto/CardProduto";

import pizzaImage from "@/utils/assets/pizzas/pizza-1-sabor.svg";
import ListItens from "@/components/ListItens/Index";
import Navbar from "@/components/Navbar/Index";
import { isOwner } from "@/utils/user/userRoles";

function flavor() {
    const [flavors, setFlavors] = useState([]);
    const [confirmModal, setConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [valueSearch, setValueSearch] = useState("");
    const [selectedProduto, setSelectedProduto] = useState(null);

    const handleFlavors = async () => {
        try {
            const data = await getFlavorsPop();
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
            const data = await getFlavorsPop(value);
            setFlavors(data);
            console.log(data);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    const handleAddClick = () => {
        setAddModal(true);
    };

    const handleAddFlavor = async (newFlavor) => {
        try {
            console.log(newFlavor);
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
            await deleteFlavor(idFlavor);
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

                <div className="breadcrumb-search">
                    <Breadcrumb activeButton={"sabores"} />
                    <div className="search">
                        <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome do sabor"/>
                    </div>
                </div>

                {isOwner &&
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
                    image={pizzaImage}
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
                        imagem={pizzaImage}
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
                        imagem={pizzaImage}
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
                        imagem={pizzaImage}
                        titulo="Nome do Sabor"
                        subtitulo="0"
                        descricao="exemplo"
                        preco={0}
                    />

                </AddModal>
            </main>
        </>
    );
}

export default flavor;