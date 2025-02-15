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
