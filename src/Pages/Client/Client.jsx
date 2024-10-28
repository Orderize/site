import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import FormClient from "../../Components/FormClient/FormClient";
import ButtonNext from "../../Components/Progress/ButtonNext/ButtonNext";
import Progress from "../../Components/Progress/Progress";
import styles from "./Client.module.css";
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";
import { getClientByPhone } from "../../api/services/User";
import { inputNumerosCelular, inputCep, inputSomenteTexto, inputSomenteNumero, inputLetrasNumeros } from "../../utils/globals";
import FloatingInput from "../../Components/Floatinginput/Floatinginput";
// import { useAuth } from "../../context/AuthContext";

function Client() {
    // const { user } = useAuth();
    const [telefone, setTelefone] = useState("");   
    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [numero, setNumero] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const [user] = useState(JSON.parse(localStorage.getItem('user')));

    const handleNext = () => {
        navigate("/pedidos/novo-pedido");
    };


    const setForms = (data) => {
        localStorage.setItem("client", JSON.stringify(data));
        setNome(data.name);
        setCep(data.address.cep);
        setNumero(data.address.number);
        // setEndereco(data.)
        setRua(data.address.street);
        setBairro(data.address.neighborhood);
        setCidade(data.address.city);
    }

    const handleSearchUser = async () => {
        const value = telefone.replace(/\D/g, "");
        try {
            const data = await getClientByPhone(token, value);
            if (data.length == 1) setForms(data[0]);
        } catch (error) {
            // FAZER UM MODAL AQUI PARA FALAR SOBRE O ERRO
            alert(error.message)
            console.log(error);
        }
    }

    useEffect(() => {
        handleSearchUser();
    }, [telefone]);


    return (
        <>
            <Navbar activeButton={"Pedidos"} roles={user.roles}/>

            <main className={styles["container-client"]}>
            <MediaQuery maxWidth={768}>

                {/* <p className={styles.titulo}>Novo Pedido</p>     */}
                {/* <div className={styles["client-modal"]}> */}

                    {/* <p className={styles.subtitulo}>Selecione o cliente:</p> */}
                    <p className={styles.titulo}>Novo Pedido</p>

                    <div className={styles["client-modal-card"]}>
                        <p className={styles.subtitulo}>Cliente</p>

                        <FormClient />
                    </div>

                    <div className={styles.progress}>
                        <ButtonNext onNext={handleNext} />

                            <Progress currentStep={1} totalSteps={5} />
                    </div>
                {/* </div> */}
            </MediaQuery>

            <MediaQuery minWidth={769}>
            {/* <div className={styles["client-modal"]}> */}
                <p className={styles.titulo}>Novo Pedido</p>

                <div className={styles["client-modal-card"]}>
                    <p className={styles.subtitulo}>Cliente</p>
                    <div className={styles["campos-list"]}>
                        <div className={styles["campos-left"]}>
                            <FloatingInput onValue={telefone} onSet={setTelefone} label={"Telefone"} onInput={inputNumerosCelular}/>  
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

                <ButtonNext onNext={handleNext} />
            {/* </div> */}
            </MediaQuery>
            </main>
        </>
    );
}

export default Client;