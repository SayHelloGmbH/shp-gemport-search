import { __ } from '@wordpress/i18n';
import { toggleThemeSelection } from './_functions';

export const FormView = ({ props }) => {
	const { element, data, selectedThemes, setSelectedThemes } = props;
	const { classNameBase } = element.dataset;

	return (
		<form className={`${classNameBase}__form`}>
			<div className={`${classNameBase}__form-inner`}>
				<ul className={`${classNameBase}__entries`}>
					{data.map((entry) => (
						<li key={entry.id} className={`${classNameBase}__entry ${classNameBase}__entry--${entry.id}`}>
							<label
								className={`${classNameBase}__entry-label ${classNameBase}__entry-label--${entry.id}`}
								for={`${classNameBase}__entry-checkbox ${classNameBase}__entry-checkbox--${entry.id}`}
							>
								<input
									type="checkbox"
									id={`${classNameBase}__entry-checkbox ${classNameBase}__entry-checkbox--${entry.id}`}
									key={entry.id}
									value={entry.id}
									onChange={() => toggleThemeSelection({ entryId: entry.id, setSelectedThemes })}
									checked={selectedThemes.includes(entry.id)}
								/>
								<span className={`${classNameBase}__entry-name`}>{entry.name}</span>
							</label>
						</li>
					))}
				</ul>
				<div className={`${classNameBase}__button-wrapper ${classNameBase}__button-wrapper--search`}>
					<button className={`${classNameBase}__button ${classNameBase}__button--search`} type="button">
						{__('Search offers', 'shp_gemport_search')}
					</button>
				</div>
			</div>
		</form>
	);
};
