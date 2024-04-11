const characters = ['harry', 'ron', 'hermione', 'dumbledore', 'snape', 'voldemort', 'hagrid', 'malfoy', 'bellatrix', 'sirius', 'lupin', 'mcgonagall'];

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function createBoard() {
    const grid = document.querySelector('.grid');
    characters.forEach((character, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
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
    if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!');
        cards[optionOneId].classList.add('hidden');
        cards[optionTwoId].classList.add('hidden');
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].classList.remove('flip');
        cards[optionTwoId].classList.remove('flip');
        alert('Sorry, try again!');
    }
    cardsChosen = [];
    cardsChosenId = [];
    if (cardsWon.length === characters.length / 2) {
        alert('Congratulations! You found all the matches!');
    }
}

createBoard();
