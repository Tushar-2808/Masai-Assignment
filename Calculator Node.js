const crypto = require('crypto');

const args = process.argv.slice(2);
const operation = args[0];
const num1 = parseFloat(args[1]);
const num2 = parseFloat(args[2]);

switch (operation) {
    case 'add':
        if (args.length !== 3 || isNaN(num1) || isNaN(num2)) {
            console.log("Invalid arguments for addition. Usage: node index.js add <num1> <num2>");
        } else {
            console.log(num1 + num2);
        }
        break;
    case 'sub':
        if (args.length !== 3 || isNaN(num1) || isNaN(num2)) {
            console.log("Invalid arguments for subtraction. Usage: node index.js sub <num1> <num2>");
        } else {
            console.log(num1 - num2);
        }
        break;
    case 'mult':
        if (args.length !== 3 || isNaN(num1) || isNaN(num2)) {
            console.log("Invalid arguments for multiplication. Usage: node index.js mult <num1> <num2>");
        } else {
            console.log(num1 * num2);
        }
        break;
    case 'divide':
        if (args.length !== 3 || isNaN(num1) || isNaN(num2)) {
            console.log("Invalid arguments for division. Usage: node index.js divide <num1> <num2>");
        } else if (num2 === 0) {
            console.log("Error: Division by zero.");
        } else {
            console.log(num1 / num2);
        }
        break;
    case 'sin':
        if (args.length !== 2 || isNaN(num1)) {
            console.log("Invalid arguments for sine. Usage: node index.js sin <number>");
        } else {
            console.log(Math.sin(num1));
        }
        break;
    case 'cos':
        if (args.length !== 2 || isNaN(num1)) {
            console.log("Invalid arguments for cosine. Usage: node index.js cos <number>");
        } else {
            console.log(Math.cos(num1));
        }
        break;
    case 'tan':
        if (args.length !== 2 || isNaN(num1)) {
            console.log("Invalid arguments for tangent. Usage: node index.js tan <number>");
        } else {
            console.log(Math.tan(num1));
        }
        break;
    case 'random':
        if (args.length === 1) {
            console.log("Provide length for random number generation.");
        } else if (args.length === 2 && !isNaN(parseInt(args[1])) && parseInt(args[1]) > 0) {
            const length = parseInt(args[1]);
            const randomBytes = crypto.randomBytes(length);
            console.log(randomBytes.toString('binary'));
        } else {
            console.log("Invalid arguments for random. Usage: node index.js random <length>");
        }
        break;
    default:
        console.log("Invalid operation");
}
