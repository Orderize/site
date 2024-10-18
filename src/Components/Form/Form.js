import emailjs from "@emailjs/browser";
import './Form.module.css';

export const sendEmail = (formRef) => (e) => {
  e.preventDefault();


  emailjs
    .sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,//service ID
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,//template ID
      formRef.current,//referência ao formulário
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY//public Key
    )
    .then(
      (result) => {
        console.log("SUCCESS!", result.text);
        Swal.fire({
          title: 'Sucesso!',
          text: 'Sua mensagem foi enviada com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        formRef.current.reset();
      },
      (error) => {
        console.log("FAILED...", error);
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao enviar a mensagem.',
          icon: 'error',
          confirmButtonText: 'OK'
        }
        )
      }
    );
};


