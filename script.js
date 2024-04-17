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
        card.setAttribute('data-name', character.name); 
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
        alert('Congrats! Mischief Managed!');
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

////// Start botton ///////

let timer; 

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-button').style.display = 'none'; 
    startTimer();
});

function startTimer() {
    let timeLeft = 30; 

    timer = setInterval(() => {
        timeLeft--; 
        document.getElementById('timer').textContent = `Time Left: ${timeLeft} seconds`;

        if (timeLeft === 0) {
            clearInterval(timer); 
            alert('Time\'s up!'); 
        }
    }, 1000);
}


//////// Restart botton //////

function restartGame() {
    console.log("Restarting the game..."); 
    location.reload();
}

document.getElementById("restart-button").addEventListener("click", restartGame);





