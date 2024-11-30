class Test {
    constructor(name, functionTest, expected) {
        this.name = name;
        this.functionTest = functionTest;
        this.expected = expected;
    }

    execute() {
        const result = this.functionTest();
        if (JSON.stringify(result) === JSON.stringify(this.expected)) {
            console.log(`[SUCCESS] ${this.name}\n`);
        } else {
            console.log(`[ERROR] ${this.name}!`);
            console.log(`Esperado: ${JSON.stringify(this.expected)}, Atual: ${JSON.stringify(result)}\n`);
        }
    }
}

class SuiteDeTestes {
    constructor() {
        this.tests = [];
    }

    add(test) {
        this.tests.push(test);
    }

    executeAll() {
        this.tests.forEach(test => test.execute());
    }
}

export { SuiteDeTestes, Test }