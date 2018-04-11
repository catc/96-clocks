// import Bezier from 'bezier-easing';

// constants
// import { EASING_DURATION } from './constants';

const RADIUS: number = 30;
const CIRCLE_RADIUS = 3
// const EASING = [1.00, 0.88, 0.69, 1.02]
// const bezier = Bezier(...EASING)


export default class Clock {
	constructor(container, a, b){
		this._setup(container, a, b)
	}

	line1?: HTMLElement;
	line2?: HTMLElement;
	line1Angle?: number;
	line2Angle?: number;

	_setup(container, a: number, b: number){
		// create div container to wrap everything
		const div = document.createElement('div')
		div.classList.add('clock-item');

		// create svg
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		svg.setAttribute('width', RADIUS * 2)
		svg.setAttribute('height', RADIUS * 2)
		div.appendChild(svg)

		// create lines
		this.line1 = this._createLine(a);
		this.line2 = this._createLine(b);
		svg.appendChild(this.line1)
		svg.appendChild(this.line2)
		this.line1Angle = a;
		this.line2Angle = b;

		// create circle
		this._createCircle(svg);

		// add div to dom
		container.appendChild(div)
	}
	_createLine(angle: number): HTMLElement {
		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
		line.setAttribute('x1', RADIUS)
		line.setAttribute('y1', RADIUS)
		line.setAttribute('x2', RADIUS)
		line.setAttribute('y2', '0')
		line.setAttribute('transform', `rotate(${angle})`)
		return line;
	}
	_createCircle(svg: HTMLElement){
		const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
		circle.setAttribute('cx', RADIUS)
		circle.setAttribute('cy', RADIUS)
		circle.setAttribute('r', CIRCLE_RADIUS)
		svg.appendChild(circle)
	}

	anim1: null;
	anim2: null;

	prepareAnimation(timeAngles: number[]){
		const a = timeAngles[0];
		const b = timeAngles[1];

		this.anim1 = this._createAnim(1, a)
		this.anim2 = this._createAnim(2, b)
	}
	
	_createAnim(lineNumber: number, end: number){
		const lineKey = `line${lineNumber}`;
		const lineAngleKey = `line${lineNumber}Angle`
		
		const line: HTMLElement = this[lineKey];

		let startAngle: number = this[lineAngleKey]%360;


		let toTravel: number;
		if (lineNumber === 1){
			if (startAngle < 0){
				startAngle += 360
			}
			toTravel = startAngle - end;
		} else {
			toTravel = end - startAngle // need ABS?
		}

		// make sure angle is positive
		if (toTravel < 0){
			toTravel += 360
		}
		// should aim to do close to at least 1 full rotation
		if (toTravel < 180){
			toTravel += 360
		}

		this[lineAngleKey] = end;

		// animation functions
		if (lineNumber === 1){
			// counter-clockwise rotation for second hand
			return function (val: number){
				const angle = (startAngle - toTravel * val) % 360
				line.setAttribute('transform', `rotate(${angle})`)
			}
		} else {
			// regular rotation
			return function (val: number){
				const angle = (startAngle + toTravel * val) % 360
				line.setAttribute('transform', `rotate(${angle})`)
			}
		}
	}
}

