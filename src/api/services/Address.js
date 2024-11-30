import api from '../Axios';

export const getAddressByCep = async (token, { cep, number }) => {
    try {
        const response = await api.post('/addresses/cep', {cep, number}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
        });
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