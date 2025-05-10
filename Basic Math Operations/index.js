const sum = require("./sum");
const multiply = require("./multiplication");
const subtract = require("./subtraction");
const divide = require("./division");

let sumA = 3;
let sumB = 5;
let sumResult = sum(sumA, sumB);
console.log(`Sum of ${sumA} and ${sumB}: ${sumResult}`);

let mulA = 4;
let mulB = 6;
let mulResult = multiply(mulA, mulB);
console.log(`Product of ${mulA} and ${mulB}: ${mulResult}`);

let subA = 10;
let subB = 4;
let subResult = subtract(subA, subB);
console.log(`Difference of ${subA} and ${subB}: ${subResult}`);

let divA = 12;
let divB = 3;
let divResult1 = divide(divA, divB);
console.log(`Division of ${divA} by ${divB}: ${divResult1}`);

let divC = 5;
let divD = 0;
let divResult2 = divide(divC, divD);
console.log(`Division of ${divC} by ${divD}: ${divResult2}`);
