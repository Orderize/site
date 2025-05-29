import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import Item from "../../../Components/Item/Item";
import Navbar from "../../../Components/Navbar/Navbar";
import styles from "./FlavorOption.module.css";
import { getFlavorsPop, saveFlavor, updateFlavor, deleteFlavor } from "/src/api/services/Flavors";
import InputSearch from "../../../Components/InputSearch/InputSearch";
import pizzaImage from '../../../utils/assets/pizzas/pizza-1-sabor.svg';
import CardProduto from "../../../Components/CardProduto/CardProduto";
import ActionButton from "../../../Components/ActionButton/ActionButton";
import ConfirmModal from "../../../Components/Modal/ConfirmModal/ConfirmModal";
import EditModal from "../../../Components/Modal/EditModal/EditModal";
import AddModal from "../../../Components/Modal/AddModal/AddModal";
import { toast } from "react-toastify";

function FlavorOption({ isOwner }) {
    const [valueSearch, setValueSearch] = useState("");
    const [flavors, setFlavors] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [modals, setModals] = useState({
        confirm: false,
        edit: false,
        add: false,
      });      
    const [selectedProduto, setSelectedProduto] = useState(null);

    const handleFlavors = async () => {
        try {
            const data = await getFlavorsPop();
            console.log('data '+ data);
            setFlavors(data);
        } catch (error) {
            // FAZER UM MODAL AQUI PARA FALAR SOBRE O ERRO
            toast.error(error.message)
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
        setModals(prev => ({ ...prev, add: true }));
    };    

    const handleAddFlavor = async (newFlavor) => {
        try {
            console.log('new flavor: '+ JSON.stringify(newFlavor));
            await saveFlavor(newFlavor);

            handleFlavors();
            toast.success("Sabor adicionado com sucesso!");
            setModals(prev => ({ ...prev, add: false }));
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };
    
    const handleEditClick = (flavor) => {
        setSelectedProduto(flavor);
        setModals(prev => ({ ...prev, edit: true }));
    };    

    const handleUpdateFlavor = async (idFlavor, flavor) => {
        try {
            console.log(flavor);
            console.log(flavor.ingredients);   
            await updateFlavor(idFlavor, flavor);
            handleFlavors();

            console.log(flavor);
            console.log(flavor.ingredients);

            toast.success(`Sabor ${flavor.name} atualizado com sucesso!`);
            setModals(prev => ({ ...prev, edit: false }));
            setSelectedProduto(null);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };
    
    const handleDeleteClick = (flavor) => {
        setSelectedProduto(flavor);
        setModals(prev => ({ ...prev, confirm: true }));
    };      

    const handleDeleteFlavor = async (idFlavor) => {
        try {
            await deleteFlavor(idFlavor);
            handleFlavors();
            toast.success(`Sabor ${selectedProduto.name} excluído com sucesso!`);
            setModals(prev => ({ ...prev, confirm: false }));
            setSelectedProduto(null);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };
    
    useEffect(() => {
        console.log('isOwner '+ isOwner);
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
                    {flavors.length != 0 && 
                    // ? (
                    //     <p>Nenhum sabor encontrado.</p>
                    // ) : (
                        flavors.map(flavor => (
                        <CardProduto 
                            key={flavor.id}
                            imagem={pizzaImage}
                            titulo={flavor.name}
                            subtitulo={flavor.id}
                            preco={flavor.price}
                            descricao={flavor.description}
                            onEdit={() => handleEditClick(flavor)}
                            onDelete={() => handleDeleteClick(flavor)}
                        />
                        )
                    )}
                </section>


                <ConfirmModal
                    isOpen={modals.confirm}
                    onClose={() => setModals(prev => ({ ...prev, confirm: false }))}
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
                    isOpen={modals.edit}
                    onClose={() => setModals(prev => ({ ...prev, edit: false }))}
                    onConfirm={(updatedData) => handleUpdateFlavor(selectedProduto?.id, updatedData)}
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
                    isOpen={modals.add}
                    onClose={() => setModals(prev => ({ ...prev, add: false }))}
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

export default FlavorOption;