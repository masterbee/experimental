/**
 * 
 */
define([] , function () {
    return function ( element, url ) {

      let response = await fetch( url );

      if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        element.innerHTML = response.text();
      } else {
        alert("HTTP-Error: " + response.status);
      }
     };
});