export function handleOptionSize(event, setPizzas) {
  const size = event.target.value;
  setPizzas(prev => ({
    ...prev,
    size
  }));
}

export function handleOptionMass(event, setPizzas) {
  const mass = event.target.value
  setPizzas(prev => ({
    ...prev,
    mass
  }));
}  

export function handleOptionBorder(event, setPizzas) {
  const border = event.target.value;

  setPizzas(prev => ({
    ...prev,
    border
  }));
}

export function handleOptionFlavor(event) {
  const key = parseInt(event.target.value, 0);
  switch (key) {
    case 1:
      setModal(prev => ({
        ...prev,
        flavor: {
          text: 'Pizza (1 Sabor)',
          image: pizza1Sabor,
          value: key
        }
      }));
      break;
    case 2:
      setModal(prev => ({
        ...prev,
        flavor: {
          text: 'Pizza (2 Sabores)',
          image: pizza2Sabores,
          value: key
        }
      }));
      break;
    case 3:
      setModal(prev => ({
        ...prev,
        flavor: {
          text: 'Pizza (3 Sabores)',
          image: pizza3Sabores,
          value: key
        }
      }));
      break;
    case 4:
      setModal(prev => ({
        ...prev,
        flavor: {
          text: 'Pizza (4 Sabores)',
          image: pizza4Sabores,
          value: key
        }
      }))
      break;
  }
}