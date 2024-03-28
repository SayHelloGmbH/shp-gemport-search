import { render } from '@wordpress/element';

const App = () => {
	return <h1>Hello World</h1>;
};

document.addEventListener('DOMContentLoaded', () => {
	const elements = document.querySelectorAll('[data-gemport-search]');
	if (elements.length) {
		elements.forEach((element) => {
			render(<App />, element);
		});
	}
});
