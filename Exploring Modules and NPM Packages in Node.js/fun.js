function checkPalindrome(word) {
    const cleanedWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedWord = cleanedWord.split('').reverse().join('');
    return cleanedWord === reversedWord;
}

function countVowels(word) {
    const vowels = "aeiouAEIOU";
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        if (vowels.includes(word[i])) {
            count++;
        }
    }
    return count;
}

module.exports = {
    checkPalindrome,
    countVowels
};
