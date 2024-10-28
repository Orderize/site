import React, { useEffect, useState } from 'react';
import './review.css';

function PizzaModal({ pizzas, handleNext, handleBack }) {
  const [listIngredients, setListIngredients] = useState([]);

  const handleIngredients = () => {    
    if (pizzas.length > 0) {
      const ingredients = pizzas.flatMap(pizza => pizza.flavors).flatMap(flavor => flavor.ingredients);
      setListIngredients(ingredients);
    }
  }

  useEffect(() => {
    handleIngredients();
  }, []);

  return (
    <section className="modal-overlay-review">
      <div className="container-review">
        <h2>Revisão da pizza</h2>

        <div className="pizza-options-review">
          <select className="pizza-dropdown-review">
            <option>Tamanho da pizza</option>
            <option>8 pedaços</option>
            <option>6 pedaços</option>
          </select>

          <select className="pizza-dropdown-review">
            <option>Massa da pizza</option>
            <option>Massa fina</option>
            <option>Massa grossa</option>
          </select>

          <select className="pizza-dropdown-review">
            <option>Borda da pizza</option>
            <option>Catupiry</option>
            <option>Sem borda</option>
          </select>
        </div>

        <div className="pizza-menu-review">
          <div className="pizza-header">
            <span>{pizzas[0].id} | {pizzas[0].name}</span>
          </div>

          <div className="pizza-ingredients">
            <p>Ingredientes:</p>
            <ul>
            {listIngredients.map(ingredient => (
                <li key={ingredient.id}>
                  <input type="checkbox" checked readOnly /> {ingredient.name}
                </li>
            ))}
            </ul>
          </div>
        </div>

        <div className="pizza-actions">
          <button onClick={handleBack} className="button back-btn">Voltar</button>
          <button onClick={handleNext} className="button next-btn">Próximo</button>
        </div>
      </div>
    </section>
  );
};

export default PizzaModal;
