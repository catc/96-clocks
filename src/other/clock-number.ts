import Clock from './clock';
import pattern from 'utils/times';

import Bezier from 'bezier-easing';
const EASING = [1.00, 0.88, 0.69, 1.02]
const bezier = Bezier(...EASING)
const EASING_DURATION = 4550;
// const EASING_DURATION = 1550;

export default class ClockNumber {
	constructor(row, number){
		const p = pattern[number];

		// create `clock-number` container
		const div = document.createElement('div');
		div.classList.add('clock-number');

		// create all mini-clocks that form the number
		this._clocks = p.map(time => {
			return new Clock(div, time[0], time[1])
		})

		// add mini clock to number div
		row.appendChild(div)
	}

	_clocks = [];

	setNumber(newNumber: number){
		const p = pattern[newNumber];

		const clocks = this._clocks;
		// set final rotate value and animation function for each clock
		p.forEach((time: number[], i) => {
			clocks[i].prepareAnimation(time)
		})

		this._cancelRAF();

		// create animation function
		this._animateFn = this._createAnimateFn();
	}

	// create animation fn
	_animateFn: any = null;
	_createAnimateFn(){
		let startTime: number;

		const clocks = this._clocks;

		return function(now){
			if (!startTime){
				startTime = now;
			}
			// determine how much time is left
			const progress = (now - startTime) / EASING_DURATION;

			// convert to % bezier completion
			const val = bezier(progress)

			clocks.forEach(c => {
				c.anim1(val);
				c.anim2(val);
			})

			if (now - startTime < EASING_DURATION){
				this.startAnimation()
			}
		}.bind(this)
	}
	
	startAnimation(){
		this.RF = window.requestAnimationFrame(this._animateFn)
	}

	// cancel RAF
	RF?: number;
	_cancelRAF(){
		console.log('cancelling!');
		window.cancelAnimationFrame(this.RF)
	}
}