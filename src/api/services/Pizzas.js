import api from "../Axios";

const base = '/pizzas';

export const getAllPizzas = async (token, name) => {
    try {
        const response = await api.get(base, {
            headers: { Authorization: `Bearer ${token}` },
            params: { name },
        });
        return response.data;
    } catch (error) {
        console.error('[getAllPizzas] Error:', error.response || error.message);
        throw new Error('Erro ao buscar pizzas. Tente novamente.');
    }
};

export const getPizzaById = async (token, id) => {
    try {
        const response = await api.get(`${base}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('[getPizzaById] Error:', error.response || error.message);
        throw new Error('Erro ao buscar a pizza. Tente novamente.');
    }
};

export const savePizza = async (token, pizza) => {
    try {
        const response = await api.post(base, pizza, {
            headers: { Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        console.error('[savePizza] Error:', error.response || error.message);
        throw new Error('Erro ao salvar a pizza. Tente novamente.');
    }
}