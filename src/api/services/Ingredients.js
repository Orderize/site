import api from "../Axios";

export const getIngredients = async (token, params) => {
    try {
        const response = await api.get('/ingredients', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params,
        });
        return response.data;
    }
    catch (error) {
        console.error('[getIngredients] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};