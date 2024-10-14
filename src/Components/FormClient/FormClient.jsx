import React from "react";
import FloatingInput from "../Floatinginput/Floatinginput";
import MediaQuery from "react-responsive";
import styles from "./FormClient.module.css";

function FormClient() {

    return (
        <>
            {/* <main className="container-client"> */}

                <MediaQuery maxWidth={768}>
                {/* <div className={styles.campos}> */}
                <div className={styles["campos-list"]}>
                        <FloatingInput label={"Telefone"} />
                        <FloatingInput label={"Nome completo"} />
                        <FloatingInput label={"CEP"} />
                        <FloatingInput label={"Número"} />
                        <FloatingInput label={"Endereço"} />
                    </div>
                {/* </div> */}
                </MediaQuery>

                <MediaQuery minWidth={769}>
                {/* <div className={styles.campos}> */}
                <div className={styles["campos-list"]}>
                        <div className={styles["campos-left"]}>
                            <FloatingInput label={"Telefone"} />  
                            <FloatingInput label={"Nome completo"} />
                            <FloatingInput label={"CEP"} />
                            <FloatingInput label={"Número"} />
                        </div>

                        <div className={styles["campos-right"]}>
                            <FloatingInput label={"Rua"} />
                            <FloatingInput label={"Bairro"} />
                            <FloatingInput label={"Cidade"} />
                        </div>
                    </div>
                {/* </div> */}
                </MediaQuery>
            {/* </main> */}
        </>
    );
}

export default FormClient;