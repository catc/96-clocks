const BUTTON_CLASS = '.type_fullscreen';
const CONTROLS_CLASS = '.controls';

const FULLSCREEN_EVENTS = [
	'fullscreenchange',
	'webkitfullscreenchange',
	'mozfullscreenchange',
	'msfullscreenchange'
]

class FullScreen {
	button: HTMLElement;
	controls: HTMLElement;

	constructor(buttonClass: string, controlsClass: string){
		this.button = document.querySelector(buttonClass) as HTMLElement;
		this.controls = document.querySelector(controlsClass) as HTMLElement;

		this._setupEventListeners()
	}

	_setupEventListeners(){
		// button events
		this.button.addEventListener('click', (): void => {
			const body: HTMLElement = document.body;
			const requestMethod = body.requestFullscreen || body.requestFullScreen || body.webkitRequestFullScreen || body.mozRequestFullScreen || body.msRequestFullScreen;
			if (requestMethod){
				requestMethod.call(body);
			}
		});

		// full screen events
		const fsFn = this._handleFullScreen.bind(this);
		FULLSCREEN_EVENTS.forEach(ev => {
			document.addEventListener(ev, fsFn, false)	
		})
	}

	_timeout: number = 0;
	_handleFullScreen(){
		window.clearTimeout(this._timeout);
		this._timeout = window.setTimeout(() => {
			const isFullScreen = window.fullScreen || (window.innerWidth == screen.width && window.innerHeight == screen.height)
			// const isFullScreen = window.fullScreen || (window.innerHeight == screen.height) // FOR TESTING ONLY - when console is open
			if (isFullScreen){
				this.controls.classList.add('state_fullscreen')
			} else {
				this.controls.classList.remove('state_fullscreen')
			}
		}, 600);
	}
}

new FullScreen(BUTTON_CLASS, CONTROLS_CLASS)