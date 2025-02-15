import { toast } from "react-toastify";
import api from "../Axios";

export const getDrinks = async (name = "", milimeters = "") => {
    try {
        const response = await api.get("/drinks", {
            params: {
                name,
                milimeters
            }
        });
        return response.data;
    } catch (error) {
        console.error("[getDrinks] error: ", error);
        toast.error("Erro ao fazer requisição. Aguarde um momento e recarregue a página.");        
    }
};
