<?php

$block_wrapper_attributes = get_block_wrapper_attributes();
$classname_default = wp_get_block_default_classname($block->name);

$postcode = $attributes['postcode'] ?? '';

// check to see that $postcode is a four-digit numeric between 1000 and 9999
if (!is_numeric($postcode) || strlen($postcode) !== 4 || $postcode < 1000 || $postcode > 9999) {
	$postcode = '';
}

?>
<div <?php echo $block_wrapper_attributes; ?>>
	<div class="<?php echo $classname_default; ?>__wrapper" data-postcode="<?php echo $postcode; ?>"></div>
</div>
