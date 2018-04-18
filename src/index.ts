import 'styles/main.scss';

import clock from 'src/clock'
import clockButton from 'src/dom/clock-button'
import 'src/dom/fullscreen'

const randomButton: HTMLElement = document.querySelector('.type_random');
const customSelectButton: HTMLElement = document.querySelector('.type_select');
const moonButton: HTMLElement = document.querySelector('.type_day');

// shuffle
randomButton.addEventListener('click', () => {
	clock.randomNumbers()
}, false);

// time
clockButton.el.addEventListener('click', () => {
	clock.followTime()
}, false);

// select custom numbers
// ...

// toggle day/night mode
// ...

