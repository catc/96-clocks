import 'styles/main.scss';

import clock from 'src/clock'
import clockButton from 'src/dom/clock-button'

const randomButton: HTMLElement = document.querySelector('.type_random');
const customSelectButton: HTMLElement = document.querySelector('.type_select');
const moonButton: HTMLElement = document.querySelector('.type_day');
const fullscreenButton: HTMLElement = document.querySelector('.type_fullscreen');

// shuffle
randomButton.addEventListener('click', () => {
	clock.randomNumbers()
})

// time
clockButton.el.addEventListener('click', () => {
	clock.followTime()
})

// select custom numbers
// ...

// toggle day/night mode
// ...

// enter full screen
// ...