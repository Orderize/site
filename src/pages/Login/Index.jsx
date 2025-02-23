import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/Auth";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Login.module.css";


const Login = () => {

    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemembered, setIsRemembered] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const credentials = {
            email,
            password
        };

        try {
            const data = await authApi(credentials);
            
            if (data) {
                toast.success("Login realizado com sucesso!");
                
                localStorage.setItem('token', data.token);

                if (isRemembered) localStorage.setItem('emailAuth', email);
                
                getUser(data.token);
                //login(data.user, data.token);
                
                const timeoutToNav = setTimeout(() => {
                    const user = JSON.parse(localStorage.getItem('user'));

                    if (user && user.roles.some(role => role.name == "OWNER")) {
                        goTo("/relatorios");
                    } else {
                        goTo("/pedidos");
                    }
                }, 3000);
                return () => clearTimeout(timeoutToNav);
            } else toast.warning("Erro ao realizar o login, verifique os campos.");

        } catch (error) {
            // FAZER UM MODAL AQUI PARA FALAR SOBRE O ERRO

            toast.warning(error.message);
            console.log(error);
        }
    };

    // formula temporaria para armazenar informações do usuario
    const getUser = async (token) => {
        try {
            const data = await userInfo(token);

            if (data) {
                localStorage.setItem('user', JSON.stringify(data));
                return data;
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            return null;
        }
    };
    
    const verifyAuth = () => {
        const emailAuth = localStorage.getItem('emailAuth');
        if (emailAuth) {
            toast.success('Redirecionando para o sistema!');
            const timeoutToNav = setTimeout(() => {
                goTo("/pedidos");
            }, 3000);
            return () => clearTimeout(timeoutToNav);
        }
    };
    
    useEffect(() => {
        document.title = "Orderize | Login";
        verifyAuth();
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
