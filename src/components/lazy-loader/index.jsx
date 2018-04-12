import React, { Component } from 'react'

export default class Bundler extends Component {
	static preload = null;

	state = {
		mod: null
	};

	constructor(props, fn){
		super(props);
		fn.then(mod => {
			this.setState({
				mod: mod.default ? mod.default : mod
			})
		})
	}

	render(){
		if (!this.state.mod){
			return null;
		}
		return <this.state.mod {...this.props}/>
	}
}