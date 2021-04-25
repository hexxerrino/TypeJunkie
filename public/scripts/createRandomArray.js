const createRandomWord = () => {
    const wordLength = Math.floor(Math.random() * 9) + 1;
    
    let randomWord = "";

    for (let index = 0; index < wordLength; index++) {
        const typeOfChar = Math.floor(Math.random() * 3)
        let randomLetterCode = 65

        if (typeOfChar === 1) {
            randomLetterCode = Math.floor(Math.random() * 25) + 65;
        }else if (typeOfChar === 2) {
            randomLetterCode = Math.floor(Math.random() * 25) + 97;
        }else {
            randomLetterCode = Math.floor(Math.random() * 10) + 48;
        }

        const char = String.fromCharCode(randomLetterCode);
        randomWord = randomWord + char;
    }

    return "<span>" + randomWord + "</span> ";
}

const createTheArray = () => {
    let text = ""
    for (let index = 0; index < 25; index++) {
        text += createRandomWord()
    }
    return text
}
export default createTheArray;