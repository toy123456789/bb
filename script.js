const suits = ['♥', '♦', '♣', '♠'];
const ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];
let playerCards = [];
let score = 0;

// Создание колоды
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push(`${rank}${suit}`);
        }
    }
    shuffleDeck();
}

// Перемешивание колоды
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Взятие карты
function drawCard() {
    if (deck.length > 0) {
        const card = deck.pop();
        playerCards.push(card);
        updateCards();
        updateScore();
    } else {
        alert('Колода пуста!');
    }
}

// Сброс карты
function playCard() {
    if (playerCards.length > 0) {
        const card = playerCards.pop();
        updateCards();
        updateScore();
    } else {
        alert('У вас нет карт!');
    }
}

// Обновление отображения карт
function updateCards() {
    document.getElementById('cards').textContent = playerCards.join(', ');
}

// Обновление очков
function updateScore() {
    score = playerCards.reduce((total, card) => {
        const rank = card.slice(0, -1); // Убираем масть
        return total + getCardValue(rank);
    }, 0);
    document.getElementById('score').textContent = score;

    if (score === 101) {
        alert('Поздравляем! Вы набрали 101 очко!');
        resetGame();
    } else if (score > 101) {
        alert('Вы проиграли! Очки превысили 101.');
        resetGame();
    }
}

// Получение значения карты
function getCardValue(rank) {
    switch (rank) {
        case '6': return 6;
        case '7': return 7;
        case '8': return 8;
        case '9': return 9;
        case '10': return 10;
        case 'J': return 10;
        case 'Q': return 10;
        case 'K': return 10;
        case 'A': return 11;
        default: return 0;
    }
}

// Сброс игры
function resetGame() {
    playerCards = [];
    score = 0;
    createDeck();
    updateCards();
    updateScore();
}

// Инициализация игры
createDeck();