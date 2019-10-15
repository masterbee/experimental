/**
 * 
 */
define([] , function () {
	
	return {
		
		init: function( element )
		{
			var url = element.getAttribute('enhance');
			
			if ( url )
			{
				fetch( url )
				.then( response => response.text() )
				.then( text => { element.innerHTML = text } )
				.catch(response => {
					 alert("HTTP-Error: " + response.status);
				});	
			}
			
	      
		}
	}
    
});