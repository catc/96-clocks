import times from 'lodash/times'
import random from 'lodash/random'

import 'styles/main.scss';
import clock from 'src/clock'
import followTimeButton from 'src/features/follow-time'
import 'src/features/full-screen'
import CustomNumbers from 'src/features/custom-numbers'

const randomButton: HTMLElement = document.querySelector('.type_random');
const moonButton: HTMLElement = document.querySelector('.type_day');

// shuffle
randomButton.addEventListener('click', () => {
	const numbers = times(4, () => random(0, 9))
	clock.animateCustomNumbers(...numbers)
}, false);

// follow time
followTimeButton.setupEventListener(clock.followTime);

// custom numbers
new CustomNumbers(clock.animateCustomNumbers)

// toggle day/night mode
// ...
