import React, { useState, useEffect, useRef } from 'react';
import FooterModal from '../../footer_modal/FooterModal';
import styles from './Flavor.module.css';
import InputSearch from '../../InputSearch/InputSearch';
import { XSquare } from '@phosphor-icons/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFlavorsPop } from '../../../api/services/Flavors';

import pizza from '../../../utils/assets/pizzas/pizza.svg';
import pizza1Sabor from '../../../utils/assets/pizzas/pizza-1-sabor.svg';
import pizza2Sabores from '../../../utils/assets/pizzas/pizza-2-sabores.svg';
import pizza3Sabores from '../../../utils/assets/pizzas/pizza-3-sabores.svg';
import pizza4Sabores from '../../../utils/assets/pizzas/pizza-4-sabores.svg';

const PizzaComponent = ({ handleNext, handleBack }) => {
  const [token] = useState(localStorage.getItem('token'));
  const [flavors, setFlavors] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [showFlavorOptions, setShowFlavorOptions] = useState(false);

  const [flavorCount, setFlavorCount] = useState('0');

  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [animate, setAnimate] = useState(false);
  const [showIngredients, setShowIngredients] = useState({});

  const handleFlavors = async (event) => {
    try {
        const data = await getFlavorsPop(token);
        setFlavors(data);
    } catch (error) {
        alert(error.message)
        console.log(error);
    }
};

useEffect(() => {
  handleFlavors();
}, []);

const handleSearch = async (event) => {
    const value = event.target.value;
    setValueSearch(value);

    if (value.length > 0) {
      setShowFlavorOptions(true);  
    } else {
      setShowFlavorOptions(false);
    }

    try {
        const data = await getFlavorsPop(token, value);
        setFlavors(data);
        console.log(data);
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
}

const handleFlavorSelect = (flavor) => {
  if (selectedFlavors.length < parseInt(flavorCount)) {
    setSelectedFlavors([...selectedFlavors, flavor]);

    console.log(selectedFlavors, flavor);

    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [flavor.name]: flavor.ingredients.map((ingredient) => ({
        ...ingredient,
        checked: true,
      })),
    }));

    setShowIngredients((prevShowIngredients) => ({
      ...prevShowIngredients,
      [flavor.name]: false,
    }));
  } else {
    toast.error(`Você já selecionou ${flavorCount} sabor(es) para a pizza.`);
  }
  setShowFlavorOptions(false);
};

const removeFlavor = (flavorToRemove) => {
  setSelectedFlavors((prevSelectedFlavors) =>
    prevSelectedFlavors.filter((flavor) => flavor.id !== flavorToRemove.id)
  );

  console.log("Removendo sabor", flavorToRemove);

  toast.success(`Sabor ${flavorToRemove.name} removido com sucesso.`);
};

const toggleIngredients = (flavorName) => {
  setShowIngredients((prevShowIngredients) => ({
    ...prevShowIngredients,
    [flavorName]: !prevShowIngredients[flavorName],
  }));
};

const handleIngredientChange = (flavorName, ingredientName) => {
  setIngredients((prevIngredients) => {
    const updatedIngredients = prevIngredients[flavorName].map((ingredient) =>
      ingredient.name === ingredientName
        ? { ...ingredient, checked: !ingredient.checked }
        : ingredient
    );
    return { ...prevIngredients, [flavorName]: updatedIngredients };
  });
};

  const getObservationText = () => {
    return selectedFlavors.map((flavor) => {
      const removedIngredients = ingredients[flavor.name]?.filter(ingredient => !ingredient.checked).map(ingredient => ingredient.name);

      if (removedIngredients.length > 0) {
        return `Pizza de ${flavor.name} sem ${removedIngredients.join(', ')}`;
      }

      return '';
    }).filter(Boolean).join('\n'); 
  };

  
  const handleFlavorCountChange = (event) => {
    setFlavorCount(
      parseInt(event.target.value)
    );

    setSelectedFlavors([]);
    setAnimate(true); 

    setTimeout(() => {
      setAnimate(false); 
    }, 300); 
  };

  const getPizzaImage = () => {
    console.log(flavorCount);
    
    switch (flavorCount) {
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
  };

  const getTextPizza = () => {
    switch (flavorCount) {
      case 1:
        return 'Pizza (1 Sabor)';
      case 2:
        return 'Pizza (2 Sabores)';
      case 3:
        return 'Pizza (3 Sabores)';
      case 4:
        return 'Pizza (4 Sabores)';
      default:
        return 'Selecione a quantidade de sabores'; 
    }
  }

  return (
    <div className={styles["modal-wrapper-flavor"]}>
      <section className={styles["modal-container-flavor"]}>

        <div className={styles["pizza-options-flavor"]}>

          <select className={styles["pizza-dropdown-flavor"]} onChange={handleFlavorCountChange} value={flavorCount}>
            <option value='0'>Quantidade</option>
            <option value='1'>1 Sabor</option>
            <option value='2'>2 Sabores</option>
            <option value='3'>3 Sabores</option>
            <option value='4'>4 Sabores</option>
          </select>

          <select className={styles["pizza-dropdown-flavor"]}>
            <option>Tamanho da pizza</option>
            <option>Pequena</option>
            <option>Média</option>
            <option>Grande</option>
          </select>

          <select className={styles["pizza-dropdown-flavor"]}>
            <option>Massa da pizza</option>
            <option>Fina</option>
            <option>Grossa</option>
          </select>

          <select className={styles["pizza-dropdown-flavor"]}>
            <option>Borda da pizza</option>
            <option>Catupiry</option>
            <option>Chocolate</option>
          </select>

        </div>

        <div className={styles["menu-separador"]}></div>

        <div className={styles["pizza-menu-flavor"]}>
         
          <div className={styles["search-bar"]}>
            <p className={styles["pizza-title"]}>Selecione o sabor</p>

            <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome do sabor"/>

            {showFlavorOptions && (
              <div className={styles["flavor-options-list"]}>
                {flavors.map((flavor, index) => (
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
              <p className={styles["pizza-title"]}>{getTextPizza()}</p>

              {flavorCount && (
                <img 
                  src={getPizzaImage()} 
                  alt={`Pizza com ${flavorCount} sabor(es)`} 
                  className={`${styles["pizza-image"]} ${animate ? styles["animate"] : ''}`} 
                />
              )}
            </div>

            <div className={styles["info-right"]}>
              <p className={styles["pizza-title"]}>Sabor selecionado:</p>

              {selectedFlavors.length > 0 ? (
                selectedFlavors.map((flavor) => (
                  <div key={flavor.id} className={styles["flavor-information"]}>
                    <div className={styles["flavor"]}>

                      <div 
                        className={styles["flavor-name"]}
                      >
                        <div onClick={() => toggleIngredients(flavor.name)}>
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
                          {ingredients[flavor.name]?.map((ingredient) => (
                            <li key={ingredient.id}>
                              <input
                                type="checkbox"
                                checked={ingredient.checked}
                                onChange={() => handleIngredientChange(flavor.name, ingredient.name)}
                              />{' '}
                              {ingredient.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    </div>
                  </div>
                ))
              ) : (
                <div className={styles["flavor-information"]}>
                  <p>Selecione um sabor para ver mais detalhes.</p>
                </div>
              )}
              
            <div className={styles["note"]}>
              <p className={styles["note-texto"]}>Observação:</p>
              <p className={styles["note-texto"]}>{getObservationText()}</p>
            </div>
            </div>

          </div>
        </div>

        <FooterModal handleBack={handleBack} handleNext={handleNext}/>
      </section>
      <ToastContainer />
    </div>
  );
};

export default PizzaComponent;