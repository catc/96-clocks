const BUTTON_CLASS = '.type_clock';

class Followtime {
	button: HTMLElement;

	constructor(){
		this.button = document.querySelector(BUTTON_CLASS) as HTMLElement;
	}

	setActive(isActive: boolean){
		if (isActive){
			this.button.classList.add('state_active')
		} else {
			this.button.classList.remove('state_active')
		}
	}

	setupEventListener(followTimeFn){
		this.button.addEventListener('click', () => {
			followTimeFn()
		}, false);
	}
}

export default new Followtime()
