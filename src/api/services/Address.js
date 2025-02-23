import api from '../Axios';

export const getAddressByCep = async ({ cep, number = 0 }) => {
    try {
        const response = await api.post('/addresses/cep', {cep, number});
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o endereço pelo CEP:", error); 
        throw error; 
    }
};

export const saveAddress = async (token, address) => {
    try {
        const response = await api.post('/addresses', address, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar o endereço:", error);
        throw error;
    }
};

export const updateAddress = async (token, address) => {
    try {
        const response = await api.put(`/addresses`, address, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar o endereço:", error);
        throw error;
    }
};