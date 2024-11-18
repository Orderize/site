import api from '../Axios';

export const getOrders = async (token, id) => {
    try {
        const response = await api.get(`/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o endereço pelo CEP:", error); 
        throw error; 
    }
};
