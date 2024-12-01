import { toast } from "react-toastify";
import { deletePizza, savePizza, updatePizza } from "../api/services/Pizzas";

export const savePizzas = async (token, pizzas) => {
    try {
        const data = await savePizza(token, pizzas);
        return data;        
    } catch (error) {
        toast.error(error.message);
    }
}

export const updatePizzas = async (token, pizzas) => {
    try {
        const data = await updatePizza(token, pizzas, pizzas.id);
        return data;
    } catch (error) {
        toast.error(error.message);
    }
}

export const deletePizzas = (token, pizzas) => {
    try {
        return deletePizza(token, pizzas.id);
    } catch (error) {
        toast.error(error.message);
    }
}

export const handleDataPizza = (pizzas) => {
    const observations = pizzas.flavors
        .filter(flavor => flavor.observations?.length > 0)
        .map(flavor => `Pizza de ${flavor.name} sem ${flavor.observations?.map(obs => obs).join(', ')}`)
        .join(", ");

    const transformedPizza = {
        ...pizzas,
        flavors: pizzas.flavors.map(flavor => flavor.id),
        observations
    };

    return transformedPizza;
}

export default savePizzas;

