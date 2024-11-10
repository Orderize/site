import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import FloatingInput from "../Floatinginput/Floatinginput";
import MediaQuery from "react-responsive";
import styles from "./FormClient.module.css";
import { inputNumerosCelular, inputCep, inputSomenteTexto, inputSomenteNumero, inputLetrasNumeros } from "../../utils/globals";
import { getClients, saveClient  } from "../../api/services/Clients";
import { getAddressByCep, saveAddress } from "../../api/services/Address";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FormClient = forwardRef(({ onNovoClientChange }, ref) => {

    const [telefone, setTelefone] = useState("");   
    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [numero, setNumero] = useState("");
    const [endereco, setEndereco] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    
    const [novoClient, setnovoClient] = useState(false);
    const [token] = useState(localStorage.getItem('token'));
    
    const [isTelefonePreenchido, setIsTelefonePreenchido] = useState(false); 
    useEffect(() => {
        setIsTelefonePreenchido(telefone.trim() !== "");
    }, [telefone]);

    useEffect(() => {
        const clientData = JSON.parse(localStorage.getItem("client"));
        
        if (clientData) {
            setTelefone(clientData.phone || "");
            setNome(clientData.name || "");
            setCep(clientData.cep || "");
            setNumero(clientData.number || "");
            setRua(clientData.street || "");
            setBairro(clientData.neighborhood || "");
            setCidade(clientData.city || "");
        }
    }, []);

    const handleClient = async (event) => {
        try {
            const telefoneLimpo = telefone.replace(/\D/g, ""); 
            console.log("Executando handleClient...");
            console.log("Fazendo requisição para a API com:", { token, telefone: telefoneLimpo });

            const response = await getClients(token, telefoneLimpo); 
            console.log("Resposta da API:", response);
            
            if (response && response.length > 0) {
                const data = response[0];
                console.log("Dados brutos do cliente:", JSON.stringify(data));
    
                if (data.name) {
                    console.log("Cliente encontrado:", JSON.stringify(data));
                    setnovoClient(false);
                    onNovoClientChange(false);

                    setNome(data.name);
                    setCep(data.address?.cep || "");
                    setNumero(data.address?.number || "");
                    setRua(data.address?.street || "");
                    setBairro(data.address?.neighborhood || "");
                    setCidade(data.address?.city || "");

                    localStorage.setItem("client", JSON.stringify({
                        phone: data.phone,
                        name: data.name,
                        cep: data.address?.cep || "",
                        number: data.address?.number || "",
                        street: data.address?.street || "",
                        neighborhood: data.address?.street || "",
                        city: data.address?.city || ""
                    }));

                } else {
                    console.log("Cliente não encontrado ou dados incompletos.");
                    setnovoClient(true);
                    onNovoClientChange(true);
                    resetForm();
                }
            } else {
                console.log("Resposta da API é vazia.");
                setnovoClient(true);
                onNovoClientChange(true);
                localStorage.removeItem("client");
                resetForm();
            }
        } catch (error) {
            alert("Erro ao buscar cliente: " + error.message);
            console.log(error);
        }
    };
    
    const handleAddress = async (event) => {
        console.log("Executando handleAddress...");
        try {
            const cepLimpo = cep.replace(/\D/g, "");
            console.log("Chamando API com os seguintes parâmetros:", token, { cep: cepLimpo, number: numero });
            const addressData = await getAddressByCep(token, { cep: cepLimpo, number: numero });
            console.log("Endereço encontrado:", addressData);
            setRua(addressData.street);
            setBairro(addressData.neighborhood);
            setCidade(addressData.city);
            console.log("Dados do endereço:", JSON.stringify(addressData));
            // handleSaveAdress();
        } catch (error) {
            alert("Erro ao buscar o endereço.");
        }
    };

    const resetForm = () => {
        setNome("");
        setCep("");
        setNumero("");
        setEndereco("");
        setRua("");
        setBairro("");
        setCidade("");
    };
    
    const handleSaveAdress = async (event) => {
        try {
            const cepLimpo = cep.replace(/\D/g, "");

            console.log("Executando handleSaveAdress...");
            console.log("Fazendo requisição para a API com:", { token, cepLimpo, numero, rua, bairro, cidade });
    
            const response = await saveAddress(token, {cepLimpo, number: numero, street: rua, neighborhood: bairro, city: cidade});
            console.log("Resposta da API:", response);
            
            if (response) {
                console.log("Endereço salvo com sucesso:", JSON.stringify(response));
            } else {
                console.log("Erro ao salvar o endereço.");
            }
        } catch (error) {
            alert("Erro ao salvar o endereço: " + error.message);
            console.log(error);
        }
    };

    const handleSaveClient = async (event) => {
        try {
            const telefoneLimpo = telefone.replace(/\D/g, ""); 
            const cepLimpo = cep.replace(/\D/g, "");

            console.log("Executando handleSaveClient...");
            console.log("Fazendo requisição para a API com:", { token, telefoneLimpo, nome, cepLimpo, numero, rua, bairro, cidade });
    
            const response = await saveClient(token, {phone: telefoneLimpo, name: nome, address: {cep: cepLimpo, number: numero, street: rua, neighborhood: bairro, city: cidade}});
            console.log("Resposta da API:", response);
            
            if (response) {
                console.log("Cliente salvo com sucesso:", JSON.stringify(response));
            } else {
                console.log("Erro ao salvar o cliente.");
            }
        } catch (error) {
            alert("Erro ao salvar o cliente: " + error.message);
            console.log(error);
        }
    };

    const isValidForm = () => {
        return nome.trim() !== "" && telefone.trim() !== "";
    };

    useImperativeHandle(ref, () => ({
        isValidForm,
        handleSaveClient
    }));

    const handleEnterPress = async (e, type) => {
        console.log("Tecla pressionada:", e.key);
        if (e.key === "Enter" || e.key === "Tab") {
            console.log("Tipo de ação:", type);
            if (type === "telefone") {
                handleClient();
            } 
            if (type === "numero") {
                console.log("Chamando handleAddress...");
                handleAddress();
            }
        } 
    };
    
    return (
        <>
            {/* <main className="container-client"> */}

                <MediaQuery minWidth={769}>
                    <ToastContainer />
                {/* <div className={styles.campos}> */}
                <div >
                        <FloatingInput onValue={telefone} onSet={setTelefone} label={"Telefone"} onInput={inputNumerosCelular} onEnterPress={(e) => handleEnterPress(e, "telefone")}/>  
                        <div className={styles["campos-list"]}>
                            <div className={styles["campos-left"]}>
                                {novoClient ? (
                                    <>
                                        <FloatingInput 
                                            onValue={nome} 
                                            onSet={setNome} 
                                            label={"Nome completo"} 
                                            onInput={inputSomenteTexto} 
                                            disabled={!isTelefonePreenchido}/>

                                        <FloatingInput
                                            onValue={cep}
                                            onSet={setCep}
                                            label={"CEP"}
                                            onInput={inputCep}
                                            disabled={!isTelefonePreenchido}
                                        />

                                        <FloatingInput 
                                            onValue={numero} 
                                            onSet={setNumero} 
                                            label={"Número"} 
                                            onInput={inputSomenteNumero} 
                                            onEnterPress={(e) => handleEnterPress(e, "numero")} 
                                            disabled={!isTelefonePreenchido}/>
                                    </>
                                ) : (
                                    <>
                                        <FloatingInput onValue={nome} onSet={setNome} label={"Nome completo"} disabled />
                                        <FloatingInput onValue={cep} onSet={setCep} label={"CEP"} disabled />
                                        <FloatingInput onValue={numero} onSet={setNumero} label={"Número"} disabled />
                                    </>
                                )}
                            </div>

                            <div className={styles["campos-right"]}>
                                {novoClient ? (
                                    <>
                                        <FloatingInput 
                                            onValue={rua} 
                                            onSet={setRua} 
                                            label={"Rua"} 
                                            onInput={inputSomenteTexto}
                                            disabled={!isTelefonePreenchido} 
                                        />

                                        <FloatingInput 
                                            onValue={bairro} 
                                            onSet={setBairro} 
                                            label={"Bairro"} 
                                            onInput={inputSomenteTexto} 
                                            disabled={!isTelefonePreenchido}
                                        />

                                        <FloatingInput 
                                            onValue={cidade}
                                            onSet={setCidade} 
                                            label={"Cidade"} 
                                            onInput={inputSomenteTexto} 
                                            disabled={!isTelefonePreenchido}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <FloatingInput onValue={rua} onSet={setRua} label={"Rua"} disabled />
                                        <FloatingInput onValue={bairro} onSet={setBairro} label={"Bairro"} disabled />
                                        <FloatingInput onValue={cidade} onSet={setCidade} label={"Cidade"} disabled />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                {/* </div> */}
                </MediaQuery>
            {/* </main> */}
        </>
    );
});

export default FormClient;