/*
	MODAL CONTENT
*/
import './style.scss';
import React, { Component } from 'react';
import P from 'prop-types';
import { observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';
import { asyncAction } from 'mobx-utils';

import modal from 'components/common/modal';

@modal({
	center: true,
	additionalClasses: 'type_rounded',
	autoShow: true
})
@observer
export default class MODAL extends Component {
	componentDidMount(){
		this.props.showContent();
	}

	/*yourAction = asyncAction(function*(){
		// ...
	})*/

	render() {
		return (
			<div>
				<button className="modal__close-button" onClick={this.props.closeModal}>Close</button>
				content
			</div>
		)
	}
}

MODAL.propTypes = {
	data: P.object.isRequired,
	showContent: P.func.isRequired,
	closeModal: P.func.isRequired,
}


/*
	OPENING MODAL
*/
import { inject } from 'mobx-react';

@inject(stores => ({
	modalStore: stores.modalStore,
}))
export default class WHATEVER_COMPONENT extends Component {
	@action openModal = () => {
		this.props.modalStore.newModal(MODAL_COMPONENT, {/* data goes here */})
	}
}

WHATEVER_COMPONENT.wrappedComponent.propTypes = {
	modalStore: P.shape({
		newModal: P.func.isRequired
	}).isRequired
}