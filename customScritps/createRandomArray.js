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

    return randomWord;
}

const createTheArray = () => {
    const randomArr = [];
    for (let index = 0; index < 200; index++) {
        randomArr.push(createRandomWord());
    }
    return randomArr
    // .join(" ")
}

export default createTheArray;