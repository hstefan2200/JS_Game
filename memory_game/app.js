const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },

]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
let cardsChosen = []
let cardsChosenIDS = []

function createBoard() {
    for (let i=0; i<cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.append(card)
    }

}
createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img')
    if (cardsChosen[0] == cardsChosen[1]) {
        alert('MATHCHCHCHCHCHCD')
        cards[cardsChosenIDS[0]].setAttribute('src', 'images/white.png')
        cards[cardsChosenIDS[1]].setAttribute('src', 'images/white.png')
        cards[cardsChosenIDS[0]].removeEventListener('click', flipCard)
        cards[cardsChosenIDS[1]].removeEventListener('click', flipCard)
    } else {
        cards[cardsChosenIDS[0]].setAttribute('src', 'images/blank.png')
        cards[cardsChosenIDS[1]].setAttribute('src', 'images/blank.png')
    }
    cardsChosen = []
    cardsChosenIDS = []
}

function flipCard() {
    const cardID = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardID].name)
    cardsChosenIDS.push(cardID)
    this.setAttribute('src', cardArray[cardID].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}
