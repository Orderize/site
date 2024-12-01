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

export const userInfo = async (authorization) => {
    try {
        const response = await api.get('/auth/user/info', {
            headers: {
                Authorization: authorization
            }
        });
        return response.data;
    } catch (error) {
        console.error('[userInfo] error: ', error); 
        throw new Error('Erro ao pegar informações do usuário.');
    }
};
