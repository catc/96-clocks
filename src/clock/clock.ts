const RADIUS: number = 30;
const CIRCLE_RADIUS = 5;

export default class Clock {
	constructor(container: HTMLElement, a: number, b: number){
		this._setup(container, a, b)
	}

	line1?: SVGElement;
	line2?: SVGElement;
	line1Angle?: number;
	line2Angle?: number;

	_setup(container: HTMLElement, a: number, b: number){
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
	_createLine(angle: number): SVGElement {
		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
		line.setAttribute('x1', RADIUS)
		line.setAttribute('y1', RADIUS)
		line.setAttribute('x2', RADIUS)
		// set 1 instead of zero so length of line is just 29px
		// and doesn't end up showing/bleeding through clock border
		line.setAttribute('y2', '1')
		line.setAttribute('transform', `rotate(${angle})`)
		return line;
	}
	_createCircle(svg: SVGElement){
		const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
		circle.setAttribute('cx', RADIUS)
		circle.setAttribute('cy', RADIUS)
		circle.setAttribute('r', CIRCLE_RADIUS)
		svg.appendChild(circle)
	}

	anim1?: (easeVal: number) => void;
	anim2?: (easeVal: number) => void;

	prepareAnimation(timeAngles: number[]){
		const a = timeAngles[0];
		const b = timeAngles[1];

		this.anim1 = this._createAnim(1, a)
		this.anim2 = this._createAnim(2, b)
	}
	
	_createAnim(lineNumber: number, end: number){
		const lineKey = `line${lineNumber}`;
		const lineAngleKey = `line${lineNumber}Angle`
		
		const line: SVGElement = this[lineKey];

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
		// ensure that all lines move, including those that don't need to
		if (toTravel < 180){
			toTravel += 360
		}

		this[lineAngleKey] = end;

		// animation functions
		if (lineNumber === 1){
			// counter-clockwise rotation for second hand
			return function (val: number){
				const angle = (startAngle - toTravel * val) % 360
				this[lineAngleKey] = angle
				line.setAttribute('transform', `rotate(${angle})`)
			}
		} else {
			// regular rotation
			return function (val: number){
				const angle = (startAngle + toTravel * val) % 360
				this[lineAngleKey] = angle
				line.setAttribute('transform', `rotate(${angle})`)
			}
		}
	}
}

