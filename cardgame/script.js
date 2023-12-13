let cards = [];
let flippedCards = [];
let gameStarted = false;
let gameTimer;
let elapsedTime = 0;

function startGame() {
    if (gameStarted) return;

    const difficulty = document.getElementById('difficulty').value;
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    cards = generateCards(difficulty);
    flippedCards = [];
    gameStarted = true;
    elapsedTime = 0;
    updateElapsedTime();

    gameTimer = setInterval(function () {
        elapsedTime++;
        updateElapsedTime();
    }, 1000);

    shuffle(cards);

    cards.forEach(function (card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = '?';
        cardElement.dataset.value = card.value;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (!gameStarted || flippedCards.length === 2) return;

    const card = this;
    card.textContent = card.dataset.value;

    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        // Match
        flippedCards.forEach(function (flippedCard) {
            flippedCard.classList.add('hidden');
        });
        checkWin();
    } else {
        // No match
        flippedCards.forEach(function (flippedCard) {
            flippedCard.textContent = '?';
        });
    }

    flippedCards = [];
}

function checkWin() {
    const hiddenCards = document.querySelectorAll('.card:not(.hidden)');
    if (hiddenCards.length === 0) {
        clearInterval(gameTimer);
        const congratulations = document.getElementById('congratulations');
        congratulations.classList.remove('hidden');
        document.getElementById('game-time').textContent = elapsedTime;
        gameStarted = false;
    }
}

function updateElapsedTime() {
    document.getElementById('game-time').textContent = elapsedTime;
}

function generateCards(difficulty) {
    const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const numPairs = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 8 : 12;
    const cards = [];

    for (let i = 0; i < numPairs; i++) {
        const value = values[i % values.length];
        cards.push({ value: value });
        cards.push({ value: value });
    }

    return cards;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}