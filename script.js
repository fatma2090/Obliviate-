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
let isGameStarted = false;

function createBoard() {
    const grid = document.querySelector('.grid');
    characters.forEach((character, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        
        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face');
        frontFace.style.backgroundImage = `url('pictures/Hogwarts-Crest.png')`;
        
        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        backFace.style.backgroundImage = `url('${character.imageUrl}')`;
        
        card.appendChild(frontFace);
        card.appendChild(backFace);
        
        grid.appendChild(card);
    });
}

function enableCardClick() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
}

function disableCardClick() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.removeEventListener('click', flipCard);
    });
}

function startGame() {
    isGameStarted = true;
    enableCardClick();
}

function flipCard() {
    if (!isGameStarted) {
        return; 
    }
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
        cards[optionOneId].classList.add('matched');
        cards[optionTwoId].classList.add('matched');
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].classList.remove('flip');
        cards[optionTwoId].classList.remove('flip');
        showNotification('Try again!', 'https://media1.tenor.com/m/njrw1mqiYu0AAAAC/smack-slapping.gif');
    }
    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === characters.length / 2) {
        setTimeout(() => {
            showNotification('Congratulations! Mischief Managed!', 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmMxajF1ajR3aGxwYXIxcW1ncm52Ym9nOWp2MnFyMmc5NWVwcWR0aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26gN16cJ6gy4LzZSw/giphy.gif');
        }, 500); 
    }
}


document.getElementById('start-button').addEventListener('click', startGame);

createBoard();

//////// Notification ///////

function showNotification(message, gifUrl) {

    const notification = document.getElementById('notification');

    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.classList.add('notification-message');
    
    const gif = document.createElement('img');
    gif.src = gifUrl;
    gif.alt = 'Notification GIF';
    gif.classList.add('notification-gif');
    
    notification.appendChild(messageDiv);
    notification.appendChild(gif);

    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';

        notification.innerHTML = '';
    }, 2000); 
}


////// Start botton ///////

let timer;

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('start-button').style.display = 'none'; 
    startTimer();
});

function startTimer() {
    let timeLeft = 45;

    timer = setInterval(() => {
        timeLeft--; 
        document.getElementById('timer').textContent = `Time Left: ${timeLeft} `;

        if (timeLeft === 0) {
            clearInterval(timer);
            if (cardsWon.length !== characters.length / 2) {
                showNotification("Time's up!", "https://media1.tenor.com/m/K9BERPW2l2QAAAAC/vold-voldemort.gif");
            }
        }
    }, 1000);
}


//////// Restart botton //////

class RestartButton {
    constructor() {
      this.button = document.getElementById('restart-button');
      this.button.addEventListener('click', this.restartGame.bind(this));
    }
  
    restartGame() {
      console.log("Restarting the game..."); 
      location.reload();
    }
  }
  
  const restartButton = new RestartButton();
  

  ///////// AUDIO ////////

  class MusicPlayer {
    constructor() {
      this.musicDiv = document.querySelector('.music');
      this.audioElement = this.musicDiv.querySelector('audio');
      this.playButton = this.musicDiv.querySelector('.play-button');
      
      this.playButton.addEventListener('click', this.togglePlay.bind(this));
    }
  
    togglePlay() {
      if (this.audioElement.paused) {
        this.audioElement.play();
      } else {
        this.audioElement.pause();
      }
    }
  }
  
  const musicPlayer = new MusicPlayer();
  



