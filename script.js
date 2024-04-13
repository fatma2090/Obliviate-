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
    const shuffledCharacters = shuffle(characters);
    let count = 0; // Track the number of cards created
    for (let i = 0; i < shuffledCharacters.length; i++) {
        const character = shuffledCharacters[i];
        console.log(character.imageUrl); // Log the image URL
        const img = new Image();
        img.onload = function() {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', count);
            card.style.backgroundImage = `url('${character.imageUrl}')`;
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
    
        };
        
        img.src = character.imageUrl;
        count++;
            if (count === 12) { 
                break;
            }  
    }
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
        alert('Congratulations! You found all the matches!');
    }
}

createBoard();
