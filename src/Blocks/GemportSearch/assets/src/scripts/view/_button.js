import { useRef } from '@wordpress/element';

export const Buttons = ({ children, classNameBase }) => {
	const elementRef = useRef(null);

	return (
		<div
			ref={elementRef}
			className={`wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex ${classNameBase}__buttons ${classNameBase}__buttons--back`}
		>
			{children}
		</div>
	);
};

export const Button = ({ label = '', buttonKey = '', url = null, classNameBase, onClick }) => {
	return (
		<div className={`wp-block-button ${classNameBase}__button ${classNameBase}__button--${buttonKey}`}>
			{!!url && (
				<a
					className={`wp-block-button__link ${classNameBase}__button-link ${classNameBase}__button-link--${buttonKey}`}
					href={url}
					dangerouslySetInnerHTML={{ __html: label }}
				/>
			)}
			{!url && (
				<button
					className={`wp-block-button__link ${classNameBase}__button-link ${classNameBase}__button-link--${buttonKey}`}
					type="button"
					onClick={onClick}
					dangerouslySetInnerHTML={{ __html: label }}
				/>
			)}
		</div>
	);
};
