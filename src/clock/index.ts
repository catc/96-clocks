import times from 'lodash/times'
import random from 'lodash/random'

import ClockNumber from './clock-number'
import clockButton from 'src/dom/clock-button'
import { currentTimeToNumbers } from 'utils/time'

const row1 = document.querySelector('.clock-number-wrapper__row.one')
const row2 = document.querySelector('.clock-number-wrapper__row.two')

class SuperClock {
	clockNumbers = Array<ClockNumber>;

	constructor(...clockNumbers){
		this.clockNumbers = clockNumbers;
	}

	// generate random numbers and animate
	randomNumbers(){
		this._clearFollowTime();

		const numbers = times(4, () => random(0, 9))
		this._animate(...numbers)
	}

	_animate(num1: number = 0, num2: number = 1, num3: number = 5, num4: number = 8){
		const args = arguments
		this.clockNumbers.forEach((item, i) => {
			const number = args[i]
			item.setNumber(number)
		})
		this.clockNumbers.forEach(item => {
			item.startAnimation()
		})
	}

	// changes according to time
	tt?: number;
	followTime(skipAnimation: boolean){
		this._clearFollowTime();
		clockButton.setActive(true)

		// update numbers to current time
		if (!skipAnimation){
			const currentTime = currentTimeToNumbers()
			this._animate(...currentTime)
		}

		// calculate how long until need to update again
		const d = new Date();
		const secondsLeft = 60 - d.getSeconds();
		const msLeft = secondsLeft * 1000;

		this.tt = window.setTimeout(this.followTime.bind(this), msLeft)
	}
	_clearFollowTime(){
		window.clearTimeout(this.tt);
		clockButton.setActive(false)
	}
}

// start this bad boy up
const initialN = currentTimeToNumbers();
const superclock = new SuperClock(
	new ClockNumber(row1, initialN[0]),
	new ClockNumber(row1, initialN[1]),
	new ClockNumber(row2, initialN[2]),
	new ClockNumber(row2, initialN[3])
)
superclock.followTime(true)

export default superclock
