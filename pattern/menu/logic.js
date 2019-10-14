/**
 * 
 */
define([] , function () {
	
	return {
		
		init: function( element )
		{
			alert("in!");
			
			let url = element.getAttribute('enhance');
			
			fetch( url )
			.then( response => response.text() )
			.then( text => {
				element.innerHTML = text;
			}).catch(response => {
				 alert("HTTP-Error: " + response.status);
			});	
	      
		}
	}
    
});