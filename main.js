/*

 */

// =============
// = Polyfills =
// =============

var polyfills = [],
    lang = ( document.documentElement.lang ) ? document.documentElement.lang : "en";

// =========================
// CONFIGURATION
// =========================
	
require.config({
	config: {
	        i18n: {
	            locale: lang
	        }
	    }
});

require([ "/assets/wet-boew/lib/dom/stylesheet.js" ], function( Stylesheet ) {
    // Lets bind the dictionary to the window-object
    //window.i18n = i8n;

    let insertListener = function( event ) {
		if ( 
            event.animationName === "nodeInserted" &&
            event.target.tagName.startsWith("WB-")
        ) {
            let node = Object.assign( event.target, {} ),
                tagName = node.tagName.toLowerCase();
				path = ( node.getAttribute('srcid') ) ? node.getAttribute('srcid') + "/logic.js" : "core/" + tagName + "/logic.js" ; 
            
			require( [ path ], function( element ) {
                if ( element && element.init ) {
                    element.init( node );
                }
            });
		}

	}

	document.addEventListener( "animationstart", insertListener, false ) ; // standard+ firefox
	document.addEventListener( "MSAnimationStart", insertListener, false ) ; // IE
	document.addEventListener( "webkitAnimationStart", insertListener, false ) ; // Chrome + Safari

	// Add the observer event binding
	document.head.appendChild(
		Stylesheet.css("@keyframes nodeInserted {\nfrom { opacity: 0.99; }\nto { opacity: 1; }\n}\n\n[v] {animation-duration: 0.001s;animation-name: nodeInserted;}" )
    );
    
});