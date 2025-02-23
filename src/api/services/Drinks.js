import { toast } from "react-toastify";
import api from "../Axios";

export const getDrinks = async (name = "", milimeters = "") => {
    try {
        const response = await api.get("/drinks", {
            params: {
                name,
                milimeters
            }
        });
        return response.data;
    } catch (error) {
        console.error("[getDrinks] error: ", error);
        toast.error("Erro ao listar os drinks. Por favor, aguarde um momento e recarregue a página.");        
    }
};

export const saveDrink = async (drink) => {
    try {
        const response = await api.post('/drinks', drink);
        return response.data;
    } catch (error) {
        console.error('[saveDrink] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};

export const updateDrink = async (token, idDrink, drink) => {
    try {
        const response = await api.put(`/drinks/${idDrink}`, drink);
        console.log('updateDrink response '+response.data);
        return response.data;
    } catch (error) {
        console.error('[updateDrink] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};

export const deleteDrink = async (token, idDrink) => {
    try {
        const response = await api.delete(`/drinks/${idDrink}`);
        console.log('deleteDrink response '+response.data);
        return response.data;
    } catch (error) {
        console.error('[deleteDrink] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};

export const getDrinksPop = async (value = "") => {
    try {
        const response = await api.get("/drinks/pop", {
            params: {
                value
            }
        });
        return response.data;
    } catch (error) {
        console.error("[getDrinksPop] error: ", error);
        return getDrinks(value);
        toast.error("Erro ao listar os drinks. Por favor, aguarde um momento e recarregue a página.")
        
    }
}
