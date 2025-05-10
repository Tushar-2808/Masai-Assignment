const randomWords = require('random-words').default;
const { checkPalindrome, countVowels } = require('./fun.js');

const numberOfWords = 5;
const words = randomWords(numberOfWords);

words.forEach((word, index) => {
    const vowels = countVowels(word);
    const isPalindrome = checkPalindrome(word);
    console.log(`word ${index + 1} -> ${word} -> vowelsCount: ${vowels} -> isPalindrome: ${isPalindrome}`);
});
