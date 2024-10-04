// models/math.js
export default class MathModel {
    constructor() {
        this.key = 'Id'; 
    }

    getClassName() {
        return 'Math';
    }

    add(x, y) {
        return x + y;
    }

    subtract(x, y) {
        return x - y;
    }

    multiply(x, y) {
        return x * y;
    }

    divide(x, y) {
        return x / y;
    }

    modulo(x, y) {
        return x % y;
    }

    factorial(n) {
        if (n < 0) return null;
        if (n === 0) return 1;
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    isPrime(n) {
        if (n <= 1) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    }

    findNthPrime(n) {
        let count = 0;
        let number = 1;
        while (count < n) {
            number++;
            if (this.isPrime(number)) {
                count++;
            }
        }
        return number;
    }
}
