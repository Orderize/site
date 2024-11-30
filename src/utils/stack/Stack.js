class Stack {
    constructor(param = null) {
        this.topo = -1;
        if (Array.isArray(param)) {
            this.topo = param.length -1;
            this.vetor = param;
        } else if (typeof param == "number") {
            this.vetor = new Array(param)
        } else if (param == null) {
            this.vetor = new Array(10);
        }
    }

    isEmpty() {
        return this.topo == -1; 
    }

    isFull() {
        return this.topo == this.vetor.length -1;
    }

    isEqual(stack) {
        if (this.vetor.length != stack.length) {
            return false;
        }
        for (let i = 0; i <= this.topo; i++) {
            if (stack[i] != this.vetor[i]) {
                return false;
            }
        }
        return true;
    }
    
    push(value) {
        if (this.isFull()) {
            throw new Error("Não é possível adicionar. Pilha cheia.");
        }
        this.vetor[++this.topo] = value;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Não é possível remover. Pilha vazia.");
        }
        return this.vetor[this.topo--];
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Não é possível pegar o topo. Pilha vazia.");
        }
        return this.vetor[this.topo];
    }
}

export { Stack };