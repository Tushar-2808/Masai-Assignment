const boxen = require('boxen');

const message = "I am using my first external module!";
const title = "Hurray!!!";

const optionsClassic = {
    title: title,
    titleAlignment: 'center',
    padding: 1,
    margin: 1,
    borderStyle: 'classic'
};

const optionsSingleDouble = {
    title: title,
    titleAlignment: 'center',
    padding: 1,
    margin: 1,
    borderStyle: 'singleDouble'
};

const optionsRound = {
    title: title,
    titleAlignment: 'center',
    padding: 1,
    margin: 1,
    borderStyle: 'round'
};

console.log(boxen(message, optionsClassic));
console.log(boxen(message, optionsSingleDouble));
console.log(boxen(message, optionsRound));

const optionsWithBackgroundColor = {
    title: title,
    titleAlignment: 'center',
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    backgroundColor: 'yellow',
    borderColor: 'green'
};

console.log("\nBonus Task Output:");
console.log(boxen(message + "\nWith a yellow background!", optionsWithBackgroundColor));

const optionsAnotherColor = {
    title: "Colorful Boxen!",
    titleAlignment: 'center',
    padding: 1,
    margin: 1,
    borderStyle: 'arrow',
    backgroundColor: '#ff00ff',
    borderColor: 'blue',
    dimBorder: true
};
console.log(boxen("Experimenting with more colors\nand arrow border!", optionsAnotherColor));
