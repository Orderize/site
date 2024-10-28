import api from "../Axios";

export const getAllPizzas = async (token, name) => {
    try {
        const response = await api.get('/pizzas', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                name,
            },
        });
        return response.data;
    } catch (error) {
        console.error('[getAllPizzas] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};
