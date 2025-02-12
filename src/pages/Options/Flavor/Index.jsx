// pages/options/Flavor/Index.js

import "./Index.css"
import React, { useEffect, useState } from "react";
import { getFlavorsPop } from "@/api/services/Flavors";
import ListItens from "@/components/ListItens/Index";
import Navbar from "@/components/Navbar/Index";
import WrapBreadcrumbInput from "@/components/WrapBreadcrumbInput/Index";
import AddNewFlavor from "@/modals/New_flavor/Add_new_flavor.jsx";
import { isOwner } from "@/utils/user/userRoles";

function flavor() {
    const [flavors, setFlavors] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [confirmModal, setConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState(null);

    const handleFlavors = async () => {
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
    };

    const handleAddClick = () => {
        setAddModal(true);
    };

    const handleAddFlavor = async (newFlavor) => {
        try {
            console.log(newFlavor);
            await saveFlavor(token, newFlavor);

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
            console.log(flavor);
            console.log(flavor.ingredients);   
            await updateFlavor(token, idFlavor, flavor);
            handleFlavors();

            console.log(flavor);
            console.log(flavor.ingredients);

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
    
    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        handleFlavors();
    }, []);

    return (
        <>
            <Navbar activeButton={"Opções"} subActiveButton={"Sabores"} />
            <main className={styles["container-flavor"]}>
                <h1>Opções</h1>

                <div className={styles["breadcrumb-search"]}>
                    <Breadcrumb activeButton={"sabores"} />
                    <div className={styles["search"]}>
                        <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome do sabor"/>
                    </div>
                </div>

                {isOwner &&
                    <div className={styles["btn-add-wrapper"]}>
                        <ActionButton 
                            label="Adicionar sabor" 
                            onClick={() => handleAddClick()}
                            action="add" 
                            width="200px" 
                            height="30px" 
                        />
                    </div>
                }

                <section className={styles["flavor-list"]}>
                    {
                            flavors.length > 0 && 
                            flavors.map(flavor => {

                            return <CardProduto 
                                key={flavor.id}
                                imagem={pizzaImage}
                                titulo={flavor.name}
                                subtitulo={flavor.id}
                                preco={flavor.price}
                                descricao={flavor.description}
                                onEdit={() => handleEditClick(flavor)}
                                onDelete={() => handleDeleteClick(flavor)}
                            />
                        })
                    }
                </section>

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
                        preco="0,00"
                    />

                </AddModal>
            </main>
        </>
    );
}

export default flavor;