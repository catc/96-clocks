import forEach from 'lodash/forEach';
import map from 'lodash/map';

const numbers = {
	0: [
		[15, 30], [45, 15], [45, 15], [45, 30],
		[0, 30], [15, 30], [45, 30], [0, 30],
		[0, 30], [0, 30], [0, 30], [0, 30],
		[0, 30], [0, 30], [0, 30], [0, 30],
		[0, 30], [0, 15], [0, 45], [0, 30],
		[0, 15], [45, 15], [45, 15], [0, 45],
	],
	1: [
		[15, 30], [15, 45], [30, 45], [37.5, 37.5],
		[15, 0], [30, 45], [0, 30], [37.5, 37.5],
		[37.5, 37.5], [0, 30], [0, 30], [37.5, 37.5],
		[37.5, 37.5], [0, 30], [0, 30], [37.5, 37.5],
		[15, 30], [45, 0], [0, 15], [30, 45],
		[0, 15], [15, 45], [15, 45], [0, 45],
	],
	2: [
		[15, 30], [15, 45], [15, 45], [30, 45],
		[0, 15], [15, 45], [30, 45], [0, 30],
		[15, 30], [15, 45], [0, 45], [0, 30],
		[0, 30], [15, 30], [15, 45], [0, 45],
		[0, 30], [0, 15], [15, 45], [30, 45],
		[0, 15], [15, 45], [15, 45], [45, 0],
	],
	3: [
		[15, 30], [15, 45], [15, 45], [30, 45],
		[0, 15], [15, 45], [30, 45], [0, 30],
		[15, 30], [15, 45], [0, 45], [0, 30],
		[0, 15], [15, 45], [30, 45], [0, 30],
		[15, 30], [15, 45], [0, 45], [0, 30],
		[0, 15], [15, 45], [15, 45], [0, 45],
	],
	4: [
		[15, 30], [30, 45], [37.5, 37.5], [37.5, 37.5],
		[0, 30], [0, 30], [15, 30], [30, 45],
		[0, 30], [0, 15], [0, 45], [0, 30],
		[0, 15], [15, 45], [30, 45], [0, 30],
		[37.5, 37.5], [37.5, 37.5], [0, 30], [0, 30],
		[37.5, 37.5], [37.5, 37.5], [0, 15], [0, 45],
	],
	/*4: [
		[15, 30], [30, 45], [37.5, 37.5], [37.5, 37.5],
		[0, 30], [0, 30], [37.5, 37.5], [37.5, 37.5],
		[0, 30], [0, 30], [15, 30], [30, 45],
		[0, 30], [0, 15], [0, 45], [0, 30],
		[0, 15], [15, 45], [30, 45], [0, 30],
		[37.5, 37.5], [37.5, 37.5], [0, 15], [0, 45],
	],*/
	5: [
		[15, 30], [15, 45], [15, 45], [45, 30],
		[0, 30], [15, 30], [15, 45], [0, 45],
		[0, 30], [0, 15], [15, 45], [30, 45],
		[0, 15], [15, 45], [30, 45], [0, 30],
		[15, 30], [15, 45], [0, 45], [0, 30],
		[0, 15], [15, 45], [15, 45], [45, 0],
	],
	6: [
		[15, 30], [15, 45], [15, 45], [30, 45],
		[0, 30], [15, 30], [15, 45], [0, 45],
		[0, 30], [0, 15], [15, 45], [30, 45],
		[0, 30], [15, 30], [30, 45], [0, 30],
		[0, 30], [0, 15], [0, 45], [0, 30],
		[0, 15], [15, 45], [15, 45], [0, 45],
	],
	7: [
		[15, 30], [15, 45], [15, 45], [30, 45],
		[0, 15], [15, 45], [30, 45], [0, 30],
		[37.5, 37.5], [37.5, 37.5], [0, 30], [0, 30],
		[37.5, 37.5], [37.5, 37.5], [0, 30], [0, 30],
		[37.5, 37.5], [37.5, 37.5], [0, 30], [0, 30],
		[37.5, 37.5], [37.5, 37.5], [0, 15], [0, 45],
	],
	8: [
		[15, 30], [15, 45], [15, 45], [45, 30],
		[0, 30], [15, 30], [45, 30], [0, 30],
		[0, 30], [0, 15], [0, 45], [0, 30],
		[0, 30], [15, 30], [45, 30], [0, 30],
		[0, 30], [0, 15], [0, 45], [0, 30],
		[0, 15], [15, 45], [15, 45], [45, 0],
	],
	9: [
		[15, 30], [15, 45], [15, 45], [30, 45],
		[0, 30], [15, 30], [30, 45], [0, 30],
		[0, 30], [0, 15], [0, 45], [0, 30],
		[0, 15], [15, 45], [30, 45], [0, 30],
		[15, 30], [15, 45], [0, 45], [0, 30],
		[0, 15], [15, 45], [15, 45], [0, 45],
	],
}

Object.keys(numbers).forEach(num => {
	numbers[num] = numbers[num].map(arr => [arr[0] * 6, arr[1] *6])
})

export default numbers;