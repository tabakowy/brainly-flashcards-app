const layout = document.querySelector('.layout')
const sections = document.querySelector('.flashcards__container')

export function changeSection(sectionName) {
  // Change layout class
  layout.classList.remove('layout--intro', 'layout--cards', 'layout--results')
  layout.classList.add(`layout--${sectionName}`)

  // Slide to section
  sections.classList.remove('flashcards__container--intro', 'flashcards__container--cards', 'flashcards__container--results')
  sections.classList.add(`flashcards__container--${sectionName}`)
}
