import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*
	NOTES:
	- modal-wrapper.modalItem wraps decorated modal view
	- so modal wrapper passes showContent + updateHeight + ...
		- which is then bound by decorator with options
		- and bound functions are then passed down to item view component
	// options:
	center - `bool`
	maxWidth - `number`
	fullScreen - `bool`
	constrainedHeight - `bool`
	sidebar - `bool`
	autoShow - `bool`
	anim - `string`: see list of available animations in modal component
*/

export default function newModal(options = {}) {
	return ModalContent => {
		class Modal extends Component {
			constructor(props){
				super(props);

				this.showContent = this.props.showContent.bind(this, options);
				this.updateHeight = this.props.updateHeight.bind(this, options);
			}
			componentWillMount(){
				this.props.setClasses(options)
				if (options.autoShow){
					this.showContent()
				}
			}
			render(){
				return <ModalContent
					{...this.props}
					showContent={this.showContent}
					updateHeight={this.updateHeight}
				/>
			}
		}
		return Modal;

		Modal.propTypes = {
			setClasses: PropTypes.func.isRequired, // used by decorator
			showContent: PropTypes.func.isRequired, // bound by decorator and passed down
			updateHeight: PropTypes.func.isRequired, // bound by decorator and passed down
			closeModal: PropTypes.func.isRequired, // just passed down
		}
	}
}