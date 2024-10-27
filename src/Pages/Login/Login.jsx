import React,{ useEffect, useState } from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/Auth';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemembered, setIsRemembered] = useState(false);

    const goTo = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const credentials = {
            email,
            password
        };

        try {
            const data = await authApi(credentials);
            
            if (data) {
                alert("Login realizado com sucesso.");
                
                localStorage.setItem('token', data.token);

                if (isRemembered) localStorage.setItem('emailAuth', email);
                
                login(data.user, data.token);
                
                const timeoutToNav = setTimeout(() => {
                    goTo("/pedidos");
                }, 3000);
                return () => clearTimeout(timeoutToNav);
            } else alert("Erro ao realizar o login, verifique os campos.");

        } catch (error) {
            // FAZER UM MODAL AQUI PARA FALAR SOBRE O ERRO
            alert(error.message)
            console.log(error);
        }
    };

    const verifyAuth = () => {
        const emailAuth = localStorage.getItem('emailAuth');
        if (emailAuth) {
            alert('Redirecionando para o sistema!');
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
