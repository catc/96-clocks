import './style.scss';
import React, { Component } from 'react';
import P from 'prop-types';


/*
	NOTE:
	- svg elements for some reason are not considered 'contained' in the popup
	if clicked upon
		- workaround is setting the svg to 'pointer-events: none;' so that clicks
		go through and trigger parent element
*/

class Popup extends Component {
	constructor(props){
		super(props)
		this.clickHandler = e => {
			const contains = this.wrapper.contains(e.target)
			if (!contains){
				this.props.closeFn()
			}
		}
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.visible === true){
			this.initClickHandler()
		} else {
			this.removeClickHandler()
		}
	}

	initClickHandler(){
		this.removeClickHandler()
		document.addEventListener('click', this.clickHandler, false)
	}
	removeClickHandler(){
		document.removeEventListener('click', this.clickHandler, false)
	}

	render(){
		const props = this.props;
		if (!props.visible){
			return false;
		}
		return (
			<div className={`popup ${props.classes}`} ref={el => this.wrapper = el}>
				{props.children}
			</div>
		)
	}

	componentWillUnmount(){
		this.removeClickHandler()
	}
}

Popup.propTypes = {
	classes: P.string,
	visible: P.bool.isRequired,
	closeFn: P.func.isRequired,
	children: P.node
}

export default Popup;