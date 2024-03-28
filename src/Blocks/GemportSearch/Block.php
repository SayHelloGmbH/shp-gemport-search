<?php

/**
 * Registers a custom block for the WordPress Block Editor.
 * 
 * @author Mark Howells-Mead <mark@sayhello.ch>
 * @since 28.3.2024
 */

namespace SayHello\GemportSearch\Blocks\GemportSearch;

class Block
{

	public function run()
	{
		add_action('init', [$this, 'register']);
	}

	public function register()
	{
		register_block_type(__DIR__);
	}
}
