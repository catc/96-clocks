// import './style.scss';
import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import P from 'prop-types';

import Clock from 'routes/home/clock';
import ClockNumber from 'routes/home/clock-number';

import idgen from 'utils/uuid';

const aReg = /^([0-9]{1,2}):/
const bReg = /:([0-9]{1,2})$/

/*@inject(stores => ({
	session: stores.sessionStore,
}))*/
@observer
export default class MY_COMPONENT extends Component<Props, {}> {
	constructor(props: Props){
		super(props)
	}

	@observable a1 = 0;
	@observable a2 = 1;
	@observable b1 = 5;
	@observable b2 = 8;

	@observable id: string = idgen();

	@action.bound changeNumber(e){
		let val = e.target.value;
		if (val < 0){
			val = 9;
		}
		this.number = val%10;
		this.id = idgen()
	}

	@observable time: string = '01:58';
	@action.bound setTime(e){
		if (e.charCode === 13){
			const a = this.time.match(aReg)[1]
			const b = this.time.match(bReg)[1]
			this.a1 = a[0]
			this.a2 = a[1]
			this.b1 = b[0]
			this.b2 = b[1]
			this.id = idgen()
		}
	}

	render(){
		return (
			<div className="clock-number-wrapper">
				<div className="clock-number-wrapper__row">
					<ClockNumber
						number={this.a1}
						id={this.id}
					/>
					<ClockNumber
						number={this.a2}
						id={this.id}
					/>
				</div>
				<div className="clock-number-wrapper__row">
					<ClockNumber
						number={this.b1}
						id={this.id}
					/>
					<ClockNumber
						number={this.b2}
						id={this.id}
					/>
				</div>

				<div className="clock-number-wrapper__controls">
					<input
						type="text"
						value={this.time}
						onChange={e => this.time = e.target.value}
						onKeyPress={this.setTime}
						autoFocus
					/>
					{this.a1}{this.a2}:{this.b1}{this.b2}
				</div>
			</div>
		)
	}
}

MY_COMPONENT.propTypes = {
	
}

export interface Props {
	someProp: string;
}