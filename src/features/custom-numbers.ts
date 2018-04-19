import times from 'lodash/times';

const MODAL_CLASS = '.cns'
const BUTTON_CLASS = '.type_select'
const NUMBER_GRID_CLASS = '.cns__number-grid'
const SELECTED_NUMBER_CLASS = '.cns__selected-number'
const BG_CLASS = '.cns__bg';

const SUBMIT_BUTTON_CLASS = '.cns__options .cns__select'
const CANCEL_BUTTON_CLASS = '.cns__options .cns__cancel'

const INITIAL_NUMBERS = [1, 2, 3, 4]

class CustomNumbers {
	modal: HTMLElement;
	button: HTMLElement;
	selected: HTMLElement[] = [];
	animate: null;

	constructor (clockFn){
		this.button = document.querySelector(BUTTON_CLASS) as HTMLElement;
		this.modal = document.querySelector(MODAL_CLASS) as HTMLElement;
		this.animate = clockFn;

		this._setupNumberGrid()

		this.button.addEventListener('click', this._openSelect.bind(this), false)
		document.querySelector(SUBMIT_BUTTON_CLASS).addEventListener('click', () => {
			this._select()
		}, false);

		[CANCEL_BUTTON_CLASS, BG_CLASS].forEach(c => {
			document.querySelector(c).addEventListener('click', () => {
				this._closeSelect()
			}, false);
		});
	}

	_setupNumberGrid(){
		// populate all grids with numbers
		const grids = document.querySelectorAll(NUMBER_GRID_CLASS);
		[].forEach.call(grids, (g: HTMLElement, gi: number) => {
			// add selected element to array
			const selected = g.querySelector(SELECTED_NUMBER_CLASS) as HTMLElement;
			selected.innerText = INITIAL_NUMBERS[gi]
			this.selected.push(selected)

			// generate numbers for each grid
			times(10, i => {
				const el: HTMLElement = document.createElement('button')
				const num = (i+1)%10
				el.innerText = num
				el.dataset.gridNumber = gi
				el.dataset.number = num
				g.appendChild(el)
			})
		});

		// add event listeners to grid numbers
		[].forEach.call(grids, (g: HTMLElement) => {
			g.addEventListener('click', (e: Event) => {
				const gridNum = e.target.dataset.gridNumber;
				const num = e.target.dataset.number;
				if (gridNum && num){
					this.selected[gridNum].innerText = num
				}
			}, false)
		});
	}

	_openSelect(){
		this.modal.classList.add('state_active')
	}
	_closeSelect(){
		this.modal.classList.remove('state_active')
	}

	_select(){
		const numbers = [].map.call(this.selected, s => {
			return parseInt(s.innerText, 10)
		})
		window.setTimeout(() => {
			this.animate(...numbers)
		}, 700)
		this._closeSelect();
	}
}

export default CustomNumbers