import times from 'lodash/times'
import random from 'lodash/random'

const row1 = document.querySelector('.clock-number-wrapper__row.one')
const row2 = document.querySelector('.clock-number-wrapper__row.two')
// const root = document.getElementById('root');

// import Clock from './clock';
import ClockNumber from './clock-number'

class SuperClock {
	items = Array<ClockNumber>;

	constructor(...items){
		this.items = items;
	}

	zz(){
		const numbers = times(4, () => random(0, 9))
		
		this.items.forEach((item, i) => {
			const number = numbers[i]
			item.setNumber(number)
		})
		this.items.forEach(item => {
			item.startAnimation()
		})
	}
}


// start this bad boy up
const sc = new SuperClock(
	new ClockNumber(row1, 0),
	new ClockNumber(row1, 1),
	new ClockNumber(row2, 5),
	new ClockNumber(row2, 8)
)



document.getElementById('action1').addEventListener('click', () => {
	console.log('it is clicked');
	sc.zz()
})