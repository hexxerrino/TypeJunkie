import GameOver from "./gameOver.js"

let wordNodeList = document.querySelectorAll("#text-content span")
let wordArray = [];
wordNodeList.forEach(word => {wordArray.push(word)})

wordArray[0].classList.add('grey-highlight');

const textInput = document.getElementById("text-input")

let firstWordEver = true;
let secondsLeft = 59;

let counterWord = 0;
let counterChar = 0;
let correctWords = 0;
let currentWordCorrect = true;

console.log(wordArray[0])
const createUser = (score) => {
    axios.post('/profile', score)
        .then(response => {
            // window.location.replace("http://localhost:3000/");
        })
        .catch(error => console.error(error));
};

textInput.addEventListener("keydown", (event) => {
    // if (event.key.charCodeAt() < 65 || event.key.charCodeAt() > 90) {event.preventDefault(); event.target.value = "";  return}
    if(firstWordEver) {
        const interval = setInterval(() => {
            if (secondsLeft === 0) {
                document.querySelector(".body").innerHTML = GameOver(correctWords)
                createUser({score: correctWords})
                secondsLeft = 60;
                clearInterval(interval)
            }else {
                document.getElementById("timer").innerHTML = secondsLeft
                secondsLeft--
            }
        }, 1000)
        firstWordEver = false
    }
    
    if (event.key === " ") {
        if (event.target.value === wordArray[counterWord].innerHTML) {
            highlightWord(counterWord, true) 
            correctWords++
        }
        else { highlightWord(counterWord, false) }
        if (counterWord === wordArray.length - 1) {
            counterWord = 0

            document.getElementById("text-content").className = "hide"
            document.getElementById("text-content2").className = ""
            wordNodeList = document.querySelectorAll("#text-content2 span")
            wordArray = []
            wordNodeList.forEach(word => {wordArray.push(word)})
            wordArray[0].classList.add('grey-highlight');
            return
        }
        counterWord++
        wordArray[counterWord].className = "grey-highlight"
        event.target.value = ""
        event.preventDefault()
        return 
    }
    if (event.key === wordArray[counterWord].innerHTML[counterChar]) {counterChar ++;}
})

function highlightWord(counterWord, correct) {
    if (correct) {
        wordArray[counterWord].className = "white-highlight"; 
    }else {
        wordArray[counterWord].className = "red-highlight"; 
    }
}
