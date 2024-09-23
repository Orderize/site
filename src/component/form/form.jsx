import React from "react";
import "./form.css"

function Formulario() {
    return (
        <div className="form">
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
           
            <div className="botoesForm">
                <button type="button" className="buttonCancel"> Cancelar</button>
                <button type="submit" className="buttonSubmit"> Enviar</button>
            </div>
        </div>
    );
}

export default Formulario;