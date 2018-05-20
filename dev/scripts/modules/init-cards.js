import { changeSection } from './change-section'

export function initCards(dataUrl) {
  const cards = document.querySelector('.cards')
  const card = cards.querySelector('.card')
  const buttons = card.querySelectorAll('.js-card-answer')
  const data = []

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

  function updateCard() {
    if (data.length === 0) showResluts()
    else updateContent(data[0])
  }

  buttons.forEach(button =>
    button.addEventListener('click', handleAnswer)
  )

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
    const second = first === 0 ? 1 : 0 // Yay, random order
    answers[0].textContent = dataAnswers[first].answer
    answers[1].textContent = dataAnswers[second].answer

    // Update progress
    const cardsLeft = data.length
    const currentProgress = (cardsLeft / totalCards) * 100
    progressValue.textContent = cardsLeft
    progress.style.width = `${currentProgress}%`
  }

  function handleAnswer(e) {
    const userAnswer = e.target.textContent
    const current = data.shift()
    const correct = current.answers
      .find(answer => answer.correct).answer

    if (userAnswer === correct) {
      card.classList.add('card--correct')

      card.addEventListener('animationend', () => {
        card.classList.remove('card--correct')
        updateCard()
      }, { once: true })
    }

    else {
      mistakes++
      data.push(current)
      card.classList.add('card--incorrect')

      card.addEventListener('animationend', () => {
        card.classList.remove('card--incorrect')
        updateCard()
      }, { once: true })
    }
  }

  function showResluts() {
    const results = document.querySelector('.js-results')
    const questionsCount = results.querySelector('.js-question-count')
    const mistakesCount = results.querySelector('.js-mistakes')

    // Slide to results
    changeSection('results')

    // Add data
    questionsCount.textContent = totalCards
    mistakesCount.textContent = mistakes === 1 ?
      `only 1 mistake!` : `${mistakes} mistakes.`

    // Prevent event listeners from duplication
    buttons.forEach(button =>
      button.removeEventListener('click', handleAnswer)
    )
  }
}
