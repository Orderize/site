export const transformarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export const inputSomenteTexto = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ú\s]/g, "");
};

export const inputSomenteNumero = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

export const inputSemCaracteresEspeciais = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ú0-9\s]/g,
        "");
};

export const inputSomenteMinusculas = (e) => {
    e.target.value = e.target.value.replace(/[^a-z\s]/g, "");
};

export const inputSomenteMaiusculas = (e) => {
    e.target.value = e.target.value.replace(/[^A-Z\s]/g, "");
};

export const inputLetrasNumeros = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, "");
};

export const inputSemEspacos = (e) => {
    e.target.value = e.target.value.replace(/\s/g, "");
};

export const inputNumerosDecimais = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, "");
};

export const inputNumerosTelefone = (e) => {
    e.target.value = e.target.value.replace(/[^0-9-]/g, "");
};

export const inputNumerosCelular = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    
    if (value.length > 11) {
        value = value.slice(0, 11); 
    }

    if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    }

    if (value.length > 7) {
        value = value.replace(/(\d{5})(\d{4})$/, "$1-$2"); 
    }

    e.target.value = value; 
};

export const inputCep = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) {
        value = value.slice(0, 8);
    }

    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    e.target.value = value; 
}