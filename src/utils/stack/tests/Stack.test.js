import { Test, SuiteDeTestes } from "./Test.js";
import { Stack } from "../Stack.js";

function runTests() {
    const suite = new SuiteDeTestes();

    suite.add(
        new Test("Push - valido", () => {
            const stack = new Stack();
            stack.push(10);
            return stack.peek();
        }, 10)
    );

    suite.add(
        new Test("Push - inválido", () => {
            const stack = new Stack(0);
            try {
                stack.push(10);
            } catch (error) {
                return error.message
            }
        }, "Não é possível adicionar. Pilha cheia.")
    );

    suite.add(
        new Test("Pop - valido", () => {
            const stack = new Stack();
            stack.push(10);
            stack.push(20);
            stack.pop();
            return stack.peek();
        }, 10)
    );

    suite.add(
        new Test("Pop - inválido", () => {
            const stack = new Stack(1);
            try {
                stack.pop();
            } catch (error) {
                return error.message
            }
        }, "Não é possível remover. Pilha vazia.")
    );
    
    suite.add(
        new Test("isFull - valido", () => {
            const stack = new Stack(1);
            stack.push(10);
            return stack.isFull();
        }, true)
    );

    suite.add(
        new Test("isFull - inválido", () => {
            const stack = new Stack(2);
            stack.push(10);
            stack.pop();
            return stack.isFull();
        }, false)
    );
        
    suite.add(
        new Test("isEmpty - valido", () => {
            const stack = new Stack(0);
            return stack.isEmpty();
        }, true)
    );

    suite.add(
        new Test("isEmpty - inválido", () => {
            const stack = new Stack(1);
            stack.push(12);
            return stack.isEmpty();
        }, false)
    );
    
    suite.add(
        new Test("peek - valido", () => {
            const stack = new Stack(1);
            stack.push(10);
            return stack.peek();
        }, 10)
    );

    suite.add(
        new Test("peek - inválido", () => {
            const stack = new Stack(0);
            try {
                stack.peek();
            } catch (error) {
                return error.message;
            }
        }, "Não é possível pegar o topo. Pilha vazia.")
    );

    suite.executeAll();
}

runTests();