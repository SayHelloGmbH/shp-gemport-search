import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;
const classNameBase = getBlockDefaultClassName(block_name);

const isValidPostcode = (postcode, country) => {
	if (!/^\d+$/.test(postcode)) {
		return false; // Invalid if postcode contains non-numeric characters
	}

	const swissPostcodePattern = /^[1-9]\d{3}$/; // Swiss postcodes: 1000–9999
	const germanPostcodePattern = /^(0[1-9]|[1-9]\d)\d{3}$/; // German postcodes: 01000–99999

	if (country === 'CH') {
		return swissPostcodePattern.test(postcode);
	}

	if (country === 'DE') {
		return germanPostcodePattern.test(postcode);
	}

	return swissPostcodePattern.test(postcode) || germanPostcodePattern.test(postcode);
};

registerBlockType(block_name, {
	edit: (props) => {
		const { setAttributes, attributes } = props;
		const { country, generation, postcode, town } = attributes;

		let postcode_help = null;

		if (postcode && !isValidPostcode(postcode, country)) {
			if (country === 'CH') {
				postcode_help = __('Invalid Swiss postcode', 'shp_gemport_search');
			} else if (country === 'DE') {
				postcode_help = __('Invalid German postcode', 'shp_gemport_search');
			} else {
				postcode_help = __('Invalid postcode (Swiss or German)', 'shp_gemport_search');
			}
		}

		const classNames = postcode_help ? `${classNameBase} ${classNameBase}--invalid` : classNameBase;

		const blockProps = useBlockProps([classNames]);

		return (
			<>
				<InspectorControls>
					<Panel header={__('Gemport Search/List Settings', 'shp_gemport_search')}>
						<PanelBody>
							<TextControl
								label={__('Postcode', 'shp_gemport_search')}
								value={postcode}
								onChange={(value) => setAttributes({ postcode: value })}
								help={postcode_help}
							/>
							<TextControl label={__('Town', 'shp_gemport_search')} value={town} onChange={(value) => setAttributes({ town: value })} />
							<SelectControl
								label={__('Country', 'shp_gemport_search')}
								value={country}
								onChange={(value) => setAttributes({ country: value })}
								options={[
									{ label: __('No constraint', 'shp_gemport_search'), value: '' },
									{ label: __('Switzerland', 'shp_gemport_search'), value: 'CH' },
									{ label: __('Germany', 'shp_gemport_search'), value: 'DE' },
								]}
							/>
							<SelectControl
								label={__('Generation', 'shp_gemport_search')}
								value={generation}
								onChange={(value) => setAttributes({ generation: parseInt(value) })}
								options={[
									{ label: __('No constraint', 'shp_gemport_search'), value: 0 },
									{ label: '1', value: 1 },
									{ label: '2', value: 2 },
									{ label: '3', value: 3 },
								]}
							/>
						</PanelBody>
					</Panel>
				</InspectorControls>
				<div {...blockProps}>
					<div className={`${classNameBase}__placeholder`}>
						<div
							className={`${classNameBase}__placeholder-title`}
							dangerouslySetInnerHTML={{ __html: __('Placeholder for the Gemport search/list', 'shp_gemport_search') }}
						/>
						{postcode_help && <div className={`${classNameBase}__error`}>{postcode_help}</div>}
					</div>
				</div>
			</>
		);
	},
});
