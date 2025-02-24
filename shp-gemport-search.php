<?php
/*
 * Plugin Name:       Offers from the Gemport API
 * Plugin URI:        https://bitbucket.org/sayhellogmbh/shp-gemport-search/
 * Description:       Dynamic search form and results list, which draws data from the Gemport API.
 * Author:            Say Hello GmbH
 * Version:           1.2.0
 * Author URI:        https://sayhello.ch/
 * Text Domain:       shp_gemport_search
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

define('SHP_GEMPORT_SEARCH_PATH', __FILE__);

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

// Function to load plugin translations
// Caution, different path definition than for the editor
function load_gemport_search_translations()
{
	load_plugin_textdomain('shp_gemport_search', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('plugins_loaded', 'load_gemport_search_translations');

// Load editor (JS) translations
// Caution, different path definition than for the frontend
function gemport_set_script_translations()
{
	$script_handle = generate_block_asset_handle('shp/gemport-search', 'editorScript');
	wp_set_script_translations($script_handle, 'shp_gemport_search', plugin_dir_path(__FILE__) . 'languages');
}
add_action('init', 'gemport_set_script_translations', 100);

$block_search = new SayHello\GemportSearch\Blocks\GemportSearch\Block();
$block_search->run();
