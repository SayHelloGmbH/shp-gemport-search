import { getBlockDefaultClassName, registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Panel, PanelBody, __experimentalNumberControl as NumberControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import block_json from '../../../../block.json';
const { name: block_name } = block_json;
const classNameBase = getBlockDefaultClassName(block_name);

import './index.scss';

registerBlockType(block_name, {
	edit: (props) => {
		const blockProps = useBlockProps();
		const { setAttributes, attributes } = props;
		const { generation, postcode } = attributes;

		return (
			<>
				<InspectorControls>
					<Panel header={__('Gemport Search/List Settings', 'shp_gemport_search')}>
						<PanelBody>
							<NumberControl
								label={__('Postcode', 'shp_gemport_search')}
								value={postcode}
								onChange={(value) => setAttributes({ postcode: value })}
								min={1000}
								max={9999}
								required={false}
							/>
							<SelectControl
								label={__('Generation', 'shp_gemport_search')}
								value={generation}
								onChange={(value) => setAttributes({ generation: value })}
								options={[
									{ label: __('No constraint', 'shp_gemport_search'), value: 0 },
									{ label: '2', value: 2 },
								]}
							/>
						</PanelBody>
					</Panel>
				</InspectorControls>
				<div {...blockProps}>
					<div
						className={`${classNameBase}__placeholder`}
						dangerouslySetInnerHTML={{ __html: __('Placeholder for the Gemport search/list', 'shp_gemport_search') }}
					/>
				</div>
			</>
		);
	},
});
