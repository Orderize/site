export const getObservationText = (selectedFlavors, ingredients) => {
    return selectedFlavors.map((flavor) => {
      const removedIngredients = ingredients[flavor.name]
        ?.filter((ingredient) => !ingredient.checked)
        .map((ingredient) => ingredient.name);
  
      if (removedIngredients.length > 0) {
        return `Pizza de ${flavor.name} sem ${removedIngredients.join(', ')}`;
      }
  
      return '';
    })
    .filter(Boolean)
    .join('\n');
};
  