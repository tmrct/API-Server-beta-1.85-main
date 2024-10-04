// controllers/MathsController.js
import Controller from './Controller.js';
import MathModel from '../models/math.js';
import Repository from '../models/repository.js';
import { decomposePath } from '../utilities.js'; // Import the function

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathModel()));
    }

    async handleRequest() {
        const { req } = this.HttpContext; 
        const { params } = decomposePath(req.url); 

        const { op, x, y, n } = params || {}; 
        
        if (!op) {
            return this.HttpContext.response.badRequest("Missing 'op' parameter");
        }

        let numX = Number(x);
        let numY = Number(y);
        let numN = Number(n);
        let result;

        try {
            switch (op) {
                case ' ':
                    result = this.model.add(numX, numY);
                    break;
                case '-':
                    result = this.model.subtract(numX, numY);
                    break;
                case '*':
                    result = this.model.multiply(numX, numY);
                    break;
                case '/':
                    if (numY === 0) {
                        throw new Error("Division by zero");
                    }
                    result = this.model.divide(numX, numY);
                    break;
                case '%':
                    if (numY === 0) {
                        throw new Error("Modulo by zero");
                    }
                    result = this.model.modulo(numX, numY);
                    break;
                case '!':
                    result = this.model.factorial(numN);
                    break;
                case 'p':
                    result = this.model.isPrime(numN);
                    break;
                case 'np':
                    result = this.model.findNthPrime(numN);
                    break;
                default:
                    return this.HttpContext.response.badRequest("Invalid operation");
            }

            // Send a successful response with the result
            return this.HttpContext.response.json({ op, x: numX, y: numY, n: numN, value: result });

        } catch (err) {
            return this.HttpContext.response.unprocessable(err.message);
        }
    }

    async get() {
        await this.handleRequest();
    }
}
