"use strict"

const layout = document.querySelector('.layout')
const sections = document.querySelector('.flashcards__container')
const restart = document.querySelectorAll('.js-restart')
const start = document.querySelector('.js-start')

start.addEventListener('click', () => {
  // Change bg color
  layout.classList.add('layout--cards')

  // Slide to section & init
  sections.classList.remove('flashcards__container--intro')
  sections.classList.add('flashcards__container--cards')
  initCards()
})

restart.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()

    // Change bg color
    layout.classList.remove('layout--cards')
    layout.classList.remove('layout--results')

    // Slide to section
    sections.classList.remove('flashcards__container--cards')
    sections.classList.remove('flashcards__container--results')
    sections.classList.add('flashcards__container--intro')
  })
})

function initCards() {
  const cards = document.querySelector('.cards')
  const card = cards.querySelector('.card')
  const buttons = card.querySelectorAll('.js-card-answer')

  const data = []
  const dataUrl = 'https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/2ab0379eb07b2a7cd26c845b26ff5ed2a85b5064/history-flashcards.json'

  let totalCards
  let mistakes = 0

  fetch(dataUrl)
    .then(blob => blob.json())
    .then(content => data.push(...content))
    .then(resp => {
      totalCards = data.length
      updateCard()
    })
    .catch(err => {
      console.log(err)
      cards.innerHTML = `
        <div class="sg-flash">
          <div class="sg-flash__message sg-flash__message--error">
            <div class="sg-text sg-text--small sg-text--light sg-text--emphasised">
              Oops. Something's not right. Did you just broke it again?
            </div>
          </div>
        </div>
      `
    })

  function updateContent(currentData) {
    const question = card.querySelector('.js-card-question')
    const answers = card.querySelectorAll('.js-card-answer')
    const progress = card.querySelector('.js-card-progressbar')
    const progressValue = progress.querySelector('.js-card-progress-value')

    // Update question
    question.textContent = currentData.question

    // Update answers
    const dataAnswers = [...currentData.answers]
    const first = Math.floor(Math.random() * Math.floor(2))
    const second = first === 0 ? 1 : 0
    answers[0].textContent = dataAnswers[first].answer
    answers[1].textContent = dataAnswers[second].answer

    // Update progress
    const cardsLeft = data.length
    const currentProgress = (cardsLeft / totalCards) * 100
    progressValue.textContent = cardsLeft
    progress.style.width = `${currentProgress}%`
  }

  function handleAnswer(userAnswer) {
    const current = data.shift()
    const correct = current.answers.find(t => t.correct).answer

    if (userAnswer === correct) {
      card.classList.add('card--correct')

      card.addEventListener('animationend', (e) => {
        card.classList.remove('card--correct')
        updateCard()
      }, { once: true })

      return
    }

    mistakes++
    data.push(current)
    card.classList.add('card--incorrect')

    card.addEventListener('animationend', (e) => {
      card.classList.remove('card--incorrect')
      updateCard()
    }, { once: true })
  }

  function showResluts() {
    const results = sections.querySelector('.js-results')
    const questionsCount = results.querySelector('.js-questions-count')
    const mistakesCount = results.querySelector('.js-results-mistakes')

    questionsCount.textContent = totalCards
    mistakesCount.textContent = `${mistakes} ${mistakes != 1 ? 'mistakes' : 'mistake'}`

    layout.classList.add('layout--results')
    sections.classList.remove('flashcards__container--cards')
    sections.classList.add('flashcards__container--results')
  }

  function updateCard() {
    if (data.length === 0) showResluts()
    else updateContent(data[0])
  }

  buttons.forEach(button =>
    button.addEventListener('click', (e) => {
      handleAnswer(e.target.textContent)
    }
  ), { once: true })
}

// BUG: Firefox 60.0 on GNU/Linux dosen't support { once: true } setting?
