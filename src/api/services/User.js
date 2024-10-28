import api from "../Axios";

export const getClientByPhone = async (token, phone) => {
    try {
        const response = await api.get('/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                phone
            },
        });
        return response.data;
    } catch (error) {
        console.error('[getClientByPhone] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};
