import React,{ useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/Auth";
import { useAuth } from "../../hooks/useAuth";
import { isOwner } from "../../utils/user/userRoles";
import { userInfo } from "../../api/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";


const Login = () => {

    const { logout, login, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemembered, setIsRemembered] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const credentials = { email, password };

        try {
            const data = await authApi(credentials);
            
            if (data) {
                toast.success("Login realizado com sucesso!");
                
                data.user = await userInfo(data.token);
                
                console.log(data);
                
                login(data.user, data.token);
                
                if (isRemembered) localStorage.setItem('emailAuth', email);

                redirectUser(data.user);
            } else toast.warning("Erro ao realizar o login, verifique os campos.");

        } catch (error) {
            toast.warning(error.message);
            console.log(error);
        }
    };

    const redirectUser = (user) => {            
        setTimeout(() => {
            if (isOwner(user)) {
                navigate("/relatorios");
            } else {
                navigate("/pedidos");
            }
        }, 3000);
    };

    const verifyIsRemembered = () => {
        const emailAuth = localStorage.getItem('emailAuth');
        if (emailAuth) {
            toast.success('Redirecionando para o sistema!');
            redirectUser(user);
        }
    };
    
    useEffect(() => {
        document.title = "Orderize | Login";
        logout()
        verifyIsRemembered();
    }, []);

    return (
        <>
        <ToastContainer
        autoClose={3000} />
            <main className={styles['banner']}>
                    <section className={styles['container']}> 
                        <form onSubmit={handleSubmit}>
                            <h1>Orderize | Login</h1>
                            <div className={styles['input_field']}>
                                <input type="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className={styles['input_field']}>
                                <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className={styles['recall-connect']}>
                                <input type="checkbox" id="manterConectado" onChange={() => setIsRemembered(!isRemembered)}/> 
                                <label htmlFor="manterConectado"> Mantenha-me conectado</label>
                            </div>
                            <div className={styles['recall-forget']}>
                                <a href='#'>Esqueceu a senha?</a>
                            </div>
                            <button>Entrar</button>
                        </form>
                    </section>
            </main>
        </>
    );
}

export default Login;
