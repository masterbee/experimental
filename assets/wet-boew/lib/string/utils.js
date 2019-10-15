/**
 * String Utils
 * @author Government of Canada
 * @version 1.0
 */

define([], function() {
    "use strict";

    function range(text, prefix) {
        return [text.indexOf(prefix), prefix.length];
    }

    function removePrefix(text, prefix, case_insensitive) {
        var rng = (case_insensitive) ? range(text.toLowerCase(), prefix.toLowerCase()) : range(text, prefix);
        return (rng[0] === 0) ? text.substr(rng[1]) : text;
    }

    return {
        removePrefix: removePrefix
    };
});