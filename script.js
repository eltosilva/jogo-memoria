const cards = Array.from(document.querySelectorAll('.card'))

let hasFlippedCard = false, lockBoard = false
let firstCard, secondCard, countCardsFlip = 0, countError = 0

function flipCard() {
  if (lockBoard || firstCard === this) return

  this.classList.toggle('flip')

  if (!hasFlippedCard) {
    hasFlippedCard = true
    firstCard = this
    return
  }

  secondCard = this;
  checkForMatch()
}


function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    disableCards()
    return
  }

  unflipCards()
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
  countCardsFlip += 2

  if(countCardsFlip >= 12){
    setTimeout(() => {
      suffle()
      countCardsFlip = 0
      countError = 0
    }, 1500)
    alert('Win!')
  }

  resetBoard()
}

function unflipCards() {
  lockBoard = true
  countError++
  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    resetBoard()
  }, 1500)

  if(countError >= 5){
    alert('Game Over!')
    countError = 0
    suffle()
  }
}

function resetBoard() {
  lockBoard = false
  hasFlippedCard = false
  firstCard = null
  secondCard = null
}

function suffle() {
  cards.forEach(card => {
    card.classList.remove('flip')
    card.addEventListener('click', flipCard)
  })
  setTimeout(() => {
    cards.forEach(card => {
      card.style.order = 13
      card.style.order = Math.floor(Math.random() * 12)
    })
  }, 1500)
}
(() => suffle())()
