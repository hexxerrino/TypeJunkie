export default function PrintGameOver(correctWords) {
    const html = "<div class='textbox-content glass'>" + 
    "<h1>GAME OVER! YOUR SCORE IS " + correctWords + "</h1>" + 
    "<a class='btn' href='/'>Play again</a>" +
    "</div>"
    return html
}