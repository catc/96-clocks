import './style.scss';
import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import P from 'prop-types';

import Clock from './clock';
import ClockNumber from './clock-number';

const aReg = /^([0-9]{1,2}):/
const bReg = /:([0-9]{1,2})$/

import idgen from 'utils/uuid';

/*@inject(stores => ({
	session: stores.sessionStore,
}))*/
@observer
export default class ClockWrapper extends Component<Props, {}> {
	constructor(props: Props){
		super(props)
	}

	@observable number = 6;
	/*@observable val = '15:30';
	@computed get a(){
		try {
			return parseInt(this.val.match(aReg)[1], 10)
		} catch (err){
			return '15'
		}
	}
	@computed get b(){
		try {
			return parseInt(this.val.match(bReg)[1], 10)
		} catch (err){
			return '15'
		}
	}*/

	@observable a = 15;
	@observable b = 30;
	@observable animID: string = idgen();
	
	@observable time: string = idgen();

	@action.bound setVal(key, e){
		this[key] = e.target.value;
	}
	@action.bound toggleNumber(){
		this.number = this.number === 0 ? 1 : 0
		this.time = idgen()
	}

	@action setA(val){
		this.animID = idgen()
		this.a = val;
		this.b = val;
	}

	@action.bound changeNumber(e){
		let val = e.target.value;
		if (val < 0){
			val = 9;
		}
		this.number = val%10;
		this.time = idgen()
	}

	render(){
		return (
			<div className="clock-wrapper">
				<Clock
					a={this.a}
					b={this.b}
					animID={this.animID}
				/>

				<br/>
				<button onClick={() => {this.setA(50); }}>Set 50</button>
				<button onClick={() => {this.setA(30); }}>Set 30</button>
				<button onClick={() => {this.setA(15); }}>Set 15</button>
				<button onClick={() => {this.setA(10); }}>Set 10</button>
				<input
					type="number"
					value={this.a}
					onChange={e => this.setVal('a', e)}
				/>
				<input
					type="number"
					value={this.b}
					onChange={e => this.setVal('b', e)}
				/>
				<hr/>
				<input
					type="number"
					value={this.number}
					onChange={this.changeNumber}
					autoFocus={true}
				/>
				<hr/>
				<span>{this.a}:{this.b}</span>
				<button onClick={this.toggleNumber}>toggle! {this.number}</button>
				<br/><br/>

				{<ClockNumber
					// number={0}
					number={this.number}
					time={this.time}
				/>}
			</div>
		)
	}
}
				

ClockWrapper.propTypes = {
	
}

export interface Props {
	someProp: string;
}
