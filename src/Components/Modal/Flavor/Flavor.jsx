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
import Select from '../../UI/Select/Select';


const PizzaComponent = ({ handleBack, setListPizzas }) => {
  const [token] = useState(localStorage.getItem('token'));
  const [flavors, setFlavors] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [showFlavorOptions, setShowFlavorOptions] = useState(false);

  const [flavorCount, setFlavorCount] = useState(0);

  const [modal, setModal] = useState({
    pizzaText: 'Selecione a quantidade de sabores',
    pizzaImage: pizza
  });
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

const handleConfirm = () => {
  setListPizzas(selectedFlavors);
}

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
  } catch (error) {
      alert(error.message);
      console.log(error);
  }
}

const handleFlavorSelect = (flavor) => {
  if (modal.pizzaImage == pizza) {
    toast.error("Selecione a quantidade de sabores!"); 
    return;
  } else if (modal.size == null) {
    toast.error("Selecione o tamanho da pizza!"); 
    return;
  } else if (modal.mass == null) {
    toast.error("Selecione o tipo de massa!"); 
    return;
  } else if (modal.border == null) {
    toast.error("Selecione o tipo de borda!"); 
    return;
  }
  
  if (!selectedFlavors.some(it => JSON.stringify(it) == JSON.stringify(flavor))) {
    setSelectedFlavors([...selectedFlavors, flavor]);


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

  const handlePizzaSize = (event) => {
    const key = parseInt(event.target.value, 0);
    switch (key) {
      case 1:
        setModal(prev => ({
          ...prev,
          size: 'SMALL'
        }));
        break;
      case 2:
        setModal(prev => ({
          ...prev,
          size: 'MEDIUM'
        }));
        break;
      case 3:
        setModal(prev => ({
          ...prev,
          size: 'LARGE'
        }));
        break;
    }
  }

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
      parseInt(event.target.value, 10)
    );

    setSelectedFlavors([]);
    setAnimate(true); 

    setTimeout(() => {
      setAnimate(false); 
    }, 300); 
  };

  const handlePizzaMass = (event) => {
    const key = parseInt(event.target.value)
    switch (key) {
      case 1:
        setModal(prev => ({
          ...prev,
          mass: 'THIN',
        }));
        break;
      case 2:
        setModal(prev => ({
          ...prev,
          mass: 'THICK',
        }));
        break;
      default:
        break;
    }
  }

  const handlePizzaBorder = (event) => {
    const key = parseInt(event.target.value);

    switch (key) {
      case 1:
        setModal(prev => ({
          ...prev,
          border: 'Catupiry',
        }));
        break;
      case 2:
        setModal(prev => ({
          ...prev,
          border: 'Chocolate',
        }));
        break;
      default:
        break;
    }
  }

  const handleFlavorCount = (event) => {
    const key = parseInt(event.target.value, 0);
    switch (key) {
      case 1:
        setModal(prev => ({
          ...prev,
          pizzaText: 'Pizza (1 Sabor)',
          pizzaImage: pizza1Sabor
        }));
        break;
      case 2:
        setModal(prev => ({
          ...prev,
          pizzaText: 'Pizza (2 Sabores)',
          pizzaImage: pizza2Sabores
        }));
        break;
      case 3:
        setModal(prev => ({
          ...prev,
          pizzaText: 'Pizza (3 Sabores)',
          pizzaImage: pizza3Sabores
        }));
        break;
      case 4:
        setModal(prev => ({
          ...prev,
          pizzaText: 'Pizza (4 Sabores)',
          pizzaImage: pizza4Sabores
        }))
        break;
    }
  }


  return (
    <div className={styles["modal-wrapper-flavor"]}>
      <section className={styles["modal-container-flavor"]}>

        <div className={styles["pizza-options-flavor"]}>
          <select className={styles["pizza-dropdown-flavor"]} defaultValue='0' onChange={handleFlavorCount}>
            <option value='0' disabled>Quantidade</option>
            <option value='1'>1 Sabor</option>
            <option value='2'>2 Sabores</option>
            <option value='3'>3 Sabores</option>
            <option value='4'>4 Sabores</option>
          </select>

          <select className={styles["pizza-dropdown-flavor"]} defaultValue='0' onChange={handlePizzaSize}>
            <option value='0' disabled>Tamanho da pizza</option>
            <option value='1'>Pequena</option>
            <option value='2'>Média</option>
            <option value='3'>Grande</option>
          </select>

          <select className={styles["pizza-dropdown-flavor"]} defaultValue='0' onChange={handlePizzaMass}>
            <option value='0' disabled>Massa da pizza</option>
            <option value='1'>Fina</option>
            <option value='2'>Grossa</option>
          </select>

          <select className={styles["pizza-dropdown-flavor"]} defaultValue='0' onChange={handlePizzaBorder}>
            <option value='0' disabled>Borda da pizza</option>
            <option value='1'>Catupiry</option>
            <option value='2'>Chocolate</option>
          </select>

        </div>

        <div className={styles["menu-separador"]}></div>

        <div className={styles["pizza-menu-flavor"]}>
         
          <div className={styles["search-bar"]}>
            <p className={styles["pizza-title"]}>Selecione o sabor</p>

            <InputSearch valueSearch={valueSearch} handleSearch={handleSearch} text="Pesquise pelo nome do sabor"/>

            {showFlavorOptions && (
              <div className={styles["flavor-options-list"]}>
                {flavors && flavors.map((flavor, index) => (
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
              <p className={styles["pizza-title"]}>{modal.pizzaText}</p>

              {modal.pizzaImage && (
                <img 
                  src={modal.pizzaImage} 
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

        <FooterModal handleBack={handleBack} handleNext={handleConfirm}/>
      </section>
      <ToastContainer />
    </div>
  );
};

export default PizzaComponent;