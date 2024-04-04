# Offers from the Gemport API

## Description

Dynamic search form and results list, which draws data from the Gemport API.

## Usage

Install and use as a normal plugin. The WordPress plugin provides a Block for the Block Editor, with which it is possible
to place a search/results app on a page or post view. This uses React to show a search form (which pulls themes from the Gemport API)
with which the user can search for specific information.

The result list is then pulled from the Gemport API on form submission without reloading the page or changing the page URL.

Because the interface requires the use of asynchronous JavaScript, it cannot work if JavaScript is disabled or unavailable in the browser.

### Version requirements

-   WordPress 6.4.3 or 6.5
-   PHP 8.1

### API URLs

For the form:

-   https://gemport.ch/gemport/public/api/themes (all themes)
-   https://gemport.ch/gemport/public/api/themes?generation=2 (example for Generation 2)

For the list:

-   https://gemport.ch/gemport/public/api/offerings?zipcode=3110&theme=[21,22] (ZIP code which has been added editorially as a block attribute. This field does not appear in the frontend. The theme parameter is populated by the user checkbox selection in the form.)
-   https://gemport.ch/gemport/public/api/offerings?zipcode=3110&search=tiersitter (Alternative request which includes a search parameter, which the user has entered in the frontend.)

## Contributors

-   Mark Howells-Mead (mark@sayhello.ch)
-   Christian Zumbrunnen (chzumbrunnen@chruezundquer.ch)

## License

Use this code freely, widely and for free. Provision of this code provides and implies no guarantee.

Please respect the GPL v3 licence, which is available via http://www.gnu.org/licenses/gpl-3.0.html
