import api from "../Axios";

const base = '/reports';

export const getReportsWeek = async (token) => {
    try {
        const response = await api.get(`${base}/week`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('[getReportsWeek] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};

export const getReportsMonth = async (token) => {
    try {
        const response = await api.get(`${base}/month`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('[getReportsMonth] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
}
