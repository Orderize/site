class Queue {
    constructor(param = null) {
        this.inicio = 0;
        this.fim = 0;
        this.tamanho = 0;
        this.indice = 0;
        if (Array.isArray(param)) {
            this.vetor = param;
        } else if (typeof param == "number") {
            this.vetor = new Array(param);
        } else if (param == null) {
            this.vetor = new Array(10);
        }
    }

    isEmpty() {
        return this.tamanho == 0; 
    }

    isFull() {
        return this.tamanho == this.vetor.length;
    }

    peek() {
        return this.vetor[this.indice];
    }

    enqueue(value) {
        if (this.isFull()) throw new Error("Não é possível adicionar. Fila cheia.");
        this.vetor[this.fim] = value;
        this.fim = (this.fim + 1) % this.vetor.length;
    }
    
    dequeue() {
        if (this.isEmpty()) throw new Error("Não é possível remover. Fila vazia.");
        const value = this.vetor[this.inicio];
        this.inicio = (this.inicio + 1) % this.vetor.length;
        return value;
    }

}