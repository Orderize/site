import { toast } from 'react-toastify';
import api from '../Axios';

export const getAttestationsToday = async () => {
    try {
        const date = new Date().toISOString().split("T")[0];
        
        const response = await api.get('/attestations', {
            params: {
                date,
            }
        });
        
        return response.data;
    } catch (error) {
        toast.error("Erro ao buscar o recibo de hoje:", error);
        console.error("Erro ao buscar o recibo de hoje:", error); 
        throw error; 
    }
};

export const getAttestations = async (token) => {
    try {
        const response = await api.get('/attestations');
        return response.data;
    } catch (error) {
        toast.error(`Erro ao processar seus gráficos: ${error.message}`);
        console.error("Erro ao buscar o recibo:", error);
        throw error;
    }
};

export const saveAttestation = async (token, order) => {
    try {
        const response = await api.post('/attestations', order);
        return response.data;
    } catch (error) {
        console.error("Erro ao salvar o recibo:", error);
        throw new Error("Erro ao salvar o recibo. Aguarde um momento e tente novamente.");
    }
};