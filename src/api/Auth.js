import { toast } from "react-toastify";
import api from "./Axios";

export const authApi = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('[authApi] error: ', error);
        const message = 'Erro ao fazer login. Verifique suas credenciais.'; 
        toast.error(message);
        throw new Error(message);
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
        const message = 'Erro ao pegar informações do usuário.'; 
        toast.error(message);
        throw new Error(message);
    }
};
