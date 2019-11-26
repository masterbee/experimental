/**
 * URL Utils
 * @author Government of Canada
 * @version 1.0
 */

define([], function() {
    "use strict";
    var base = require.toUrl(''); // Lets save the runtime base url

    function absolute( url ) {
        if ( ! url.startsWith('/') )
        {
            return base + url;
        }        
        return base + '/' + url;
    }

    return {
        absolute: absolute
    };
});