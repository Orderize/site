import React from "react";
import styles from "./Form.module.css"

function Form() {
    return (
        <div className={styles["form"]}>
            <div>
                <input type="text" placeholder="Digite seu nome"/>  
            </div>

            <div>
                <input type="text" placeholder="Digite seu email"/>  
            </div>

            <div>
                <input type="text" placeholder="Assunto"/>  
            </div>

            <div>
                <textarea placeholder="Escreva sua mensagem..."/>  
            </div>
           
            <div className={styles["buttonsForm"]}>
                <button type="button" className={styles["buttonCancel"]}> Cancelar</button>
                <button type="submit" className={styles["buttonSubmit"]}> Enviar</button>
            </div>
        </div>
    );
}

export default Form;