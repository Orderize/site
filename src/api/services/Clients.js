import api from "../Axios";

export const getClients = async (token, telefone) => {
    try {
        const response = await api.get(`/users?phone=${telefone}` , {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('[getClients] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};

export const saveClient = async (token, client) => {
    try {
        console.log("Salvando cliente:", client);
        const response = await api.post('/users', client, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('[saveClient] error: ', error);
        throw new Error('Erro ao salvar cliente. Aguarde um momento e tente novamente.');
    }
};

export const updateClient = async (token, client) => {
    try {
        const response = await api.put('/users', client, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;

    } catch (error) {
        console.error('[updateClient] error: ', error);
        throw new Error('Erro ao atualizar cliente. Aguarde um momento e tente novamente.');
    }

};
