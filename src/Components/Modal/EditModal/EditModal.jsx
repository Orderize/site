import React, { useState, useEffect } from "react";
import styles from "./EditModal.module.css";
import ActionButton from "../../ActionButton/ActionButton";
import FloatingInput from "../../Floatinginput/FloatingInput";
import InputSearch from "../../InputSearch/InputSearch";
import { toast } from "react-toastify";
import { getIngredients } from "../../../api/services/Ingredients";

const EditModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  children,
  title,
  product = { ingredients: [] },
  type
}) => {
  if (!isOpen) return null; 

  const [nome, setNome] = useState(product.name);
  const [codigo, setCodigo] = useState(product.id);
  const [descricao, setDescricao] = useState(product.description);
  const [preco, setPreco] = useState(product.price);
  const [milimeters, setMilimeters] = useState(product.milimeters);

  const [allIngredients, setAllIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(
    product.ingredients?.map(ingredient => ingredient.id) || []
  );  
  const [valueSearch, setValueSearch] = useState("");
  const [ingredientMode, setIngredientMode] = useState(false);

  const [token] = useState(localStorage.getItem("token"));

  const handleConfirm = () => {
    switch(type) {
      case "flavor":
        const updateFlavor = {
          name: nome,
          id: codigo,
          description: descricao,
          price: parseFloat(preco),
          ingredients: selectedIngredients,
        };

        if (
          updateFlavor.name === product.name &&
          updateFlavor.id === product.id &&
          updateFlavor.description === product.description &&
          updateFlavor.price === product.price &&
          updateFlavor.ingredients.length === product.ingredients.length && 
          updateFlavor.ingredients.every(id => 
            product.ingredients.some(ingredient => ingredient.id === id)
          )
        ) {
          toast.info('Nenhuma alteração foi feita.');
          return;
        }

        onConfirm(updateFlavor);
        break;
      case "drink":
        const updateDrink = {
            name: nome,
            id: codigo,
            description: descricao,
            price: parseFloat(preco),
            milimeters: milimeters,
        };

        if (
          updateDrink.name === product.name &&
          updateDrink.id === product.id &&
          updateDrink.description === product.description &&
          updateDrink.price === product.price &&
          updateDrink.milimeters === product.milimeters
        ) {
          toast.info('Nenhuma alteração foi feita.');
          return;
        }

        onConfirm(updateDrink);
        break;
      default:
        break;
    }
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
    
        if (type === "flavor" && product && Array.isArray(product.ingredients)) {
          setSelectedIngredients(product.ingredients.map(ingredient => ingredient.id));
        } else {
          setSelectedIngredients([]);
        }
      }
    }, [isOpen, product, type]); 
    
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
                <p className={styles.text}>{product.name}</p>

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
                          checked={selectedIngredients.includes(ingredient.id)}
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
                      disabled={false} 
                    />

                    <FloatingInput 
                      onValue={codigo} 
                      onSet={setCodigo}
                      label={"Código"} 
                      disabled={false}
                    />

                    <FloatingInput 
                      onValue={descricao} 
                      onSet={setDescricao}
                      label={"Descrição"} 
                      disabled={false}
                    />

                    <FloatingInput 
                      onValue={preco} 
                      onSet={setPreco}
                      label={"Preço"}  
                      disabled={false}
                    />

                    {type === "drink" &&
                      <FloatingInput 
                        onValue={milimeters} 
                        onSet={setMilimeters}
                        label={"Quantidade (ml)"}  
                        disabled={false}
                      />
                    }
                </div>
                )}
            </div>

            {type === "flavor" && ingredientMode ? (
              <div className={styles["modal-actions"]}>
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

export default EditModal;
