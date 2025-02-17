import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

import { AppContext } from './_context';
import { apiGet, apiStates } from './_api';
import { ListView, FormView } from './_view';

const App = ({ element }) => {
	const { classNameBase, country, generation, postcode, town, translations } = element.dataset;

	const [allThemes, setAllThemes] = useState([]);
	const [dataCountry] = useState(country || '');
	const [dataPostcode] = useState(postcode || '');
	const [dataTown] = useState(town || '');
	const [dataSearch, setDataSearch] = useState('');
	const [initialRender, setInitialRender] = useState(true);
	const [listData, setListData] = useState([]);
	const [selectedThemes, setSelectedThemes] = useState([]);
	const [viewError, setViewError] = useState('');
	const [viewMode, setViewMode] = useState('form');
	const themesEndpoint = useMemo(() => `https://gemport.ch/gemport/public/api/themes?generation=${generation}`, []);
	const selectedThemesString = selectedThemes.join(',');

	const listEndpoint = useMemo(() => {
		let url = `https://gemport.ch/gemport/public/api/offerings?zipcode=${dataPostcode}`;

		// Use selectedThemes
		// OR all themes if the user has selected no themes AND there is no search term

		if (selectedThemesString) {
			url += `&theme=[${selectedThemesString}]`;
		} else if (allThemes && allThemes.length && !dataSearch) {
			let themeIds = allThemes.map((theme) => theme.id).join(',');
			themeIds = themeIds.split(',').sort().join(',');
			url += `&theme=[${themeIds}]`;
		}

		if (dataSearch) {
			url += `&search=${dataSearch}`;
		}

		if (dataTown && dataPostcode) {
			url += `&town=${dataTown}%20(CH-${dataPostcode})`;
		}

		if (country) {
			url += `&country=${dataCountry}`;
		}

		return url;
	}, [dataPostcode, dataTown, selectedThemesString, dataSearch, allThemes]);

	// On component mount
	useEffect(() => {
		setInitialRender(false);
	}, []);

	// Scroll to the top of the element which switching modes
	useEffect(() => {
		if (!element || initialRender) {
			return;
		}

		const { top } = element.getBoundingClientRect();

		const cssValue = getComputedStyle(document.body).getPropertyValue('--gemport-search--scroll-offset', 0);
		const regex = /(\d+)px/g; // Regular expression to match numerical values followed by "px"
		const matches = cssValue.match(regex);

		let result = parseInt(cssValue, 10);
		if (matches) {
			result = matches.reduce((acc, val) => acc + parseInt(val, 10), 0);
		}

		const scrollOffset = parseInt(result, 10);

		let scrollToY = top + window.scrollY - scrollOffset;

		window.scrollTo({
			top: Math.max(0, scrollToY),
			behavior: 'smooth',
		});
	}, [viewMode, element, initialRender]);

	const { data, error, state } = apiGet(themesEndpoint);

	useEffect(() => {
		setAllThemes(data);
	}, [data]);

	const context = {
		classNameBase,
		element,
		data,
		dataCountry,
		dataPostcode,
		dataSearch,
		dataTown,
		listData,
		listEndpoint,
		selectedThemes,
		setDataSearch,
		setListData,
		setSelectedThemes,
		setViewMode,
		themesEndpoint,
		translations: JSON.parse(translations) || {},
		viewMode,
		viewError,
		setViewError,
	};

	if (state === apiStates.LOADING) {
		return '';
	}

	if (state === apiStates.ERROR) {
		console.log('Gemport API error', error);
	}

	return (
		<AppContext.Provider value={context}>
			<div className={`${classNameBase}__inner`}>
				{viewMode === 'form' && <FormView />}
				{viewMode === 'list' && <ListView />}
			</div>
		</AppContext.Provider>
	);
};

document.addEventListener('DOMContentLoaded', () => {
	const elements = document.querySelectorAll('[data-gemport-search]');
	if (elements.length) {
		elements.forEach((element) => {
			ReactDOM.render(<App element={element} />, element);
		});
	}
});
