import React,{ useEffect, useState } from 'react';
import api from '../../services/api';
import Cookies from 'js-cookie'
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemembered, setIsRemembered] = useState(false);

    const goTo = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            email,
            password
        };

        try {
            const response = await api.post('/auth/login', data)
            .then(response => {
                const token = response.data.token;
                const headers = response.headers;
                const status = response.status;

                return {token, status};
            })
            .catch(error => {
                const responseError = error.response;
                const data = responseError.data;
                const message = data.message;
                const status = data.status;

                console.log(data);
                return status;
            });
            
            if (response.status == 200) {
                alert("Login realizado com sucesso.");
                
                localStorage.setItem('token', response.token);

                if (isRemembered) localStorage.setItem('emailAuth', email);
                
                const timeoutToNav = setTimeout(() => {
                    goTo("/pedidos");
                }, 3000);
                return () => clearTimeout(timeoutToNav);
            } else alert("Erro ao realizar o login, verifique os campos.");


        } catch (error) {
            // FAZER UM MODAL AQUI PARA FALAR SOBRE O ERRO
            const message = "Erro ao fazer login. Verifique suas credenciais.";
            alert(message)
            console.log(message);
        }
    };
    
    useEffect(() => {
        document.title = "Orderize | Login";

        const emailAuth = localStorage.getItem('emailAuth');
        if (emailAuth) {
            alert('Redirecionando para o sistema!');
            const timeoutToNav = setTimeout(() => {
                goTo("/pedidos");
            }, 3000);
            return () => clearTimeout(timeoutToNav);
        }

    }, []);

    return (
        <>
            <main className='banner'>
                    <section className='container'> 
                        <form onSubmit={handleSubmit}>
                            <h1>Login | nomeEmpresa</h1>
                            <div className="input_field">
                                <input type="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input_field">
                                <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='recall-connect'>
                                <input type="checkbox" id="manterConectado" onChange={() => setIsRemembered(!isRemembered)}/> 
                                <label htmlFor="manterConectado"> Mantenha-me conectado</label>
                            </div>
                            <div className='recall-forget'>
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
