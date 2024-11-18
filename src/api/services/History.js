import api from "../Axios";

export const getHistory = async (token, value = "") => {
    try {
        const response = await api.get('/orders', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                value,
            },
        });
        return response.data;
    } catch (error) {
        console.error('[getHistory] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};
