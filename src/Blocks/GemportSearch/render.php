<?php

$block_wrapper_attributes = get_block_wrapper_attributes();
$classname_default = wp_get_block_default_classname($block->name);

?>
<div <?php echo $block_wrapper_attributes; ?>>
	<p>Hello World</p>
</div>
