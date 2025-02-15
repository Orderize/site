import api from "../Axios";

export const getHistory = async (value = "") => {
    try {
        const response = await api.get('/orders/last', {});
        return response.data;
    } catch (error) {
        console.error('[getHistory] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};
