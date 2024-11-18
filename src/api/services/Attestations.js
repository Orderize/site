import api from '../Axios';

export const getAttestationsToday = async (token) => {
    try {
        const date = new Date().toISOString().split("T")[0];
        
        const response = await api.get('/attestations', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                date,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o recibo de hoje:", error); 
        throw error; 
    }
};

export const getAttestations = async (token) => {
    try {
        const response = await api.get('/attestations', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o recibo:", error);
        throw error;
    }
};