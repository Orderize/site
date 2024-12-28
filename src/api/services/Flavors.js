import { toast } from "react-toastify";
import api from "../Axios";

export const getFlavorsPop = async (value = "") => {
    try {
        const response = await api.get('/flavors/pop', {
            params: {
                value,
            },
        });
        return response.data;
    } catch (error) {
        console.error('[getFlavorsPop] error: ', error);
        const message = "Erro ao fazer requisição. Aguarde um momento e recarregue a página.";
        toast.error(message);
    }
};

export const saveFlavor = async (token, flavor) => {
    try {
        const response = await api.post('/flavors', flavor, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('[saveFlavor] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};

export const updateFlavor = async (token, idFlavor, flavor) => {
    try {
        const response = await api.put(`/flavors/${idFlavor}`, flavor, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('updateFlavor response ' + response)
        return response.data;
    }
    catch (error) {
        console.error('[updateFlavor] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};

export const deleteFlavor = async (token, idFlavor) => {
    try {
        const response = await api.delete(`/flavors/${idFlavor}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('[deleteFlavor] error: ', error);
        throw new Error('Erro ao fazer requisição. Aguarde um momento e recarregue a página.');
    }
};