const cards = Array.from(document.querySelectorAll('.card'))

let hasFlippedCard = false, lockBoard = false
let firstCard, secondCard

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

cards.forEach(card => {
  card.addEventListener('click', flipCard)
})

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
  resetBoard()
}

function unflipCards() {
  lockBoard = true
  setTimeout(() => {
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    resetBoard()
  }, 1500)
}

function resetBoard(){
  lockBoard = false
  hasFlippedCard = false
  firstCard = null
  secondCard = null
}

(function (){
  cards.forEach(card => card.style.order = Math.floor(Math.random() * 12))
})()
