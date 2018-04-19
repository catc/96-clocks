import 'styles/main.scss';

import clock from 'src/clock'
import followtime from 'src/features/follow-time'
import 'src/features/full-screen'
import CustomNumbers from 'src/features/custom-numbers'

const randomButton: HTMLElement = document.querySelector('.type_random');
const moonButton: HTMLElement = document.querySelector('.type_day');

// shuffle
randomButton.addEventListener('click', () => {
	clock.randomNumbers()
}, false);

// follow time
followtime.setupEventListener(clock.followTime.bind(clock));

// custom numbers
new CustomNumbers(clock.animateCustomNumbers.bind(clock))

// toggle day/night mode
// ...

