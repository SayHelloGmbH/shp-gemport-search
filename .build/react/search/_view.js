import React, { useContext, useEffect } from 'react';

import { useApiGet, apiStates } from './_api';
import { Button, Buttons } from './_button';
import { AppContext } from './_context';
import { toggleThemeSelection } from './_functions';

export const FormView = () => {
	const [apiData, fetchData] = useApiGet();

	const context = useContext(AppContext);

	const {
		classNameBase,
		data,
		dataSearch,
		selectedThemes,
		setDataSearch,
		setSelectedThemes,
		setListData,
		setViewMode,
		listEndpoint,
		translations,
		viewError,
		setViewError,
	} = context;

	const fetchListData = () => {
		setViewError('');
		fetchData(listEndpoint);
	};

	useEffect(() => {
		switch (apiData.state) {
			case apiStates.LOADING:
				setListData(null);
				break;
			case apiStates.ERROR:
				setViewError(apiData.error);
				break;
			case apiStates.SUCCESS:
				setListData(apiData.data);
				setViewMode('list');
				break;
		}
	}, [apiData]);

	if (viewError) {
		return (
			<>
				<div className={`${classNameBase}__error-wrapper`}>
					<p className={`${classNameBase}__error-text`} dangerouslySetInnerHTML={{ __html: viewError }} />
				</div>
				<BackButton />
			</>
		);
	}

	return (
		<form
			className={`${classNameBase}__form`}
			onSubmit={(event) => {
				event.preventDefault();
				fetchListData();
			}}
		>
			<div className={`${classNameBase}__form-inner`}>
				<ul className={`${classNameBase}__entries`}>
					{data.map((entry) => (
						<li key={entry.id} className={`${classNameBase}__entry ${classNameBase}__entry--${entry.id}`}>
							<label
								className={`${classNameBase}__entry-label ${classNameBase}__entry-label--${entry.id}`}
								htmlFor={`${classNameBase}__entry-checkbox ${classNameBase}__entry-checkbox--${entry.id}`}
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
				<Buttons classNameBase={classNameBase}>
					<input
						value={dataSearch}
						className={`${classNameBase}__searchfield`}
						onChange={(event) => setDataSearch(event.currentTarget.value)}
						placeholder={translations.optional_search_text}
					/>
					<Button classNameBase={classNameBase} buttonKey="search" onClick={fetchListData} label={translations.search_offers} />
				</Buttons>
			</div>
		</form>
	);
};

const BackButton = () => {
	const context = useContext(AppContext);
	const { classNameBase, translations, setViewMode, setViewError } = context;

	return (
		<Buttons classNameBase={classNameBase}>
			<Button
				classNameBase={classNameBase}
				buttonKey="back"
				onClick={() => {
					setViewError('');
					setViewMode('form');
				}}
				label={translations.view_search_form}
			/>
		</Buttons>
	);
};

export const ListView = () => {
	const context = useContext(AppContext);
	const { listData, classNameBase, translations, setViewMode } = context;

	return (
		<div className={`${classNameBase}__list`}>
			<div className={`${classNameBase}__list-inner`}>
				{!listData?.length && (
					<div className={`${classNameBase}__list-empty`} dangerouslySetInnerHTML={{ __html: translations.no_matching_offers_found }} />
				)}

				{!!listData?.length && (
					<>
						<BackButton />
						<ul className={`${classNameBase}__list-entries`}>
							{listData.map((entry) => {
								let contact = [];

								if (entry.contact_tel) {
									contact.push(<a href={`tel:${entry.contact_tel}`}>{entry.contact_tel}</a>);
								}

								if (entry.contact_email) {
									contact.push(<a href={`mailto:${entry.contact_email}`}>{entry.contact_email}</a>);
								}

								return (
									<li key={entry.id} className={`${classNameBase}__list-entry ${classNameBase}__list-entry--${entry.id}`}>
										{!!entry.name && (
											<>
												{entry.url && (
													<h3
														className={`wp-block-heading ${classNameBase}__list-entry-title ${classNameBase}__list-entry-title--${entry.id}`}
													>
														<a
															className={`${classNameBase}__list-entry-link ${classNameBase}__list-entry-link--${entry.id}`}
															href={entry.url}
															dangerouslySetInnerHTML={{ __html: entry.name }}
														/>
													</h3>
												)}
												{!entry.url && (
													<h3
														className={`wp-block-heading ${classNameBase}__list-entry-title ${classNameBase}__list-entry-title--${entry.id}`}
														dangerouslySetInnerHTML={{ __html: entry.name }}
													/>
												)}
											</>
										)}
										{!!entry.logo && (
											<figure className={`wp-block-image ${classNameBase}__list-entry-figure`}>
												{!!entry.url && (
													<a
														className={`${classNameBase}__list-entry-link ${classNameBase}__list-entry-link--${entry.id}`}
														href={entry.url}
													>
														<img
															className={`${classNameBase}__list-entry-image ${classNameBase}__list-entry-image--${entry.id}`}
															src={`https://gemport.ch/gemport/public/storage/public/${entry.logo}`}
															alt={entry.name}
														/>
													</a>
												)}
												{!entry.url && (
													<img
														className={`${classNameBase}__list-entry-image ${classNameBase}__list-entry-image--${entry.id}`}
														src={`https://gemport.ch/gemport/public/storage/public/${entry.logo}`}
														alt={entry.name}
													/>
												)}
											</figure>
										)}
										{!!entry.description && (
											<div
												className={`${classNameBase}__list-entry-description ${classNameBase}__list-entry-description--${entry.id}`}
												dangerouslySetInnerHTML={{ __html: entry.description }}
											/>
										)}
										{!!contact.length && (
											<div className={`${classNameBase}__list-entry-contact ${classNameBase}__list-entry-contact--${entry.id}`}>
												<span
													className={`${classNameBase}__list-entry-contact-label ${classNameBase}__list-entry-contact-label--${entry.id}`}
												>
													{translations.contact_colon}
												</span>
												{contact.map((contactItem) => (
													<span
														className={`${classNameBase}__list-entry-contact-value ${classNameBase}__list-entry-contact-value--${entry.id}`}
													>
														{contactItem}
													</span>
												))}
											</div>
										)}
										{!!entry.url && (
											<div className={`${classNameBase}__list-entry-more ${classNameBase}__list-entry-more--${entry.id}`}>
												<Buttons>
													<Button
														classNameBase={classNameBase}
														buttonKey="more"
														url={entry.url}
														label={translations.more_information}
													/>
												</Buttons>
											</div>
										)}
									</li>
								);
							})}
						</ul>
					</>
				)}
				<BackButton />
			</div>
		</div>
	);
};
