const fs = require('fs');
const path = require('path');

function readFileContent() {
    try {
        const filePath = path.join(__dirname, 'Data.txt');
        const content = fs.readFileSync(filePath, 'utf8');
        return content;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return "Error: Data.txt not found.";
        }
        return `Error reading file: ${error.message}`;
    }
}

module.exports = {
    readFileContent
};
