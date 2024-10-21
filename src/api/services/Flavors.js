import api from "../Axios";

export const getFlavorsPop = async (token, value = "") => {
    try {
        const response = await api.get('/flavors/pop', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                value,
            },
        });
        return response.data;
    } catch (error) {
        console.error('[getFlavorsPop] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};
