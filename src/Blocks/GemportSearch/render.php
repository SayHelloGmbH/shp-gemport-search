<?php

$block_wrapper_attributes = get_block_wrapper_attributes();
$classname_default = wp_get_block_default_classname($block->name);

$generation = (int) $attributes['generation'] ?? '';
$postcode = $attributes['postcode'] ?? '';

// check to see that $postcode is a four-digit numeric between 1000 and 9999
if (!is_numeric($postcode) || strlen($postcode) !== 4) {
	$postcode = '';
}

$translations = [
	'contact_colon' => __('Contact:', 'shp_gemport_search'),
	'more_information' => __('More information', 'shp_gemport_search'),
	'no_matching_offers_found' => __('No matching offers found', 'shp_gemport_search'),
	'optional_search_text' => __('Optional search text', 'shp_gemport_search'),
	'search_offers' => __('Search offers', 'shp_gemport_search'),
	'view_search_form' => __('View search form', 'shp_gemport_search'),
];

$translations_json = json_encode($translations);

wp_enqueue_script('xxxxx', 'https://gemport.local/wp-content/plugins/shp-gemport-search/assets/preact/search.min.js', [], null, true);

?>
<div <?php echo $block_wrapper_attributes; ?>>
	<div class="<?php echo $classname_default; ?>__wrapper" data-gemport-search data-class-name-base="<?php echo $classname_default; ?>" data-generation="<?php echo $generation; ?>" data-postcode="<?php echo $postcode; ?>" data-translations="<?php echo esc_attr($translations_json); ?>"></div>
</div>