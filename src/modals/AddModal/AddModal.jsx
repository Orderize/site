import React, { useState, useEffect } from "react";
import styles from "./AddModal.module.css";
import ActionButton from "@/components/ActionButton/ActionButton";
import FloatingInput from "@/components/Floatinginput/Floatinginput";
import InputSearch from "@/components/InputSearch/InputSearch";
import { getIngredients } from "../../api/services/Ingredients";
import { toast } from "react-toastify";

const AddModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  children,
  title,
  type
}) => {
  if (!isOpen) return null; 

    const [nome, setNome] = useState("");
    const [codigo, setCodigo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [milimeters, setMilimeters] = useState("");

    const [allIngredients, setAllIngredients] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [valueSearch, setValueSearch] = useState("");
    const [ingredientMode, setIngredientMode] = useState(false);

    const [token] = useState(localStorage.getItem("token"));

    const handleConfirm = () => {
      if (type === "flavor" && ingredientMode && selectedIngredients.length === 0) {
        toast.info("Selecione pelo menos um ingrediente antes de confirmar.");
        return
      } else if (type === "drink" && (!nome || !codigo || !descricao || !preco)) {
        toast.info("Preencha todos os campos antes de prosseguir.");
        return;
      }

      switch(type) {
        case "flavor":
          const newFlavor = {
            name: nome,
            code: codigo,
            description: descricao,
            price: parseFloat(preco),
            ingredients: selectedIngredients,
          };

          onConfirm(newFlavor);
          break;
        case "drink":
          const newDrink = {
              name: nome,
              code: codigo,
              description: descricao,
              price: parseFloat(preco),
              milimeters: milimeters,
          };

          onConfirm(newDrink);
          break;
        default:
          break;
      };
  };

  const handleIngredients = async () => {
    try {
      const response = await getIngredients(token);
      setIngredients(response);
      setAllIngredients(response);
    } catch (error) {
      console.error('[handleIngredients] error: ', error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setValueSearch(value);

    const filteredIngredients = allIngredients.filter(ingredient =>
      ingredient.name.toLowerCase().includes(value.toLowerCase())
    );

    setIngredients(filteredIngredients); 
  };

  const handleCheckboxChange = (id) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      handleIngredients();
    }
  }, [isOpen]);


  const openIngredients = () => {
    if (!nome || !codigo || !descricao || !preco) {
      toast.info("Preencha todos os campos antes de prosseguir.");
      return; 
    }

    setIngredientMode(true);
    handleIngredients();
  };

  const onReturn = () => {
    setIngredientMode(false);
  };
  

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-container"]}>
        
        {children}

        <div className={styles["form-container"]}>    
            <div className={styles["form-content"]}>
                <p className={styles.titulo}>{title}</p>
                {ingredientMode && type === "flavor"? (
                    <p className={styles.text}>Selecione os ingredientes</p>
                ) : (
                    <p className={styles.text}>Preencha os campos abaixo</p>
                  )}

                { ingredientMode && type === "flavor" ? (
                  <div className={`${styles["flavor-ingredients"]} ${ingredientMode ? styles["flavor-ingredients-open"] : ''}`}>

                    <InputSearch text="Pesquise pelo nome do ingrediente" handleSearch={handleSearch} valueSearch={valueSearch}/>
                    
                    <div className={styles["flavor-igredients-list"]}>
                      {ingredients.length > 0 && ingredients.map(ingredient => (
                        <div key={ingredient.id} className={styles["ingredient"]}>
                          <input 
                            type="checkbox" 
                            id={ingredient.id} 
                            name={ingredient.name} 
                            value={ingredient.id} 
                            onChange={() => handleCheckboxChange(ingredient.id)}
                          />
                          <label htmlFor={ingredient.id}>{ingredient.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                
                ) : (
                  <div className={styles["form"]}>
                    <FloatingInput 
                        onValue={nome} 
                        onSet={setNome}
                        label={"Nome"} 
                    />

                    <FloatingInput 
                        onValue={codigo} 
                        onSet={setCodigo}
                        label={"Código"} 
                    />

                    <FloatingInput 
                        onValue={preco} 
                        onSet={setPreco}
                        label={"Preço"} 
                    />

                    <FloatingInput 
                        onValue={descricao} 
                        onSet={setDescricao}
                        label={"Descrição"} 
                    />

                    {type === "drink" &&
                      <FloatingInput 
                          onValue={milimeters} 
                          onSet={setMilimeters}
                          label={"Quantidade (ml)"}
                      />
                    }
                </div>
                )}
            </div>

            {type === "flavor" && ingredientMode ? (
              <div className={styles["modal-actions-ingredients"]}>
                <ActionButton label="Voltar" onClick={onReturn}/>
                <ActionButton label="Confirmar" onClick={handleConfirm}/>
              </div>
            ) : type === "flavor" && !ingredientMode ? ( 
              <div className={styles["modal-actions"]}>
                <ActionButton label="Cancelar" onClick={onClose}/>
                <ActionButton label="Próximo" onClick={openIngredients}/>
              </div>
            ) : (
              <div className={styles["modal-actions"]}>
                <ActionButton label="Cancelar" onClick={onClose}/>
                <ActionButton label="Confirmar" onClick={handleConfirm}/>
              </div>
            )}


        </div>
      </div>
    </div>
  );
};

export default AddModal;
