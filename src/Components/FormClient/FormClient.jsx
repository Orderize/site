import React, { useEffect, useState } from "react";
import FloatingInput from "../Floatinginput/Floatinginput";
import MediaQuery from "react-responsive";
import styles from "./FormClient.module.css";
import { inputNumerosCelular, inputCep, inputSomenteTexto, inputSomenteNumero, inputLetrasNumeros } from "../../utils/globals";
import { getClientByPhone } from "../../api/services/User";

function FormClient() {

  return (
        <>
            {/* <main className="container-client"> */}

                <MediaQuery maxWidth={768}>
                {/* <div className={styles.campos}> */}
                <div className={styles["campos-list"]}>
                        <FloatingInput onValue={telefone} onSet={setTelefone} label={"Telefone"} onInput={inputNumerosCelular}/>
                        <FloatingInput onValue={nome} onSet={setNome} label={"Nome completo"} onInput={inputSomenteTexto}/>
                        <FloatingInput onValue={cep} onSet={setCep} label={"CEP"} onInput={inputCep}/>
                        <FloatingInput onValue={numero} onSet={setNumero} label={"Número"} onInput={inputSomenteNumero}/>
                        <FloatingInput onValue={endereco} onSet={setEndereco} label={"Endereço"} onInput={inputLetrasNumeros}/>
                    </div>
                {/* </div> */}
                </MediaQuery>

                <MediaQuery minWidth={769}>
                {/* <div className={styles.campos}> */}
                <div >
                        <FloatingInput onValue={telefone} onSet={setTelefone} label={"Telefone"} onInput={inputNumerosCelular}/>  
                        <div className={styles["campos-list"]}>
                        <div className={styles["campos-left"]}>
                            <FloatingInput onValue={nome} onSet={setNome} label={"Nome completo"} onInput={inputSomenteTexto}/>
                            <FloatingInput onValue={cep} onSet={setCep} label={"CEP"} onInput={inputCep}/>
                            <FloatingInput onValue={numero} onSet={setNumero} label={"Número"} onInput={inputSomenteNumero}/>
                        </div>

                        <div className={styles["campos-right"]}>
                            <FloatingInput onValue={rua} onSet={setRua} label={"Rua"} onInput={inputSomenteTexto}/>
                            <FloatingInput onValue={bairro} onSet={setBairro} label={"Bairro"} onInput={inputSomenteTexto}/>
                            <FloatingInput onValue={cidade} onSet={setCidade} label={"Cidade"} onInput={inputSomenteTexto}/>
                        </div>
                        </div>
                    </div>
                {/* </div> */}
                </MediaQuery>
            {/* </main> */}
        </>
    );
}

export default FormClient;