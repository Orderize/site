import api from "../Axios";

export const getDrinksPop = async (token, params) => {
    try {
        const response = await api.get('/drinks', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params,
        });
        return response.data;
    } catch (error) {
        console.error('[getDrinksPop] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};
