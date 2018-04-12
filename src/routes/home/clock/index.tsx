import './style.scss';
import React, { Component, Fragment } from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import P from 'prop-types';
import Bezier from 'bezier-easing';


const RADIUS: number = 30;
// const RADIUS: number = 25;
const COLOR: string = 'black';
const COLOR2: string = 'black';
// const EASING_DURATION: number = 300;
const EASING_DURATION: number = 1500;
// const EASING_DURATION: number = 5500;
const EASING = [1.00, 0.88, 0.69, 1.02]
const STROKE_WIDTH = 2
const bezier = Bezier(...EASING)
const { sin, cos, PI, abs } = Math; 


const BORDER_WIDTH: number = 5;
// const POSITION: number = RADIUS + BORDER_WIDTH / 2
const POSITION2: number = RADIUS
 // - BORDER_WIDTH


function calcAngleFromRaw(raw){
	return raw * 6;
}

@observer
export default class Clock extends Component<Props, {}> {
	state = {}
	constructor(props: Props){
		super(props)

		this.aAngle = calcAngleFromRaw(props.a)
		this.bAngle = calcAngleFromRaw(props.b)
	}
	@observable aAngle: number = 0;
	@observable bAngle: number = 0;

	updateA = null;
	updateB = null;
	aRF: number = 0;
	bRF: number = 0;

	updateInterval(fnName: string, angleKey: string, cancelRFName: string, end: number, opposite: boolean){
		let startTime: number;
		let startAngle = this[angleKey]%360;
		let toTravel: number;

		if (opposite){
			if (startAngle < 0){
				startAngle += 360
			}
			toTravel = startAngle - end;
		} else {
			toTravel = end - abs(this[angleKey]);
		}
		if (toTravel < 0){
			toTravel += 360
		}
		if (toTravel < 180){
			toTravel += 360;
		}

		return (now) => {
			if (!startTime){
				startTime = now;
			}

			// determine how much time is left
			const progress = (now - startTime) / EASING_DURATION;
			// convert to % bezier completion
			const val = bezier(progress)

			// update angle
			if (opposite){
				this[angleKey] = (startAngle - toTravel * val) % 360
			} else {
				this[angleKey] = (startAngle + toTravel * val) % 360
			}
			if (now - startTime < EASING_DURATION){
				this[cancelRFName] = window.requestAnimationFrame(this[fnName])
			}
		}
	}

	shouldComponentUpdate(nextProps: Props){
		if (nextProps.animID !== this.props.animID){
		// if (prevProps.animID !== this.props.animID){
		// if (prevProps.a !== this.props.a){
			// console.log('hitting inside', this.props, prevProps);
			/*const aEnd = calcAngleFromRaw(this.props.a)
			const bEnd = calcAngleFromRaw(this.props.b)*/
			const aEnd = calcAngleFromRaw(nextProps.a)
			const bEnd = calcAngleFromRaw(nextProps.b)

			this.updateA = this.updateInterval.call(this, 'updateA', 'aAngle', 'aRF', aEnd);
			this.updateB = this.updateInterval.call(this, 'updateB', 'bAngle', 'bRF', bEnd, true);
			// this.updateB = this.updateInterval.call(this, 'updateB', 'bAngle', 'bRF', bEnd);

			this.cancelRAF();

			this.aRF = window.requestAnimationFrame(this.updateA)
			this.bRF = window.requestAnimationFrame(this.updateB)
			return true
		}
		return false
	}

	cancelRAF(){
		window.cancelAnimationFrame(this.aRF)
		window.cancelAnimationFrame(this.bRF)
	}

	render(){
		// const POSITION: number = RADIUS - BORDER_WIDTH
		const POSITION: number = RADIUS
		// const FOO = RADIUS - BORDER_WIDTH;
		// const BAR = BORDER_WIDTH / 2;

		const FOO = RADIUS;
		const BAR = 0;
		return (
			// TODO - remove fragment
			<Fragment>
				<div className="clock-item">
					<svg width={RADIUS * 2} height={RADIUS * 2} xmlns="http://www.w3.org/2000/svg">
						{<line
							x1={POSITION}
							y1={POSITION}
							// x2={this.xa}
							// y2={this.ya}
							
							// x2={RADIUS}
							// y2="0"
							x2={FOO}
							y2={BAR}
							// transform={`rotate(${this.aAngle})`}
							transform={`rotate(${this.aAngle})`}
							stroke={COLOR}
							// strokeWidth={STROKE_WIDTH}
						/>}
						{<line
							x1={POSITION}
							y1={POSITION}
							// x2={this.xb}
							// y2={this.yb}
							// x2={RADIUS}
							// y2="0"
							x2={FOO}
							y2={BAR}
							transform={`rotate(${this.bAngle})`}
							// stroke={COLOR2}
							stroke="green"
							// stroke="transparent"
							// strokeWidth={STROKE_WIDTH}
						/>}

						<circle
							cx={POSITION2}
							cy={POSITION2}
							r="3"
							// fill={COLOR}
							fill="red"
						/>
					</svg>
				</div>
				
			</Fragment>
					 // - {this.aAngleEnd}
				// <div>
				// 	<br/><br/><br/>
				// 	({this.props.b}): {this.bAngle} 
				// </div>
		)
	}
}

Clock.propTypes = {
	
}

export interface Props {
	a: number;
	b: number;
	animID: string;
}
