import { observable, action } from 'mobx';

class Modal {
	id = 'z' + Math.random();
	closeModal = null

	view = null
	data = null

	constructor(view, data = {}){
		this.view = view
		this.data = data
	}
}

class ModalStore {
	@observable open = [];

	@action newModal(view, data){
		const modal = new Modal(view, data);

		modal.closeModal = this.closeModal.bind(this, modal.id)

		this.open.push(modal)
	}


	@action closeModal(id){
		const found = this.open.find(modal => {
			return modal.id === id;
		})

		this.open.remove(found)
	}

	@action closeAllModals(){
		this.open.clear();
	}
}


export default new ModalStore();