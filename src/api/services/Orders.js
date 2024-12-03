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

export const saveOrder = async (token, order) => {
    try {
        const response = await api.post('/orders', order, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('[saveOrder] error: ', error);
        throw new Error('Erro ao salvar o pedido. Aguarde um momento e tente novamente.');
    }
};

export const getTotalPrice = async (token, order) => {
    try {
        const response = await api.get('/orders/total-price', order, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('[getTotalPrice] error: ', error);
        throw new Error('Erro ao calcular o preço total. Aguarde um momento e tente novamente.');
    }
}
