import React, { useState, useEffect, useRef } from 'react';
import FooterModal from '@/components/footer_modal/FooterModal';
import styles from './Flavor.module.css';
import InputSearch from '@/components/InputSearch/InputSearch';
import { XSquare } from '@phosphor-icons/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFlavorsPop } from '@/api/services/Flavors';

import { getPizzaById, savePizza } from '@/api/services/Pizzas';

import pizza from '@/utils/assets/pizzas/pizza.svg';
import pizza1Sabor from '@/utils/assets/pizzas/pizza-1-sabor.svg';
import pizza2Sabores from '@/utils/assets/pizzas/pizza-2-sabores.svg';
import pizza3Sabores from '@/utils/assets/pizzas/pizza-3-sabores.svg';
import pizza4Sabores from '@/utils/assets/pizzas/pizza-4-sabores.svg';
import Select from '@/components/UI/Select/Select';
import DropdownSelect from './components/DropdownSelect';
import { handleDataPizza, savePizzas, updatePizzas } from '@/hooks/usePizzas';


const PizzaComponent = ({ close, setListPizzas, selectedPizza }) => {
  const [token] = useState(localStorage.getItem('token'));
  
  const [optionsFlavor, setOptionsFlavor] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  
  const [valueSearch, setValueSearch] = useState("");

  const [showIngredients, setShowIngredients] = useState({});

  function handleOptionSize(event) {
    const size = event.target.value;
    setPizzas(prev => ({
      ...prev,
      size
    }));
  }
  
  function handleOptionMass(event) {
    const mass = event.target.value
    setPizzas(prev => ({
      ...prev,
      mass
    }));
  }  
  
  function handleOptionBorder(event) {
    const border = event.target.value;
    setPizzas(prev => ({
      ...prev,
      border
    }));
  }

  const handleGetPizza = async (id) => {
    try {
      const data = await getPizzaById(token, id);
      handleObservations(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleFlavors = async (value) => {
    if (value.length == 0) {
      setOptionsFlavor([]);
      return;
    }

    try {
      const data = await getFlavorsPop(token, value);
      setOptionsFlavor(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (selectedPizza) {
      handleGetPizza(selectedPizza.id);
    }
  }, []);
  
  const handleObservations = (data) => {
    
    const observations = data.observations;
    const listaPizzas = observations.split(",").map(p => p.trim());

    const pizzasMap = new Map();

    listaPizzas.forEach((item) => {
        const [nome, ...resto] = item.split(" sem ");
        const ingredientes = resto.join(", ").split(",").map(ingrediente => ingrediente.trim());

        if (pizzasMap.has(nome)) {
            pizzasMap.set(nome, pizzasMap.get(nome).concat(ingredientes));
        } else {
            pizzasMap.set(nome, ingredientes);
        }
    });

    data.flavors = data.flavors.map(it => ({
      ...it,
      observations: pizzasMap.get(it.name) || []
    }));

    setPizzas(data);
  }

  const handleConfirm = async () => {
    if (!isValid()) return;
    
    const pizza = handleDataPizza(pizzas);
    let data;
    if (pizza.id && pizzas.id == pizza.id) {
      data = await updatePizzas(token, pizza);
    } else {
      data = await savePizzas(token, pizza);
    }

    setListPizzas(prev => {
      const pizzaExists = prev.some(p => p.id == data.id);

      if (pizzaExists) return prev.map(p => (p.id == data.id ? data : p));
      else return [...prev, data];
    });

    setPizzas([]);
    close();
  }


  const handleCancel = () => {
    setPizzas([]);
    close();
  }

  const handleSearch = async (event) => {
    const value = event.target.value;
    setValueSearch(value);
    handleFlavors(value);    
  }

  const isValid = () => {
    if (!pizzas?.flavors) {
      toast.error("Selecione a quantidade de sabores!")
      return false;
    } else if (!pizzas?.size) {
      toast.error("Selecione o tamanho da pizza!");
      return false;
    } else if (!pizzas?.mass) {
      toast.error("Selecione o tipo de massa!");
      return false;
    } else if (!pizzas?.border) {
      toast.error("Selecione o tipo de borda!");
      return false;
    }
    return true;
  };

  const handleFlavorSelect = (flavor) => {
    if (pizzas?.flavors?.length == 4) {
      toast.info(`Você já atingiu o limite de sabores para uma pizza. \nContate o administrador da empresa para aumentar o limite.`);
      return false;
    }

    if (pizzas?.flavors?.includes(flavor)) {
      toast.info(`Você já selecionou o sabor ${flavor.name} para a pizza.`);
      return;
    }

    setPizzas(prev => ({
      ...prev,
      flavors: [...(prev?.flavors || []), flavor]
    }));

    setShowIngredients(prev => ({
      ...prev,
      [flavor.name]: false
    }));

    setValueSearch("");
    setOptionsFlavor([]);
  };

  const removeFlavor = (flavorToRemove) => {
    setPizzas(prev => prev.filter((flavor) => flavor.id !== flavorToRemove.id));
    toast.success(`Sabor ${flavorToRemove.name} removido com sucesso.`);
  };

  const toggleIngredients = (flavor) => {
    setShowIngredients(prev => ({
      ...prev,
      [flavor.name]: !prev[flavor.name]
    }))
  };

  const handleIngredientChange = (flavor, ingredient) => {
    setPizzas(prev => ({
      ...prev,
      flavors: prev.flavors.map(it => {
        if (it.id === flavor.id) {
          const exists = it.observations?.some(obs => obs === ingredient.name);
          
          return {
            ...it,
            observations: exists 
              ? it.observations.filter(obs => obs !== ingredient.name)
              : [...(it.observations || []), ingredient.name]
          };
        }
        return it;
      }),
    }));
  }

  const handleImageChange = () => {
    switch (pizzas?.flavors?.length) {
      case 1:
        return pizza1Sabor;
      
      case 2:
        return pizza2Sabores;

      case 3:
        return pizza3Sabores;

      case 4:
        return pizza4Sabores;
  
      default:
        return pizza;
    }
  }

  const handleCheckboxChange = (flavor, ingredient) => {
    return !flavor.observations?.some(obs => obs == ingredient.name)
  }

  const handleTitleChange = () => {
    switch (pizzas?.flavors?.length) {
      case undefined: return 'Selecione a quantidade de sabores';
      case 1: return `(${pizzas?.flavors?.length} Sabor)`;
      default: return  `(${pizzas?.flavors?.length} Sabores)`;
    }
  }

  const getObservationText = () => {
    return pizzas?.flavors?.map(flavor => {
      const removedIngredients = flavor.observations;
      
      if (removedIngredients && removedIngredients.length > 0) return `${flavor.name} sem ${removedIngredients.join(', ')}`;
    }).filter(Boolean).join('\n'); 
  };

  return (
    <div className={styles["modal-wrapper-flavor"]}>
      <section className={styles["modal-container-flavor"]}>

        <div className={styles["pizza-options-flavor"]}>
          <DropdownSelect
            options={[
              { value: '0', label: 'Tamanho da pizza', disabled: true },
              { value: 'SMALL', label: 'Pequena' },
              { value: 'MEDIUM', label: 'Média' },
              { value: 'LARGE', label: 'Grande' },
            ]}
            value={pizzas?.size || '0'}
            onChange={handleOptionSize}
          />

          <DropdownSelect
            options={[
              { value: '0', label: 'Massa da pizza', disabled: true },
              { value: 'THIN', label: 'Fina' },
              { value: 'THICK', label: 'Grossa' },
            ]}
            value={pizzas?.mass || '0'}
            onChange={handleOptionMass}
          />

          <DropdownSelect
            options={[
              { value: '0', label: 'Borda da pizza', disabled: true },
              { value: 'Catupiry', label: 'Catupiry' },
              { value: 'Chocolate', label: 'Chocolate' },
            ]}
            value={pizzas?.border || '0'}
            onChange={handleOptionBorder}
          />
        </div>
        <div className={styles["menu-separador"]}></div>

        <div className={styles["pizza-menu-flavor"]}>
         
          <div className={styles["search-bar"]}>
            <p className={styles["pizza-title"]}>Selecione o sabor</p>

            <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome do sabor"/>

            {optionsFlavor.length > 0 && (
              <div className={styles["flavor-options-list"]}>
                {optionsFlavor.map((flavor, index) => (
                  <div 
                    key={index} 
                    className={styles["flavor-option"]}
                    onClick={() => handleFlavorSelect(flavor)}
                  >
                    {flavor.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles["pizza-information"]}>
            <div className={styles["info-left"]}>
              <p className={styles["pizza-title"]}>{handleTitleChange()}</p>

              <img 
                src={handleImageChange()} 
                alt={`Sabores da pizza`} 
                className={`${styles["pizza-image"]}`} 
              />
            </div>

            <div className={styles["info-right"]}>
              <p className={styles["pizza-title"]}>Sabor selecionado:</p>

              <div className={styles["flavor-information"]}>
              {pizzas?.flavors && pizzas.flavors.map(flavor => (
                <div key={flavor.id} className={styles["flavor"]}>
                  <div 
                    className={styles["flavor-name"]}
                  >
                    <div className={styles['pointer']} onClick={() => toggleIngredients(flavor)}>
                      <p>{flavor.name}</p>
                    </div>

                      <div onClick={() => removeFlavor(flavor)}>
                        <XSquare size={30} weight="duotone" />
                      </div>
                  </div>
                  {showIngredients[flavor.name] && (
                    <div className={styles["pizza-ingredients"]}>
                      <p>Ingredientes:</p>
                      <ul>
                        {flavor.ingredients && flavor.ingredients.map(ingredient => (
                          <li key={ingredient.id} className={styles['pointer']}>
                            <input
                              type="checkbox"
                              checked={handleCheckboxChange(flavor, ingredient)}
                              onClick={() => handleIngredientChange(flavor, ingredient)}
                              id={ingredient.id}
                            />{' '}
                              <label htmlFor={ingredient.id}>{ingredient.name}</label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )) || (
                <p>Selecione um sabor para ver mais detalhes.</p>
              )}
              </div>
              
            <div className={styles["note"]}>
              <p className={styles["note-texto"]}>Observação:</p>
              <p className={styles["note-texto"]}>{getObservationText()}</p>
            </div>
            </div>

          </div>
        </div>

        <FooterModal handleBack={handleCancel} handleNext={handleConfirm}/>
      </section>
      <ToastContainer />
    </div>
  );
};

export default PizzaComponent;