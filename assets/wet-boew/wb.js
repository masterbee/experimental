// =============
// = Polyfills =
// =============

var polyfills = [],
    lang = (document.documentElement.lang) ? document.documentElement.lang : "en";

// =========================
// CONFIGURATION
// =========================

require.config({
    "config": {
        "i18n": {
            "locale": lang
        }
    },
    "paths": {
        "highlight": "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min"
    }
});

require(["/experimental/assets/wet-boew/lib/dom/stylesheet.js", '/experimental/assets/wet-boew/lib/string/utils.js', '/experimental/assets/wet-boew/lib/url/utils.js','/experimental/assets/wet-boew/react.js','/experimental/assets/wet-boew/walk.js' ], function( Stylesheet, StrUtil, URLUtil,WBReact,Walk ) {
    var basePath = require.toUrl('');

    let insertListener = function(event) {
        if (event.animationName === "nodeInserted" && event.target.tagName.startsWith("WB-")) {
            var node = Object.assign(event.target, {});
            var tagName = StrUtil.removePrefix( node.tagName, 'wb-', true );

            var path = (node.getAttribute('srcid')) ? 
                node.getAttribute('srcid') + "/logic.js" :
                URLUtil.absolute( "element/" + tagName.toLowerCase() + "/logic.js" );

            console.log("Resolved Path:" + path );

            require([path], function(element) {
                if (element && element.init) {
                    element.init(node);
                }
            });
        }

    }
    window.wb = {}; 
    window.wb.React = WBReact;
    window.wb.Walk = Walk;

    document.addEventListener("animationstart", insertListener, false); // standard+ firefox
    document.addEventListener("MSAnimationStart", insertListener, false); // IE
    document.addEventListener("webkitAnimationStart", insertListener, false); // Chrome + Safari

    // Add the observer event binding
    document.head.appendChild(
        Stylesheet.css("@keyframes nodeInserted {\nfrom { opacity: 0.99; }\nto { opacity: 1; }\n}\n\n[v] {animation-duration: 0.001s;animation-name: nodeInserted;}")
    );
});