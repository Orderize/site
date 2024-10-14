import emailjs from "@emailjs/browser"; 

export const sendEmail = (formRef) => (e) => {
  e.preventDefault(); 
  

  emailjs
    .sendForm(
      "service_4le1ih5", //service ID
      "template_5x1r3fm", //template ID
      formRef.current, //referência ao formulário
      "AW_6VWmi9m2SjR3Co" //public Key
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
    )}
    );
};


