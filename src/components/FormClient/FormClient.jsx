import React from "react";
import "./FormClient.css";

function FormClient() {
    return (
        <>
            {/* <main className="container-client"> */}

                <div className="campos">

                    <div className="campo__item-telefone">
                        <p><b>Telefone:</b>  tele</p>
                    </div>
                    
                    <div className="campos__list">
                        <div className="campos-left">
                            <div className="campo__item">
                                <p> <b>Nome completo:</b> nome teste </p>
                            </div>
                            <div className="campo__item">
                                <p> <b>Rua:</b>  </p>
                            </div>
                            <div className="campo__item">
                                <p> <b>Cidade:</b>  </p>
                            </div>
                        </div>

                        <div className="campos-right">
                            <div className="campo__item">
                                <p> <b>CEP:</b>  </p>
                            </div>
                            <div className="campo__item">
                                <p> <b>Número:</b>  </p>
                            </div>
                            <div className="campo__item">
                                <p> <b>Bairro:</b>  </p>
                            </div>
                        </div>
                    </div>

                </div>
            {/* </main> */}
        </>
    );
}

export default FormClient;