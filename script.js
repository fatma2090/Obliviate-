const characters = [
    { name: 'harry', imageUrl: 'pictures/harry.jpg' },
    { name: 'Ron', imageUrl: 'pictures/Ron.jpg' },
    { name: 'Hermione', imageUrl: 'pictures/Hermione.jpg' },
    { name: 'snape', imageUrl: 'pictures/snape.jpg' },
    { name: 'Malfoy', imageUrl: 'pictures/Malfoy.jpg' },
    { name: 'lupin', imageUrl: 'pictures/lupin.jpg' },
    // Duplicating the cards
    { name: 'harry', imageUrl: 'pictures/harry.jpg' },
    { name: 'Ron', imageUrl: 'pictures/Ron.jpg' },
    { name: 'Hermione', imageUrl: 'pictures/Hermione.jpg' },
    { name: 'snape', imageUrl: 'pictures/snape.jpg' },
    { name: 'Malfoy', imageUrl: 'pictures/Malfoy.jpg' },
    { name: 'lupin', imageUrl: 'pictures/lupin.jpg' },
];

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function createBoard() {
    const grid = document.querySelector('.grid');
    characters.forEach((character, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.style.backgroundImage = `url('${character.imageUrl}')`;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(characters[cardId]);
    cardsChosenId.push(cardId);
    this.classList.add('flip');
    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [optionOneId, optionTwoId] = cardsChosenId;
    if (cardsChosen[0].name === cardsChosen[1].name) {
        alert('You found a match!');
        cards[optionOneId].classList.add('matched');
        cards[optionTwoId].classList.add('matched');
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].classList.remove('flip');
        cards[optionTwoId].classList.remove('flip');
        alert('Sorry, try again!');
    }
    cardsChosen = [];
    cardsChosenId = [];
    if (cardsWon.length === characters.length / 2) {
        alert('Congratulations! Mischief Managed!');
    }
}

createBoard();

//////// Score ///////

let score = 0;

function updateScore() {
    document.getElementById("score").textContent = score;
}
function incrementScore() {
    score++;
    updateScore(); 
}
function resetScore() {
    score = 0;
    updateScore(); 
}
resetScore();

////// Start botton  +   Time left ///////

let timeLeft = 30; 
let timerInterval; 

document.getElementById('start-button').addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            document.querySelector('.time-left').textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval); 
                alert("Time's up! You lost.");
            } else {
                timeLeft--;
            }
        }, 1000); 
    }
});


document.getElementById('restart-button').addEventListener('click', () => {
    
    timeLeft = 30;
    clearInterval(timerInterval);
    timerInterval = null; 
    document.querySelector('.time-left').textContent = timeLeft;
});


//////// Restart botton //////

function restartGame() {
    console.log("Restarting the game..."); 
    location.reload();
}

document.getElementById("restart-button").addEventListener("click", restartGame);

/////// End Game ////////

function endGame() {
    document.querySelectorAll('.card').forEach(card => {
        card.removeEventListener('click', flipCard);
    });
    alert('Time is up! You lost the game.');
}
const GAME_DURATION = 30000;

setTimeout(endGame, GAME_DURATION);



