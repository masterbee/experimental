require(["../assets/wet-boew/wb" ], function(  ) {
    document.getElementById("render").onclick = function() {

        // Get the JS object
        var jsObject = new Function( 'return ' + document.getElementById( "jsobj" ).value );
    
        // Allow the JS Object to be reactive
        jsObject = wb.React( jsObject() );
    
        // Parser the string template into a DOM template
        var templateString = document.getElementById( "tmpl" ).value, // Template as text
            clone,
            div = document.createElement( "div" );
    
        div.innerHTML = templateString;
        clone = document.createDocumentFragment();
        clone.appendChild( div );
    
        // Mapping the jsObject into the template. After this the template would be updated in a reactive way
        wb.Walk( clone, jsObject );
    
        // Show the result
        document.getElementById( "results" ).innerHTML = "";
        document.getElementById( "results" ).appendChild( clone );
    
        // Expose the data of jsObject and let the user play in their console
        window.playground = jsObject.data;
    };
});