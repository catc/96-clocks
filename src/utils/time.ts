import padStart from 'lodash/padStart'

export function currentTimeToNumbers(): number[]{
	const d = new Date();

	const hour = padStart(d.getHours(), 2, 0)
	const min = padStart(d.getMinutes(), 2, 0)
	return [hour[0], hour[1], min[0], min[1]]
}
