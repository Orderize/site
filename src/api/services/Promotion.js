import api from "../Axios";

export const getPromotions = async (token, name="") => {
    try {
        const response = await api.get('/promotions', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                name
            },
        });
        return response.data;
    } catch (error) {
        console.error('[getPromotions] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};


