(()=>{"use strict";var e={418:(e,t,r)=>{r.d(t,{A:()=>s});var n=r(601),o=r.n(n),a=r(314),c=r.n(a)()(o());c.push([e.id,".wp-block-shp-gemport-search__placeholder{padding:1em;border:2px dotted #ccc;background-color:#eee;text-align:center}",""]);const s=c},314:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r="",n=void 0!==t[5];return t[4]&&(r+="@supports (".concat(t[4],") {")),t[2]&&(r+="@media ".concat(t[2]," {")),n&&(r+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),r+=e(t),n&&(r+="}"),t[2]&&(r+="}"),t[4]&&(r+="}"),r})).join("")},t.i=function(e,r,n,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var c={};if(n)for(var s=0;s<this.length;s++){var i=this[s][0];null!=i&&(c[i]=!0)}for(var l=0;l<e.length;l++){var p=[].concat(e[l]);n&&c[p[0]]||(void 0!==a&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=a),r&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=r):p[2]=r),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),t.push(p))}},t}},601:e=>{e.exports=function(e){return e[1]}},72:e=>{var t=[];function r(e){for(var r=-1,n=0;n<t.length;n++)if(t[n].identifier===e){r=n;break}return r}function n(e,n){for(var a={},c=[],s=0;s<e.length;s++){var i=e[s],l=n.base?i[0]+n.base:i[0],p=a[l]||0,u="".concat(l," ").concat(p);a[l]=p+1;var d=r(u),f={css:i[1],media:i[2],sourceMap:i[3],supports:i[4],layer:i[5]};if(-1!==d)t[d].references++,t[d].updater(f);else{var m=o(f,n);n.byIndex=s,t.splice(s,0,{identifier:u,updater:m,references:1})}c.push(u)}return c}function o(e,t){var r=t.domAPI(t);return r.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;r.update(e=t)}else r.remove()}}e.exports=function(e,o){var a=n(e=e||[],o=o||{});return function(e){e=e||[];for(var c=0;c<a.length;c++){var s=r(a[c]);t[s].references--}for(var i=n(e,o),l=0;l<a.length;l++){var p=r(a[l]);0===t[p].references&&(t[p].updater(),t.splice(p,1))}a=i}}},659:e=>{var t={};e.exports=function(e,r){var n=function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}(e);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},540:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},56:(e,t,r)=>{e.exports=function(e){var t=r.nc;t&&e.setAttribute("nonce",t)}},825:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(r){!function(e,t,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var o=void 0!==r.layer;o&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,o&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var a=r.sourceMap;a&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(n,e,t.options)}(t,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},113:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,exports:{}};return e[n](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.nc=void 0,(()=>{const e=window.wp.blocks,t=window.wp.blockEditor,n=window.wp.components,o=window.wp.i18n,a=JSON.parse('{"name":"shp/gemport-search"}');var c=r(72),s=r.n(c),i=r(825),l=r.n(i),p=r(659),u=r.n(p),d=r(56),f=r.n(d),m=r(540),h=r.n(m),v=r(113),g=r.n(v),y=r(418),_={};_.styleTagTransform=g(),_.setAttributes=f(),_.insert=u().bind(null,"head"),_.domAPI=l(),_.insertStyleElement=h(),s()(y.A,_),y.A&&y.A.locals&&y.A.locals;const{name:b}=a,w=(0,e.getBlockDefaultClassName)(b);(0,e.registerBlockType)(b,{edit:e=>{const r=(0,t.useBlockProps)(),{setAttributes:a,attributes:c}=e,{generation:s,postcode:i}=c;return React.createElement(React.Fragment,null,React.createElement(t.InspectorControls,null,React.createElement(n.Panel,{header:(0,o.__)("Gemport Search/List Settings","shp_gemport_search")},React.createElement(n.PanelBody,null,React.createElement(n.__experimentalNumberControl,{label:(0,o.__)("Postcode","shp_gemport_search"),value:i,onChange:e=>a({postcode:parseInt(e)}),min:1e3,max:9999,required:!1}),React.createElement(n.SelectControl,{label:(0,o.__)("Generation","shp_gemport_search"),value:s,onChange:e=>a({generation:parseInt(e)}),options:[{label:(0,o.__)("No constraint","shp_gemport_search"),value:0},{label:"2",value:2}]})))),React.createElement("div",r,React.createElement("div",{className:`${w}__placeholder`,dangerouslySetInnerHTML:{__html:(0,o.__)("Placeholder for the Gemport search/list","shp_gemport_search")}})))}})})()})();