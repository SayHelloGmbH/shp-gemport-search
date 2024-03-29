import { render, useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { AppContext } from './_context';
import { apiGet, apiStates } from './_api';
import { ListView, FormView } from './_view';

const App = ({ element }) => {
	const context = {
		element,
	};

	const { classNameBase, generation, postcode } = element.dataset;

	const [dataPostcode] = useState(postcode || '');
	const [dataSearch, setDataSearch] = useState('');
	const [selectedThemes, setSelectedThemes] = useState([]);
	const [viewMode, setViewMode] = useState('form');
	const [listData, setListData] = useState([]);
	const themesEndpoint = useMemo(() => `https://gemport.ch/gemport/public/api/themes?generation=${generation}`, []);
	const selectedThemesString = selectedThemes.join(',');

	const listEndpoint = useMemo(() => {
		let url = `https://gemport.ch/gemport/public/api/offerings?zipcode=${dataPostcode}`;

		if (selectedThemesString) {
			url += `&theme=[${selectedThemesString}]`;
		}

		if (dataSearch) {
			url += `&search=${dataSearch}`;
		}

		return url;
	}, [dataPostcode, selectedThemesString, dataSearch]);

	const { data, error, state } = apiGet(themesEndpoint);

	if (state === apiStates.LOADING) {
		return '';
	}

	if (state === apiStates.ERROR) {
		console.log('Gemport API error', error);
	}

	return (
		<AppContext.Provider value={context}>
			<div className={`${classNameBase}__inner`}>
				{viewMode === 'form' && (
					<FormView
						classNameBase={classNameBase}
						element={element}
						data={data}
						listEndpoint={listEndpoint}
						selectedThemes={selectedThemes}
						setListData={setListData}
						setSelectedThemes={setSelectedThemes}
						setViewMode={setViewMode}
					/>
				)}
				{viewMode === 'list' && <ListView classNameBase={classNameBase} data={listData} setViewMode={setViewMode} />}
			</div>
		</AppContext.Provider>
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
