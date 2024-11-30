import { useState } from "react";

// export const usePizzaHandler = (initialPizza) => {
//     const [pizza, setPizza] = useState(undefined);
//     const [flavors, setFlavors] = useState(undefined);
//     const [ingredients, setIngredients] = useState(undefined);
//     const [selectedFlavor, setSelectedFlavor] = useState(undefined);
//     const [showIngredients, setShowIngredients] = useState(undefined);

//     const resetPizza = () => {
//         setPizza({
//             flavor: {
//                 text: 'Selecione a quantidade de sabores',
//                 image: initialPizza.flavor.image
//             },
//             total: 0,
//         });
//         setSelectedFlavor([]);
//     }
// }

export const usePizzaHandler = (initialModal) => {
    const [selectedFlavors, setSelectedFlavors] = useState([]);
    const [modal, setModal] = useState(initialModal);
    const [ingredients, setIngredients] = useState({});
    const [showIngredients, setShowIngredients] = useState({});
    const [showFlavorOptions, setShowFlavorOptions] = useState(false);
    const [valueSearch, setValueSearch] = useState("");
  
    const resetModal = () => {
      setModal({
        flavor: {
          pizzaText: 'Selecione a quantidade de sabores',
          pizzaImage: initialModal.flavor.pizzaImage,
        },
        total: 0,
      });
      setSelectedFlavors([]);
    };
  
    return {
      selectedFlavors,
      modal,
      ingredients,
      showIngredients,
      showFlavorOptions,
      valueSearch,
      setSelectedFlavors,
      setModal,
      setIngredients,
      setShowIngredients,
      setShowFlavorOptions,
      setValueSearch,
      resetModal,
    };
  };