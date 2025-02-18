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
        toast.error("Erro ao listar os drinks. Por favor, aguarde um momento e recarregue a página.");        
    }
};

export const getDrinksPop = async (value = "") => {
    try {
        const response = await api.get("/drinks/pop", {
            params: {
                value
            }
        });
        return response.data;
    } catch (error) {
        console.error("[getDrinksPop] error: ", error);
        toast.error("Erro ao listar os drinks. Por favor, aguarde um momento e recarregue a página.")
        
    }
}
