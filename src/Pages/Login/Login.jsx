import React,{ useEffect, useState } from 'react';
import api from '../../services/api';;
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                const data = response.data;
                const headers = response.headers;
                const status = response.status;
                
                console.log(response);
                //sessionStorage.setItem('token', data.token);
                return status;
            })
            .catch(error => {
                const responseError = error.response;
                const data = responseError.data;
                const message = data.message;
                const status = data.status;

                console.log(data);
                return status;
            });
            
            if (response == 200) {
                alert("Login realizado com sucesso.");
                const timeoutToNav = setTimeout(() => {
                    goTo("/navbar");
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
                            <input type="checkbox" id="manterConectado" /> 
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
