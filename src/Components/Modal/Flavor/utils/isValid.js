import { toast } from "react-toastify";

export const isValid = (modal, image) => {
    if (modal.flavor.image == image) {
        toast.error("Selecione a quantidade de sabores!")
    } else if (!modal.size) {
        toast.error("Selecione o tamanho da pizza!");
        return false;
    } else if (!modal.mass) {
    toast.error("Selecione o tipo de massa!");
    return false;
    } else if (!modal.border) {
    toast.error("Selecione o tipo de borda!");
    return false;
    }
    return true;
};
