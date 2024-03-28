<?php
/*
 * Plugin Name:       TITLE
 * Plugin URI:        https://bitbucket.org/sayhellogmbh/PLUGIN_KEY/
 * Description:       DESCRIPTION
 * Author:            Say Hello GmbH
 * Version:           0.0.0
 * Author URI:        https://sayhello.ch/
 * Text Domain:       shp_gemport
 * Domain Path:       /languages
 * Requires at least: 6.4.3
 * Requires PHP:      8.1
 * License:           GPL v3 or later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Update URI:        https://sayhello.ch/
 */

if (!function_exists('dump')) {
	function dump($var, $exit = false)
	{
		echo '<pre>';
		var_dump($var);
		echo '</pre>';

		if ($exit) {
			exit;
		}
	}
}

spl_autoload_register(function ($class) {

	// project-specific namespace prefix
	$prefix = 'SayHello\\GemportSearch\\';

	// base directory for the namespace prefix
	$base_dir = __DIR__ . '/src/';

	// does the class use the namespace prefix?
	$len = strlen($prefix);
	if (strncmp($prefix, $class, $len) !== 0) {
		// no, move to the next registered autoloader
		return;
	}

	// get the relative class name
	$relative_class = substr($class, $len);

	// replace the namespace prefix with the base directory, replace namespace
	// separators with directory separators in the relative class name, append
	// with .php
	$file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

	// if the file exists, require it
	if (file_exists($file)) {
		require $file;
	}
});

$block_search = new SayHello\GemportSearch\Blocks\GemportSearch\Block();
$block_search->run();
