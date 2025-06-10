import { toast } from "react-toastify";
import api from "../Axios";

const base = '/reports';

export const getReportsWeek = async () => {
    try {
        const response = await api.get(`${base}/week`, {});
        return response.data;
    } catch (error) {
        console.error('[getReportsWeek] error: ', error);
        toast.error(`Erro ao processar os dados! Aguarde um momento e recarregue a página.`);
    }
};

export const getReportsMonth = async () => {
    try {
        const response = await api.get(`${base}/month`, {});
        return response.data;
    } catch (error) {
        console.error('[getReportsMonth] error: ', error);
        toast.error('Erro ao processar os dados! Aguarde um momento e recarregue a página.')
    }
}
