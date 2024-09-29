import React,{ useEffect, useState } from 'react';
import style from "./Login.module.css" ;

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
            <main className={style['banner']}>
                <section className={style['container']}> 
                    <h1>nomeEmpresa | Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={style["input_field"]}>
                            <input type="email" placeholder='E-mail' onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className={style["input_field"]}>
                            <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={style['recall-connect']}>
                            <a href='#'>Mantenha-me conectado</a>
                        </div>
                        <div className={style['recall-forget']}>
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
