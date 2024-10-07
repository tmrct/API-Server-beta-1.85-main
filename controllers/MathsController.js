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
        
        if (req.url == '/api/maths?') {
            return this.HttpContext.response.HTML(`
                <html>
                <head>
                <title>Math Help</title>
                </head>
                <body>
                <div>GET: Maths endpoint</div>
                <div>List of possible query strings:</div>
                <hr>
                <div>? op = + & x = number & y = number</div>
                <div>return {"op":"+","x":number,"y":number,"value": x + y}</div>
                <br>
                <div>? op = - & x = number & y = number</div>
                <div>return {"op":"-","x":number,"y":number,"value": x - y}</div>
                <br>
                <div>? op = * & x = number & y = number</div>
                <div>return {"op":"*","x":number,"y":number,"value": x * y}</div>
                <br>
                <div>? op = / & x = number & y = number</div>
                <div>return {"op":"/","x":number,"y":number,"value": x / y}</div>
                <br>
                <div>? op = % & x = number & y = number</div>
                <div>return {"op":"%","x":number,"y":number,"value": x % y}</div>
                <br>
                <div>? op = ! & n = integer</div>
                <div>return {"op":"!","n":integer,"value": n!}</div>
                <br>
                <div>? op = p & n = integer</div>
                <div>return {"op":"p","n":integer,"value": true if n is a prime number}</div>
                <br>
                <div>? op = np & n = integer</div>
                <div>return {"op":"np","n":integer,"value": nth prime number}</div>
                <br>
                </body>
                </html>
                `);}
        if (!op) {
            return this.HttpContext.response.json({ op, x, y, n, error: "Missing 'op' parameter" });
        }

        let numX = x !== undefined ? Number(x) : undefined;
        let numY = y !== undefined ? Number(y) : undefined;
        let numN = n !== undefined ? Number(n) : undefined;

        if (['+', '-', '*', '/', '%'].includes(op) || op == ' ') {
            if (isNaN(numX)) {
                return this.HttpContext.response.json({ op, x, y, n, error: "'x' parameter is not a number" });
            }
            if (isNaN(numY)) {
                return this.HttpContext.response.json({ op, x, y, n, error: "'y' parameter is not a number" });
            }
        }

        if (['!', 'p', 'np'].includes(op) && isNaN(numN)) {
            return this.HttpContext.response.json({ op, x, y, n, error: "'n' parameter is not a number" });
        }

        if (['+', '-', '*', '/', '%'].includes(op) && n !== undefined) {
            return this.HttpContext.response.json({ op, x, y, n, error: "Unexpected 'n' parameter" });
        }

        if (['!', 'p', 'np'].includes(op) && (x !== undefined || y !== undefined)) {
            return this.HttpContext.response.json({ op, x, y, n, error: "Unexpected 'x' or 'y' parameters for unary operation" });
        }

        let result;

        try {
            switch (op) {
                case ' ':
                    result = this.model.add(numX, numY);
                    return this.HttpContext.response.json({ op: "+", x: numX, y: numY, n: numN, value: result });
                case '-':
                    result = this.model.subtract(numX, numY);
                    break;
                case '*':
                    result = this.model.multiply(numX, numY);
                    break;
                case '/':
                    if (numX === 0 && numY === 0) {
                        return this.HttpContext.response.json({ op, x: numX, y: numY, n: numN, error: "NaN" });
                    }
                    if (numY === 0) {
                        return this.HttpContext.response.json({ op, x: numX, y: numY, n: numN, error: "infinity" });
                    }
                    result = this.model.divide(numX, numY);
                    break;
                case '%':
                    if (numX === 0 && numY === 0) {
                        return this.HttpContext.response.json({ op, x: numX, y: numY, n: numN, error: "NaN" });
                    }
                    if (numY === 0) {
                        return this.HttpContext.response.json({ op, x: numX, y: numY, n: numN, error: "modulo by zero" });
                    }
                    result = this.model.modulo(numX, numY);
                    break;
                case '!':
                    if (numN <= 0) {
                        return this.HttpContext.response.json({ op, x: numX, y: numY, n: numN, error: "n must be > 0" });
                    }
                    result = this.model.factorial(numN);
                    break;
                case 'p':
                    if (numN <= 0) {
                        return this.HttpContext.response.json({ op, x: numX, y: numY, n: numN, error: "n must be > 0" });
                    }
                    result = this.model.isPrime(numN);
                    break;
                case 'np':
                    result = this.model.findNthPrime(numN);
                    break;
                default:
                    return this.HttpContext.response.badRequest("Invalid operation");
            }

            return this.HttpContext.response.json({ op, x: numX, y: numY, n: numN, value: result });

        } catch (err) {
            return this.HttpContext.response.unprocessable(err.message);
        }
    }

    async get() {
        await this.handleRequest();
    }
}
