import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./DrinkOption.module.css";
import InputSearch from "@/components/InputSearch/InputSearch";
import { toast } from "react-toastify";
import CardProduto from "@/components/CardProduto/CardProduto";
import drinkImage from '@/utils/assets/drinkImage.svg';
import ConfirmModal from "@/components/Modal/ConfirmModal/ConfirmModal";
import EditModal from "@/components/Modal/EditModal/EditModal";
import AddModal from "@/components/Modal/AddModal/AddModal";
import ActionButton from "@/components/ActionButton/ActionButton";
import { getDrinks, saveDrink, updateDrink, deleteDrink } from "@/api/services/Drinks";

function DrinkOption({ isOwner }) {
    const [valueSearch, setValueSearch] = useState("");
    const [drinks, setDrinks] = useState([]);
    const [token] = useState(localStorage.getItem('token'));
    const [modals, setModals] = useState({
        confirm: false,
        edit: false,
        add: false,
    });
    const [selectedProduto, setSelectedProduto] = useState(null);

    const handleDrink = async () => {
        try {
            const params = { name: valueSearch, milimeters: "" };
            const data = await getDrinks(params);
            if (Array.isArray(data)) {
                setDrinks(data);
            } else {
                setDrinks([]);
            }
        } catch (error) {
            toast.error("Erro ao buscar as bebidas");
            console.error(error);
        }
    };
    
    const handleSearch = async (event) => {
        const value = event.target.value;
        setValueSearch(value);
    
        try {
            const params = { name: value, milimeters: value };
            const data = await getDrinks(params);
            if (Array.isArray(data)) {
                setDrinks(data);
            } else {
                setDrinks([]);
            }
        } catch (error) {
            toast.error("Erro ao buscar as bebidas");
            console.error(error);
        }
    };    

    const handleAddClick = () => {
        console.log('handleAddClick');
        setModals(prev => ({ ...prev, add: true }));
    };

    const handleAddDrink = async (newDrink) => {
        try {
            await saveDrink(newDrink);
            handleDrink();
            toast.success("Bebida adicionada com sucesso!");
            setModals(prev => ({ ...prev, add: false }));
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const handleEditClick = (drink) => {
        setSelectedProduto(drink);
        setModals(prev => ({ ...prev, edit: true }));
    };

    const handleUpdateDrink = async (idDrink, updatedDrink) => {
        try {
            await updateDrink(token, idDrink, updatedDrink);
            handleDrink();
            toast.success(`Bebida ${updatedDrink.name} editada com sucesso!`);
            setModals(prev => ({ ...prev, edit: false }));
            setSelectedProduto(null);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const handleDeleteClick = (drink) => {
        setSelectedProduto(drink);
        setModals(prev => ({ ...prev, confirm: true }));
    };

    const handleDeleteDrink = async (idDrink) => {
        try {
            await deleteDrink(token, idDrink);
            handleDrink();
            toast.success(`Bebida ${selectedProduto.name} excluída com sucesso!`);
            setModals(prev => ({ ...prev, confirm: false }));
            setSelectedProduto(null);
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        console.log('isOwner '+isOwner)
        handleDrink();
    }, []);

    return (
        <>
            <Navbar activeButton={"Opções"} subActiveButton={"Bebidas"} />
            <main className={styles["container-drink"]}>
                <h1>Opções</h1>

                <div className={styles["breadcrumb-search"]}>
                    <Breadcrumb activeButton={"bebidas"} />
                    <div className={styles["search"]}>
                        <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome da bebida" />
                    </div>
                </div>

                {isOwner && (
                    <div className={styles["btn-add-wrapper"]}>
                        <ActionButton
                            label="Adicionar bebida"
                            onClick={handleAddClick}
                            action="add"
                            width="200px"
                            height="30px"
                        />
                    </div>
                )}

                <section className={styles["drink-list"]}>
                    {drinks.length != 0 &&
                    // (
                    //     <p>Nenhuma bebida encontrada.</p>
                    // ) : (
                        drinks.map(drink => (
                            <CardProduto
                                variant="drinkOption"
                                key={drink.id}
                                imagem={drinkImage}
                                titulo={drink.name}
                                subtitulo={drink.id}
                                preco={drink.price}
                                descricao={drink.milimeters + " ml"}
                                onEdit={() => handleEditClick(drink)}
                                onDelete={() => handleDeleteClick(drink)}
                            />
                        )
                    )}
                </section>

                <ConfirmModal
                    isOpen={modals.confirm}
                    onClose={() => setModals(prev => ({ ...prev, confirm: false }))}
                    onConfirm={() => handleDeleteDrink(selectedProduto?.id)}
                    title="Confirmar exclusão"
                    message={`Deseja realmente excluir a bebida: ${selectedProduto?.name}?`}
                >
                    {selectedProduto && (
                        <CardProduto
                            imagem={drinkImage}
                            titulo={selectedProduto.name}
                            subtitulo={selectedProduto.id}
                            descricao={selectedProduto.milimeters + " ml"}
                            preco={selectedProduto.price}
                        />
                    )}
                </ConfirmModal>

                <EditModal
                    isOpen={modals.edit}
                    onClose={() => setModals(prev => ({ ...prev, edit: false }))}
                    onConfirm={(updatedData) => handleUpdateDrink(selectedProduto?.id, updatedData)}
                    title={`Editar bebida:`}
                    product={selectedProduto}
                    type="drink"
                >
                    {selectedProduto && (
                        <CardProduto
                            imagem={drinkImage}
                            titulo={selectedProduto.name}
                            subtitulo={selectedProduto.id}
                            descricao={selectedProduto.milimeters + " ml"}
                            preco={selectedProduto.price}
                        />
                    )}
                </EditModal>

                <AddModal
                    isOpen={modals.add}
                    onClose={() => setModals(prev => ({ ...prev, add: false }))}
                    onConfirm={handleAddDrink}
                    title="Adicionar Bebida"
                    type="drink"
                >
                    <CardProduto
                        imagem={drinkImage}
                        titulo="Nome da Bebida"
                        // subtitulo="0"
                        descricao="ml"
                        preco="0,00"
                    />
                </AddModal>
            </main>
        </>
    );
}

export default DrinkOption;
