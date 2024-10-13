import React, { useRef } from "react";
import styles from "./Form.module.css";
import { sendEmail } from "./form";

const Form = () => {
  const formRef = useRef(); 

  const cancel = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <form ref={formRef} onSubmit={sendEmail(formRef)} className={styles['form']}>
      <h1>Envie uma mensagem!</h1>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Digite seu nome"
          required
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Digite seu email"
          required
        />
      </div>

      <div>
        <input type="text" name="subject" placeholder="Assunto" required/>
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Escreva sua mensagem..."
          required
        />
      </div>

      <div className={styles['buttonsForm']}>
        <button type="button" className={styles['buttonCancel']} onClick={cancel}>
          Cancelar
        </button>
        <button type="submit" className={styles['buttonSubmit']}>
          Enviar
        </button>
      </div>
    </form>
  );
};

export default Form;
