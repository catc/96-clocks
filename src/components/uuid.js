export default function idgen(len = 15) {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	for ( let i=0; i < len; i++ ){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}