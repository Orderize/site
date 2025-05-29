import { toast } from "react-toastify";
import api from "../Axios";

export const getDrinks = async ({ name = "", milimeters = "" } = {}) => {
    try {
        const params = new URLSearchParams();

        if (name) params.append("name", name);

        const milimetersNumber = Number(milimeters);
        if (milimeters && !isNaN(milimetersNumber) && milimetersNumber > 0) {
            params.append("milimeters", milimetersNumber);
        }

        const url = `/drinks${params.toString() ? `?${params.toString()}` : ""}`;
        const response = await api.get(url);

        console.log('getDrink '+ JSON.stringify(response));
        return response.data;
    } catch (error) {
        console.error("[getDrinks] error: ", error);
        toast.error("Erro ao listar as bebidas.");
        return []; 
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
        const response = await api.put(`/drinks/${idDrink}`, drink, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('[updateDrink] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};

export const deleteDrink = async (token, idDrink) => {
    try {
        const response = await api.delete(`/drinks/${idDrink}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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
        toast.error("Erro ao listar os drinks. Por favor, aguarde um momento e recarregue a página.")
        
    }
}
