"use strict"

import { initCards } from './modules/init-cards'
import { changeSection } from './modules/change-section'

const dataUrl = 'https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/2ab0379eb07b2a7cd26c845b26ff5ed2a85b5064/history-flashcards.json'
const start = document.querySelector('.js-start')
const restart = document.querySelectorAll('.js-restart')

start.addEventListener('click', () => {
  changeSection('cards')
  initCards(dataUrl)
})

restart.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    changeSection('intro')
  })
})
