import { toast } from "react-toastify";
import api from "../Axios";

export const getPromotions = async (name="") => {
    try {
        const response = await api.get("/promotions", {
            params: {
                name
            },
        });
        return response.data;
    } catch (error) {
        console.error("[getPromotions] error: ", error);
        toast.error("Erro ao fazer requisição. Aguarde um momento e recarregue a página.");
    }
};


