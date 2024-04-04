# Offers from the Gemport API

## Description

Dynamic search form and results list, which draws data from the Gemport API.

## Usage

Install and use as a normal plugin. The WordPress plugin provides a Block for the Block Editor, with which it is possible
to place a search/results app on a page or post view. This uses React to show a search form (which pulls themes from the Gemport API) with which the user can search for specific information.

The result list is then pulled from the Gemport API on form submission without reloading the page or changing the page URL.

Because the interface requires the use of asynchronous JavaScript, it cannot work if JavaScript is disabled or unavailable in the browser.

### Version requirements

-   WordPress 6.4.3 or 6.5
-   PHP 8.1

### API URLs

For the form:

-   https://gemport.ch/gemport/public/api/themes (all themes)
-   https://gemport.ch/gemport/public/api/themes?generation=2 (example for Generation 2)

For the list:

-   https://gemport.ch/gemport/public/api/offerings?zipcode=3110&theme=[21,22] (ZIP code which has been added editorially as a block attribute. This field does not appear in the frontend. The theme parameter is populated by the user checkbox selection in the form.)
-   https://gemport.ch/gemport/public/api/offerings?zipcode=3110&search=tiersitter (Alternative request which includes a search parameter, which the user has entered in the frontend.)

## Use as a standalone script

The JavaScript file contains all of the dynamic custom code, including React 18.2.0 and React DOM 18.2.0. If this script is used as a standlone resource, and if React is already in use on the site in question, there may be conflict issues.

### Implementation

Use the file _assets/react/search.min.js_ from this Github repository. (Do not hotlink it to this repository, as the file is not publicly accessible from its URL here.)

The script should be added to the HTML page using a `script` tag in the usual way. The script searches for matching HTML elements on the page using the standard `DOMContentLoaded` browser event and it's recommended to enqueue the script at the end of the `body`. Using `defer` or `async` to load the script may cause event timing issues.

    <script src="https://FULL_PATH_TO_FOLDER/search.min.js"></script>

#### Data attributes

Add an HTML element to the page in position which is appropriate for your needs. The element must contain the following `data` attributes. (Example values are shown in the following code.)

The main data attribute `data-gemport-search` (with no value) is used to mark the HTML element as the wrapper for the app.

-   `data-gemport-search`
-   `data-class-name-base="shp-gemport-search"`
-   `data-generation="2"`
-   `data-postcode="3110"`

#### Texts / translations

The translations (text strings) for each element in the interface must be added to the HTML element as a `data` attribute.

    data-translations="{&quot;contact_colon&quot;:&quot;Kontakt:&quot;,&quot;more_information&quot;:&quot;Weitere Information&quot;,&quot;no_matching_offers_found&quot;:&quot;Keine zutreffende Angebote gefunden&quot;,&quot;optional_search_text&quot;:&quot;Optionaler Suchbegriff&quot;,&quot;search_offers&quot;:&quot;Angebote durchsuchen&quot;,&quot;view_search_form&quot;:&quot;Suchformular anzeigen&quot;}"

The usual case for building this array is using PHP. Note that the `'key' => 'value'` syntax. This example uses the WordPress gettext function `__()`. ([Reference](https://developer.wordpress.org/reference/functions/__/).)

Note that all of the entries in this `'key' => 'value'` sequence are essential. Omitting one of them will cause the app to break.

```php
<?php
$translations = [
	'contact_colon' => __('Contact:', 'shp_gemport_search'),
	'more_information' => __('More information', 'shp_gemport_search'),
	'no_matching_offers_found' => __('No matching offers found', 'shp_gemport_search'),
	'optional_search_text' => __('Optional search text', 'shp_gemport_search'),
	'search_offers' => __('Search offers', 'shp_gemport_search'),
	'view_search_form' => __('View search form', 'shp_gemport_search'),
];

$translations_json = json_encode($translations);
?>

<div
	class="shp-gemport-search__wrapper"
	data-gemport-search
	data-class-name-base="shp-gemport-search"
	data-generation="2"
	data-postcode="3110"
	data-translations="<?php echo htmlspecialchars($translations_json, ENT_QUOTES, 'UTF-8'); ?>"
	></div>
```

## Contributors

-   Mark Howells-Mead (mark@sayhello.ch)
-   Christian Zumbrunnen (chzumbrunnen@chruezundquer.ch)

## License

Use this code freely, widely and for free. Provision of this code provides and implies no guarantee.

Please respect the GPL v3 licence, which is available via http://www.gnu.org/licenses/gpl-3.0.html
