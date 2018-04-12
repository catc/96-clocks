import './style.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'

import { observable, action } from 'mobx';
import { observer, inject, PropTypes as MPropTypes } from 'mobx-react';

const PADDING = 40;

function selectAnimation(animation){
	switch (animation){
		case 'fade-in':
			return 'anim_fade-in'
		case 'scale-fade-in':
		default:
			return 'anim_scale-fade-in'
	}
}

// TODO - need observable?
class ModalItem extends Component {
	state = {
		isVisible: false,
		classes: '',
		anim: null,
		dialogStyles: {}
	};

	componentDidMount(){
		setTimeout(() => {
			this.bg.style.opacity = 0.85
		}, 0);
	}

	@action animateAndClose = () => {
		this.content.style.opacity = 0
		this.bg.style.opacity = 0

		setTimeout(() => {
			this.props.closeModal()
		}, 300);
	}

	// options bound in decorator
	@action updateHeight = options => {
		// TODO - do other cases if modal height is not constrained
		if (options.constrainedHeight && options.center){
			const windowHeight = window.innerHeight;
			const contentHeight = this.content.offsetHeight;

			if ( (contentHeight + PADDING * 4) < windowHeight ){
				this.dialog.style.position = 'relative'
				this.dialog.style.top = `${(windowHeight - PADDING * 4 - contentHeight ) / 2}px`
				this.dialog.style.height = 'auto'
			} else {
				this.dialog.style.position = 'relative'
				this.dialog.style.top = 0
				this.dialog.style.height = `${windowHeight - PADDING * 2}px`
			}
		}
	}

	// options bound in decorator
	@action setClasses = options => {
		// classes
		let classes = options.additionalClasses || '';
		if (options.fullScreen){
			classes += ' type_full-screen'
		}
		if (options.center){
			classes += ' type_center'
			if (options.constrainedHeight){
				classes += ' type_constrain-height'
			}
		} else if (options.sidebar){
			classes += 'type_sidebar'
		}

		// dialog div styles
		const dialogStyles = {}
		if ((options.center || options.sidebar) && options.maxWidth){
			dialogStyles.maxWidth = options.maxWidth
		}

		// animation type
		const animation = selectAnimation(options.animation);

		this.setState({
			classes: classes,
			anim: animation,
			dialogStyles: dialogStyles,
		})
	}

	// options bound in decorator
	@action showContent = options => {
		setTimeout(() => {
			if (options.center){
				const height = this.dialog.offsetHeight
				const windowHeight = window.innerHeight

				if (options.fullScreen){
					this.dialog.style.height = `${windowHeight - PADDING * 2}px`
				} else if ( (height + PADDING * 4) < windowHeight ){
					this.dialog.style.position = 'relative'
					this.dialog.style.top = `${(windowHeight - PADDING * 4 - height) / 2}px`
				} else {
					const contentHeight = this.content.offsetHeight

					// centered in middle of page with padding on top and bottom, and scroll up and down inside modal
					if ( (contentHeight + PADDING * 4) > windowHeight && options.constrainedHeight){
						this.dialog.style.position = 'relative'
						this.dialog.style.top = 0
						this.dialog.style.height = `${windowHeight - PADDING * 2}px`
					}
				}
			}

			// actually display
			this.setState({
				isVisible: true,
			})
		}, 0);
	}

	render(){
		const item = this.props.item

		return (
			<div className="modal__wrapper">
				<div onClick={this.animateAndClose} className="modal__bg" ref={el => this.bg = el}></div>
				<div className={`modal__dialog ${this.state.classes}`} ref={el => this.dialog = el} style={this.state.dialogStyles}>
					<div
						className={`modal__content ${this.state.anim} ${this.state.classes} ${this.state.isVisible ? 'state_visible' : ''}`}
						ref={el => this.content = el}
					>
						<item.view
							data={item.data}
							closeModal={this.animateAndClose}
							setClasses={this.setClasses} // used by modal decorator only
							showContent={this.showContent}
							updateHeight={this.updateHeight}
						/>
					</div>
				</div>
			</div>
		)
	}
}
ModalItem.propTypes = {
	item: PropTypes.shape({
		view: PropTypes.func.isRequired,
		data: PropTypes.object,
	}).isRequired,
	closeModal: PropTypes.func.isRequired
}

// ------------- wrapper -------------
@inject(stores => ({
	modalStore: stores.modalStore
}))
@observer
class Modal extends Component {
	noScroll = false
	constructor(props) {
		super(props);

		props.history.listen(( /*newRoute, action*/ ) => {
			if (props.history.length){
				props.modalStore.closeAllModals();
			}
		});
	}
	componentDidMount(){
		// TODO - test on windows to make sure this works correctly
		const scrollDiv = document.createElement('div');
		scrollDiv.className = 'modal__scrollbar-measure';
		document.body.appendChild(scrollDiv);
		const width = scrollDiv.offsetWidth-scrollDiv.clientWidth;
		document.body.removeChild(scrollDiv);
		this.scrollBarWidth = width;
	}

	componentWillUpdate(){
		// mobx doesn't have next props, so current props are already updated props
		const open = this.props.modalStore.open.length
		if (open === 1 && !this.noScroll){
			this.noScroll = true;
			document.documentElement.classList.add('no-scroll')
			if (this.scrollBarWidth){
				document.documentElement.style.paddingRight = `${this.scrollBarWidth}px`
			}
		} else if (open === 0){
			this.noScroll = false;
			document.documentElement.classList.remove('no-scroll')
			document.documentElement.style.paddingRight = 0
		}
	}

	render() {
		if (!this.props.modalStore.open.length){
			return false;
		}
		
		return (
			<div>
				{this.props.modalStore.open.map(m => {
					return <ModalItem
						key={m.id}
						item={m}
						closeModal={m.closeModal}
					/>
				})}
			</div>
		)
	}
}

export default withRouter(Modal)

Modal.wrappedComponent.propTypes = {
	history: PropTypes.object.isRequired,
	modalStore: PropTypes.shape({
		open: MPropTypes.observableArray.isRequired,
		closeAllModals: PropTypes.func.isRequired
	}).isRequired
}