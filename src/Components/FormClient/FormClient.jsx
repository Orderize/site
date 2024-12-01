import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import FloatingInput from "../Floatinginput/Floatinginput";
import MediaQuery from "react-responsive";
import styles from "./FormClient.module.css";
import { inputNumerosCelular, inputCep, inputSomenteTexto, inputSomenteNumero, inputLetrasNumeros } from "../../utils/globals";
import { getClients, saveClient, updateClient  } from "../../api/services/Clients";
import { getAddressByCep, saveAddress } from "../../api/services/Address";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FormClient = forwardRef(({ onNovoClientChange, isEditing }, ref) => {

    const [telefone, setTelefone] = useState("");   
    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [numero, setNumero] = useState("");
    const [endereco, setEndereco] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const [user] = useState(JSON.parse(localStorage.getItem("user")));
    
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

    const handleClient = async () => {
        try {
            const telefoneLimpo = telefone.replace(/\D/g, ""); 
    
            const response = await getClients(token, telefoneLimpo); 
            console.log("Resposta da API:", response);
            
            if (response && response.length > 0) {
                const data = response[0];
                setnovoClient(false);
                onNovoClientChange(false);
    
                setNome(data.name);
                setCep(data.address?.cep || "");
                setNumero(data.address?.number || "");
                setRua(data.address?.street || "");
                setBairro(data.address?.neighborhood || "");
                setCidade(data.address?.city || "");
    
                localStorage.setItem("client", JSON.stringify({
                    id: data.id,
                    phone: data.phone,
                    name: data.name,
                    address: data.address?.id,
                    cep: data.address?.cep,
                    number: data.address?.number,
                    street: data.address?.street,
                    neighborhood: data.address?.street,
                    city: data.address?.city
                }));
    
                localStorage.setItem("address", JSON.stringify({
                    id: data.address?.id,
                    cep: data.address?.cep,
                    number: data.address?.number,
                    street: data.address?.street,
                    neighborhood: data.address?.neighborhood,
                    city: data.address?.city
                }));
               toast.success("Cliente encontrado! Clique em 'Próximo' para prosseguir com o pedido.");
            } else {
                console.log("Resposta da API é vazia.");
                if (!novoClient) { // Apenas exibe o toast se já não está em modo novo cliente
                    toast.info("Cliente não encontrado.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
    
                setnovoClient(true);
                onNovoClientChange(true);
                localStorage.removeItem("client");
                localStorage.removeItem("address");
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
            const addressData = await getAddressByCep(token, { cep: cepLimpo, number: numero });

            setRua(addressData.street);
            setBairro(addressData.neighborhood);
            setCidade(addressData.city);
            setEstado(addressData.state);

            localStorage.setItem("address", JSON.stringify(addressData));

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

            const response = await saveAddress(token, { cep: cepLimpo, number: numero, street: rua, neighborhood: bairro, city: cidade, state: estado });
            console.log("Resposta da API:", response);
            
            if (response?.id) {
                localStorage.setItem("address", JSON.stringify(response));
                return(response.id);
            } else {
                console.log("Erro ao salvar o endereço.");
            }
        } catch (error) {
            alert("Erro ao salvar o endereço: " + error.message);
            console.log(error);
        }
    };

    const handleSaveClient = async ( idAddress ) => {

        console.log("Executando handleSaveClient com id...", idAddress);

        try {
            const telefoneLimpo = telefone.replace(/\D/g, ""); 
            const cepLimpo = cep.replace(/\D/g, "");
    
            const response = await saveClient(token, {phone: telefoneLimpo, name: nome, address: idAddress, password: "senhapadrao", enterprise: user.enterprise.id, state:"SP" });
            console.log("Resposta da API:", response);

            localStorage.setItem("client", JSON.stringify({
                id: response.id,
                phone: response.phone,
                name: response.name,
                address: response.address?.id,
                cep: response.address?.cep,
                number: response.address?.number,
                street: response.address?.street,
                neighborhood: response.address?.street,
                city: response.address?.city
            }));
            
            if (response?.id) {
                console.log("Cliente salvo com sucesso:", JSON.stringify(response));
                return(response.id);
            } else {
                console.log("Erro ao salvar o cliente.");
            }
        } catch (error) {
            alert("Erro ao salvar o cliente: " + error.message);
            console.log(error);
        }
    };

    const isValidForm = () => {
        return nome.trim() !== "" || telefone.trim() !== "" || cep.trim() !== "" || numero.trim() !== "" || rua.trim() !== "" || bairro.trim() !== "" || cidade.trim() !== "";
    };
    
    const handleSaveClick = async () => {
        try {
            const telefoneLimpo = telefone.replace(/\D/g, ""); 
            const cepLimpo = cep.replace(/\D/g, "");

            var idClient = localStorage.getItem("client") ? JSON.parse(localStorage.getItem("client")).id : null;
            var idAddress = localStorage.getItem("address") ? JSON.parse(localStorage.getItem("address")).id : null;
    
            const response = await updateClient(token, {id: idClient, phone: telefoneLimpo, name: nome, address: idAddress, password: "senhapadrao", enterprise: user.enterprise.id });
            console.log("Resposta da API:", response);

            localStorage.setItem("client", JSON.stringify({
                id: response.id,
                phone: response.phone,
                name: response.name,
                address: response.address?.id,
                cep: response.address?.cep,
                number: response.address?.number,
                street: response.address?.street,
                neighborhood: response.address?.street,
                city: response.address?.city
            }));
            
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

    useImperativeHandle(ref, () => ({
        isValidForm,
        handleSaveAdress,
        handleSaveClient,
        handleSaveClick
    }));

    const handleEnterPress = async (e, type) => {
        console.log("Tecla pressionada:", e.key);
        if (e.key === "Enter" || e.key === "Tab") {
            console.log("Tipo de ação:", type);
            if (type === "telefone") {
                handleClient();
            } else if (type === "numero") {
                console.log("Chamando handleAddress...");
                handleAddress();
            }
        } 
    };
    
    return (
        <>
                <MediaQuery minWidth={769}>
                <div >
                        <FloatingInput 
                            onValue={telefone} 
                            onSet={setTelefone} 
                            label={"Telefone"} 
                            onInput={inputNumerosCelular} 
                            onEnterPress={(e) => handleEnterPress(e, "telefone")}
                        /> 

                        <div className={styles["campos-list"]}>
                            <div className={styles["campos-left"]}>
                                {novoClient ? (
                                    <>
                                        <FloatingInput 
                                            onValue={nome} 
                                            onSet={setNome} 
                                            label={"Nome completo"} 
                                            onInput={inputSomenteTexto} 
                                            disabled={!isTelefonePreenchido}
                                        />

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
                                            disabled={!isTelefonePreenchido}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <FloatingInput onValue={nome} onSet={setNome} label={"Nome completo"} disabled={!isEditing} />
                                        <FloatingInput onValue={cep} onSet={setCep} label={"CEP"} disabled={!isEditing} />
                                        <FloatingInput onValue={numero} onSet={setNumero} label={"Número"} disabled={!isEditing} />
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
                                            disabled={!isEditing}
                                        />

                                        <FloatingInput 
                                            onValue={bairro} 
                                            onSet={setBairro} 
                                            label={"Bairro"} 
                                            onInput={inputSomenteTexto} 
                                            disabled={!isEditing}
                                        />

                                        <FloatingInput 
                                            onValue={cidade}
                                            onSet={setCidade} 
                                            label={"Cidade"} 
                                            onInput={inputSomenteTexto} 
                                            disabled={!isEditing}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <FloatingInput onValue={rua} onSet={setRua} label={"Rua"} disabled={!isEditing} />
                                        <FloatingInput onValue={bairro} onSet={setBairro} label={"Bairro"} disabled={!isEditing} />
                                        <FloatingInput onValue={cidade} onSet={setCidade} label={"Cidade"} disabled={!isEditing} />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                </MediaQuery>
                <ToastContainer />
        </>
    );
});

export default FormClient;