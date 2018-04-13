
class ClockButton {
	el: HTMLBRElement;

	constructor(){
		this.el = document.querySelector('.type_clock');
	}

	setActive(isActive: boolean){
		if (isActive){
			this.el.classList.add('state_active')
		} else {
			this.el.classList.remove('state_active')
		}
	}
}

export default new ClockButton()
