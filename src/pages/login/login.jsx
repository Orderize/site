import React,{ useEffect, useState } from 'react';
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Enviando os dados: " + username + " - " + password);
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
                            <input type="email" placeholder='E-mail' onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input_field">
                            <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='recall-connect'>
                            <a href='#'>Mantenha-me conectado</a>
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
