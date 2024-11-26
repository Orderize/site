import React, { useState, useEffect } from 'react';
import { getFlavorsPop } from '../../../api/services/Flavors'; 
import { getDrinks } from '../../../api/services/Drinks';  
import styles from './selectPizzaPromo.module.css';

const SelectPizzaPromo = () => {
  const [selectedFlavors, setSelectedFlavors] = useState([]); 
  const [selectedBeverages, setSelectedBeverages] = useState([]); 
  const [condition, setCondition] = useState({ field: '', operator: '', value: '' }); 
  const [error, setError] = useState(''); 
  const [flavorOptions, setFlavorOptions] = useState([]); 
  const [beverageOptions, setBeverageOptions] = useState([]); 
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState('');

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const flavorsData = await getFlavorsPop(token); 
        setFlavorOptions(flavorsData); 

        const params = {
          name:"" ,
          millimeters: ""
        }

        const data = await getDrinks(token, params);
        setBeverageOptions(data); 
      } catch (error) {
        console.error(error);
        alert('Erro ao carregar sabores e bebidas. Tente novamente mais tarde.');
      }
    };

    fetchOptions();
  }, [token]); 

  const handleNext = () => {
    if (
      selectedFlavors.some(flavor => flavor === '') ||
      selectedBeverages.some(beverage => beverage === '') ||
      !condition.field || !condition.operator || !condition.value ||
      !startDate || !endDate
    ) {
      setError('Por favor, selecione todas as opções válidas antes de continuar.');
    } else {
      setError('');
      const promotionData = {
        flavors: selectedFlavors,
        beverages: selectedBeverages,
        condition: condition,
        startDate,
        endDate,
      };

      const jsonData = JSON.stringify(promotionData, null, 2);
      console.log('Promoção salva:', jsonData); 
    }
  };

  const handleFlavorChange = (index, value) => { 
    const newSelectedFlavors = [...selectedFlavors];
    newSelectedFlavors[index] = value;
    setSelectedFlavors(newSelectedFlavors);
  };

  const handleBeverageChange = (index, value) => {
    const newSelectedBeverages = [...selectedBeverages];
    newSelectedBeverages[index] = value;
    setSelectedBeverages(newSelectedBeverages);
  };

  const handleConditionChange = (key, value) => {
    setCondition((prevCondition) => ({
      ...prevCondition,
      [key]: value,
    }));
  };

  const addFlavor = () => setSelectedFlavors([...selectedFlavors, '']); 

  const addBeverage = () => setSelectedBeverages([...selectedBeverages, '']);

  const removeFlavor = (index) => { 
    const newSelectedFlavors = selectedFlavors.filter((_, i) => i !== index);
    setSelectedFlavors(newSelectedFlavors);
  };

  const removeBeverage = (index) => {
    const newSelectedBeverages = selectedBeverages.filter((_, i) => i !== index);
    setSelectedBeverages(newSelectedBeverages);
  };

  return (
    <div className={styles["selectPizzaPromo-modal-wrapper"]}>
      <section className={styles["selectPizzaPromo-modal-container"]}>
        <button className={styles["close-button"]} onClick={() => window.location.reload()}>
          ✖
        </button>
        <h2>Crie sua promoção</h2>

        <div className={styles["selectPizzaPromo-dropdowns"]}>
          {selectedFlavors.map((flavor, index) => ( 
            <div className={styles["selectPizzaPromo-group"]} key={index}>
              <label htmlFor={`flavorSelect${index + 1}`}>Sabor {index + 1}:</label>
              <select
                id={`flavorSelect${index + 1}`}
                value={flavor}
                onChange={(e) => handleFlavorChange(index, e.target.value)}
              >
                <option value="">Selecione um sabor</option>
                {flavorOptions.map((flavorOption, i) => ( 
                  <option key={i} value={flavorOption.id}>
                    {flavorOption.name}
                  </option>
                ))}
              </select>
              {index > 0 && (
                <button type="button" onClick={() => removeFlavor(index)}>
                  Remover Sabor
                </button>
              )}
            </div>
          ))}
          <button className={styles["add-item-button"]} onClick={addFlavor}>
            Adicionar Sabor
          </button>
        </div>

        <div className={styles["selectPizzaPromo-dropdowns"]}>
          {selectedBeverages.map((beverage, index) => (
            <div className={styles["selectPizzaPromo-group"]} key={index}>
              <label htmlFor={`beverageSelect${index + 1}`}>Bebida {index + 1}:</label>
              <select
                id={`beverageSelect${index + 1}`}
                value={beverage}
                onChange={(e) => handleBeverageChange(index, e.target.value)}
              >
                <option value="">Selecione uma bebida</option>
                {beverageOptions.map((beverageOption, i) => (
                  <option key={i} value={beverageOption.id}>
                    {beverageOption.name}
                  </option>
                ))}
              </select>
              {index > 0 && (
                <button type="button" onClick={() => removeBeverage(index)}>
                  Remover Bebida
                </button>
              )}
            </div>
          ))}
          <button className={styles["add-item-button"]} onClick={addBeverage}>
            Adicionar Bebida
          </button>
        </div>

        <div className={styles["selectPizzaPromo-condition"]}>
          <div>
            <p className={styles.titulo}>Precificação</p>

            <input
              className={styles['condition-value']}
              type="number" 
              placeholder="Valor"
              value={condition.value}
              onChange={(e) => {
                const value = e.target.value;
                if (!value || !isNaN(value)) {
                  handleConditionChange('value', value);
                }
              }}
            />
          </div>

          <div>
            <p className={styles.titulo}>Descrição</p>

            <input
              className={styles['condition-value']}
              type="text" 
              placeholder="Se desejar, escreva uma descrição"
            />
          </div>

          <p className={styles.titulo}>Datas da Promoção</p>
          <div className={styles['condition-date']}>
            <div className={styles['date']}>
              <label htmlFor="startDate">Data Inicial:</label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className={styles['date']}>
              <label htmlFor="endDate">Data Final:</label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>


        </div>

        <button className={styles["selectPizzaPromo-next-button"]} onClick={handleNext}>
          Salvar Promoção
        </button>

        {error && <p className={styles["error-message"]}>{error}</p>}
      </section>
    </div>
  );
};

export default SelectPizzaPromo;