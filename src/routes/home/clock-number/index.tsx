import './style.scss';
import React, { Component } from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import P from 'prop-types';

import Clock from '../clock';
import pattern from 'utils/times';
import idgen from 'utils/uuid';

@observer
export default class ClockWrapper extends Component<Props, {}> {
	/*constructor(props: Props){
		super(props)
	}*/

	@observable num2: number = 0;
	@observable animID: string = idgen();

	componentDidUpdate(prevProps: Props){
		if (prevProps.id !== this.props.id){
			this.animID = idgen()
		}
	}

	@action.bound toggleNum(){
		this.animID = idgen()
		this.num2 = this.num2 === 0 ? 1 : 0
	}
	
	render(){
		const n = this.props.number;
		const arr = pattern[n]
		// return null
		/*return (
			<div className="clock-number">
				<Clock
					// key={i + ''}
					animID={this.animID}
					// a={pattern[n][0][0]}
					// b={pattern[n][0][1]}
					// a={n === 0 ? 15 : 45}
					// b={n === 0 ? 30 : 0}
					a={this.num2 === 0 ? 15 : 45}
					b={this.num2 === 0 ? 30 : 0}
				/>

				<br/> <br/>
				<button onClick={this.toggleNum}>Change</button>
			</div>
		)*/
		return (
			<div className="clock-number">
				{arr.map((item, i) => 
					<Clock
						key={i + ''}
						animID={this.animID}
						a={item[0]}
						b={item[1]}
					/>
				)}
			</div>
		)
	}
}
				

ClockWrapper.propTypes = {
	
}

export interface Props {
	number: number;
	id: string;
}
