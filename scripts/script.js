let word = prompt("Welcome to Hangman! Player 1, please enter a word for Player 2 to guess.").toUpperCase();

let revealedLetters = new Array(word.length); // creates an array with as many elements as word has characters. Each index of revealedLetters will correspond to a character in word, and if revealedLetters[n] is truthy, then word[n] has been correctly guessed.
revealedLetters.fill(false); // changes each index to false value
let printedWord = document.querySelector("#printed-word");
let strikeOutput = document.querySelector("#guessed-letters");

const maxStrikes = 6; 
let strikes = 0; // the number of incorrect guesses made so far

let strikeLetters = new Array(maxStrikes); // this will contain every letter that has been incorrectly guessed.
console.log(strikeLetters);
drawWordProgress(); // run this now, to draw the empty word at the start of the game.
drawGallows();
// Manipulates the DOM to write all the strike letters to the appropriate section in hangman.html
function drawStrikeLetters(guess) {
    // your DOM manipulation code here
    document.querySelector("#strike-output").innerHTML = "Strikes Left: "+ (maxStrikes - strikes);
    strikeLetters.push(guess);
    strikeOutput.innerHTML += guess + " ";
    // should create a String from strikeLetters and put that into the content of some element.
}

// Manipulates the DOM to write the successfully guessed letters of the word, replacing them with dashes if not yet guessed
function drawWordProgress() {
    for (let i = 0; i<revealedLetters.length; i++){
        if (revealedLetters[i] === true){
            let letter = word[i];
        printedWord.innerHTML += letter;
        } else{
        printedWord.innerHTML += "-";
        }
    }
    // should iterate over revealedLetters, and if the value at each index is truthy, print the corresponding letter from word. Otherwise, it should print a -.
}

// Manipulates the DOM to update the image of the gallows for the current game state.
function drawGallows() { 
    // your DOM manipulation code here 
    document.querySelector("#gallows-img").src ="/images/strike-"+strikes+".png";
    // should update an <img> element in the appropriate hangman.html section to point to "images/strike-"+guesses+".png"
}

function processGuess(event) {
    let guess = document.querySelector("#user-input").value;
    guess = guess.toUpperCase();
    event.preventDefault();
    if (strikes < maxStrikes) {
        let counter = 0;
        for (let i = 0; i<word.length; i++){
            console.log(guess);
            if (guess === word[i]){
                revealedLetters[i] = true;
                printedWord.innerHTML = "";
                drawWordProgress();
                counter = 1;
            }
        }   if (counter === 0){
            strikes += 1;
            drawStrikeLetters(guess);
            drawGallows();
        }
    } else{
        alert("The game is over!"); 
    }
    if (printedWord.textContent == word) {
        alert("You Won!");
    }
}

document.querySelector("#user-form").addEventListener("submit", processGuess);

