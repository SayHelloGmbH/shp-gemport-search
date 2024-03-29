import { render, useEffect, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { apiGet, apiStates } from './_api';
import { FormView } from './_view';

const App = ({ element }) => {
	const { classNameBase, generation, postcode } = element.dataset;

	const [dataPostcode] = useState(postcode || '');
	const [dataSearch, setDataSearch] = useState('');
	const [selectedThemes, setSelectedThemes] = useState([]);
	const [viewMode, setViewMode] = useState('form');
	const themesEndpoint = useMemo(() => `https://gemport.ch/gemport/public/api/themes?generation=${generation}`, []);
	const selectedThemesString = selectedThemes.join(',');
	const listEndpoint = useMemo(
		() => `https://gemport.ch/gemport/public/api/offerings?zipcode=${dataPostcode}&themes=${selectedThemesString}&search=${dataSearch}`,
		[dataPostcode, selectedThemesString, dataSearch]
	);

	useEffect(() => {
		console.log('listEndpoint', listEndpoint);
	}, [selectedThemes]);

	const { data, error, state } = apiGet(themesEndpoint);

	if (state === apiStates.LOADING) {
		return '';
	}

	if (state === apiStates.ERROR) {
		console.log('Gemport API error', error);
	}

	return (
		<div className={`${classNameBase}__inner`}>
			{viewMode === 'form' && <FormView props={{ element, classNameBase, data, selectedThemes, setSelectedThemes }} />}
		</div>
	);
};

document.addEventListener('DOMContentLoaded', () => {
	const elements = document.querySelectorAll('[data-gemport-search]');
	if (elements.length) {
		elements.forEach((element) => {
			render(<App element={element} />, element);
		});
	}
});
