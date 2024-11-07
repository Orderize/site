import api from "./Axios";

export const authApi = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('[authApi] error: ', error);
        throw new Error('Erro ao fazer login. Verifique suas credenciais.');
    }
};
