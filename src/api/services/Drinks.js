import api from "../Axios";

export const getDrinks = async (token, params) => {
    try {
        const response = await api.get('/drinks', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params,
        });
        return response.data;
    } catch (error) {
        console.error('[getDrinks] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};
